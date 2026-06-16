import { useState, useEffect, useMemo } from 'react';
import { useAppContext } from '../contexts/AppContext';
import lifeData from '../data/life';
import memoryData from '../data/memory';
import pulseData from '../data/pulse';

const DATA_MAP = { life: lifeData, memory: memoryData, pulse: pulseData };
const DATA_SOURCE = import.meta.env.VITE_DATA_SOURCE || 'static';
const API_BASE = import.meta.env.VITE_API_BASE || '/api';

export function useData() {
  const { activeModule, activeSubItem } = useAppContext();

  // ---- Static mode (default, zero API dependency) ----
  if (DATA_SOURCE === 'static') {
    const moduleData = DATA_MAP[activeModule];
    const subItemData = moduleData?.[activeSubItem] || null;
    return { moduleData, subItemData, isLoading: !subItemData, isFromApi: false };
  }

  // ---- API mode ----
  return useApiData(activeModule, activeSubItem);
}

function useApiData(activeModule, activeSubItem) {
  const [cache, setCache] = useState({});
  const cacheKey = `${activeModule}/${activeSubItem}`;

  useEffect(() => {
    if (cache[cacheKey]) return;

    fetch(`${API_BASE}/${activeModule}/${activeSubItem}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setCache((prev) => ({ ...prev, [cacheKey]: data }));
      })
      .catch((err) => {
        console.warn(`API fetch failed for ${cacheKey}, using static fallback`, err);
        const fallback = DATA_MAP[activeModule]?.[activeSubItem];
        if (fallback) {
          setCache((prev) => ({ ...prev, [cacheKey]: fallback }));
        }
      });
  }, [activeModule, activeSubItem, cacheKey]);

  const subItemData = cache[cacheKey] || null;
  return { subItemData, isLoading: !subItemData, isFromApi: true };
}
