import { useMemo } from 'react';
import { useAppContext } from '../contexts/AppContext';
import lifeData from '../data/life';
import memoryData from '../data/memory';
import pulseData from '../data/pulse';

const DATA_MAP = {
  life: lifeData,
  memory: memoryData,
  pulse: pulseData,
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
