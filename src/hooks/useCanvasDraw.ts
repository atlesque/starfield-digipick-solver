import { useCallback, useEffect, useMemo } from 'react'
import { MAX_PRONGS } from '../constants'
import { useAutoSolver } from './useAutoSolver'
import { COLOR_NO_PRONG, COLOR_PRONG, COLOR_PUZZLE_NO_PRONG, COLOR_PUZZLE_NO_PRONG_LAYER_ACTIVE, COLOR_PUZZLE_NO_PRONG_LAYER_INACTIVE, COLOR_PUZZLE_PRONG } from '../styles/palette'

export interface DrawOptions {
  prongs: number[]
  isPuzzle?: boolean
}

export const useCanvasDraw = (canvasRef: React.RefObject<HTMLCanvasElement>, {
  prongs,
  isPuzzle
}: DrawOptions) => {
  const { puzzle, solved, activeLayer, guides } = useAutoSolver();

  const prongMap = useMemo(() => {
    const s = new Set<number>();
    prongs.forEach(prong => s.add(prong))
    return s;
  }, [prongs]);

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
    const prongWidth = isPuzzle ? 0.08 : 0.06;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const renderProngs = (prongs: Set<number>, depth: number = 0) => {
      // 1-32
      for (let i = 1; i <= MAX_PRONGS; i++) {
        const offset = (i - 1) * prongOffsetSize;
        if (prongs.has(i)) {
          ctx.lineWidth = 13;
          ctx.strokeStyle = (() => {
            if (isPuzzle) return COLOR_PUZZLE_PRONG;

            return COLOR_PRONG;
          })()
        } else {
          ctx.lineWidth = isPuzzle ? 13 : 7;
          ctx.strokeStyle = (() => {
            if (isPuzzle && !solved && activeLayer === (depth + 1).toString()) {
              return COLOR_PUZZLE_NO_PRONG_LAYER_ACTIVE;
            }

            if (isPuzzle && !solved && activeLayer && activeLayer !== (depth + 1).toString()) {
              return COLOR_PUZZLE_NO_PRONG_LAYER_INACTIVE;
            }

            if (isPuzzle) {
              return COLOR_PUZZLE_NO_PRONG;
            }

            return COLOR_NO_PRONG;
          })();
        }
        ctx.beginPath();
        ctx.arc(x, y, radius - (depth * 20), origin - prongWidth + offset, origin + prongWidth + offset);
        ctx.stroke();

        if (isPuzzle && guides && i % 2 === 0) {
          ctx.beginPath();
          const x1 = x + radius * Math.cos(origin + offset) / 3;
          const y1 = y + radius * Math.sin(origin + offset) / 3;
          const x2 = x + radius * Math.cos(origin + offset);
          const y2 = y + radius * Math.sin(origin + offset);
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = 'orange';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
    
    if (!isPuzzle) {
      renderProngs(prongMap);
    } else {
      puzzle.layers.forEach((layer, i) => {
        const set = new Set<number>();
        layer.forEach(n => set.add(n));
        renderProngs(set, i);
      })
    }
  }, [canvasRef, prongMap, isPuzzle, puzzle, solved, activeLayer, guides]);

  useEffect(() => {
    draw();
  }, [draw]);

  return {
    draw
  }
}