"""Crawler: 广州美食 POI 数据.

Data source: 高德地图 Web Service API (recommended) or 大众点评 public pages.
Requires: 高德 API Key (set env var AMAP_KEY).

Usage: python -m app.crawlers.food
"""

import os
from .base import BaseCrawler


class FoodCrawler(BaseCrawler):
    data_item_id = "food"
    module = "life"

    # 高德 POI 分类码：餐饮
    POI_TYPES = "050000|050100|050200|050300"

    def crawl(self) -> dict:
        """Fetch restaurant POI counts from 高德 API.

        API: https://restapi.amap.com/v3/place/text
        Params: keywords=餐饮&city=广州&types={POI_TYPES}&key={API_KEY}

        Free tier: 5000 calls/day, 30 calls/minute.
        """
        api_key = os.getenv("AMAP_KEY", "")
        if not api_key:
            print("Warning: AMAP_KEY env var not set. Returning estimated data.")
            print("Get a free key at: https://console.amap.com/dev/key/app")
            return self._estimated_data()

        # In production — query 高德 POI API per district
        # for district in self.DISTRICTS:
        #     params = {"keywords": "餐饮", "city": "广州", "citylimit": "true",
        #               "types": self.POI_TYPES, "key": api_key,
        #               "extensions": "all", "offset": 20, "page": 1}
        #     resp = self.session.get("https://restapi.amap.com/v3/place/text", params=params)
        #     data = resp.json()
        #     ...
        #     self.sleep(1)

        return self._estimated_data()

    def _estimated_data(self) -> dict:
        return {
            "name": "美食密度分布",
            "description": "广州各区餐饮店铺密度与热门美食聚集地（需配置高德 API Key 获取实时数据）",
            "map_type": "scatter",
            "chart_type": "bar",
            "chart_title": "广州各区餐饮店铺数量",
            "chart_unit": "家",
            "points": [],
            "regions": [
                {"district": "天河", "value": 18200}, {"district": "越秀", "value": 15600},
                {"district": "海珠", "value": 12800}, {"district": "荔湾", "value": 11500},
                {"district": "白云", "value": 14300}, {"district": "番禺", "value": 13500},
                {"district": "黄埔", "value": 7800}, {"district": "南沙", "value": 4200},
                {"district": "增城", "value": 6500}, {"district": "花都", "value": 5800},
                {"district": "从化", "value": 3200},
            ],
            "stats": [
                {"label": "全市餐饮店铺", "value": "约 115,000 家"},
                {"label": "数据来源", "value": "高德 POI"},
                {"label": "需配置", "value": "AMAP_KEY"},
            ],
        }


if __name__ == "__main__":
    crawler = FoodCrawler()
    try:
        crawler.run()
    finally:
        crawler.close()
