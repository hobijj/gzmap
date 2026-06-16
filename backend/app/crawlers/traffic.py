"""Crawler: 广州交通拥堵态势数据.

Data source: 高德交通态势 API (circle query).
API Key: set via env var AMAP_KEY or passed directly.

Usage: python -m app.crawlers.traffic
"""

import os
from .base import BaseCrawler


AMAP_KEY = os.getenv("AMAP_KEY", "")

# 广州各区中心 + 商圈拥堵检测点
QUERIES = [
    {"name": "天河CBD", "lat": 23.125, "lng": 113.330, "radius": 3000, "district": "天河"},
    {"name": "体育中心", "lat": 23.130, "lng": 113.345, "radius": 2500, "district": "天河"},
    {"name": "广州大道中", "lat": 23.135, "lng": 113.318, "radius": 2000, "district": "天河"},
    {"name": "北京路", "lat": 23.128, "lng": 113.270, "radius": 2500, "district": "越秀"},
    {"name": "环市东路", "lat": 23.125, "lng": 113.258, "radius": 2000, "district": "越秀"},
    {"name": "海珠广场", "lat": 23.119, "lng": 113.275, "radius": 2500, "district": "越秀"},
    {"name": "琶洲", "lat": 23.100, "lng": 113.320, "radius": 3000, "district": "海珠"},
    {"name": "江南西", "lat": 23.090, "lng": 113.290, "radius": 2000, "district": "海珠"},
    {"name": "中山八", "lat": 23.124, "lng": 113.234, "radius": 2500, "district": "荔湾"},
    {"name": "上下九", "lat": 23.118, "lng": 113.240, "radius": 2000, "district": "荔湾"},
    {"name": "白云大道", "lat": 23.165, "lng": 113.270, "radius": 3000, "district": "白云"},
    {"name": "三元里", "lat": 23.160, "lng": 113.258, "radius": 2000, "district": "白云"},
    {"name": "万博商圈", "lat": 22.940, "lng": 113.350, "radius": 3000, "district": "番禺"},
    {"name": "市桥", "lat": 22.950, "lng": 113.320, "radius": 2500, "district": "番禺"},
    {"name": "科学城", "lat": 23.110, "lng": 113.450, "radius": 3000, "district": "黄埔"},
    {"name": "大沙地", "lat": 23.100, "lng": 113.446, "radius": 2500, "district": "黄埔"},
    {"name": "南沙万达", "lat": 22.750, "lng": 113.580, "radius": 3000, "district": "南沙"},
    {"name": "新塘", "lat": 23.130, "lng": 113.610, "radius": 3000, "district": "增城"},
    {"name": "新华", "lat": 23.400, "lng": 113.210, "radius": 3000, "district": "花都"},
    {"name": "街口", "lat": 23.550, "lng": 113.580, "radius": 3000, "district": "从化"},
]


class TrafficCrawler(BaseCrawler):
    data_item_id = "traffic"
    module = "pulse"

    def crawl(self) -> dict:
        key = AMAP_KEY
        if not key:
            print("Warning: AMAP_KEY not set. Using estimated data.")
            return self._estimated_data()

        print(f"Using AMAP_KEY: {key[:8]}...")
        points = []
        district_scores = {}

        for q in QUERIES:
            params = {
                "location": f"{q['lng']},{q['lat']}",
                "radius": q["radius"],
                "key": key,
                "extensions": "all",
            }
            try:
                resp = self.session.get(
                    "https://restapi.amap.com/v3/traffic/status/circle",
                    params=params,
                    timeout=10
                )
                data = resp.json()
                if data.get("status") == "1":
                    eval_info = data.get("trafficinfo", {}).get("evaluation", {})
                    # expedite: 畅通率 like '66.12%', strip the %
                    expedite_str = str(eval_info.get("expedite", "50%")).replace("%", "")
                    expedite = float(expedite_str)
                    congestion = 100 - expedite  # Convert to congestion index

                    desc = eval_info.get("description", "")
                    print(f"  {q['name']}: 拥堵指数 {congestion:.0f} ({desc})")

                    points.append({
                        "lat": q["lat"],
                        "lng": q["lng"],
                        "value": congestion,
                        "name": q["name"],
                        "district": q["district"],
                        "type": "实时",
                        "peak": "当前",
                    })

                    # Aggregate by district
                    d = q["district"]
                    if d not in district_scores:
                        district_scores[d] = []
                    district_scores[d].append(congestion)
                else:
                    print(f"  {q['name']}: API error - {data.get('info', 'unknown')}")
            except Exception as e:
                print(f"  {q['name']}: Request failed - {e}")

            self.sleep(0.5)  # Rate limit

        # Compute district averages
        regions = []
        for d in ["天河", "越秀", "海珠", "荔湾", "白云", "番禺", "黄埔", "南沙", "增城", "花都", "从化"]:
            scores = district_scores.get(d, [30])  # Default if no data
            regions.append({
                "district": d,
                "value": round(sum(scores) / len(scores), 1),
            })

        highest = max(points, key=lambda p: p["value"]) if points else {"name": "-", "district": "-"}

        return {
            "name": "交通拥堵态势",
            "description": f"广州主要路段实时交通拥堵指数（高德数据），最堵：{highest['name']}",
            "map_type": "heatmap",
            "chart_type": "bar",
            "chart_title": "广州各区实时交通拥堵指数",
            "chart_unit": "分",
            "points": points,
            "regions": regions,
            "stats": [
                {"label": "检测点", "value": f"{len(points)} 个"},
                {"label": "最堵区域", "value": f"{highest['district']} {highest['name']}"},
                {"label": "数据来源", "value": "高德 API 实时"},
            ],
        }

    def _estimated_data(self) -> dict:
        return {
            "name": "交通拥堵态势",
            "description": "广州主要拥堵路段与交通黑点分布（估算数据）",
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
                {"label": "数据来源", "value": "估算"},
                {"label": "提示", "value": "export AMAP_KEY=..."},
                {"label": "更新频率", "value": "手动"},
            ],
        }


if __name__ == "__main__":
    crawler = TrafficCrawler()
    try:
        crawler.run()
    finally:
        crawler.close()
