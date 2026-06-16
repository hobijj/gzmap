const oldBrands = {
  id: 'oldBrands',
  name: '广州老字号地图',
  description: '广州百年老店、中华老字号与驰名品牌分布',
  mapData: {
    type: 'scatter',
    points: [
      // 越秀区 - 老字号最集中
      { lat: 23.1250, lng: 113.2700, value: 98, name: '广州酒家（1935）', district: '越秀', category: '餐饮', history: '1935年创办' },
      { lat: 23.1280, lng: 113.2680, value: 96, name: '莲香楼（1889）', district: '越秀', category: '饼业', history: '1889年创办' },
      { lat: 23.1260, lng: 113.2720, value: 95, name: '陶陶居（1880）', district: '越秀', category: '茶楼', history: '1880年创办' },
      { lat: 23.1300, lng: 113.2650, value: 90, name: '致美斋（1608）', district: '越秀', category: '酱料', history: '1608年创办' },
      { lat: 23.1240, lng: 113.2680, value: 88, name: '陈李济（1600）', district: '越秀', category: '中医药', history: '1600年创办' },
      { lat: 23.1270, lng: 113.2750, value: 85, name: '泮溪酒家（1947）', district: '越秀', category: '餐饮', history: '1947年创办' },
      { lat: 23.1290, lng: 113.2630, value: 82, name: '王老吉（1828）', district: '越秀', category: '凉茶', history: '1828年创办' },
      { lat: 23.1220, lng: 113.2730, value: 80, name: '皇上皇（1940）', district: '越秀', category: '腊味', history: '1940年创办' },
      { lat: 23.1265, lng: 113.2660, value: 78, name: '宝生园（1924）', district: '越秀', category: '蜂蜜', history: '1924年创办' },
      // 荔湾区
      { lat: 23.1180, lng: 113.2400, value: 92, name: '莲香楼(第十甫)', district: '荔湾', category: '饼业', history: '1889年创办' },
      { lat: 23.1160, lng: 113.2380, value: 89, name: '南信牛奶甜品（1934）', district: '荔湾', category: '甜品', history: '1934年创办' },
      { lat: 23.1170, lng: 113.2420, value: 86, name: '顺记冰室（1930s）', district: '荔湾', category: '冰室', history: '1930年代创办' },
      { lat: 23.1190, lng: 113.2360, value: 83, name: '趣香饼家（1938）', district: '荔湾', category: '饼业', history: '1938年创办' },
      { lat: 23.1140, lng: 113.2400, value: 75, name: '何济公（1938）', district: '荔湾', category: '制药', history: '1938年创办' },
      // 海珠区
      { lat: 23.0950, lng: 113.2900, value: 72, name: '海珠涌边老茶楼群', district: '海珠', category: '茶楼', history: '清末民初' },
      { lat: 23.0880, lng: 113.2750, value: 68, name: '成珠楼（1746）', district: '海珠', category: '茶楼', history: '1746年创办' },
      // 天河区
      { lat: 23.1250, lng: 113.3350, value: 60, name: '广州酒家(体育东)', district: '天河', category: '餐饮', history: '分店' },
      // 番禺区
      { lat: 22.9400, lng: 113.3500, value: 55, name: '沙湾古镇美食群', district: '番禺', category: '传统小吃', history: '明清至今' },
    ],
    regions: [
      { district: '越秀', value: 32 },
      { district: '荔湾', value: 28 },
      { district: '海珠', value: 15 },
      { district: '天河', value: 8 },
      { district: '番禺', value: 12 },
      { district: '黄埔', value: 5 },
      { district: '白云', value: 6 },
      { district: '南沙', value: 2 },
      { district: '增城', value: 3 },
      { district: '花都', value: 3 },
      { district: '从化', value: 2 },
    ],
  },
  chartData: {
    type: 'bar',
    title: '广州各区老字号数量分布',
    xField: 'district',
    yField: 'value',
    unit: '家',
  },
  stats: [
    { label: '中华老字号', value: '约 38 家' },
    { label: '百年老店', value: '17 家' },
    { label: '最老字号', value: '陈李济 1600年' },
  ],
};

export default oldBrands;
