import styles from './Key.module.scss'
import { useCanvasManager } from '../../../hooks/useCanvasManager'
import clsx from 'clsx'
import { useAutoSolver } from '../../../hooks/useAutoSolver'
import { Dispatch, SetStateAction } from 'react'

interface KeyProps {
  prongs?: number[]
  isPuzzle?: boolean
  illustrateGaps?: boolean
  layer?: string
  edit?: boolean
  rotation?: number
  active?: boolean
  onChangeKey?: Dispatch<SetStateAction<number[]>>
  onClick?: (prongs: number[]) => void
}
export const Key = ({
  prongs = [],
  isPuzzle = false,
  illustrateGaps = false,
  rotation: _rotation = 0,
  edit = false,
  layer,
  active = false,
  onClick,
  onChangeKey
}: KeyProps) => {
  const { canvasRef, wrapperRef } = useCanvasManager({
    prongs,
    isPuzzle,
    illustrateGaps,
    edit,
    onChangeKey
  });

  const { activeLayer, solved } = useAutoSolver();

  return (
    <div ref={wrapperRef} onClick={() => onClick && onClick(prongs)} className={clsx(styles.root, {
      [styles.active]: active,
      [styles.hidden]: !isPuzzle && solved && !!activeLayer && activeLayer !== layer,
      [styles.unused]: !isPuzzle && solved && activeLayer !== 'X' && layer === 'X'
    })}>
      <canvas ref={canvasRef} />
      {!prongs.length && !isPuzzle && !edit && (
        <div className={styles.warning}>
          <span>!</span>
        </div>
      )}
      {layer === 'X' && (
        <div className={styles.warning}>
          <span>X</span>
        </div>
      )}
      {layer === '?' && (
        <div className={clsx(styles.warning, styles.unknown)}>
          <span>?</span>
        </div>
      )}
      {layer !== 'X' && layer !== '?' && !!layer && (
        <div className={clsx(styles.warning, styles.success)}>
          <span>{layer}</span>
        </div>
      )}
    </div>
  )
}
