import { FC } from 'react'
import styles from './Key.module.scss'
import { useCanvasManager } from '../../../hooks/useCanvasManager'
import clsx from 'clsx'

interface KeyProps {
  prongs?: number[]
  isPuzzle?: boolean
  layer?: string
  rotation?: number
  onClick?: (prongs: number[]) => void
}
export const Key: FC<KeyProps> = ({
  prongs = [],
  isPuzzle = false,
  rotation: _rotation = 0,
  layer,
  onClick
}) => {
  const { canvasRef, wrapperRef } = useCanvasManager({
    prongs,
    isPuzzle,
  });

  return (
    <div ref={wrapperRef} onClick={() => onClick && onClick(prongs)} className={styles.root}>
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
    </div>
  )
}
