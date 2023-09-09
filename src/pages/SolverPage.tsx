import { useState } from 'react';
import { DifficultySelector } from '../components/modules/difficulty/DifficultySelector';
import { KeyCircle } from '../components/modules/key/KeyCircle';
import styles from './SolverPage.module.scss';
import { Difficulty, MAX_KEYS, TOTAL_KEYS_BY_DIFFICULTY } from '../constants';
import { LayerSelector } from '../components/modules/layer/LayerSelector';

export const SolverPage = () => {
  const [activeDifficulty, setActiveDifficulty] = useState(Difficulty.Novice);
  const [activeLayer, setActiveLayer] = useState(0);

  const totalKeys = TOTAL_KEYS_BY_DIFFICULTY[activeDifficulty];

  return (
    <div className={styles.root}>
      <div className={styles.settings}>
        <DifficultySelector activeDifficulty={activeDifficulty} onChange={setActiveDifficulty} />
        <LayerSelector activeLayer={activeLayer} onChange={setActiveLayer} />
      </div>
      <div className={styles.keyList}>
        {Array.from({ length: MAX_KEYS }, (_, i) => (
          <KeyCircle key={i} filteredLayer={activeLayer} isHidden={i >= totalKeys} />
        ))}
      </div>
    </div>
  );
};
