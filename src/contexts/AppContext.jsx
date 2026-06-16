import { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext(null);

export const MODULES = [
  { id: 'life', label: '城市生活', icon: '🛋️' },
  { id: 'memory', label: '城市记忆', icon: '📜' },
  { id: 'pulse', label: '城市脉动', icon: '🏙️' },
];

export const LIFE_SUB_ITEMS = [
  { id: 'housing', label: '房价热力' },
  { id: 'food', label: '美食分布' },
  { id: 'parks', label: '公园绿地' },
  { id: 'eduHealth', label: '教育医疗' },
];

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
  const [highlightedDistrict, setHighlightedDistrict] = useState(null);

  const changeModule = useCallback((moduleId) => {
    setActiveModule(moduleId);
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
