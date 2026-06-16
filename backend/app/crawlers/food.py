"""Crawler: 广州美食 POI 数据.

Data source: 高德地图 POI 搜索 API.
API Key: set via env var AMAP_KEY or passed directly.

Usage: python -m app.crawlers.food
"""

import os
from .base import BaseCrawler


AMAP_KEY = os.getenv("AMAP_KEY", "")

# 各区商圈中心坐标 + 搜索半径（覆盖主要餐饮聚集区）
DISTRICT_QUERIES = [
    {"name": "体育西路", "lat": 23.131, "lng": 113.321, "radius": 3000, "district": "天河"},
    {"name": "珠江新城", "lat": 23.120, "lng": 113.323, "radius": 3000, "district": "天河"},
    {"name": "北京路", "lat": 23.128, "lng": 113.270, "radius": 2500, "district": "越秀"},
    {"name": "淘金", "lat": 23.125, "lng": 113.260, "radius": 2000, "district": "越秀"},
    {"name": "江南西", "lat": 23.090, "lng": 113.290, "radius": 2500, "district": "海珠"},
    {"name": "客村", "lat": 23.100, "lng": 113.321, "radius": 2500, "district": "海珠"},
    {"name": "上下九", "lat": 23.118, "lng": 113.240, "radius": 2500, "district": "荔湾"},
    {"name": "芳村", "lat": 23.098, "lng": 113.236, "radius": 2500, "district": "荔湾"},
    {"name": "白云万达", "lat": 23.165, "lng": 113.260, "radius": 3000, "district": "白云"},
    {"name": "远景路", "lat": 23.175, "lng": 113.280, "radius": 2000, "district": "白云"},
    {"name": "万博商圈", "lat": 22.940, "lng": 113.350, "radius": 3000, "district": "番禺"},
    {"name": "市桥", "lat": 22.950, "lng": 113.326, "radius": 2500, "district": "番禺"},
    {"name": "科学城", "lat": 23.110, "lng": 113.450, "radius": 3000, "district": "黄埔"},
    {"name": "大沙地", "lat": 23.100, "lng": 113.446, "radius": 2500, "district": "黄埔"},
    {"name": "南沙万达", "lat": 22.750, "lng": 113.580, "radius": 3000, "district": "南沙"},
    {"name": "新塘", "lat": 23.130, "lng": 113.610, "radius": 3000, "district": "增城"},
    {"name": "新华", "lat": 23.400, "lng": 113.210, "radius": 3000, "district": "花都"},
    {"name": "街口", "lat": 23.550, "lng": 113.580, "radius": 3000, "district": "从化"},
]

# 美食相关 POI 小类（050000 = 餐饮大类）
FOOD_TYPES = "050000"


class FoodCrawler(BaseCrawler):
    data_item_id = "food"
    module = "life"

    def crawl(self) -> dict:
        key = AMAP_KEY
        if not key:
            print("Warning: AMAP_KEY not set. Using estimated data.")
            return self._estimated_data()

        print(f"Using AMAP_KEY: {key[:8]}...")
        regions = []
        points = []
        seen_names = set()

        for q in DISTRICT_QUERIES:
            district = q["district"]
            params = {
                "location": f"{q['lng']},{q['lat']}",
                "radius": q["radius"],
                "types": FOOD_TYPES,  # 050000 = 餐饮大类
                "key": key,
                "offset": 25,   # Max per page
                "page": 1,
                "extensions": "base",
            }
            try:
                resp = self.session.get(
                    "https://restapi.amap.com/v3/place/around",
                    params=params,
                    timeout=10
                )
                data = resp.json()
                if data.get("status") == "1":
                    count = int(data.get("count", 0))
                    print(f"  {q['name']} ({district}): {count} 家餐饮 (半径{q['radius']}m)")

                    for poi in data.get("pois", []):
                        name = poi["name"]
                        if name not in seen_names:
                            seen_names.add(name)
                            loc = poi["location"].split(",")
                            # biz_ext can be dict or list
                            biz = poi.get("biz_ext", {})
                            if isinstance(biz, list):
                                biz = {}
                            rating_str = biz.get("rating", "0") if isinstance(biz, dict) else "0"
                            try:
                                rating = float(rating_str) * 20  # Scale 0-5 → 0-100
                            except (ValueError, TypeError):
                                rating = 50
                            points.append({
                                "lat": float(loc[1]),
                                "lng": float(loc[0]),
                                "value": rating,
                                "name": name[:15],
                                "district": district,
                                "category": poi.get("type", "").split(";")[-1][:8] if poi.get("type") else "餐饮",
                            })
                else:
                    print(f"  {q['name']}: API error - {data.get('info')}")
            except Exception as e:
                print(f"  {q['name']}: Request failed - {e}")

            self.sleep(0.3)  # ~3 req/s

        # Aggregate by district
        district_counts = {}
        for d_name in ["天河", "越秀", "海珠", "荔湾", "白云", "番禺", "黄埔", "南沙", "增城", "花都", "从化"]:
            district_counts[d_name] = 0

        for p in points:
            d = p["district"]
            if d in district_counts:
                district_counts[d] += 1

        regions = [{"district": d, "value": c} for d, c in district_counts.items()]
        total = len(points)

        return {
            "name": "美食密度分布",
            "description": f"广州各区餐饮店铺分布（高德POI数据，采样 {total} 家）",
            "map_type": "scatter",
            "chart_type": "bar",
            "chart_title": "广州各区餐饮采样数量",
            "chart_unit": "家",
            "points": points,
            "regions": regions,
            "stats": [
                {"label": "采样餐厅", "value": f"{total} 家"},
                {"label": "最多区域", "value": max(regions, key=lambda r: r["value"])["district"] if regions else "-"},
                {"label": "数据来源", "value": "高德 POI"},
            ],
        }

    def _estimated_data(self) -> dict:
        return {
            "name": "美食密度分布",
            "description": "广州各区餐饮店铺密度（估算数据）",
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
                {"label": "数据来源", "value": "估算"},
                {"label": "提示", "value": "export AMAP_KEY=..."},
            ],
        }


if __name__ == "__main__":
    crawler = FoodCrawler()
    try:
        crawler.run()
    finally:
        crawler.close()
