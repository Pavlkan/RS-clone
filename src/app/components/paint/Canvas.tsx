import * as React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
// eslint-disable-next-line import/named
import { MuiColorInputValue } from 'mui-color-input';

interface CanvasProps {
  width: number;
  height: number;
  brushColor: MuiColorInputValue;
  brushSize: number;
  tool: string;
  clearTrigger: number;
  saveTrigger: number;
}

type Coordinate = {
  x: number;
  y: number;
};

const CANVAS_BACKGROUND = '#ffffff';

export const Canvas: React.FC<CanvasProps> = ({ width, height, brushColor, brushSize, tool, clearTrigger, saveTrigger }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPainting, setIsPainting] = useState(false);
  const [mouseLocation, setMouseLocation] = useState<Coordinate | undefined>(undefined);
  const [snapshot, setSnapshot] = useState<ImageData | undefined>(undefined);

  const getCoordinates = (event: MouseEvent): Coordinate | undefined => {
    if (!canvasRef.current) {
      return;
    }

    const canvas: HTMLCanvasElement = canvasRef.current;
    const x = event.pageX - canvas.offsetLeft;
    const y = event.pageY - canvas.offsetTop;
    return { x, y };
  };

  const setUpCanvas = (canvas: HTMLCanvasElement) => {
    const context = canvas.getContext('2d');
    if (context) {
      context.fillStyle = CANVAS_BACKGROUND;
      context.fillRect(0, 0, width, height);
      context.fillStyle = brushColor as string;
      setSnapshot(context?.getImageData(0, 0, canvas.width, canvas.height));
    }
  };

  const clean = () => {
    if (!canvasRef.current) {
      return;
    }

    const canvas: HTMLCanvasElement = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    setUpCanvas(canvas);
  };

  const save = () => {
    if (!canvasRef.current) {
      return;
    }

    const canvas: HTMLCanvasElement = canvasRef.current;
    const canvasUrl: string = canvas.toDataURL('image/jpeg', 0.8);
    const createEl = document.createElement('a');
    createEl.href = canvasUrl;
    createEl.download = 'download-this-canvas';
    createEl.click();
    createEl.remove();
  };

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    setUpCanvas(canvas);
  }, []);

  useEffect(() => {
    if (clearTrigger) {
      clean();
    }
  }, [clearTrigger]);

  useEffect(() => {
    if (saveTrigger) {
      save();
    }
  }, [saveTrigger]);

  const startPaint = useCallback((event: MouseEvent) => {
    const coordinates = getCoordinates(event);
    if (coordinates) {
      setIsPainting(true);
      setMouseLocation(coordinates);
    }
  }, []);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener('mousedown', startPaint);

    return () => {
      canvas.removeEventListener('mousedown', startPaint);
    };
  }, [startPaint]);

  const drawLine = useCallback(
    (originalMousePosition: Coordinate, newMousePosition: Coordinate, isEriser = false) => {
      if (!canvasRef.current) {
        return;
      }
      const canvas: HTMLCanvasElement = canvasRef.current;
      const context = canvas.getContext('2d');

      if (context) {
        context.strokeStyle = isEriser ? CANVAS_BACKGROUND : (brushColor as string);
        context.lineJoin = 'round';
        context.lineWidth = brushSize;

        context.beginPath();
        context.moveTo(originalMousePosition.x, originalMousePosition.y);
        context.lineTo(newMousePosition.x, newMousePosition.y);
        context.closePath();

        context.stroke();
        setSnapshot(context?.getImageData(0, 0, canvas.width, canvas.height));
      }
    },
    [brushColor, brushSize],
  );

  const drawRect = useCallback(
    (originalMousePosition: Coordinate, newMousePosition: Coordinate, filled = false) => {
      if (!canvasRef.current) {
        return;
      }
      const canvas: HTMLCanvasElement = canvasRef.current;
      const context = canvas.getContext('2d');
      if (snapshot) {
        context?.putImageData(snapshot, 0, 0);
      }
      if (context) {
        context.lineJoin = 'miter';
        if (filled) {
          context.fillStyle = brushColor as string;
          context.fillRect(
            newMousePosition.x,
            newMousePosition.y,
            originalMousePosition.x - newMousePosition.x,
            originalMousePosition.y - newMousePosition.y,
          );
        } else {
          context.strokeStyle = brushColor as string;
          context.lineWidth = brushSize;
          context.strokeRect(
            newMousePosition.x,
            newMousePosition.y,
            originalMousePosition.x - newMousePosition.x,
            originalMousePosition.y - newMousePosition.y,
          );
        }

        setSnapshot(context?.getImageData(0, 0, canvas.width, canvas.height));
      }
    },
    [brushColor, brushSize, snapshot],
  );

  const drawCircle = useCallback(
    (originalMousePosition: Coordinate, newMousePosition: Coordinate, filled = false) => {
      if (!canvasRef.current) {
        return;
      }
      const canvas: HTMLCanvasElement = canvasRef.current;
      const context = canvas.getContext('2d');
      if (snapshot) {
        context?.putImageData(snapshot, 0, 0);
      }
      if (context) {
        context.lineJoin = 'miter';
        context.beginPath();

        const radius = Math.sqrt(
          Math.pow(originalMousePosition.x - newMousePosition.x, 2) + Math.pow(originalMousePosition.y - newMousePosition.y, 2),
        );
        context.arc(originalMousePosition.x, originalMousePosition.y, radius, 0, 2 * Math.PI);
        if (filled) {
          context.fillStyle = brushColor as string;
          context.fill();
        } else {
          context.strokeStyle = brushColor as string;
          context.lineWidth = brushSize;
          context.stroke();
        }

        setSnapshot(context?.getImageData(0, 0, canvas.width, canvas.height));
      }
    },
    [brushColor, brushSize, snapshot],
  );

  const drawTriangle = useCallback(
    (originalMousePosition: Coordinate, newMousePosition: Coordinate, filled = false) => {
      if (!canvasRef.current) {
        return;
      }
      const canvas: HTMLCanvasElement = canvasRef.current;
      const context = canvas.getContext('2d');
      if (snapshot) {
        context?.putImageData(snapshot, 0, 0);
      }
      if (context) {
        context.lineJoin = 'miter';
        context.beginPath();

        context.moveTo(originalMousePosition.x, originalMousePosition.y);
        context.lineTo(newMousePosition.x, newMousePosition.y);
        context.lineTo(originalMousePosition.x * 2 - newMousePosition.x, newMousePosition.y);
        context.closePath();
        if (filled) {
          context.fillStyle = brushColor as string;
          context.fill();
        } else {
          context.strokeStyle = brushColor as string;
          context.lineWidth = brushSize;
          context.stroke();
        }

        setSnapshot(context?.getImageData(0, 0, canvas.width, canvas.height));
      }
    },
    [brushColor, brushSize, snapshot],
  );

  const paint = useCallback(
    (event: MouseEvent) => {
      if (isPainting) {
        const newMouseLocation = getCoordinates(event);
        if (mouseLocation && newMouseLocation) {
          if (tool === 'brush' || tool === 'eraser') {
            drawLine(mouseLocation, newMouseLocation, tool === 'eraser');
            setMouseLocation(newMouseLocation);
          }

          if (tool === 'rectangle' || tool === 'rectangle-fill') {
            drawRect(mouseLocation, newMouseLocation, tool === 'rectangle-fill');
          }

          if (tool === 'circle' || tool === 'circle-fill') {
            drawCircle(mouseLocation, newMouseLocation, tool === 'circle-fill');
          }

          if (tool === 'triangle' || tool === 'triangle-fill') {
            drawTriangle(mouseLocation, newMouseLocation, tool === 'triangle-fill');
          }
        }
      }
    },
    [isPainting, mouseLocation, tool],
  );

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener('mousemove', paint);
    return () => {
      canvas.removeEventListener('mousemove', paint);
    };
  }, [paint]);

  const exitPaint = useCallback(() => {
    setIsPainting(false);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener('mouseup', exitPaint);
    canvas.addEventListener('mouseleave', exitPaint);
    return () => {
      canvas.removeEventListener('mouseup', exitPaint);
      canvas.removeEventListener('mouseleave', exitPaint);
    };
  }, [exitPaint]);

  return <canvas ref={canvasRef} height={height} width={width} style={{ border: '1px solid' }} />;
};
