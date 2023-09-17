import clsx from 'clsx';
import styles from './Key.module.scss';
import useCanvasManager from '../../../hooks/useCanvasManager';
import useAutoSolver from '../../../hooks/useAutoSolver';

interface KeyProps {
  prongs?: number[];
  isPuzzle?: boolean;
  illustrateGaps?: boolean;
  layer?: string;
  active?: boolean;
  onClick?: (prongs: number[]) => void;
}

const Key = ({
  prongs = [],
  isPuzzle = false,
  illustrateGaps = false,
  layer,
  active = false,
  onClick,
}: KeyProps) => {
  const { canvasRef, wrapperRef } = useCanvasManager({
    prongs,
    isPuzzle,
    illustrateGaps,
  });

  const { activeLayer, solved } = useAutoSolver();

  return (
    <button
      type="button"
      ref={wrapperRef}
      onClick={() => onClick && onClick(prongs)}
      className={clsx(styles.root, {
        [styles.active]: active,
        [styles.hidden]: !isPuzzle && solved && !!activeLayer && activeLayer !== layer,
        [styles.unused]: !isPuzzle && solved && activeLayer !== 'X' && layer === 'X',
      })}
    >
      <canvas ref={canvasRef} />
      {!prongs.length && !isPuzzle && (
        <div className={styles.warning}>
          <span>!</span>
        </div>
      )}
      {layer === 'X' && (
        <div className={styles.warning}>
          <span>X</span>
        </div>
      )}
      {layer !== 'X' && !!layer && (
        <div className={clsx(styles.warning, styles.success)}>
          <span>{layer}</span>
        </div>
      )}
    </button>
  );
};

export default Key;
