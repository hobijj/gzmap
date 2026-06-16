const density = {
  id: 'density',
  name: '人口密度分布',
  description: '广州各区常住人口密度热力图与人口结构',
  mapData: {
    type: 'heatmap',
    points: [
      // 越秀区 - 密度最高
      { lat: 23.1280, lng: 113.2700, value: 34200, name: '北京街道', district: '越秀' },
      { lat: 23.1320, lng: 113.2800, value: 31500, name: '大东街道', district: '越秀' },
      { lat: 23.1250, lng: 113.2600, value: 29800, name: '华乐街道', district: '越秀' },
      { lat: 23.1190, lng: 113.2750, value: 32100, name: '人民街道', district: '越秀' },
      { lat: 23.1350, lng: 113.2750, value: 28500, name: '洪桥街道', district: '越秀' },
      // 天河区
      { lat: 23.1255, lng: 113.3320, value: 25200, name: '冼村街道', district: '天河' },
      { lat: 23.1300, lng: 113.3450, value: 23800, name: '天河南街道', district: '天河' },
      { lat: 23.1200, lng: 113.3600, value: 18500, name: '车陂街道', district: '天河' },
      { lat: 23.1350, lng: 113.3200, value: 22800, name: '林和街道', district: '天河' },
      { lat: 23.1180, lng: 113.3380, value: 19500, name: '员村街道', district: '天河' },
      // 海珠区
      { lat: 23.1000, lng: 113.3200, value: 15800, name: '琶洲街道', district: '海珠' },
      { lat: 23.0900, lng: 113.2900, value: 19500, name: '江南中街道', district: '海珠' },
      { lat: 23.1050, lng: 113.3400, value: 17200, name: '赤岗街道', district: '海珠' },
      { lat: 23.0950, lng: 113.2750, value: 18800, name: '沙园街道', district: '海珠' },
      { lat: 23.0780, lng: 113.3150, value: 12500, name: '南洲街道', district: '海珠' },
      // 荔湾区
      { lat: 23.1200, lng: 113.2400, value: 23200, name: '金花街道', district: '荔湾' },
      { lat: 23.1150, lng: 113.2300, value: 16800, name: '冲口街道', district: '荔湾' },
      { lat: 23.1180, lng: 113.2380, value: 21500, name: '逢源街道', district: '荔湾' },
      // 白云区
      { lat: 23.1600, lng: 113.2700, value: 12500, name: '景泰街道', district: '白云' },
      { lat: 23.1800, lng: 113.3000, value: 8500, name: '同和街道', district: '白云' },
      { lat: 23.2000, lng: 113.2600, value: 6800, name: '太和镇', district: '白云' },
      { lat: 23.1680, lng: 113.2550, value: 15200, name: '三元里街道', district: '白云' },
      // 番禺区
      { lat: 22.9400, lng: 113.3500, value: 11200, name: '南村镇', district: '番禺' },
      { lat: 22.9500, lng: 113.3200, value: 13500, name: '市桥街道', district: '番禺' },
      { lat: 22.9200, lng: 113.3800, value: 7200, name: '石楼镇', district: '番禺' },
      // 黄埔区
      { lat: 23.1100, lng: 113.4500, value: 8500, name: '联和街道', district: '黄埔' },
      { lat: 23.1050, lng: 113.4200, value: 12500, name: '黄埔街道', district: '黄埔' },
      { lat: 23.0900, lng: 113.4800, value: 4800, name: '九佛街道', district: '黄埔' },
      // 南沙区
      { lat: 22.7500, lng: 113.5800, value: 5500, name: '南沙街道', district: '南沙' },
      { lat: 22.7800, lng: 113.5500, value: 2800, name: '万顷沙镇', district: '南沙' },
      // 增城区
      { lat: 23.1300, lng: 113.6100, value: 6500, name: '新塘镇', district: '增城' },
      { lat: 23.2900, lng: 113.8300, value: 4200, name: '荔城街道', district: '增城' },
      // 花都区
      { lat: 23.4000, lng: 113.2100, value: 3800, name: '新华街道', district: '花都' },
      // 从化区
      { lat: 23.5500, lng: 113.5800, value: 1800, name: '街口街道', district: '从化' },
    ],
    regions: [
      { district: '越秀', value: 34200 },
      { district: '天河', value: 22800 },
      { district: '荔湾', value: 20500 },
      { district: '海珠', value: 17200 },
      { district: '白云', value: 10800 },
      { district: '番禺', value: 8500 },
      { district: '黄埔', value: 6200 },
      { district: '南沙', value: 3200 },
      { district: '增城', value: 2800 },
      { district: '花都', value: 2500 },
      { district: '从化', value: 1500 },
    ],
  },
  chartData: {
    type: 'bar',
    title: '广州各区人口密度（人/km²）',
    xField: 'district',
    yField: 'value',
    unit: '人/km²',
  },
  stats: [
    { label: '常住人口', value: '1,882 万' },
    { label: '人口密度最高', value: '越秀区 34,200' },
    { label: '全市密度', value: '2,530 人/km²' },
  ],
};

export default density;
