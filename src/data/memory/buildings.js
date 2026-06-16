const buildings = {
  id: 'buildings',
  name: '历史建筑地图',
  description: '广州各级文物保护单位与历史建筑分布，穿越两千年建城史',
  mapData: {
    type: 'scatter',
    points: [
      // 越秀区 - 历史核心
      { lat: 23.1280, lng: 113.2650, value: 100, name: '镇海楼（1380）', district: '越秀', category: '全国重点文保', era: '明代' },
      { lat: 23.1250, lng: 113.2680, value: 98, name: '光孝寺', district: '越秀', category: '全国重点文保', era: '东晋' },
      { lat: 23.1260, lng: 113.2700, value: 98, name: '六榕寺花塔', district: '越秀', category: '全国重点文保', era: '南朝' },
      { lat: 23.1300, lng: 113.2720, value: 96, name: '中山纪念堂（1931）', district: '越秀', category: '全国重点文保', era: '民国' },
      { lat: 23.1230, lng: 113.2740, value: 95, name: '石室圣心大教堂（1888）', district: '越秀', category: '全国重点文保', era: '清代' },
      { lat: 23.1290, lng: 113.2670, value: 92, name: '南越王墓博物馆', district: '越秀', category: '世界遗产预备', era: '西汉' },
      { lat: 23.1270, lng: 113.2630, value: 90, name: '五仙观', district: '越秀', category: '省级文保', era: '明代' },
      { lat: 23.1310, lng: 113.2700, value: 88, name: '农讲所旧址', district: '越秀', category: '全国重点文保', era: '清代/近代' },
      { lat: 23.1240, lng: 113.2710, value: 85, name: '北京路千年古道遗址', district: '越秀', category: '市级文保', era: '唐宋元明清' },
      { lat: 23.1190, lng: 113.2660, value: 83, name: '天字码头', district: '越秀', category: '历史地标', era: '清代至今' },
      // 荔湾区 - 西关
      { lat: 23.1180, lng: 113.2380, value: 93, name: '陈家祠（1893）', district: '荔湾', category: '全国重点文保', era: '清代' },
      { lat: 23.1150, lng: 113.2420, value: 88, name: '沙面建筑群', district: '荔湾', category: '全国重点文保', era: '清末民初' },
      { lat: 23.1200, lng: 113.2350, value: 85, name: '西关大屋保护区', district: '荔湾', category: '历史文化街区', era: '清末民初' },
      { lat: 23.1170, lng: 113.2400, value: 82, name: '八和会馆', district: '荔湾', category: '市级文保', era: '清代' },
      { lat: 23.1130, lng: 113.2380, value: 78, name: '粤海关旧址（1916）', district: '荔湾', category: '全国重点文保', era: '民国' },
      // 海珠区
      { lat: 23.1050, lng: 113.3000, value: 85, name: '中山大学旧址', district: '海珠', category: '省级文保', era: '民国' },
      { lat: 23.0880, lng: 113.2700, value: 80, name: '太古仓（1927）', district: '海珠', category: '市级文保', era: '民国' },
      { lat: 23.1020, lng: 113.3100, value: 78, name: '琶洲塔（1600）', district: '海珠', category: '省级文保', era: '明代' },
      // 天河区
      { lat: 23.1320, lng: 113.3300, value: 62, name: '石门禅院', district: '天河', category: '区级文保', era: '唐代' },
      // 番禺区
      { lat: 22.9350, lng: 113.3200, value: 90, name: '沙湾古镇', district: '番禺', category: '中国历史文化名镇', era: '明清' },
      { lat: 22.9400, lng: 113.3700, value: 85, name: '余荫山房（1871）', district: '番禺', category: '全国重点文保', era: '清代' },
      { lat: 22.9200, lng: 113.4000, value: 80, name: '宝墨园', district: '番禺', category: '省级文保', era: '清代重建' },
      // 黄埔区
      { lat: 23.0880, lng: 113.4600, value: 92, name: '黄埔军校旧址', district: '黄埔', category: '全国重点文保', era: '民国' },
      { lat: 23.0950, lng: 113.4700, value: 78, name: '南海神庙（594）', district: '黄埔', category: '全国重点文保', era: '隋代' },
      // 白云区
      { lat: 23.1650, lng: 113.2900, value: 75, name: '三元里抗英旧址', district: '白云', category: '全国重点文保', era: '清代' },
      // 南沙区
      { lat: 22.7600, lng: 113.6000, value: 72, name: '南沙天后宫', district: '南沙', category: '区级文保', era: '现代重建' },
      // 花都区
      { lat: 23.3800, lng: 113.2000, value: 70, name: '洪秀全故居', district: '花都', category: '全国重点文保', era: '清代' },
    ],
    regions: [
      { district: '越秀', value: 45 },
      { district: '荔湾', value: 38 },
      { district: '海珠', value: 22 },
      { district: '番禺', value: 25 },
      { district: '黄埔', value: 18 },
      { district: '天河', value: 10 },
      { district: '白云', value: 12 },
      { district: '花都', value: 10 },
      { district: '南沙', value: 5 },
      { district: '增城', value: 8 },
      { district: '从化', value: 5 },
    ],
  },
  chartData: {
    type: 'bar',
    title: '广州各区重点文物保护单位数量',
    xField: 'district',
    yField: 'value',
    unit: '处',
  },
  stats: [
    { label: '全国重点文保', value: '33 处' },
    { label: '省级文保', value: '48 处' },
    { label: '建城历史', value: '2200+ 年' },
  ],
};

export default buildings;
