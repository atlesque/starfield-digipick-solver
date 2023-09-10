import { useState } from 'react';
import { DifficultySelector } from '../components/modules/difficulty/DifficultySelector';
import { KeyCircle } from '../components/modules/key/KeyCircle';
import styles from './SolverPage.module.scss';
import {
  Difficulty,
  MAX_KEYS,
  TOTAL_KEYS_BY_DIFFICULTY,
  TOTAL_LAYERS_BY_DIFFICULTY,
} from '../constants';
import { LayerSelector } from '../components/modules/layer/LayerSelector';

export const SolverPage = () => {
  const [activeDifficulty, setActiveDifficulty] = useState(Difficulty.Novice);
  const [filteredLayer, setFilteredLayer] = useState(0);
  const [keyCircles, setKeyCircles] = useState(Array.from({ length: MAX_KEYS }, () => 0));

  const totalKeys = TOTAL_KEYS_BY_DIFFICULTY[activeDifficulty];
  const totalLayers = TOTAL_LAYERS_BY_DIFFICULTY[activeDifficulty];

  const handleKeyCircleLayerChange = (keyNumber: number, newLayer: number) => {
    setKeyCircles(keyCircles => {
      const newKeyCircles = [...keyCircles];
      newKeyCircles[keyNumber] = newLayer;
      return newKeyCircles;
    });
  };

  const handleResetClick = () => {
    setKeyCircles(Array.from({ length: MAX_KEYS }, () => 0));
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
        {keyCircles.map((activeLayer, i) => (
          <KeyCircle
            key={i}
            activeLayerNumber={activeLayer}
            onActiveLayerChange={newLayer => handleKeyCircleLayerChange(i, newLayer)}
            filteredLayer={filteredLayer}
            totalLayers={totalLayers}
            isHidden={i >= totalKeys}
          />
        ))}
      </div>
    </div>
  );
};
