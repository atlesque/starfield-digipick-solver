import { SetStateAction, useCallback, useEffect, useMemo } from 'react'
import { MAX_PRONGS } from '../constants'
import { Puzzle } from '../types/Puzzle'

export interface DrawOptions {
  prongs: number[]
  puzzle?: Puzzle
  setPuzzle?: React.Dispatch<SetStateAction<Puzzle>>
  rotation: number
}

export const useCanvasDraw = (canvasRef: React.RefObject<HTMLCanvasElement>, { prongs, rotation, puzzle }: DrawOptions) => {
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
    const prongWidth = puzzle ? 0.08 : 0.06;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const renderProngs = (prongs: Set<number>, depth: number = 0) => {
      // 1-32
      for (let i = 1; i <= MAX_PRONGS; i++) {
        const offset = (i - 1) * prongOffsetSize;
        if (prongs.has(i)) {
          ctx.lineWidth = 13;
          ctx.strokeStyle = puzzle ? '#373a3a' : "white";
        } else {
          ctx.lineWidth = puzzle ? 13 : 7;
          ctx.strokeStyle = puzzle ? 'white' : "#373a3a";
        }
        ctx.beginPath();
        ctx.arc(x, y, radius - (depth * 20), origin - prongWidth + offset, origin + prongWidth + offset);
        ctx.stroke();
      }
    }
    
    if (!puzzle) {
      renderProngs(prongMap);
    } else {
      puzzle.layers.forEach((layer, i) => {
        const set = new Set<number>();
        layer.forEach(n => set.add(n));
        renderProngs(set, i);
      })
    }
  }, [canvasRef, prongMap, puzzle]);

  useEffect(() => {
    draw();
  }, [draw]);

  return {
    draw
  }
}