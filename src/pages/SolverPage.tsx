import { useState } from 'react';
import { DifficultySelector } from '../components/modules/difficulty/DifficultySelector';
import { KeyCircle } from '../components/modules/key/KeyCircle';
import { LayerSelector } from '../components/modules/layer/LayerSelector';
import {
  Difficulty,
  MAX_KEYS,
  TOTAL_KEYS_BY_DIFFICULTY,
  TOTAL_LAYERS_BY_DIFFICULTY,
} from '../constants';
import styles from './SolverPage.module.scss';

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
      <div className={styles.settings}>
        <DifficultySelector activeDifficulty={activeDifficulty} onChange={setActiveDifficulty} />
        <div className={styles.settingsRow}>
          <LayerSelector
            activeLayer={filteredLayer}
            totalLayers={totalLayers}
            onChange={setFilteredLayer}
          />
          <button className={styles.resetButton} onClick={handleResetClick}>
            Reset
          </button>
        </div>
      </div>
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
    </div>
  );
};
