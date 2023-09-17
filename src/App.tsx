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
import { Footer } from './components/shared/Footer';
import { HelpPage } from './pages/HelpPage';
import { AppRoutes } from './routes';
import { AutoSolverPage } from './pages/AutoSolverPage';

const App = () => {
  return (
    <div className={styles.root}>
      <Routes>
        <Route path={AppRoutes.Home} element={<SolverPage />} />
        <Route path={AppRoutes.Help} element={<HelpPage />} />
        <Route path={AppRoutes.AutoSolver} element={<AutoSolverPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
