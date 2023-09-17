import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { DrawOptions, useCanvasDraw } from './useCanvasDraw';
import useCanvasEdit from './useCanvasEdit';

const useCanvasManager = (opts: DrawOptions) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLButtonElement>(null);

  const { draw } = useCanvasDraw(canvasRef, opts);
  useCanvasEdit(canvasRef, opts.isPuzzle);

  const onResize = useCallback(() => {
    if (!wrapperRef.current || !canvasRef.current) {
      return;
    }

    canvasRef.current.width = 0;
    canvasRef.current.height = 0;

    const rect = wrapperRef.current.getBoundingClientRect();
    const dpr = window.devicePixelRatio ?? 1;

    canvasRef.current.width = Math.floor(rect.width) * dpr;
    canvasRef.current.height = Math.floor(rect.width) * dpr;
    canvasRef.current.style.width = `${Math.floor(rect.width)}px`;
    canvasRef.current.style.height = `${Math.floor(rect.width)}px`;

    draw();
  }, [draw]);

  useLayoutEffect(() => {
    onResize();
    // Intentionally exclude onResize from dependencies.
    // We only want this to be called on initial layout render.
  }, [onResize]);

  useEffect(() => {
    const resize = () => requestAnimationFrame(onResize);
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [onResize]);

  return {
    canvasRef,
    wrapperRef,
  };
};

export default useCanvasManager;
