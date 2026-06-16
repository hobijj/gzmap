"""Base crawler — each data source extends this."""

import json
import time
from abc import ABC, abstractmethod
import requests
from sqlalchemy.orm import Session
from ..database import SessionLocal
from ..models import DataItem, MapPoint, Region, Stat


class BaseCrawler(ABC):
    """Abstract crawler with common HTTP + DB save logic."""

    # Override in subclasses
    data_item_id: str = ""
    module: str = ""

    def __init__(self, db: Session = None):
        self.db = db or SessionLocal()
        self.session = requests.Session()
        self.session.headers.update({
            "User-Agent": "gzmap-crawler/1.0 (research project; contact@example.com)"
        })

    def sleep(self, seconds=3):
        """Be polite between requests."""
        time.sleep(seconds)

    @abstractmethod
    def crawl(self) -> list[dict]:
        """Fetch raw data from external source.
        Returns a list of dicts with keys matching the frontend Point + Region + Stat shape.
        """
        ...

    def save(self, data: dict):
        """Save crawled data to DB. 'data' should have keys:
        name, description, map_type, points, regions, stats
        """
        item_id = self.data_item_id

        # Upsert DataItem
        item = self.db.query(DataItem).filter(DataItem.id == item_id).first()
        if not item:
            item = DataItem(id=item_id, module=self.module)
            self.db.add(item)

        item.name = data.get("name", item.name)
        item.description = data.get("description", item.description)
        item.map_type = data.get("map_type", item.map_type)
        item.chart_type = data.get("chart_type", "bar")
        item.chart_title = data.get("chart_title", item.chart_title)
        item.chart_x_field = "district"
        item.chart_y_field = "value"
        item.chart_unit = data.get("chart_unit", item.chart_unit)

        # Replace points
        self.db.query(MapPoint).filter(MapPoint.data_item_id == item_id).delete()
        for pt in data.get("points", []):
            extra = {}
            for key in ("category", "type", "history", "era", "area", "line", "scale", "peak"):
                if key in pt and pt[key]:
                    extra[key] = pt[key]

            self.db.add(MapPoint(
                data_item_id=item_id,
                lat=pt["lat"],
                lng=pt["lng"],
                value=pt["value"],
                name=pt["name"],
                district=pt["district"],
                extra_json=json.dumps(extra, ensure_ascii=False) if extra else "{}",
            ))

        # Replace regions
        self.db.query(Region).filter(Region.data_item_id == item_id).delete()
        for reg in data.get("regions", []):
            self.db.add(Region(
                data_item_id=item_id,
                district=reg["district"],
                value=reg["value"],
            ))

        # Replace stats
        self.db.query(Stat).filter(Stat.data_item_id == item_id).delete()
        for i, stat in enumerate(data.get("stats", [])):
            self.db.add(Stat(
                data_item_id=item_id,
                label=stat["label"],
                value=str(stat["value"]),
                trend=stat.get("trend"),
                sort_order=i,
            ))

        self.db.commit()
        print(f"[{self.data_item_id}] Saved {len(data.get('points', []))} points, "
              f"{len(data.get('regions', []))} regions, {len(data.get('stats', []))} stats")

    def run(self):
        """Full pipeline: crawl -> transform -> save."""
        print(f"[{self.data_item_id}] Starting crawl...")
        data = self.crawl()
        if data:
            self.save(data)
            print(f"[{self.data_item_id}] Done.")
        else:
            print(f"[{self.data_item_id}] No data returned from crawl().")

    def close(self):
        self.db.close()
        self.session.close()
