import React, { FC, useCallback, useEffect, useState } from 'react'
import styles from './Key.module.scss'
import { useCanvasManager } from '../../../hooks/useCanvasManager'
import { MAX_PRONGS } from '../../../constants'
import { Puzzle } from '../../../types/Puzzle'

interface KeyProps {
  prongs?: number[]
  puzzle?: Puzzle
  rotation?: number
  onClick?: (prongs: number[]) => void
}
export const Key: FC<KeyProps> = ({
  prongs = [],
  puzzle,
  rotation: _rotation = 0,
  onClick
}) => {
  const [rotation, setRotation] = useState(_rotation);
  const { canvasRef, wrapperRef } = useCanvasManager({ prongs, puzzle, rotation });

  useEffect(() => {
    setRotation(_rotation);
  }, [_rotation, prongs]);

  const onScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const onWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    e.stopPropagation();

    setRotation(r => {
      r += e.deltaY < 0 ? 1 : -1;
      if (r > MAX_PRONGS - 1) return 0;
      if (r < 0) return MAX_PRONGS - 1;
      return r;
    })
  }, [])

  return (
    <div ref={wrapperRef} onClick={() => onClick && onClick(prongs)} onWheel={onWheel} onScroll={onScroll} className={styles.root}>
      <canvas ref={canvasRef} />
      {!prongs.length && !puzzle && (
        <div className={styles.warning}>
          <span>!</span>
        </div>
      )}
    </div>
  )
}
