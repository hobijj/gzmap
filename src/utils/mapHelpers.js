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
    const t = ratio / 0.33;
    const r = Math.round(45 + t * (212 - 45));
    const g = Math.round(106 + t * (168 - 106));
    const b = Math.round(79 + t * (83 - 79));
    return `rgb(${r},${g},${b})`;
  } else if (ratio < 0.66) {
    const t = (ratio - 0.33) / 0.33;
    const r = Math.round(212 + t * (196 - 212));
    const g = Math.round(168 + t * (30 - 168));
    const b = Math.round(83 + t * (58 - 83));
    return `rgb(${r},${g},${b})`;
  } else {
    return '#c41e3a';
  }
}
