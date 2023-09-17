import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import KeyCircle from '../components/modules/key/KeyCircle';
import {
  Difficulty,
  LOCAL_STORAGE_ACTIVE_DIFFICULTY,
  LOCAL_STORAGE_FILTERED_LAYER,
  LOCAL_STORAGE_KEY_CIRCLES,
  MAX_KEYS,
  TOTAL_KEYS_BY_DIFFICULTY,
  TOTAL_LAYERS_BY_DIFFICULTY,
} from '../constants';
import styles from './SolverPage.module.scss';
import Settings from '../components/modules/settings/Settings';
import AppRoutes from '../routes';

interface KeyCircleConfig {
  activeLayerNumber: number;
  isVerified: boolean;
}

const DEFAULT_KEY_CIRCLE_CONFIG: KeyCircleConfig = {
  activeLayerNumber: 0,
  isVerified: false,
};

const DEFAULT_KEY_CIRCLES = Array.from({ length: MAX_KEYS }, () => DEFAULT_KEY_CIRCLE_CONFIG);

const getSavedActiveDifficulty = (): Difficulty | undefined => {
  const savedActiveDifficulty = localStorage.getItem(LOCAL_STORAGE_ACTIVE_DIFFICULTY);
  if (savedActiveDifficulty) {
    const parsedSavedActiveDifficulty = JSON.parse(savedActiveDifficulty);
    if (parsedSavedActiveDifficulty in Difficulty) {
      return parsedSavedActiveDifficulty as Difficulty;
    }
  }
  return undefined;
};

const getSavedFilteredLayer = (): number | undefined => {
  const savedFilteredLayer = localStorage.getItem(LOCAL_STORAGE_FILTERED_LAYER);
  if (savedFilteredLayer) {
    const parsedSavedFilteredLayer = JSON.parse(savedFilteredLayer);
    if (typeof parsedSavedFilteredLayer === 'number') {
      return parsedSavedFilteredLayer;
    }
  }
  return undefined;
};

const getSavedKeyCircles = (): KeyCircleConfig[] | undefined => {
  const savedKeyCircles = localStorage.getItem(LOCAL_STORAGE_KEY_CIRCLES);
  if (savedKeyCircles) {
    const parsedSavedKeyCircles = JSON.parse(savedKeyCircles);
    if (Array.isArray(parsedSavedKeyCircles)) {
      return parsedSavedKeyCircles;
    }
  }
  return undefined;
};

const SolverPage = () => {
  const [activeDifficulty, setActiveDifficulty] = useState(
    getSavedActiveDifficulty() ?? Difficulty.Novice
  );
  const [filteredLayer, setFilteredLayer] = useState(getSavedFilteredLayer() ?? 0);
  const [keyCircles, setKeyCircles] = useState<KeyCircleConfig[]>(
    getSavedKeyCircles() ?? DEFAULT_KEY_CIRCLES
  );

  const totalKeys = TOTAL_KEYS_BY_DIFFICULTY[activeDifficulty];
  const totalLayers = TOTAL_LAYERS_BY_DIFFICULTY[activeDifficulty];

  const handleResetClick = () => {
    setKeyCircles(DEFAULT_KEY_CIRCLES);
    setFilteredLayer(0);
  };

  const handleKeyCircleLayerChange = (keyNumber: number, newLayer: number) => {
    setKeyCircles(oldKeyCircles => {
      const newKeyCircles = [...oldKeyCircles];
      newKeyCircles[keyNumber] = {
        ...newKeyCircles[keyNumber],
        activeLayerNumber: newLayer,
      };
      return newKeyCircles;
    });
  };

  const handleKeyCircleVerifyChange = (keyNumber: number, isVerified: boolean) => {
    setKeyCircles(oldKeyCircles => {
      const newKeyCircles = [...oldKeyCircles];
      newKeyCircles[keyNumber] = {
        ...newKeyCircles[keyNumber],
        isVerified,
      };
      return newKeyCircles;
    });
  };

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_ACTIVE_DIFFICULTY, JSON.stringify(activeDifficulty));
    localStorage.setItem(LOCAL_STORAGE_FILTERED_LAYER, JSON.stringify(filteredLayer));
    localStorage.setItem(LOCAL_STORAGE_KEY_CIRCLES, JSON.stringify(keyCircles));
  }, [activeDifficulty, filteredLayer, keyCircles]);

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
            onActiveLayerChange={(newLayer: number) => handleKeyCircleLayerChange(i, newLayer)}
            onVerifyChange={(isVerified: boolean) => handleKeyCircleVerifyChange(i, isVerified)}
          />
        ))}
      </div>
      <div className={styles.footerLinkWrapper}>
        <span>⭐</span>
        <Link to={AppRoutes.AutoSolver} className="link">
          Try the new auto solver!
        </Link>
      </div>
    </div>
  );
};

export default SolverPage;
