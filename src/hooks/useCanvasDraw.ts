import { useCallback, useEffect, useMemo } from 'react'
import { MAX_PRONGS } from '../constants'

export interface DrawOptions {
  prongs: number[]
  inverted: boolean
  rotation: number
}

export const useCanvasDraw = (canvasRef: React.RefObject<HTMLCanvasElement>, { prongs, rotation }: DrawOptions) => {
  const prongMap = useMemo(() => {
    const s = new Set<number>();
    prongs.forEach(prong => {
      // turn prong into index, add rotation, mod by max prongs,
      // then convert back to non-index. (+/- 1)
      s.add(((prong - 1 + rotation) % (MAX_PRONGS)) + 1)
    })
    return s;
  }, [prongs, rotation]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const x = canvas.width / 2;
    const y = canvas.height / 2;
    const radius = canvas.height / 2 - 10;
    const PI = Math.PI;
    const origin = -0.5 * PI;
    const prongOffsetSize = 2 * PI / MAX_PRONGS;
    const prongWidth = 0.06;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1-32
    for (let i = 1; i <= MAX_PRONGS; i++) {
      const offset = (i - 1) * prongOffsetSize;
      if (prongMap.has(i)) {
        ctx.lineWidth = 13;
        ctx.strokeStyle = "white";
      } else {
        ctx.lineWidth = 7;
        ctx.strokeStyle = "#373a3a";
      }
      ctx.beginPath();
      ctx.arc(x, y, radius, origin - prongWidth + offset, origin + prongWidth + offset);
      ctx.stroke();
    }
  }, [canvasRef, prongMap]);

  useEffect(() => {
    setTimeout(draw, 0);
  }, [draw]);

  return {
    draw
  }
}