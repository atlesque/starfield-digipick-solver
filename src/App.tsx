import { Route, Routes } from 'react-router-dom';
import styles from './App.module.scss';
import './styles/animations.scss';
import './styles/defaults.scss';
import './styles/metrics.scss';
import './styles/palette.scss';
import './styles/reset.scss';
import './styles/shadows.scss';
import './styles/typography.scss';
import { SolverPage } from './pages/SolverPage';

const App = () => {
  return (
    <div className={styles.root}>
      <Routes>
        <Route path="/" element={<SolverPage />} />
      </Routes>
    </div>
  );
};

export default App;
