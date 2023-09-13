import { FC, SetStateAction, useEffect, useState } from 'react'
import styles from './Key.module.scss'
import { useCanvasManager } from '../../../hooks/useCanvasManager'
import { Puzzle } from '../../../types/Puzzle'

interface KeyProps {
  prongs?: number[]
  puzzle?: Puzzle
  setPuzzle?: React.Dispatch<SetStateAction<Puzzle>>
  rotation?: number
  onClick?: (prongs: number[]) => void
}
export const Key: FC<KeyProps> = ({
  prongs = [],
  puzzle,
  setPuzzle,
  rotation: _rotation = 0,
  onClick
}) => {
  const [rotation, setRotation] = useState(_rotation);
  const { canvasRef, wrapperRef } = useCanvasManager({ prongs, puzzle, setPuzzle, rotation });

  useEffect(() => {
    setRotation(_rotation);
  }, [_rotation, prongs]);

  return (
    <div ref={wrapperRef} onClick={() => onClick && onClick(prongs)} className={styles.root}>
      <canvas ref={canvasRef} />
      {!prongs.length && !puzzle && (
        <div className={styles.warning}>
          <span>!</span>
        </div>
      )}
    </div>
  )
}
