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

      const tooltipContent = `<div style="font-family:sans-serif;font-size:12px;">
        <strong>${p.name}</strong><br/>
        <span style="color:#d4a853;">${p.district}区</span>
        ${p.category ? ' · ' + p.category : ''}
        ${p.area ? '<br/>面积: ' + p.area : ''}
        ${p.type ? '<br/>类型: ' + p.type : ''}
      </div>`;

      circle.bindTooltip(tooltipContent, { direction: 'top', offset: [0, -radius] });

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
