# 广州地图数据可视化仪表盘 Phase 1 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 搭建广州地图数据可视化仪表盘 MVP，完成「城市生活」模块（房价、美食、公园、教育医疗），岭南×赛博视觉风格，纯前端静态站点。

**Architecture:** React 18 + Vite 脚手架，Leaflet 负责地图底图和空间数据图层，ECharts 负责右侧面板图表，React Context 管理模块/子项切换状态。Mock 数据放在 `src/data/life/` 目录，通过 `useData` hook 统一获取。

**Tech Stack:** React 18, Vite, Leaflet + react-leaflet, ECharts (echarts-for-react), CSS Modules + CSS 自定义属性

---

## 文件结构总览

```
gzmap/
├── index.html
├── package.json
├── vite.config.js
├── public/
├── src/
│   ├── main.jsx                    # 入口
│   ├── App.jsx                     # 根组件：Header + MainView
│   ├── App.module.css
│   ├── styles/
│   │   ├── theme.css               # CSS 自定义属性（岭南×赛博配色）
│   │   └── global.css              # 全局重置 + 基础样式
│   ├── contexts/
│   │   └── AppContext.jsx          # 模块/子项/地图联动状态
│   ├── data/
│   │   └── life/
│   │       ├── index.js            # 城市生活模块 4 个子项数据汇总
│   │       ├── housing.js          # 房价热力图数据
│   │       ├── food.js             # 美食密度分布数据
│   │       ├── parks.js            # 公园绿地覆盖数据
│   │       └── edu-health.js       # 教育医疗资源数据
│   ├── hooks/
│   │   └── useData.js             # 数据获取 hook
│   ├── components/
│   │   ├── Header/
│   │   │   ├── Header.jsx
│   │   │   └── Header.module.css
│   │   ├── MapPanel/
│   │   │   ├── MapPanel.jsx
│   │   │   ├── MapPanel.module.css
│   │   │   └── layers/
│   │   │       ├── HeatLayer.jsx    # 热力图叠加
│   │   │       ├── ScatterLayer.jsx # 散点标注
│   │   │       └── RegionLayer.jsx  # 区域着色
│   │   ├── DataPanel/
│   │   │   ├── DataPanel.jsx
│   │   │   └── DataPanel.module.css
│   │   └── common/
│   │       ├── StatCard/
│   │       │   ├── StatCard.jsx
│   │       │   └── StatCard.module.css
│   │       └── ChartCard/
│   │           ├── ChartCard.jsx
│   │           └── ChartCard.module.css
│   └── utils/
│       └── mapHelpers.js           # 地图坐标/颜色计算工具
```

---

### Task 1: 项目脚手架 + 依赖安装

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `index.html`
- Create: `src/main.jsx`
- Create: `src/App.jsx`

- [ ] **Step 1: 初始化 package.json**

```bash
cd D:\claudeplay\gzmap
```

Create `package.json`:

```json
{
  "name": "gzmap",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

- [ ] **Step 2: 安装依赖**

```bash
npm install react react-dom leaflet react-leaflet leaflet.heat echarts echarts-for-react
npm install -D vite @vitejs/plugin-react
```

- [ ] **Step 3: 创建 vite.config.js**

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
```

- [ ] **Step 4: 创建 index.html**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>广州城市仪表盘</title>
  <link
    rel="stylesheet"
    href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
    crossorigin=""
  />
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

- [ ] **Step 5: 创建 src/main.jsx**

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/theme.css';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

- [ ] **Step 6: 创建占位 src/App.jsx**

```jsx
function App() {
  return <div>广州城市仪表盘</div>;
}

export default App;
```

- [ ] **Step 7: 验证脚手架运行**

```bash
npx vite --host
```

Expected: 浏览器打开看到 "广州城市仪表盘"，无报错。

---

### Task 2: 主题系统 + 全局样式

**Files:**
- Create: `src/styles/theme.css`
- Create: `src/styles/global.css`

- [ ] **Step 1: 创建 theme.css（CSS 自定义属性）**

```css
:root {
  /* 基底 */
  --color-bg-primary: #1a1410;
  --color-bg-secondary: #231e1a;
  --color-bg-card: rgba(35, 30, 26, 0.85);
  --color-bg-card-hover: rgba(45, 38, 32, 0.9);

  /* 主色 - 广彩红 */
  --color-accent: #c41e3a;
  --color-accent-light: #e85d3a;
  --color-accent-dark: #8b1a2b;

  /* 辅色 - 鎏金 */
  --color-gold: #d4a853;
  --color-gold-light: #e8c97a;
  --color-gold-dark: #a07040;

  /* 点缀 - 越秀绿 */
  --color-green: #2d6a4f;
  --color-green-light: #52b788;

  /* 文字 */
  --color-text-primary: #f0e6d8;
  --color-text-secondary: #b0a090;
  --color-text-muted: #6e6058;

  /* 边框 */
  --color-border: rgba(212, 168, 83, 0.2);
  --color-border-active: rgba(212, 168, 83, 0.5);

  /* 图表色板 */
  --chart-red: #c41e3a;
  --chart-orange: #e85d3a;
  --chart-gold: #d4a853;
  --chart-green: #2d6a4f;
  --chart-teal: #1a6b5a;
  --chart-blue: #3a5f8b;

  /* 间距 */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;

  /* 圆角 */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;

  /* 阴影 */
  --shadow-card: 0 2px 12px rgba(0, 0, 0, 0.3);
  --shadow-glow: 0 0 20px rgba(212, 168, 83, 0.1);

  /* 字体 */
  --font-sans: 'PingFang SC', 'Microsoft YaHei', 'Noto Sans SC', sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
}
```

- [ ] **Step 2: 创建 global.css**

```css
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #root {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

body {
  font-family: var(--font-sans);
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  color: var(--color-gold);
  text-decoration: none;
}

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: var(--color-bg-secondary);
}

::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-border-active);
}
```

- [ ] **Step 3: 验证**

在 `App.jsx` 中临时写一段测试文字，确认背景色为暖黑色、文字颜色正常。

---

### Task 3: AppContext 状态管理

**Files:**
- Create: `src/contexts/AppContext.jsx`

- [ ] **Step 1: 创建 AppContext.jsx**

```jsx
import { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext(null);

// 模块配置
export const MODULES = [
  { id: 'life', label: '城市生活', icon: '🛋️' },
  { id: 'memory', label: '城市记忆', icon: '📜' },
  { id: 'pulse', label: '城市脉动', icon: '🏙️' },
];

// 城市生活子项
export const LIFE_SUB_ITEMS = [
  { id: 'housing', label: '房价热力' },
  { id: 'food', label: '美食分布' },
  { id: 'parks', label: '公园绿地' },
  { id: 'eduHealth', label: '教育医疗' },
];

// 其余模块子项（Phase 1 暂用占位）
export const MEMORY_SUB_ITEMS = [
  { id: 'oldBrands', label: '老字号' },
  { id: 'buildings', label: '历史建筑' },
  { id: 'cityChange', label: '城市变迁' },
  { id: 'intangible', label: '非遗文化' },
];

export const PULSE_SUB_ITEMS = [
  { id: 'metro', label: '地铁流量' },
  { id: 'density', label: '人口密度' },
  { id: 'business', label: '商圈活跃' },
  { id: 'traffic', label: '交通拥堵' },
];

const SUB_ITEMS_MAP = {
  life: LIFE_SUB_ITEMS,
  memory: MEMORY_SUB_ITEMS,
  pulse: PULSE_SUB_ITEMS,
};

export function AppProvider({ children }) {
  const [activeModule, setActiveModule] = useState('life');
  const [activeSubItem, setActiveSubItem] = useState('housing');
  // 地图联动：被高亮的区域名（null 表示无联动）
  const [highlightedDistrict, setHighlightedDistrict] = useState(null);

  const changeModule = useCallback((moduleId) => {
    setActiveModule(moduleId);
    // 切换模块时重置子项为该模块的第一个
    setActiveSubItem(SUB_ITEMS_MAP[moduleId][0].id);
    setHighlightedDistrict(null);
  }, []);

  const changeSubItem = useCallback((subItemId) => {
    setActiveSubItem(subItemId);
    setHighlightedDistrict(null);
  }, []);

  const value = {
    activeModule,
    activeSubItem,
    highlightedDistrict,
    setHighlightedDistrict,
    changeModule,
    changeSubItem,
    currentSubItems: SUB_ITEMS_MAP[activeModule],
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}
```

- [ ] **Step 2: 用 AppProvider 包裹 App.jsx**

编辑 `src/App.jsx`：

```jsx
import { AppProvider } from './contexts/AppContext';

function App() {
  return (
    <AppProvider>
      <div>广州城市仪表盘</div>
    </AppProvider>
  );
}

export default App;
```

---

### Task 4: Mock 数据 — 城市生活模块

**Files:**
- Create: `src/data/life/housing.js`
- Create: `src/data/life/food.js`
- Create: `src/data/life/parks.js`
- Create: `src/data/life/edu-health.js`
- Create: `src/data/life/index.js`

- [ ] **Step 1: 创建 housing.js（房价热力图数据）**

```javascript
const housing = {
  id: 'housing',
  name: '房价热力图',
  description: '广州各区二手房均价分布',
  mapData: {
    type: 'heatmap',
    // Leaflet.heat 格式：[lat, lng, intensity]
    points: [
      // 天河区 - 高价位
      { lat: 23.1255, lng: 113.3320, value: 68210, name: '珠江新城', district: '天河' },
      { lat: 23.1300, lng: 113.3450, value: 65100, name: '体育中心', district: '天河' },
      { lat: 23.1200, lng: 113.3600, value: 58900, name: '东圃', district: '天河' },
      { lat: 23.1350, lng: 113.3200, value: 62300, name: '天河北', district: '天河' },
      // 越秀区
      { lat: 23.1280, lng: 113.2700, value: 61200, name: '北京路', district: '越秀' },
      { lat: 23.1320, lng: 113.2800, value: 58900, name: '东山口', district: '越秀' },
      { lat: 23.1250, lng: 113.2600, value: 54300, name: '淘金', district: '越秀' },
      // 海珠区
      { lat: 23.1000, lng: 113.3200, value: 52100, name: '琶洲', district: '海珠' },
      { lat: 23.0900, lng: 113.2900, value: 47800, name: '江南西', district: '海珠' },
      { lat: 23.1050, lng: 113.3400, value: 50300, name: '赤岗', district: '海珠' },
      // 荔湾区
      { lat: 23.1200, lng: 113.2400, value: 43200, name: '陈家祠', district: '荔湾' },
      { lat: 23.1150, lng: 113.2300, value: 39800, name: '芳村', district: '荔湾' },
      // 白云区
      { lat: 23.1600, lng: 113.2700, value: 35600, name: '白云新城', district: '白云' },
      { lat: 23.1800, lng: 113.3000, value: 31200, name: '同和', district: '白云' },
      { lat: 23.2000, lng: 113.2600, value: 27800, name: '太和', district: '白云' },
      // 番禺区
      { lat: 22.9400, lng: 113.3500, value: 38500, name: '万博', district: '番禺' },
      { lat: 22.9500, lng: 113.3200, value: 34200, name: '市桥', district: '番禺' },
      { lat: 22.9200, lng: 113.3800, value: 29800, name: '亚运城', district: '番禺' },
      // 黄埔区
      { lat: 23.1100, lng: 113.4500, value: 32500, name: '科学城', district: '黄埔' },
      { lat: 23.0900, lng: 113.4800, value: 26800, name: '知识城', district: '黄埔' },
      // 南沙区
      { lat: 22.7500, lng: 113.5800, value: 24500, name: '金洲', district: '南沙' },
      { lat: 22.7800, lng: 113.5500, value: 21800, name: '万顷沙', district: '南沙' },
      // 增城区
      { lat: 23.1300, lng: 113.6100, value: 19800, name: '新塘', district: '增城' },
      { lat: 23.2900, lng: 113.8300, value: 16500, name: '荔城', district: '增城' },
      // 花都区
      { lat: 23.4000, lng: 113.2100, value: 18200, name: '新华', district: '花都' },
      // 从化区
      { lat: 23.5500, lng: 113.5800, value: 14500, name: '街口', district: '从化' },
    ],
    // 各区均价（region chart 用）
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
```

- [ ] **Step 2: 创建 food.js（美食密度分布数据）**

```javascript
const food = {
  id: 'food',
  name: '美食密度分布',
  description: '广州各区餐饮店铺密度与热门美食聚集地',
  mapData: {
    type: 'scatter',
    points: [
      // 越秀 - 老字号集中
      { lat: 23.1250, lng: 113.2700, value: 95, name: '北京路美食街', district: '越秀', category: '综合' },
      { lat: 23.1280, lng: 113.2650, value: 88, name: '惠福东路', district: '越秀', category: '小吃' },
      { lat: 23.1300, lng: 113.2750, value: 82, name: '文明路糖水街', district: '越秀', category: '甜品' },
      // 荔湾 - 传统西关美食
      { lat: 23.1180, lng: 113.2400, value: 90, name: '上下九美食街', district: '荔湾', category: '综合' },
      { lat: 23.1150, lng: 113.2350, value: 78, name: '宝华路', district: '荔湾', category: '小吃' },
      { lat: 23.1200, lng: 113.2300, value: 75, name: '泮塘路', district: '荔湾', category: '粤菜' },
      // 天河 - 新式餐饮
      { lat: 23.1320, lng: 113.3250, value: 85, name: '体育西路', district: '天河', category: '综合' },
      { lat: 23.1250, lng: 113.3320, value: 80, name: '珠江新城', district: '天河', category: '高端' },
      { lat: 23.1350, lng: 113.3500, value: 70, name: '棠下美食街', district: '天河', category: '夜市' },
      // 海珠
      { lat: 23.0950, lng: 113.2900, value: 72, name: '江南西', district: '海珠', category: '综合' },
      { lat: 23.1000, lng: 113.3200, value: 68, name: '琶醍', district: '海珠', category: '餐吧' },
      { lat: 23.0850, lng: 113.2700, value: 65, name: '宝业路食街', district: '海珠', category: '夜市' },
      // 番禺
      { lat: 22.9400, lng: 113.3500, value: 62, name: '万博美食圈', district: '番禺', category: '综合' },
      { lat: 22.9350, lng: 113.3600, value: 58, name: '南村食街', district: '番禺', category: '农家菜' },
      // 白云
      { lat: 23.1650, lng: 113.2600, value: 55, name: '白云万达', district: '白云', category: '综合' },
      { lat: 23.1750, lng: 113.2800, value: 50, name: '远景路韩国街', district: '白云', category: '异国' },
      // 黄埔
      { lat: 23.1100, lng: 113.4500, value: 45, name: '科学城', district: '黄埔', category: '综合' },
      // 南沙
      { lat: 22.7500, lng: 113.5800, value: 38, name: '南沙万达', district: '南沙', category: '综合' },
      { lat: 22.7600, lng: 113.5600, value: 35, name: '十九涌海鲜', district: '南沙', category: '海鲜' },
    ],
    // 各区餐饮店铺数（估算）
    regions: [
      { district: '天河', value: 18200 },
      { district: '越秀', value: 15600 },
      { district: '海珠', value: 12800 },
      { district: '荔湾', value: 11500 },
      { district: '白云', value: 14300 },
      { district: '番禺', value: 13500 },
      { district: '黄埔', value: 7800 },
      { district: '南沙', value: 4200 },
      { district: '增城', value: 6500 },
      { district: '花都', value: 5800 },
      { district: '从化', value: 3200 },
    ],
  },
  chartData: {
    type: 'bar',
    title: '广州各区餐饮店铺数量',
    xField: 'district',
    yField: 'value',
    unit: '家',
  },
  stats: [
    { label: '全市餐饮店铺', value: '约 115,000 家' },
    { label: '美食聚集地', value: '19 处' },
    { label: '「食在广州」', value: '实至名归 ✨' },
  ],
};

export default food;
```

- [ ] **Step 3: 创建 parks.js（公园绿地覆盖数据）**

```javascript
const parks = {
  id: 'parks',
  name: '公园绿地覆盖',
  description: '广州主要公园、绿道和自然保护区的分布',
  mapData: {
    type: 'scatter',
    points: [
      { lat: 23.1420, lng: 113.3050, value: 90, name: '白云山', district: '白云', area: '20.98 km²' },
      { lat: 23.1300, lng: 113.2900, value: 85, name: '越秀公园', district: '越秀', area: '0.69 km²' },
      { lat: 23.1100, lng: 113.2900, value: 80, name: '海珠湿地', district: '海珠', area: '8.69 km²' },
      { lat: 23.0950, lng: 113.3500, value: 75, name: '珠江公园', district: '天河', area: '0.28 km²' },
      { lat: 23.1400, lng: 113.3500, value: 78, name: '天河公园', district: '天河', area: '0.70 km²' },
      { lat: 23.1250, lng: 113.2400, value: 70, name: '荔湾湖公园', district: '荔湾', area: '0.27 km²' },
      { lat: 23.0700, lng: 113.4300, value: 82, name: '大学城中心湖', district: '番禺', area: '0.14 km²' },
      { lat: 22.9300, lng: 113.3800, value: 65, name: '大夫山', district: '番禺', area: '6.00 km²' },
      { lat: 23.1600, lng: 113.3700, value: 72, name: '火炉山', district: '天河', area: '6.00 km²' },
      { lat: 23.1800, lng: 113.3900, value: 68, name: '凤凰山', district: '天河', area: '10.00 km²' },
      { lat: 23.0600, lng: 113.2500, value: 60, name: '广州圆生态园', district: '荔湾', area: '0.15 km²' },
      { lat: 23.2000, lng: 113.2900, value: 55, name: '白云湖', district: '白云', area: '2.07 km²' },
      { lat: 22.7500, lng: 113.5600, value: 65, name: '南沙湿地', district: '南沙', area: '6.67 km²' },
      { lat: 23.3000, lng: 113.6000, value: 58, name: '流溪河森林公园', district: '从化', area: '88.00 km²' },
      { lat: 23.4200, lng: 113.2300, value: 55, name: '花都湖', district: '花都', area: '2.40 km²' },
      { lat: 22.9200, lng: 113.5000, value: 50, name: '莲花山', district: '番禺', area: '2.33 km²' },
      { lat: 23.1200, lng: 113.4500, value: 52, name: '萝岗香雪公园', district: '黄埔', area: '0.80 km²' },
      { lat: 23.2600, lng: 113.6200, value: 45, name: '增城白水寨', district: '增城', area: '20.00 km²' },
    ],
    regions: [
      { district: '从化', value: 68 },
      { district: '花都', value: 38 },
      { district: '增城', value: 35 },
      { district: '白云', value: 25 },
      { district: '天河', value: 18 },
      { district: '荔湾', value: 12 },
      { district: '越秀', value: 10 },
      { district: '番禺', value: 22 },
      { district: '黄埔', value: 20 },
      { district: '南沙', value: 28 },
      { district: '海珠', value: 15 },
    ],
  },
  chartData: {
    type: 'bar',
    title: '广州各区绿地覆盖率',
    xField: 'district',
    yField: 'value',
    unit: '%',
  },
  stats: [
    { label: '主要公园', value: '18+' },
    { label: '森林覆盖率', value: '42.3%' },
    { label: '「花城」', value: '名副其实 🌸' },
  ],
};

export default parks;
```

- [ ] **Step 4: 创建 edu-health.js（教育医疗资源数据）**

```javascript
const eduHealth = {
  id: 'eduHealth',
  name: '教育医疗资源',
  description: '广州三甲医院、重点中小学及高校分布',
  mapData: {
    type: 'scatter',
    points: [
      // 三甲医院
      { lat: 23.1280, lng: 113.2650, value: 95, name: '广东省人民医院', district: '越秀', type: '医院', category: '三甲' },
      { lat: 23.1300, lng: 113.2700, value: 95, name: '中山大学附属第一医院', district: '越秀', type: '医院', category: '三甲' },
      { lat: 23.1250, lng: 113.2600, value: 92, name: '广州医科大学附属第一医院', district: '越秀', type: '医院', category: '三甲' },
      { lat: 23.1350, lng: 113.3200, value: 90, name: '中山三院', district: '天河', type: '医院', category: '三甲' },
      { lat: 23.1200, lng: 113.2400, value: 88, name: '广州市第一人民医院', district: '荔湾', type: '医院', category: '三甲' },
      { lat: 23.1000, lng: 113.2900, value: 88, name: '南方医科大学珠江医院', district: '海珠', type: '医院', category: '三甲' },
      { lat: 23.1600, lng: 113.2700, value: 82, name: '南方医院', district: '白云', type: '医院', category: '三甲' },
      { lat: 22.9300, lng: 113.3600, value: 80, name: '番禺中心医院', district: '番禺', type: '医院', category: '三甲' },
      // 高校
      { lat: 23.1000, lng: 113.3000, value: 90, name: '中山大学(南校区)', district: '海珠', type: '高校', category: '985/211' },
      { lat: 23.1400, lng: 113.3500, value: 88, name: '华南理工大学', district: '天河', type: '高校', category: '985/211' },
      { lat: 23.1300, lng: 113.3500, value: 86, name: '暨南大学', district: '天河', type: '高校', category: '211' },
      { lat: 23.1400, lng: 113.3600, value: 85, name: '华南师范大学', district: '天河', type: '高校', category: '211' },
      { lat: 23.0700, lng: 113.4300, value: 85, name: '广州大学城', district: '番禺', type: '高校群', category: '10+高校' },
      // 重点中学
      { lat: 23.1250, lng: 113.2800, value: 80, name: '华师附中', district: '天河', type: '中学', category: '重点' },
      { lat: 23.1280, lng: 113.2700, value: 80, name: '执信中学', district: '越秀', type: '中学', category: '重点' },
      { lat: 23.1320, lng: 113.2750, value: 78, name: '广雅中学', district: '荔湾', type: '中学', category: '重点' },
    ],
    regions: [
      { district: '越秀', value: 92 },
      { district: '天河', value: 85 },
      { district: '海珠', value: 78 },
      { district: '荔湾', value: 75 },
      { district: '白云', value: 65 },
      { district: '番禺', value: 62 },
      { district: '黄埔', value: 50 },
      { district: '南沙', value: 35 },
      { district: '增城', value: 30 },
      { district: '花都', value: 32 },
      { district: '从化', value: 25 },
    ],
  },
  chartData: {
    type: 'bar',
    title: '广州各区教育医疗资源综合评分',
    xField: 'district',
    yField: 'value',
    unit: '分',
  },
  stats: [
    { label: '三甲医院', value: '38 家' },
    { label: '普通高校', value: '83 所' },
    { label: '双一流高校', value: '5 所' },
  ],
};

export default eduHealth;
```

- [ ] **Step 5: 创建 life/index.js（汇总导出）**

```javascript
import housing from './housing';
import food from './food';
import parks from './parks';
import eduHealth from './edu-health';

const lifeData = {
  housing,
  food,
  parks,
  eduHealth,
};

export default lifeData;
```

---

### Task 5: useData Hook

**Files:**
- Create: `src/hooks/useData.js`

- [ ] **Step 1: 创建 useData.js**

```jsx
import { useMemo } from 'react';
import { useAppContext } from '../contexts/AppContext';
import lifeData from '../data/life';

// Phase 1: 仅城市生活模块有数据，其余模块返回 null
const DATA_MAP = {
  life: lifeData,
  memory: null,
  pulse: null,
};

export function useData() {
  const { activeModule, activeSubItem } = useAppContext();

  const moduleData = DATA_MAP[activeModule];

  const subItemData = useMemo(() => {
    if (!moduleData) return null;
    return moduleData[activeSubItem] || null;
  }, [moduleData, activeSubItem]);

  return {
    moduleData,
    subItemData,
    isLoading: !subItemData,
  };
}
```

---

### Task 6: 通用组件 StatCard + ChartCard

**Files:**
- Create: `src/components/common/StatCard/StatCard.jsx`
- Create: `src/components/common/StatCard/StatCard.module.css`
- Create: `src/components/common/ChartCard/ChartCard.jsx`
- Create: `src/components/common/ChartCard/ChartCard.module.css`

- [ ] **Step 1: 创建 StatCard.jsx**

```jsx
import styles from './StatCard.module.css';

export default function StatCard({ label, value, trend }) {
  return (
    <div className={styles.card}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>
        {value}
        {trend === 'up' && <span className={styles.trendUp}>↑</span>}
        {trend === 'down' && <span className={styles.trendDown}>↓</span>}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 创建 StatCard.module.css**

```css
.card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 12px 16px;
  text-align: center;
  transition: border-color 0.2s;
}

.card:hover {
  border-color: var(--color-border-active);
}

.label {
  font-size: 11px;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}

.value {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-gold);
  font-family: var(--font-mono);
}

.trendUp {
  color: var(--color-green-light);
  margin-left: 4px;
  font-size: 14px;
}

.trendDown {
  color: var(--color-accent);
  margin-left: 4px;
  font-size: 14px;
}
```

- [ ] **Step 3: 创建 ChartCard.jsx**

```jsx
import ReactECharts from 'echarts-for-react';
import styles from './ChartCard.module.css';

// 通用 ECharts 柱状图配置
function buildBarOption(data, chartConfig) {
  const { title, xField, yField, unit } = chartConfig;

  const districts = data.map((d) => d[xField]);
  const values = data.map((d) => d[yField]);

  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      formatter: (params) => {
        const p = params[0];
        return `${p.name}<br/>${p.marker} ${p.value.toLocaleString()} ${unit}`;
      },
    },
    grid: {
      left: '3%',
      right: '8%',
      top: 40,
      bottom: 30,
      containLabel: true,
    },
    title: {
      text: title,
      left: 'center',
      textStyle: {
        color: '#b0a090',
        fontSize: 13,
        fontWeight: 'normal',
      },
    },
    xAxis: {
      type: 'category',
      data: districts,
      axisLine: { lineStyle: { color: 'rgba(212,168,83,0.2)' } },
      axisTick: { show: false },
      axisLabel: {
        color: '#b0a090',
        fontSize: 10,
        rotate: districts.length > 8 ? 30 : 0,
      },
    },
    yAxis: {
      type: 'value',
      name: unit,
      nameTextStyle: { color: '#6e6058', fontSize: 10 },
      splitLine: { lineStyle: { color: 'rgba(212,168,83,0.08)' } },
      axisLabel: { color: '#6e6058', fontSize: 10 },
    },
    series: [
      {
        type: 'bar',
        data: values,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: '#d4a853' },
              { offset: 1, color: '#c41e3a' },
            ],
          },
          borderRadius: [4, 4, 0, 0],
        },
        emphasis: {
          itemStyle: { color: '#e8c97a' },
        },
      },
    ],
  };
}

export default function ChartCard({ data, chartConfig, onItemClick }) {
  const option = buildBarOption(data, chartConfig);

  const onEvents = onItemClick
    ? {
        click: (params) => {
          if (params.name) {
            onItemClick(params.name);
          }
        },
      }
    : {};

  return (
    <div className={styles.card}>
      <ReactECharts
        option={option}
        style={{ height: '100%', width: '100%' }}
        onEvents={onEvents}
        opts={{ renderer: 'canvas' }}
      />
    </div>
  );
}
```

- [ ] **Step 4: 创建 ChartCard.module.css**

```css
.card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 8px;
  min-height: 200px;
  overflow: hidden;
}
```

---

### Task 7: Header 组件

**Files:**
- Create: `src/components/Header/Header.jsx`
- Create: `src/components/Header/Header.module.css`

- [ ] **Step 1: 创建 Header.jsx**

```jsx
import { useAppContext, MODULES } from '../../contexts/AppContext';
import styles from './Header.module.css';

export default function Header() {
  const { activeModule, changeModule } = useAppContext();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span className={styles.logoIcon}>🏮</span>
        <span className={styles.logoText}>广州城市仪表盘</span>
        <span className={styles.logoSub}>Guangzhou City Dashboard</span>
      </div>
      <nav className={styles.nav}>
        {MODULES.map((mod) => (
          <button
            key={mod.id}
            className={`${styles.tab} ${activeModule === mod.id ? styles.active : ''}`}
            onClick={() => changeModule(mod.id)}
          >
            <span className={styles.tabIcon}>{mod.icon}</span>
            <span className={styles.tabLabel}>{mod.label}</span>
          </button>
        ))}
      </nav>
    </header>
  );
}
```

- [ ] **Step 2: 创建 Header.module.css**

```css
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding: 0 var(--space-lg);
  background: var(--color-bg-secondary);
  border-bottom: 1px solid var(--color-border);
  flex-shrink: 0;
}

.logo {
  display: flex;
  align-items: baseline;
  gap: var(--space-sm);
}

.logoIcon {
  font-size: 22px;
}

.logoText {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-gold);
}

.logoSub {
  font-size: 10px;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.nav {
  display: flex;
  gap: var(--space-xs);
}

.tab {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--color-text-secondary);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
}

.tab:hover {
  color: var(--color-text-primary);
  background: rgba(212, 168, 83, 0.08);
}

.tab.active {
  color: var(--color-gold);
  border-color: var(--color-border-active);
  background: rgba(212, 168, 83, 0.1);
}

.tabIcon {
  font-size: 16px;
}
```

---

### Task 8: MapPanel 组件 + 地图图层

**Files:**
- Create: `src/components/MapPanel/MapPanel.jsx`
- Create: `src/components/MapPanel/MapPanel.module.css`
- Create: `src/components/MapPanel/layers/HeatLayer.jsx`
- Create: `src/components/MapPanel/layers/ScatterLayer.jsx`
- Create: `src/utils/mapHelpers.js`

- [ ] **Step 1: 创建 mapHelpers.js**

```javascript
/**
 * 将 GeoPoint[] 转换为 Leaflet.heat 格式：[lat, lng, normalizedIntensity]
 */
export function toHeatData(points) {
  if (!points || points.length === 0) return [];
  const maxVal = Math.max(...points.map((p) => p.value));
  return points.map((p) => [p.lat, p.lng, p.value / maxVal]);
}

/**
 * 根据 value 计算散点半径: 4 ~ 24px
 */
export function scatterRadius(value, maxValue) {
  const min = 4;
  const max = 24;
  return min + (value / maxValue) * (max - min);
}

/**
 * 根据 value 返回渐变色（绿→金→红）
 */
export function valueToColor(value, maxValue) {
  const ratio = value / maxValue;
  if (ratio < 0.33) {
    // 越秀绿 → 鎏金
    const t = ratio / 0.33;
    const r = Math.round(45 + t * (212 - 45));
    const g = Math.round(106 + t * (168 - 106));
    const b = Math.round(79 + t * (83 - 79));
    return `rgb(${r},${g},${b})`;
  } else if (ratio < 0.66) {
    // 鎏金 → 广彩红
    const t = (ratio - 0.33) / 0.33;
    const r = Math.round(212 + t * (196 - 212));
    const g = Math.round(168 + t * (30 - 168));
    const b = Math.round(83 + t * (58 - 83));
    return `rgb(${r},${g},${b})`;
  } else {
    return '#c41e3a';
  }
}
```

- [ ] **Step 2: 创建 HeatLayer.jsx**

```jsx
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.heat';
import { toHeatData } from '../../../utils/mapHelpers';

export default function HeatLayer({ points }) {
  const map = useMap();

  useEffect(() => {
    if (!points || points.length === 0) return;

    const heatData = toHeatData(points);
    const layer = L.heatLayer(heatData, {
      radius: 30,
      blur: 20,
      maxZoom: 15,
      max: 1.0,
      gradient: {
        0.0: '#2d6a4f',
        0.25: '#52b788',
        0.5: '#d4a853',
        0.75: '#e85d3a',
        1.0: '#c41e3a',
      },
    }).addTo(map);

    return () => {
      map.removeLayer(layer);
    };
  }, [map, points]);

  return null;
}
```

- [ ] **Step 3: 创建 ScatterLayer.jsx**

```jsx
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { scatterRadius, valueToColor } from '../../../utils/mapHelpers';
import { useAppContext } from '../../../contexts/AppContext';

export default function ScatterLayer({ points }) {
  const map = useMap();
  const { setHighlightedDistrict } = useAppContext();

  useEffect(() => {
    if (!points || points.length === 0) return;

    const maxVal = Math.max(...points.map((p) => p.value));
    const markers = [];

    points.forEach((p) => {
      const color = valueToColor(p.value, maxVal);
      const radius = scatterRadius(p.value, maxVal);

      const circle = L.circleMarker([p.lat, p.lng], {
        radius,
        fillColor: color,
        color: 'rgba(212,168,83,0.3)',
        weight: 1,
        fillOpacity: 0.8,
      });

      circle.bindTooltip(
        `<div style="font-family:sans-serif;font-size:12px;">
          <strong>${p.name}</strong><br/>
          <span style="color:#d4a853;">${p.district}区</span>
          ${p.category ? ` · ${p.category}` : ''}
          ${p.area ? `<br/>面积: ${p.area}` : ''}
        </div>`,
        { direction: 'top', offset: [0, -radius] }
      );

      circle.on('click', () => {
        setHighlightedDistrict(p.district);
      });

      circle.addTo(map);
      markers.push(circle);
    });

    return () => {
      markers.forEach((m) => map.removeLayer(m));
    };
  }, [map, points, setHighlightedDistrict]);

  return null;
}
```

- [ ] **Step 4: 创建 MapPanel.jsx**

```jsx
import { MapContainer, TileLayer } from 'react-leaflet';
import { useData } from '../../hooks/useData';
import HeatLayer from './layers/HeatLayer';
import ScatterLayer from './layers/ScatterLayer';
import styles from './MapPanel.module.css';

// 广州中心坐标
const GZ_CENTER = [23.1291, 113.2644];
const DEFAULT_ZOOM = 12;

export default function MapPanel() {
  const { subItemData } = useData();

  const renderLayer = () => {
    if (!subItemData?.mapData) return null;

    const { type, points } = subItemData.mapData;

    switch (type) {
      case 'heatmap':
        return <HeatLayer points={points} />;
      case 'scatter':
        return <ScatterLayer points={points} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <MapContainer
        center={GZ_CENTER}
        zoom={DEFAULT_ZOOM}
        className={styles.map}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {renderLayer()}
      </MapContainer>
    </div>
  );
}
```

- [ ] **Step 5: 创建 MapPanel.module.css**

```css
.container {
  flex: 1;
  position: relative;
  min-width: 0;
}

.map {
  width: 100%;
  height: 100%;
}

/* 覆盖 Leaflet 默认样式适配暗色主题 */
:global(.leaflet-container) {
  background: var(--color-bg-primary);
}

:global(.leaflet-tooltip) {
  background: var(--color-bg-card) !important;
  border: 1px solid var(--color-border-active) !important;
  color: var(--color-text-primary) !important;
  border-radius: var(--radius-sm) !important;
  padding: 8px 12px !important;
  font-family: var(--font-sans) !important;
}
```

---

### Task 9: leaflet.heat 集成验证

**依赖已在 Task 1 安装。**

`leaflet.heat` 已通过 npm 安装。HeatLayer.jsx 中通过 `import L from 'leaflet'` 和 `import 'leaflet.heat'` 引入后，`L.heatLayer()` 方法可用。

- [ ] **Step 1: 确认 HeatLayer.jsx 顶部 import**

```jsx
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.heat';  // side-effect import, extends L
import { toHeatData } from '../../../utils/mapHelpers';
```

- [ ] **Step 2: 验证**

```bash
npx vite --host
```

打开浏览器，切换到「房价热力」子项，确认地图上出现热力图叠加层，无 `L.heatLayer is not a function` 等报错。

---

### Task 10: DataPanel 组件

**Files:**
- Create: `src/components/DataPanel/DataPanel.jsx`
- Create: `src/components/DataPanel/DataPanel.module.css`

- [ ] **Step 1: 创建 DataPanel.jsx**

```jsx
import { useAppContext } from '../../contexts/AppContext';
import { useData } from '../../hooks/useData';
import StatCard from '../common/StatCard/StatCard';
import ChartCard from '../common/ChartCard/ChartCard';
import styles from './DataPanel.module.css';

export default function DataPanel() {
  const { activeSubItem, changeSubItem, currentSubItems, setHighlightedDistrict } = useAppContext();
  const { subItemData, isLoading } = useData();

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.placeholder}>
          <p>🚧 数据采集中...</p>
          <p className={styles.placeholderSub}>该模块数据将在后续版本上线</p>
        </div>
      </div>
    );
  }

  const { name, description, stats, chartData, mapData } = subItemData;

  const handleChartClick = (districtName) => {
    setHighlightedDistrict(districtName);
  };

  return (
    <aside className={styles.container}>
      {/* 子项导航 */}
      <div className={styles.subNav}>
        {currentSubItems.map((item) => (
          <button
            key={item.id}
            className={`${styles.subTab} ${activeSubItem === item.id ? styles.subTabActive : ''}`}
            onClick={() => changeSubItem(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* 标题 */}
      <div className={styles.titleSection}>
        <h2 className={styles.title}>{name}</h2>
        <p className={styles.description}>{description}</p>
      </div>

      {/* 统计卡片 */}
      {stats && stats.length > 0 && (
        <div className={styles.statsRow}>
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} />
          ))}
        </div>
      )}

      {/* 图表 */}
      {chartData && mapData?.regions && (
        <ChartCard
          data={mapData.regions}
          chartConfig={chartData}
          onItemClick={handleChartClick}
        />
      )}
    </aside>
  );
}
```

- [ ] **Step 2: 创建 DataPanel.module.css**

```css
.container {
  width: 360px;
  background: var(--color-bg-secondary);
  border-left: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  flex-shrink: 0;
}

.subNav {
  display: flex;
  gap: 4px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-border);
  flex-wrap: wrap;
}

.subTab {
  padding: 5px 12px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--color-text-secondary);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
  white-space: nowrap;
}

.subTab:hover {
  color: var(--color-text-primary);
  border-color: var(--color-gold-dark);
}

.subTabActive {
  background: rgba(196, 30, 58, 0.15);
  border-color: var(--color-accent);
  color: var(--color-gold-light);
}

.titleSection {
  padding: 16px;
}

.title {
  font-size: 18px;
  color: var(--color-gold);
  margin-bottom: 4px;
}

.description {
  font-size: 12px;
  color: var(--color-text-muted);
  line-height: 1.5;
}

.statsRow {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  padding: 0 16px 12px;
}

.placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--color-text-muted);
  font-size: 14px;
  padding: 24px;
  text-align: center;
}

.placeholderSub {
  font-size: 12px;
  margin-top: 8px;
  opacity: 0.6;
}
```

---

### Task 11: App.jsx 主布局

**Files:**
- Modify: `src/App.jsx`
- Create: `src/App.module.css`

- [ ] **Step 1: 改写 App.jsx**

```jsx
import { AppProvider } from './contexts/AppContext';
import Header from './components/Header/Header';
import MapPanel from './components/MapPanel/MapPanel';
import DataPanel from './components/DataPanel/DataPanel';
import styles from './App.module.css';

function AppLayout() {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <MapPanel />
        <DataPanel />
      </main>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppLayout />
    </AppProvider>
  );
}

export default App;
```

- [ ] **Step 2: 创建 App.module.css**

```css
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.main {
  display: flex;
  flex: 1;
  min-height: 0;
}
```

---

### Task 12: 完整验证 + 调整

- [ ] **Step 1: 启动开发服务器**

```bash
npx vite --host
```

- [ ] **Step 2: 逐项检查**

1. 页面加载 → 看到暖黑色背景，Header 显示 Logo + 三个模块 Tab
2. 默认「城市生活」Tab 高亮
3. 左侧地图加载 CartoDB 暗色瓦片，广州居中
4. 默认显示「房价热力」→ 地图出现热力图叠加层
5. 右侧面板显示 4 子项按钮 + 统计卡片 + 柱状图
6. 点击「美食分布」子项 → 地图切换为散点、图表数据更新
7. 点击「公园绿地」「教育医疗」→ 同样正常切换
8. 点击图表柱子 → 对应区域高亮
9. 点击地图散点 → tooltip 弹出，显示详情
10. 切换到「城市记忆」或「城市脉动」→ 右侧显示占位提示

- [ ] **Step 3: 修复发现的问题**

根据实际渲染效果进行调整：热力图参数、散点大小、地图缩放级别等。

---

### Task 13: 构建 + 部署准备

- [ ] **Step 1: 生产构建**

```bash
npx vite build
```

预期：`dist/` 目录生成，无报错。

- [ ] **Step 2: 本地预览构建产物**

```bash
npx vite preview
```

验证生产构建运行正常。

- [ ] **Step 3: 添加 .gitignore**

```
node_modules/
dist/
.superpowers/
```

---

## 后续任务（本次不做）

- 补充「城市记忆」模块 mock 数据及图层
- 补充「城市脉动」模块 mock 数据及图层
- 广州各区 GeoJSON 边界 + 区域着色图层
- 移动端响应式布局（面板移到地图下方）
- 部署到 GitHub Pages / Vercel
