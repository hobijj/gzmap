import json
from sqlalchemy.orm import Session
from fastapi import HTTPException
from ..models import DataItem
from ..schemas import SubItemOut, MapDataOut, ChartConfigOut, PointOut, RegionOut, StatOut


def build_sub_item(item: DataItem) -> dict:
    """Build a frontend-compatible dict from ORM models."""
    points = []
    for p in item.points:
        extra = json.loads(p.extra_json) if p.extra_json else {}
        points.append({
            "lat": p.lat,
            "lng": p.lng,
            "value": p.value,
            "name": p.name,
            "district": p.district,
            **extra,  # merge category, type, area, line, etc.
        })

    regions = [{"district": r.district, "value": r.value} for r in item.regions]

    stats = sorted(item.stats, key=lambda s: s.sort_order)
    stats_list = [{"label": s.label, "value": s.value, "trend": s.trend} for s in stats]

    return {
        "id": item.id,
        "name": item.name,
        "description": item.description,
        "mapData": {
            "type": item.map_type,
            "points": points,
            "regions": regions,
        },
        "chartData": {
            "type": item.chart_type,
            "title": item.chart_title,
            "xField": item.chart_x_field,
            "yField": item.chart_y_field,
            "unit": item.chart_unit,
        },
        "stats": stats_list,
    }


def get_all_for_module(db: Session, module: str) -> list[dict]:
    items = db.query(DataItem).filter(DataItem.module == module).all()
    return [build_sub_item(item) for item in items]


def get_one(db: Session, module: str, item_id: str) -> dict:
    item = db.query(DataItem).filter(
        DataItem.module == module,
        DataItem.id == item_id
    ).first()
    if not item:
        raise HTTPException(status_code=404, detail=f"Item '{item_id}' not found in module '{module}'")
    return build_sub_item(item)
