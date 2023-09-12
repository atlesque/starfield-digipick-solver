import { useState } from 'react';
import { KeyCircle } from '../components/modules/key/KeyCircle';
import {
  Difficulty,
  MAX_KEYS,
  TOTAL_KEYS_BY_DIFFICULTY,
  TOTAL_LAYERS_BY_DIFFICULTY,
} from '../constants';
import styles from './SolverPage.module.scss';
import { Settings } from '../components/modules/settings/Settings';
import { Link } from 'react-router-dom';

interface KeyCircleConfig {
  activeLayerNumber: number;
  isVerified: boolean;
}

const DEFAULT_KEY_CIRCLE_CONFIG: KeyCircleConfig = {
  activeLayerNumber: 0,
  isVerified: false,
};

const DEFAULT_KEY_CIRCLES = Array.from({ length: MAX_KEYS }, () => DEFAULT_KEY_CIRCLE_CONFIG);

export const SolverPage = () => {
  const [activeDifficulty, setActiveDifficulty] = useState(Difficulty.Novice);
  const [filteredLayer, setFilteredLayer] = useState(0);
  const [keyCircles, setKeyCircles] = useState<KeyCircleConfig[]>(DEFAULT_KEY_CIRCLES);

  const totalKeys = TOTAL_KEYS_BY_DIFFICULTY[activeDifficulty];
  const totalLayers = TOTAL_LAYERS_BY_DIFFICULTY[activeDifficulty];

  const handleResetClick = () => {
    setKeyCircles(DEFAULT_KEY_CIRCLES);
    setFilteredLayer(0);
  };

  const handleKeyCircleLayerChange = (keyNumber: number, newLayer: number) => {
    setKeyCircles(keyCircles => {
      const newKeyCircles = [...keyCircles];
      newKeyCircles[keyNumber] = {
        ...newKeyCircles[keyNumber],
        activeLayerNumber: newLayer,
      };
      return newKeyCircles;
    });
  };

  const handleKeyCircleVerifyChange = (keyNumber: number, isVerified: boolean) => {
    setKeyCircles(keyCircles => {
      const newKeyCircles = [...keyCircles];
      newKeyCircles[keyNumber] = {
        ...newKeyCircles[keyNumber],
        isVerified,
      };
      return newKeyCircles;
    });
  };

  return (
    <div className={styles.root}>
      <Settings
        activeDifficulty={activeDifficulty}
        handleResetClick={handleResetClick}
        setActiveDifficulty={setActiveDifficulty}
        filteredLayer={filteredLayer}
        setFilteredLayer={setFilteredLayer}
        totalLayers={totalLayers}
      />
      <div className={styles.keyList}>
        {keyCircles.map((keyCircleConfig, i) => (
          <KeyCircle
            key={i}
            activeLayerNumber={keyCircleConfig.activeLayerNumber}
            filteredLayer={filteredLayer}
            totalLayers={totalLayers}
            isHidden={i >= totalKeys}
            isVerified={keyCircleConfig.isVerified}
            onActiveLayerChange={newLayer => handleKeyCircleLayerChange(i, newLayer)}
            onVerifyChange={isVerified => handleKeyCircleVerifyChange(i, isVerified)}
          />
        ))}
      </div>
      <div style={{ width: '100%' }}>
        <h1 className={styles.title}>Auto Solver</h1>
        <Link to="/auto-solver">Try the new auto solver!</Link>
      </div>
    </div>
  );
};
