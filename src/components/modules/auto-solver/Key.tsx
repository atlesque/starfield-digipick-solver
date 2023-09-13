import { FC, useEffect, useState } from 'react'
import styles from './Key.module.scss'
import { useCanvasManager } from '../../../hooks/useCanvasManager'

interface KeyProps {
  prongs?: number[]
  isPuzzle?: boolean
  rotation?: number
  onClick?: (prongs: number[]) => void
}
export const Key: FC<KeyProps> = ({
  prongs = [],
  isPuzzle = false,
  rotation: _rotation = 0,
  onClick
}) => {
  const [rotation, setRotation] = useState(_rotation);
  const { canvasRef, wrapperRef } = useCanvasManager({
    prongs,
    isPuzzle,
    rotation
  });

  useEffect(() => {
    setRotation(_rotation);
  }, [_rotation, prongs]);

  return (
    <div ref={wrapperRef} onClick={() => onClick && onClick(prongs)} className={styles.root}>
      <canvas ref={canvasRef} />
      {!prongs.length && !isPuzzle && (
        <div className={styles.warning}>
          <span>!</span>
        </div>
      )}
    </div>
  )
}
