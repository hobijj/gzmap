const metro = {
  id: 'metro',
  name: '地铁线路流量',
  description: '广州地铁各线路客流强度与主要站点日均客流量',
  mapData: {
    type: 'heatmap',
    points: [
      // 1号线
      { lat: 23.1280, lng: 113.2480, value: 85000, name: '西塱', district: '荔湾', line: '1号线' },
      { lat: 23.1200, lng: 113.2400, value: 92000, name: '陈家祠', district: '荔湾', line: '1号线' },
      { lat: 23.1280, lng: 113.2580, value: 128000, name: '公园前', district: '越秀', line: '1号线/2号线' },
      { lat: 23.1320, lng: 113.2750, value: 115000, name: '东山口', district: '越秀', line: '1号线/6号线' },
      { lat: 23.1350, lng: 113.3200, value: 155000, name: '体育西路', district: '天河', line: '1号线/3号线' },
      { lat: 23.1255, lng: 113.3320, value: 118000, name: '珠江新城', district: '天河', line: '3号线/5号线' },
      // 2号线
      { lat: 23.1600, lng: 113.2700, value: 72000, name: '白云公园', district: '白云', line: '2号线' },
      { lat: 23.1300, lng: 113.2650, value: 95000, name: '纪念堂', district: '越秀', line: '2号线' },
      { lat: 23.1190, lng: 113.2750, value: 105000, name: '海珠广场', district: '越秀', line: '2号线/6号线' },
      { lat: 23.0900, lng: 113.2900, value: 88000, name: '江南西', district: '海珠', line: '2号线' },
      { lat: 22.9500, lng: 113.3200, value: 65000, name: '市桥', district: '番禺', line: '3号线' },
      { lat: 23.1700, lng: 113.2500, value: 78000, name: '三元里', district: '白云', line: '2号线' },
      // 3号线（最繁忙线路）
      { lat: 23.1350, lng: 113.3450, value: 142000, name: '体育中心', district: '天河', line: '3号线' },
      { lat: 23.1200, lng: 113.3550, value: 96000, name: '车陂南', district: '天河', line: '3号线/4号线' },
      { lat: 22.9400, lng: 113.3200, value: 72000, name: '番禺广场', district: '番禺', line: '3号线' },
      { lat: 23.1300, lng: 113.3200, value: 138000, name: '林和西', district: '天河', line: '3号线' },
      { lat: 23.1250, lng: 113.3150, value: 125000, name: '广州东站', district: '天河', line: '1号线/3号线' },
      { lat: 23.1050, lng: 113.3400, value: 108000, name: '客村', district: '海珠', line: '3号线/8号线' },
      // 5号线
      { lat: 23.1250, lng: 113.3380, value: 112000, name: '猎德', district: '天河', line: '5号线' },
      { lat: 23.1180, lng: 113.3380, value: 98000, name: '员村', district: '天河', line: '5号线/21号线' },
      { lat: 23.1000, lng: 113.3200, value: 85000, name: '琶洲', district: '海珠', line: '8号线' },
      { lat: 23.1080, lng: 113.2600, value: 78000, name: '中山八', district: '荔湾', line: '5号线' },
      // 8号线
      { lat: 23.0950, lng: 113.2750, value: 82000, name: '沙园', district: '海珠', line: '8号线' },
      { lat: 23.0880, lng: 113.3000, value: 75000, name: '东晓南', district: '海珠', line: '2号线' },
      // 21号线
      { lat: 23.1100, lng: 113.4500, value: 45000, name: '科学城', district: '黄埔', line: '21号线' },
      // APM线
      { lat: 23.1200, lng: 113.3300, value: 68000, name: '大剧院', district: '天河', line: 'APM线' },
    ],
    regions: [
      { district: '天河', value: 185 },
      { district: '越秀', value: 162 },
      { district: '海珠', value: 128 },
      { district: '荔湾', value: 105 },
      { district: '白云', value: 88 },
      { district: '番禺', value: 72 },
      { district: '黄埔', value: 45 },
      { district: '南沙', value: 18 },
      { district: '增城', value: 22 },
      { district: '花都', value: 20 },
      { district: '从化', value: 15 },
    ],
  },
  chartData: {
    type: 'bar',
    title: '广州地铁日均客流量（万人次/区）',
    xField: 'district',
    yField: 'value',
    unit: '万人次',
  },
  stats: [
    { label: '运营线路', value: '16 条' },
    { label: '日均客流', value: '910 万人次' },
    { label: '最忙线路', value: '3号线' },
  ],
};

export default metro;
