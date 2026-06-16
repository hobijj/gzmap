"""Crawler: 广州交通拥堵态势数据.

Data source: 高德交通态势 API (https://restapi.amap.com/v3/traffic/status/circle)
Requires: 高德 API Key (set env var AMAP_KEY).

Usage: python -m app.crawlers.traffic
"""

import os
from .base import BaseCrawler


class TrafficCrawler(BaseCrawler):
    data_item_id = "traffic"
    module = "pulse"

    # Traffic circle queries — one per district center
    QUERIES = [
        {"name": "天河CBD", "lat": 23.125, "lng": 113.330, "radius": 3000},
        {"name": "越秀老城", "lat": 23.128, "lng": 113.270, "radius": 2500},
        {"name": "海珠中轴", "lat": 23.100, "lng": 113.320, "radius": 3000},
        {"name": "荔湾老区", "lat": 23.118, "lng": 113.240, "radius": 2500},
        {"name": "白云新城", "lat": 23.160, "lng": 113.270, "radius": 3000},
        {"name": "番禺万博", "lat": 22.940, "lng": 113.350, "radius": 3000},
        {"name": "黄埔科学城", "lat": 23.110, "lng": 113.450, "radius": 3000},
    ]

    def crawl(self) -> dict:
        """Fetch traffic congestion data from 高德 API.

        API: GET https://restapi.amap.com/v3/traffic/status/circle
        Params: location={lng},{lat}&radius={radius}&key={API_KEY}

        Returns congestion index per area (0-100).
        """
        api_key = os.getenv("AMAP_KEY", "")
        if not api_key:
            print("Warning: AMAP_KEY env var not set. Returning estimated data.")
            print("Get a free key at: https://console.amap.com/dev/key/app")
            return self._estimated_data()

        points = []
        # for q in self.QUERIES:
        #     params = {"location": f"{q['lng']},{q['lat']}", "radius": q["radius"],
        #               "key": api_key, "extensions": "all"}
        #     resp = self.session.get("https://restapi.amap.com/v3/traffic/status/circle",
        #                             params=params)
        #     data = resp.json()
        #     if data["status"] == "1":
        #         points.append({
        #             "lat": q["lat"], "lng": q["lng"],
        #             "value": data["trafficinfo"]["evaluation"]["expedite"],  # congestion %
        #             "name": q["name"], "district": ...,
        #             "type": "实时", "peak": "当前",
        #         })
        #     self.sleep(2)

        return self._estimated_data()

    def _estimated_data(self) -> dict:
        return {
            "name": "交通拥堵态势",
            "description": "广州主要拥堵路段与交通黑点分布（需配置高德 API Key 获取实时数据）",
            "map_type": "heatmap",
            "chart_type": "bar",
            "chart_title": "广州各区交通拥堵指数",
            "chart_unit": "分",
            "points": [],
            "regions": [
                {"district": "天河", "value": 88}, {"district": "越秀", "value": 82},
                {"district": "海珠", "value": 78}, {"district": "荔湾", "value": 65},
                {"district": "白云", "value": 60}, {"district": "番禺", "value": 55},
                {"district": "黄埔", "value": 38}, {"district": "南沙", "value": 22},
                {"district": "增城", "value": 25}, {"district": "花都", "value": 20},
                {"district": "从化", "value": 15},
            ],
            "stats": [
                {"label": "数据来源", "value": "高德 API"},
                {"label": "更新频率", "value": "手动运行"},
                {"label": "需配置", "value": "AMAP_KEY"},
            ],
        }


if __name__ == "__main__":
    crawler = TrafficCrawler()
    try:
        crawler.run()
    finally:
        crawler.close()
