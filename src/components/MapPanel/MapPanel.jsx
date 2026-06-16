import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import { useData } from '../../hooks/useData';
import HeatLayer from './layers/HeatLayer';
import ScatterLayer from './layers/ScatterLayer';
import styles from './MapPanel.module.css';

const GZ_CENTER = [23.1291, 113.2644];
const DEFAULT_ZOOM = 14;
const MIN_ZOOM = 10;
const MAX_ZOOM = 18;

// 广州行政边界约束
const MAX_BOUNDS = [
  [22.3, 112.8],  // 西南角
  [23.8, 114.1],  // 东北角
];

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
        minZoom={MIN_ZOOM}
        maxZoom={MAX_ZOOM}
        maxBounds={MAX_BOUNDS}
        maxBoundsViscosity={0.8}
        className={styles.map}
        zoomControl={false}
        scrollWheelZoom={true}
      >
        <ZoomControl position="bottomright" />
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a> | <a href="https://openstreetmap.org">OSM</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {renderLayer()}
      </MapContainer>
    </div>
  );
}
