"""Crawler: 广州房价数据.

链家/贝壳为 JS 渲染页面，需要用 Selenium 来抓。
安装: pip install selenium
还需下载 ChromeDriver: https://chromedriver.chromium.org/

无 Selenium 时使用手动维护的参考数据。

Usage: python -m app.crawlers.housing
"""

from .base import BaseCrawler


class HousingCrawler(BaseCrawler):
    data_item_id = "housing"
    module = "life"

    LIANJIA_DISTRICTS = [
        "tianhe", "yuexiu", "haizhu", "liwan", "baiyun",
        "panyu", "huangpu", "nansha", "zengcheng", "huadu", "conghua",
    ]
    DISTRICT_CN = {
        "tianhe": "天河", "yuexiu": "越秀", "haizhu": "海珠", "liwan": "荔湾",
        "baiyun": "白云", "panyu": "番禺", "huangpu": "黄埔", "nansha": "南沙",
        "zengcheng": "增城", "huadu": "花都", "conghua": "从化",
    }

    def crawl(self) -> dict:
        # Try Selenium first, fall back to manual data
        try:
            from selenium import webdriver
            from selenium.webdriver.chrome.options import Options
            return self._selenium_crawl(webdriver, Options)
        except ImportError:
            print("Selenium not installed. Using reference data.")
            print("For live data: pip install selenium + ChromeDriver")
            return self._reference_data()
        except Exception as e:
            print(f"Selenium crawl failed: {e}")
            print("Falling back to reference data.")
            return self._reference_data()

    def _selenium_crawl(self, webdriver, Options) -> dict:
        """Use Selenium to render 链家 JS pages and extract avg prices."""
        opts = Options()
        opts.add_argument("--headless")
        opts.add_argument("--no-sandbox")
        opts.add_argument("--disable-dev-shm-usage")

        driver = webdriver.Chrome(options=opts)
        regions = []

        try:
            for dist in self.LIANJIA_DISTRICTS:
                url = f"https://gz.lianjia.com/ershoufang/{dist}/"
                driver.get(url)
                self.sleep(3)

                try:
                    # Try to find the average price element
                    elem = driver.find_element("css selector", ".average")
                    text = elem.text
                    # Parse "参考均价 63,210 元/㎡"
                    import re
                    match = re.search(r'(\d[\d,]*)', text)
                    if match:
                        price = int(match.group(1).replace(",", ""))
                        cn_name = self.DISTRICT_CN.get(dist, dist)
                        regions.append({"district": cn_name, "value": price})
                        print(f"  {cn_name}: {price:,} 元/㎡")
                except Exception as e:
                    print(f"  {dist}: parse failed - {e}")

            driver.quit()
        except Exception:
            driver.quit()
            raise

        if not regions:
            return self._reference_data()

        total = sum(r["value"] for r in regions)
        avg = total // len(regions)
        highest = max(regions, key=lambda r: r["value"])
        return {
            "name": "房价热力图",
            "description": f"广州各区二手房均价（链家实时数据），全市均价 {avg:,} 元/㎡",
            "map_type": "heatmap",
            "chart_type": "bar",
            "chart_title": "广州各区二手房均价排行",
            "chart_unit": "元/㎡",
            "points": [],
            "regions": regions,
            "stats": [
                {"label": "全市均价", "value": f"{avg:,} 元/㎡"},
                {"label": "最高区域", "value": f"{highest['district']} {highest['value']:,}"},
                {"label": "数据来源", "value": "链家"},
            ],
        }

    def _reference_data(self) -> dict:
        """Reference prices — manually updated from market reports.
        Source: 链家/贝壳月度市场报告, https://gz.lianjia.com/
        Last updated: 2026-06
        """
        prices = {
            "天河": 63100, "越秀": 58100, "海珠": 50100, "荔湾": 41500,
            "白云": 31500, "番禺": 34200, "黄埔": 29700, "南沙": 23200,
            "增城": 18200, "花都": 18200, "从化": 14500,
        }
        avg = sum(prices.values()) // 11

        return {
            "name": "房价热力图",
            "description": f"广州各区二手房均价（参考数据，全市均价约 {avg:,} 元/㎡）",
            "map_type": "heatmap",
            "chart_type": "bar",
            "chart_title": "广州各区二手房均价排行",
            "chart_unit": "元/㎡",
            "points": [],
            "regions": [{"district": d, "value": v} for d, v in prices.items()],
            "stats": [
                {"label": "全市均价", "value": f"{avg:,} 元/㎡"},
                {"label": "最高区域", "value": f"天河 {prices['天河']:,}"},
                {"label": "数据来源", "value": "链家参考数据"},
            ],
        }


if __name__ == "__main__":
    crawler = HousingCrawler()
    try:
        crawler.run()
    finally:
        crawler.close()
