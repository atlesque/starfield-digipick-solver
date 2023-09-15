import { useAutoSolver } from '../../../hooks/useAutoSolver';
import { Button } from '../button/Button';
import { Key } from './Key';
import styles from './Puzzle.module.scss'

export const Puzzle = () => {
  const { guides, setGuides } = useAutoSolver();

  return (
    <div className={styles.puzzleWrapper}>
      <Button onClick={() => setGuides(g => !g)}>{guides ? 'Hide Guides' : 'Show Guides'}</Button>
      <div className={styles.puzzle}>
        <Key isPuzzle />
      </div>
    </div>
  );
}
