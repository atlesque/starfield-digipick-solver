import { Key } from './Key';
import styles from './Puzzle.module.scss'

export const Puzzle = () => {
  return (
    <div className={styles.puzzle}>
      <Key isPuzzle />
    </div>
  );
}
