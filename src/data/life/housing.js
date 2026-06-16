const housing = {
  id: 'housing',
  name: '房价热力图',
  description: '广州各片区二手房均价分布，覆盖 11 区 60+ 板块',
  mapData: {
    type: 'heatmap',
    points: [
      // ===== 天河区 =====
      { lat: 23.1255, lng: 113.3320, value: 68210, name: '珠江新城', district: '天河' },
      { lat: 23.1300, lng: 113.3450, value: 65100, name: '体育中心', district: '天河' },
      { lat: 23.1200, lng: 113.3600, value: 58900, name: '东圃', district: '天河' },
      { lat: 23.1350, lng: 113.3200, value: 62300, name: '天河北', district: '天河' },
      { lat: 23.1280, lng: 113.3550, value: 57200, name: '车陂', district: '天河' },
      { lat: 23.1180, lng: 113.3380, value: 59800, name: '员村', district: '天河' },
      { lat: 23.1400, lng: 113.3300, value: 54800, name: '龙洞', district: '天河' },
      { lat: 23.1220, lng: 113.3700, value: 49500, name: '棠下', district: '天河' },
      { lat: 23.1330, lng: 113.3100, value: 61500, name: '五山', district: '天河' },
      { lat: 23.1150, lng: 113.3450, value: 56200, name: '黄村', district: '天河' },
      { lat: 23.1250, lng: 113.3380, value: 64200, name: '猎德', district: '天河' },

      // ===== 越秀区 =====
      { lat: 23.1280, lng: 113.2700, value: 61200, name: '北京路', district: '越秀' },
      { lat: 23.1320, lng: 113.2800, value: 58900, name: '东山口', district: '越秀' },
      { lat: 23.1250, lng: 113.2600, value: 54300, name: '淘金', district: '越秀' },
      { lat: 23.1190, lng: 113.2750, value: 52100, name: '海珠广场', district: '越秀' },
      { lat: 23.1350, lng: 113.2750, value: 56800, name: '小北', district: '越秀' },
      { lat: 23.1300, lng: 113.2650, value: 59800, name: '公园前', district: '越秀' },
      { lat: 23.1260, lng: 113.2850, value: 57500, name: '东湖', district: '越秀' },
      { lat: 23.1360, lng: 113.2700, value: 53500, name: '建设六马路', district: '越秀' },

      // ===== 海珠区 =====
      { lat: 23.1000, lng: 113.3200, value: 52100, name: '琶洲', district: '海珠' },
      { lat: 23.0900, lng: 113.2900, value: 47800, name: '江南西', district: '海珠' },
      { lat: 23.1050, lng: 113.3400, value: 50300, name: '赤岗', district: '海珠' },
      { lat: 23.0950, lng: 113.2750, value: 46200, name: '沙园', district: '海珠' },
      { lat: 23.0850, lng: 113.3000, value: 45100, name: '东晓南', district: '海珠' },
      { lat: 23.1080, lng: 113.3100, value: 48800, name: '客村', district: '海珠' },
      { lat: 23.0780, lng: 113.3150, value: 43500, name: '沥滘', district: '海珠' },
      { lat: 23.0980, lng: 113.3500, value: 51200, name: '琶洲东', district: '海珠' },

      // ===== 荔湾区 =====
      { lat: 23.1200, lng: 113.2400, value: 43200, name: '陈家祠', district: '荔湾' },
      { lat: 23.1150, lng: 113.2300, value: 39800, name: '芳村', district: '荔湾' },
      { lat: 23.1180, lng: 113.2380, value: 41500, name: '长寿路', district: '荔湾' },
      { lat: 23.1220, lng: 113.2350, value: 45600, name: '中山八', district: '荔湾' },
      { lat: 23.1080, lng: 113.2250, value: 38500, name: '鹤洞', district: '荔湾' },
      { lat: 23.1120, lng: 113.2400, value: 37200, name: '花地湾', district: '荔湾' },

      // ===== 白云区 =====
      { lat: 23.1600, lng: 113.2700, value: 35600, name: '白云新城', district: '白云' },
      { lat: 23.1800, lng: 113.3000, value: 31200, name: '同和', district: '白云' },
      { lat: 23.2000, lng: 113.2600, value: 27800, name: '太和', district: '白云' },
      { lat: 23.1680, lng: 113.2550, value: 33800, name: '三元里', district: '白云' },
      { lat: 23.1900, lng: 113.2400, value: 29500, name: '石井', district: '白云' },
      { lat: 23.2100, lng: 113.2800, value: 26800, name: '嘉禾', district: '白云' },
      { lat: 23.1550, lng: 113.2850, value: 34500, name: '京溪', district: '白云' },
      { lat: 23.1750, lng: 113.2300, value: 28200, name: '江高', district: '白云' },

      // ===== 番禺区 =====
      { lat: 22.9400, lng: 113.3500, value: 38500, name: '万博', district: '番禺' },
      { lat: 22.9500, lng: 113.3200, value: 34200, name: '市桥', district: '番禺' },
      { lat: 22.9200, lng: 113.3800, value: 29800, name: '亚运城', district: '番禺' },
      { lat: 22.9600, lng: 113.3400, value: 36500, name: '大石', district: '番禺' },
      { lat: 22.9300, lng: 113.3100, value: 32500, name: '钟村', district: '番禺' },
      { lat: 22.9700, lng: 113.3700, value: 35800, name: '南村', district: '番禺' },
      { lat: 22.9000, lng: 113.3500, value: 27200, name: '石楼', district: '番禺' },
      { lat: 22.9150, lng: 113.4000, value: 31200, name: '石碁', district: '番禺' },

      // ===== 黄埔区 =====
      { lat: 23.1100, lng: 113.4500, value: 32500, name: '科学城', district: '黄埔' },
      { lat: 23.0900, lng: 113.4800, value: 26800, name: '知识城', district: '黄埔' },
      { lat: 23.1050, lng: 113.4200, value: 31200, name: '大沙地', district: '黄埔' },
      { lat: 23.1250, lng: 113.4600, value: 29500, name: '长岭居', district: '黄埔' },
      { lat: 23.1150, lng: 113.5000, value: 25500, name: '镇龙', district: '黄埔' },
      { lat: 23.1000, lng: 113.4400, value: 30800, name: '萝岗', district: '黄埔' },

      // ===== 南沙区 =====
      { lat: 22.7500, lng: 113.5800, value: 24500, name: '金洲', district: '南沙' },
      { lat: 22.7800, lng: 113.5500, value: 21800, name: '万顷沙', district: '南沙' },
      { lat: 22.8000, lng: 113.5600, value: 23200, name: '黄阁', district: '南沙' },
      { lat: 22.7200, lng: 113.5900, value: 22800, name: '南沙湾', district: '南沙' },
      { lat: 22.7600, lng: 113.5300, value: 20800, name: '横沥', district: '南沙' },

      // ===== 增城区 =====
      { lat: 23.1300, lng: 113.6100, value: 19800, name: '新塘', district: '增城' },
      { lat: 23.2900, lng: 113.8300, value: 16500, name: '荔城', district: '增城' },
      { lat: 23.1800, lng: 113.6800, value: 18200, name: '永和', district: '增城' },
      { lat: 23.2400, lng: 113.7200, value: 17200, name: '朱村', district: '增城' },

      // ===== 花都区 =====
      { lat: 23.4000, lng: 113.2100, value: 18200, name: '新华', district: '花都' },
      { lat: 23.3800, lng: 113.1800, value: 16800, name: '狮岭', district: '花都' },
      { lat: 23.4200, lng: 113.2400, value: 17500, name: '花山', district: '花都' },

      // ===== 从化区 =====
      { lat: 23.5500, lng: 113.5800, value: 14500, name: '街口', district: '从化' },
      { lat: 23.5200, lng: 113.6200, value: 13200, name: '太平', district: '从化' },
      { lat: 23.5800, lng: 113.5500, value: 12800, name: '温泉', district: '从化' },
    ],
    regions: [
      { district: '天河', value: 63100 },
      { district: '越秀', value: 58100 },
      { district: '海珠', value: 50100 },
      { district: '荔湾', value: 41500 },
      { district: '白云', value: 31500 },
      { district: '番禺', value: 34200 },
      { district: '黄埔', value: 29700 },
      { district: '南沙', value: 23200 },
      { district: '增城', value: 18200 },
      { district: '花都', value: 18200 },
      { district: '从化', value: 14500 },
    ],
  },
  chartData: {
    type: 'bar',
    title: '广州各区二手房均价排行',
    xField: 'district',
    yField: 'value',
    unit: '元/㎡',
  },
  stats: [
    { label: '全市均价', value: '35,200 元/㎡' },
    { label: '最高区域', value: '天河区 63,100' },
    { label: '环比上月', value: '+2.3%', trend: 'up' },
  ],
};

export default housing;
