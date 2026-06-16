const intangible = {
  id: 'intangible',
  name: '非物质文化遗产',
  description: '广州国家级、省级非遗项目传承基地和文化空间分布',
  mapData: {
    type: 'scatter',
    points: [
      // 越秀区
      { lat: 23.1250, lng: 113.2700, value: 98, name: '粤剧艺术博物馆', district: '越秀', category: '人类非遗', type: '粤剧' },
      { lat: 23.1280, lng: 113.2670, value: 96, name: '广东音乐发源地', district: '越秀', category: '国家级非遗', type: '广东音乐' },
      { lat: 23.1270, lng: 113.2720, value: 90, name: '广彩传承基地', district: '越秀', category: '国家级非遗', type: '广彩瓷' },
      { lat: 23.1290, lng: 113.2650, value: 88, name: '广绣工作室', district: '越秀', category: '国家级非遗', type: '广绣' },
      { lat: 23.1240, lng: 113.2730, value: 85, name: '广州牙雕传承中心', district: '越秀', category: '国家级非遗', type: '象牙雕刻' },
      { lat: 23.1265, lng: 113.2690, value: 80, name: '岭南古琴艺术馆', district: '越秀', category: '国家级非遗', type: '古琴艺术' },
      { lat: 23.1220, lng: 113.2750, value: 78, name: '迎春花市（教育路）', district: '越秀', category: '省级非遗', type: '迎春花市' },
      // 荔湾区
      { lat: 23.1180, lng: 113.2400, value: 95, name: '广雕工艺街', district: '荔湾', category: '国家级非遗', type: '玉雕/木雕' },
      { lat: 23.1160, lng: 113.2380, value: 88, name: '西关打铜技艺传习所', district: '荔湾', category: '省级非遗', type: '打铜技艺' },
      { lat: 23.1200, lng: 113.2350, value: 82, name: '广式家具制作基地', district: '荔湾', category: '国家级非遗', type: '广式硬木家具' },
      { lat: 23.1150, lng: 113.2420, value: 78, name: '沙面·十三行遗韵', district: '荔湾', category: '历史记忆', type: '海上丝绸之路' },
      // 海珠区
      { lat: 23.1000, lng: 113.3200, value: 85, name: '广交会旧址（琶洲）', district: '海珠', category: '现代遗产', type: '商贸传统' },
      { lat: 23.0900, lng: 113.2850, value: 75, name: '龙舟文化传承基地', district: '海珠', category: '省级非遗', type: '扒龙舟' },
      // 天河区
      { lat: 23.1350, lng: 113.3450, value: 72, name: '天河乞巧文化节', district: '天河', category: '国家级非遗', type: '七夕乞巧' },
      // 番禺区
      { lat: 22.9350, lng: 113.3200, value: 92, name: '沙湾飘色传承基地', district: '番禺', category: '省级非遗', type: '飘色' },
      { lat: 22.9400, lng: 113.3700, value: 88, name: '广东音乐（沙湾）', district: '番禺', category: '国家级非遗', type: '广东音乐' },
      { lat: 22.9500, lng: 113.3400, value: 80, name: '沙坑醒狮', district: '番禺', category: '省级非遗', type: '醒狮' },
      // 黄埔区
      { lat: 23.0880, lng: 113.4600, value: 82, name: '波罗诞庙会', district: '黄埔', category: '国家级非遗', type: '民俗' },
      // 白云区
      { lat: 23.1600, lng: 113.2700, value: 70, name: '白云山重阳登高', district: '白云', category: '市级非遗', type: '民俗' },
      // 从化区
      { lat: 23.5500, lng: 113.5800, value: 65, name: '从化水族舞', district: '从化', category: '省级非遗', type: '民间舞蹈' },
    ],
    regions: [
      { district: '越秀', value: 25 },
      { district: '荔湾', value: 22 },
      { district: '海珠', value: 15 },
      { district: '番禺', value: 18 },
      { district: '黄埔', value: 10 },
      { district: '天河', value: 8 },
      { district: '白云', value: 6 },
      { district: '花都', value: 5 },
      { district: '从化', value: 5 },
      { district: '增城', value: 4 },
      { district: '南沙', value: 3 },
    ],
  },
  chartData: {
    type: 'bar',
    title: '广州各区非遗项目数量分布',
    xField: 'district',
    yField: 'value',
    unit: '项',
  },
  stats: [
    { label: '人类非遗', value: '2 项' },
    { label: '国家级非遗', value: '21 项' },
    { label: '省级非遗', value: '95 项' },
  ],
};

export default intangible;
