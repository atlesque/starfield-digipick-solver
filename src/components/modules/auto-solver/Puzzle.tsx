import { Puzzle as IPuzzle } from '../../../types/Puzzle';
import { Key } from './Key';
import styles from './Puzzle.module.scss'

interface PuzzleProps {
  puzzle: IPuzzle
  setPuzzle: React.Dispatch<React.SetStateAction<IPuzzle>>
}
export const Puzzle = ({ puzzle, setPuzzle }: PuzzleProps) => {
  return (
    <div className={styles.puzzle}>
      <Key
        puzzle={puzzle}
        setPuzzle={setPuzzle}
      />
    </div>
  );
}
