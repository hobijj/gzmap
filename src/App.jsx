import { AppProvider } from './contexts/AppContext';
import Header from './components/Header/Header';
import MapPanel from './components/MapPanel/MapPanel';
import DataPanel from './components/DataPanel/DataPanel';
import styles from './App.module.css';

function AppLayout() {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <MapPanel />
        <DataPanel />
      </main>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppLayout />
    </AppProvider>
  );
}

export default App;
