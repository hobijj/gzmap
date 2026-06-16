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
      radius: 22,
      blur: 14,
      maxZoom: 18,
      max: 1.0,
      gradient: {
        0.0: '#2d6a4f',
        0.2: '#40916c',
        0.4: '#52b788',
        0.6: '#d4a853',
        0.8: '#e85d3a',
        1.0: '#c41e3a',
      },
    }).addTo(map);

    return () => {
      map.removeLayer(layer);
    };
  }, [map, points]);

  return null;
}
