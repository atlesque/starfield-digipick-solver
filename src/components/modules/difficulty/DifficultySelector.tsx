import clsx from 'clsx';
import { Difficulty } from '../../../constants';
import styles from './DifficultySelector.module.scss';

interface DifficultySelectorProps {
  activeDifficulty: Difficulty;
  onChange: (difficulty: Difficulty) => void;
}

const DifficultySelector = ({ activeDifficulty, onChange }: DifficultySelectorProps) => (
  <div className={styles.root}>
    <h1 className={styles.title}>Security level</h1>
    <div className={styles.difficultyList}>
      {Object.values(Difficulty).map(difficulty => (
        <button
          type="button"
          key={difficulty}
          className={clsx(styles.difficulty, {
            [styles.activeDifficulty]: difficulty === activeDifficulty,
          })}
          onClick={() => onChange(difficulty)}
        >
          {difficulty}
        </button>
      ))}
    </div>
  </div>
);

export default DifficultySelector;
