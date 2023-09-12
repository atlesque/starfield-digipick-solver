import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import { DrawOptions, useCanvasDraw } from './useCanvasDraw';

export const useCanvasManager = (opts: DrawOptions) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { draw } = useCanvasDraw(canvasRef.current, opts);

  const onResize = useCallback(() => {
    if (!wrapperRef.current || !canvasRef.current) return;

    canvasRef.current.width = 0;
    canvasRef.current.height = 0;

    const rect = wrapperRef.current.getBoundingClientRect();

    canvasRef.current.width = Math.floor(rect.width);
    canvasRef.current.height = Math.floor(rect.width);

    draw();
  }, [draw]);

  useLayoutEffect(() => {
    onResize();
  }, [onResize])

  useEffect(() => {
    const resize = () => requestAnimationFrame(onResize);
    window.addEventListener('resize', resize);
    () => window.removeEventListener('resize', resize);
  }, [])

  return {
    canvasRef,
    wrapperRef
  }
}
