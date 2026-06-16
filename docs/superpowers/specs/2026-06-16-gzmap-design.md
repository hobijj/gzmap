# 广州地图数据可视化仪表盘 — 设计文档

**日期：** 2026-06-16
**状态：** 待审核

---

## 1. 项目概述

一个以广州城市数据为主题的可交互地图可视化网站。用户可以在不同主题模块间切换，在地图上查看各种广州数据的空间分布，同时通过图表和统计卡片了解数据全貌。

**核心定位：** 好玩的、可探索的广州城市数据仪表盘。

---

## 2. 功能范围

### 三大主题模块

| 模块 | 子项 | 说明 |
|------|------|------|
| 🛋️ 城市生活 | 房价/租金热力图、美食密度分布、公园绿地覆盖、教育医疗资源 | 先做，数据最易 mock |
| 📜 城市记忆 | 老字号分布、历史建筑标注、城市版图变迁、非遗文化点位 | 次做 |
| 🏙️ 城市脉动 | 地铁流量热力、人口密度分布、商圈活跃度、交通拥堵态势 | 最后做，数据复杂 |

### 核心交互

- 顶部 Tab 切换三大模块
- 左侧地图展示当前子项的空间数据
- 右侧面板：子项切换按钮、图表卡片、统计数字卡片
- 地图点击点位弹出详情 tooltip
- 图表与地图联动（点图表高亮地图对应区域）
- 地图支持缩放、拖拽

---

## 3. 视觉设计

**风格：** 岭南 × 赛博融合

| 角色 | 色值 | 用途 |
|------|------|------|
| 基底色 | `#1a1410`（暖黑） | 页面/地图背景 |
| 主色 | `#c41e3a`（广彩红） | 热力图高点、重点标注、强调元素 |
| 辅色 | `#d4a853`（鎏金） | 图标、边框、高亮、标题 |
| 点缀色 | `#2d6a4f`（越秀绿） | 数据冷色调、辅助图表系列色 |
| 面板背景 | 深色半透明 | 数据面板卡片 |
| 地图瓦片 | 暗色主题 | CartoDB dark / 自定义暗色瓦片 |

**设计理念：** 在珠江新城夜景般的深色画布上，用广彩瓷器的红金配色画数据。赛博的骨架保数据感，岭南的暖色给城市温度。

---

## 4. 技术架构

### 技术栈

| 层 | 选型 | 理由 |
|----|------|------|
| 框架 | React 18 | 组件化适合仪表盘，状态管理成熟 |
| 构建 | Vite | 快，React 项目标配 |
| 地图 | Leaflet + react-leaflet | 轻量开源，可接各种瓦片源 |
| 图表 | ECharts (echarts-for-react) | 百度出品，中国地图支持好，热力图/散点/飞线均支持 |
| 样式 | CSS Modules + CSS 自定义属性 | 主题变量集中管理，无运行时开销 |
| 状态 | React Context | 当前模块 + 子项状态，够用不重 |
| 数据 | Phase 1 静态 JSON，Phase 2 fetch API | 渐进演进 |

### 组件树

```
App
├── Header              — Logo + 三大主题 Tab 导航
├── MainView            — 当前模块主容器
│   ├── MapPanel        — Leaflet 地图
│   │   ├── TileLayer   — 暗色地图瓦片
│   │   ├── HeatLayer   — ECharts 热力图叠加层
│   │   └── MarkerLayer — 标注点位 + Popup
│   └── DataPanel       — 右侧数据面板
│       ├── SubNav      — 当前模块 4 个子项切换按钮
│       ├── ChartCard   — ECharts 图表（柱状/折线/饼）
│       └── StatCard    — 关键数字卡片
└── Footer              — 数据来源说明
```

### 目录结构

```
gzmap/
├── public/
├── src/
│   ├── components/       # UI 组件
│   │   ├── Header/
│   │   ├── MapPanel/
│   │   ├── DataPanel/
│   │   └── common/       # ChartCard, StatCard 等通用组件
│   ├── contexts/         # React Context
│   │   └── AppContext.jsx
│   ├── data/             # Mock 数据 JSON（Phase 1）
│   │   ├── life/         # 城市生活数据
│   │   ├── memory/       # 城市记忆数据
│   │   └── pulse/        # 城市脉动数据
│   ├── hooks/            # 自定义 hooks
│   │   └── useData.js
│   ├── styles/           # 全局样式 + 主题变量
│   │   ├── theme.css
│   │   └── global.css
│   ├── utils/            # 工具函数
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── vite.config.js
```

### 数据流

```
mockData/*.json
      │
      ▼
  useData(module, subItem)    ← 从 Context 读取当前模块/子项
      │
      ├──► MapPanel           ← 渲染地图图层
      │
      └──► DataPanel          ← 渲染图表 + 统计卡
              │
              └──► 点击图表条目 → dispatch → MapPanel 高亮对应区域
```

**Phase 2 切换：** 将 `useData` hook 内部的 `import json` 替换为 `fetch('/api/...')`，组件不需要任何修改。

---

## 5. 数据模型（Mock 数据结构）

### 通用结构

```typescript
// 每个子项的数据
interface SubItemData {
  id: string;
  name: string;          // e.g. "房价热力图"
  description: string;
  mapData: MapLayer[];   // 地图图层数据
  chartData: ChartConfig; // ECharts 配置
  stats: StatItem[];     // 统计卡片数据
}

// 地图图层
interface MapLayer {
  type: 'heatmap' | 'scatter' | 'region';
  points: GeoPoint[] | RegionData[];
}

interface GeoPoint {
  lat: number;
  lng: number;
  name: string;
  value: number;
  district: string;      // 所属区
}

interface RegionData {
  district: string;      // 天河、越秀...
  value: number;
}

// 统计卡片
interface StatItem {
  label: string;         // "均价"
  value: string;         // "68,210 元/㎡"
  trend?: 'up' | 'down';
}
```

---

## 6. 非功能需求

- **响应式：** 桌面端优先（仪表盘特性决定），移动端降级为上下布局
- **性能：** 首屏加载 < 3 秒，地图交互流畅
- **浏览器：** 支持 Chrome / Edge / Firefox 最近两个大版本
- **部署：** Phase 1 静态站点，可部署到 GitHub Pages / Vercel / 阿里云 OSS

---

## 7. 演进路线

### Phase 1 — MVP（本次实现）
- React + Vite 脚手架
- 三大模块中先完成「城市生活」
- 全部静态 mock 数据
- 岭南×赛博视觉风格
- 部署上线

### Phase 2 — 数据升级（以后）
- 编写爬虫采集广州公开数据
- 搭建后端 API（FastAPI 或 Express）
- `useData` hook 从本地 JSON 切换到远程 API
- 补充「城市记忆」「城市脉动」模块数据

### Phase 3 — 增强（远期）
- 数据自动更新 pipeline
- 地图动画效果
- 移动端适配优化
- 可能增加用户交互（标记、收藏）

---

## 8. 待确认项

- [ ] 地图瓦片源选择（OpenStreetMap dark / CartoDB dark / 自定义）
- [ ] 是否需要广州各区边界 GeoJSON
- [ ] 部署平台选择
