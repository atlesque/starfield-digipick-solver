import React, { FC, useCallback, useEffect, useState } from 'react'
import styles from './Key.module.scss'
import { useCanvasManager } from '../../../hooks/useCanvasManager'
import { MAX_PRONGS } from '../../../constants'

interface KeyProps {
  prongs?: number[]
  inverted?: boolean
  rotation?: number
}
export const Key: FC<KeyProps> = ({
  prongs = [],
  inverted = false,
  rotation: _rotation = 0
}) => {
  const [rotation, setRotation] = useState(_rotation);
  const { canvasRef, wrapperRef } = useCanvasManager({ prongs, inverted, rotation });

  useEffect(() => {
    setRotation(_rotation);
  }, [_rotation]);

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
    <div ref={wrapperRef} onWheel={onWheel} onScroll={onScroll} className={styles.root}>
      <canvas width="0" height="0" ref={canvasRef} />
    </div>
  )
}
