import styles from './StatCard.module.css';

export default function StatCard({ label, value, trend }) {
  return (
    <div className={styles.card}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>
        {value}
        {trend === 'up' && <span className={styles.trendUp}>↑</span>}
        {trend === 'down' && <span className={styles.trendDown}>↓</span>}
      </div>
    </div>
  );
}
