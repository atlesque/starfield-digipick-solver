import { Dispatch, SetStateAction } from 'react';
import DifficultySelector from '../difficulty/DifficultySelector';
import styles from './Settings.module.scss';
import { Difficulty } from '../../../constants';
import LayerSelector from '../layer/LayerSelector';

interface SettingsProps {
  activeDifficulty: Difficulty;
  setActiveDifficulty: Dispatch<SetStateAction<Difficulty>>;
  handleResetClick: () => void;
  filteredLayer?: number;
  totalLayers?: number;
  setFilteredLayer?: (layer: number) => void;
}

const Settings = ({
  activeDifficulty,
  handleResetClick,
  setActiveDifficulty,
  filteredLayer,
  setFilteredLayer,
  totalLayers,
}: SettingsProps) => (
  <div className={styles.settings}>
    <DifficultySelector activeDifficulty={activeDifficulty} onChange={setActiveDifficulty} />
    <div className={styles.settingsRow}>
      {(filteredLayer === 0 || !!filteredLayer) && setFilteredLayer && totalLayers && (
        <LayerSelector
          activeLayer={filteredLayer}
          totalLayers={totalLayers}
          onChange={setFilteredLayer}
        />
      )}
      <button type="button" className={styles.resetButton} onClick={handleResetClick}>
        Reset
      </button>
    </div>
  </div>
);

export default Settings;
