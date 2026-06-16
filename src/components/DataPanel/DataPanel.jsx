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

      <div className={styles.titleSection}>
        <h2 className={styles.title}>{name}</h2>
        <p className={styles.description}>{description}</p>
      </div>

      {stats && stats.length > 0 && (
        <div className={styles.statsRow}>
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} />
          ))}
        </div>
      )}

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
