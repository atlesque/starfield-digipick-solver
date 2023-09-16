import { useCallback, useEffect, useMemo } from 'react'
import { MAX_PRONGS } from '../constants'
import { useAutoSolver } from './useAutoSolver'
import { COLOR_GAP_GREEN, COLOR_GAP_WHITE, COLOR_NO_PRONG, COLOR_PRONG, COLOR_PUZZLE_NO_PRONG, COLOR_PUZZLE_NO_PRONG_LAYER_ACTIVE, COLOR_PUZZLE_NO_PRONG_LAYER_INACTIVE, COLOR_PUZZLE_PRONG } from '../styles/palette'

export interface DrawOptions {
  prongs: number[]
  isPuzzle?: boolean
  illustrateGaps?: boolean
}

const PI = Math.PI;

export const useCanvasDraw = (canvasRef: React.RefObject<HTMLCanvasElement>, {
  prongs,
  isPuzzle,
  illustrateGaps
}: DrawOptions) => {
  const { puzzle, solved, activeLayer, guides, gapIllustrationMode } = useAutoSolver();

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

    // Center points of circle
    const x = canvas.width / 2;
    const y = canvas.height / 2;

    // Radius of ring with some padding
    const radius = canvas.height / 2 - 10;

    // Set origin to north (0 = East, 2*PI = 360deg)
    const origin = 1.5 * PI;

    // Individual prong offset size is 360deg / max prongs
    const prongOffsetSize = 2 * PI / MAX_PRONGS;

    // Prong width
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
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      if (illustrateGaps && gapIllustrationMode !== 'none') {
        let ordered: number[] = [];
        for (const p of prongs.keys()) {
          ordered.push(p);
        }
        ordered.sort((a, b) => a - b);

        ordered.forEach((p, i) => {
          const gap = 0.12;
          const a = p - 1;
          const b = (ordered[i + 1] ?? (ordered[0] + MAX_PRONGS)) - 1;
          const start = origin + a * prongOffsetSize + gap;
          const end = origin + b * prongOffsetSize - gap;
          const gapRadius = radius - 9;

          ctx.beginPath();
          ctx.arc(x, y, gapRadius, start, end);
          ctx.lineWidth = 2;
          const color = (() => {
            if (ordered.length === 3) {
              return i === 0 ? COLOR_GAP_GREEN : COLOR_GAP_WHITE;
            } else if (ordered.length === 2) {
              return COLOR_GAP_WHITE;
            } else {
              return i % 2 === 0 ? COLOR_GAP_GREEN : COLOR_GAP_WHITE;
            }
          })();
          ctx.strokeStyle = color;
          ctx.stroke();

          if (gapIllustrationMode !== 'numbers') {
            return;
          }
          
          // Calculate the average angle
          const averageAngle = (start + end) / 2;

          // Calculate the x and y coordinates
          const textX = x + (gapRadius + 10) * Math.cos(averageAngle);
          const textY = y + (gapRadius + 10) * Math.sin(averageAngle);

          const gapSize = b - a;
          if (gapSize > 2) {
            ctx.fillStyle = color;
            ctx.font = '12px Courier New';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(gapSize.toString(), textX, textY);
          }
        });
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
  }, [canvasRef, prongMap, isPuzzle, puzzle, solved, activeLayer, guides, illustrateGaps, gapIllustrationMode]);

  useEffect(() => {
    draw();
  }, [draw]);

  return {
    draw
  }
}