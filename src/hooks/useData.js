import { useMemo } from 'react';
import { useAppContext } from '../contexts/AppContext';
import lifeData from '../data/life';
import memoryData from '../data/memory';

const DATA_MAP = {
  life: lifeData,
  memory: memoryData,
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
