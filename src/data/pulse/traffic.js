const traffic = {
  id: 'traffic',
  name: '交通拥堵态势',
  description: '广州主要拥堵路段与交通黑点实时态势分布',
  mapData: {
    type: 'heatmap',
    points: [
      // 天河堵点
      { lat: 23.1300, lng: 113.3450, value: 92, name: '天河路-体育东路口', district: '天河', type: '常发拥堵', peak: '早晚高峰' },
      { lat: 23.1255, lng: 113.3320, value: 88, name: '花城大道-华夏路口', district: '天河', type: '常发拥堵', peak: '晚高峰' },
      { lat: 23.1200, lng: 113.3550, value: 85, name: '中山大道-车陂路口', district: '天河', type: '常发拥堵', peak: '早晚高峰' },
      { lat: 23.1350, lng: 113.3180, value: 82, name: '广州大道中', district: '天河', type: '常发拥堵', peak: '全天' },
      { lat: 23.1180, lng: 113.3380, value: 75, name: '黄埔大道-员村段', district: '天河', type: '常发拥堵', peak: '早晚高峰' },
      // 越秀堵点
      { lat: 23.1280, lng: 113.2700, value: 78, name: '北京路-中山五路口', district: '越秀', type: '常发拥堵', peak: '周末/节假日' },
      { lat: 23.1250, lng: 113.2580, value: 80, name: '环市东路-小北段', district: '越秀', type: '常发拥堵', peak: '早晚高峰' },
      { lat: 23.1320, lng: 113.2750, value: 72, name: '东风东路-东濠涌', district: '越秀', type: '常发拥堵', peak: '早晚高峰' },
      // 海珠堵点
      { lat: 23.1050, lng: 113.3400, value: 82, name: '新港东路-赤岗段', district: '海珠', type: '常发拥堵', peak: '早晚高峰' },
      { lat: 23.1000, lng: 113.3200, value: 75, name: '琶洲大桥南', district: '海珠', type: '常发拥堵', peak: '早晚高峰' },
      { lat: 23.0880, lng: 113.3100, value: 78, name: '广州大道南', district: '海珠', type: '常发拥堵', peak: '全天' },
      // 荔湾堵点
      { lat: 23.1200, lng: 113.2400, value: 65, name: '中山八路-黄沙大道', district: '荔湾', type: '常发拥堵', peak: '早晚高峰' },
      // 白云堵点
      { lat: 23.1650, lng: 113.2700, value: 68, name: '白云大道', district: '白云', type: '常发拥堵', peak: '早晚高峰' },
      { lat: 23.1600, lng: 113.2580, value: 62, name: '机场路', district: '白云', type: '偶发拥堵', peak: '节假日' },
      // 番禺堵点
      { lat: 22.9400, lng: 113.3500, value: 65, name: '番禺大道-万博段', district: '番禺', type: '常发拥堵', peak: '晚高峰' },
      { lat: 22.9500, lng: 113.3200, value: 58, name: '市桥大桥', district: '番禺', type: '偶发拥堵', peak: '早晚高峰' },
      // 跨江桥梁
      { lat: 23.1150, lng: 113.2680, value: 90, name: '海珠桥', district: '越秀/海珠', type: '常发拥堵', peak: '早晚高峰' },
      { lat: 23.1180, lng: 113.2580, value: 85, name: '人民桥', district: '荔湾/海珠', type: '常发拥堵', peak: '早晚高峰' },
      { lat: 23.1100, lng: 113.3100, value: 88, name: '猎德大桥', district: '天河/海珠', type: '常发拥堵', peak: '早晚高峰' },
      { lat: 23.1080, lng: 113.2700, value: 82, name: '鹤洞大桥', district: '荔湾/海珠', type: '常发拥堵', peak: '早晚高峰' },
      // 黄埔
      { lat: 23.1050, lng: 113.4200, value: 55, name: '黄埔东路', district: '黄埔', type: '偶发拥堵', peak: '晚高峰' },
      // 南沙
      { lat: 22.7500, lng: 113.5800, value: 35, name: '进港大道', district: '南沙', type: '偶发拥堵', peak: '早晚高峰' },
    ],
    regions: [
      { district: '天河', value: 88 },
      { district: '越秀', value: 82 },
      { district: '海珠', value: 78 },
      { district: '荔湾', value: 65 },
      { district: '白云', value: 60 },
      { district: '番禺', value: 55 },
      { district: '黄埔', value: 38 },
      { district: '南沙', value: 22 },
      { district: '增城', value: 25 },
      { district: '花都', value: 20 },
      { district: '从化', value: 15 },
    ],
  },
  chartData: {
    type: 'bar',
    title: '广州各区交通拥堵指数',
    xField: 'district',
    yField: 'value',
    unit: '分',
  },
  stats: [
    { label: '常发拥堵点', value: '22 处' },
    { label: '最堵区域', value: '天河区' },
    { label: '高峰延时', value: '1.8×' },
  ],
};

export default traffic;
