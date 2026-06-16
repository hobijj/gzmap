import { useAppContext, MODULES } from '../../contexts/AppContext';
import styles from './Header.module.css';

export default function Header() {
  const { activeModule, changeModule } = useAppContext();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span className={styles.logoIcon}>🏮</span>
        <span className={styles.logoText}>广州城市仪表盘</span>
        <span className={styles.logoSub}>Guangzhou City Dashboard</span>
      </div>
      <nav className={styles.nav}>
        {MODULES.map((mod) => (
          <button
            key={mod.id}
            className={`${styles.tab} ${activeModule === mod.id ? styles.active : ''}`}
            onClick={() => changeModule(mod.id)}
          >
            <span className={styles.tabIcon}>{mod.icon}</span>
            <span className={styles.tabLabel}>{mod.label}</span>
          </button>
        ))}
      </nav>
    </header>
  );
}
