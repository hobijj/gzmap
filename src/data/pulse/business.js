const business = {
  id: 'business',
  name: '商圈活跃度',
  description: '广州主要商圈热力指数与商业体量分布',
  mapData: {
    type: 'scatter',
    points: [
      // 天河CBD核心
      { lat: 23.1255, lng: 113.3320, value: 98, name: '珠江新城商圈', district: '天河', type: 'CBD', scale: '超大型' },
      { lat: 23.1300, lng: 113.3450, value: 96, name: '体育中心商圈', district: '天河', type: '综合商业', scale: '超大型' },
      { lat: 23.1350, lng: 113.3200, value: 88, name: '天河北商圈', district: '天河', type: '商务办公', scale: '大型' },
      { lat: 23.1200, lng: 113.3550, value: 75, name: '车陂商圈', district: '天河', type: '社区商业', scale: '中型' },
      { lat: 23.1180, lng: 113.3400, value: 68, name: '员村红专厂', district: '天河', type: '文创园区', scale: '小型' },
      // 越秀
      { lat: 23.1280, lng: 113.2700, value: 90, name: '北京路商圈', district: '越秀', type: '步行街', scale: '超大型' },
      { lat: 23.1250, lng: 113.2600, value: 82, name: '淘金商圈', district: '越秀', type: '高端商业', scale: '大型' },
      { lat: 23.1190, lng: 113.2750, value: 78, name: '海珠广场商圈', district: '越秀', type: '批发零售', scale: '中型' },
      { lat: 23.1320, lng: 113.2800, value: 72, name: '东山口商圈', district: '越秀', type: '文艺商业', scale: '小型' },
      // 荔湾
      { lat: 23.1180, lng: 113.2400, value: 85, name: '上下九商圈', district: '荔湾', type: '步行街', scale: '大型' },
      { lat: 23.1150, lng: 113.2300, value: 65, name: '芳村商圈', district: '荔湾', type: '社区商业', scale: '中型' },
      // 海珠
      { lat: 23.1000, lng: 113.3200, value: 92, name: '琶洲商圈', district: '海珠', type: '会展+电商', scale: '超大型' },
      { lat: 23.0900, lng: 113.2900, value: 80, name: '江南西商圈', district: '海珠', type: '社区商业', scale: '大型' },
      { lat: 23.1050, lng: 113.3050, value: 75, name: '广州塔商圈', district: '海珠', type: '文旅商业', scale: '中型' },
      // 白云
      { lat: 23.1600, lng: 113.2700, value: 78, name: '白云新城商圈', district: '白云', type: '新区商业', scale: '大型' },
      { lat: 23.1680, lng: 113.2550, value: 65, name: '三元里商圈', district: '白云', type: '批发市场', scale: '中型' },
      // 番禺
      { lat: 22.9400, lng: 113.3500, value: 82, name: '万博商圈', district: '番禺', type: '新区商业', scale: '大型' },
      { lat: 22.9500, lng: 113.3200, value: 70, name: '市桥商圈', district: '番禺', type: '社区商业', scale: '中型' },
      // 黄埔
      { lat: 23.1100, lng: 113.4500, value: 72, name: '科学城商圈', district: '黄埔', type: '产城融合', scale: '中型' },
      // 南沙
      { lat: 22.7500, lng: 113.5800, value: 58, name: '南沙万达商圈', district: '南沙', type: '新区商业', scale: '中型' },
      // 增城
      { lat: 23.1300, lng: 113.6100, value: 55, name: '新塘商圈', district: '增城', type: '社区商业', scale: '中型' },
    ],
    regions: [
      { district: '天河', value: 95 },
      { district: '越秀', value: 88 },
      { district: '海珠', value: 82 },
      { district: '荔湾', value: 75 },
      { district: '白云', value: 68 },
      { district: '番禺', value: 65 },
      { district: '黄埔', value: 52 },
      { district: '南沙', value: 35 },
      { district: '增城', value: 32 },
      { district: '花都', value: 30 },
      { district: '从化', value: 22 },
    ],
  },
  chartData: {
    type: 'bar',
    title: '广州各区商圈活跃度指数',
    xField: 'district',
    yField: 'value',
    unit: '分',
  },
  stats: [
    { label: '超大型商圈', value: '5 个' },
    { label: '最大商圈', value: '天河CBD' },
    { label: '社消总额', value: '破万亿' },
  ],
};

export default business;
