import useAutoSolver from '../../../hooks/useAutoSolver';
import Button from '../button/Button';
import Key from './Key';
import styles from './Puzzle.module.scss';

const Puzzle = () => {
  const { guides, setGuides, mobileOffset, setMobileOffset } = useAutoSolver();

  return (
    <div className={styles.puzzleWrapper}>
      <div className={styles.options}>
        <Button onClick={() => setMobileOffset(o => !o)}>
          {mobileOffset ? 'Disable Mobile Offset' : 'Enable Mobile Offset'}
        </Button>
        <Button onClick={() => setGuides(g => !g)}>{guides ? 'Hide Guides' : 'Show Guides'}</Button>
      </div>
      <div className={styles.puzzle}>
        <Key isPuzzle />
      </div>
    </div>
  );
};

export default Puzzle;
