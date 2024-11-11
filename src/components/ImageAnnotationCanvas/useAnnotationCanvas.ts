import { useState, MouseEvent, useEffect } from 'react';
import { BoundingBox, Category, Point } from '../../types';
import { drawBoundingBoxes, drawRect, normalizePoint } from '../../utils/draw';
import { toast } from 'react-toastify';
import { useDataContext } from '../../context';

type UseAnnotationCanvaProps = {
  canvas: HTMLCanvasElement | null;
  image?: HTMLImageElement | null;
  category?: Category | null;
};

export const useAnnotationCanva = ({
  canvas,
  image,
  category,
}: UseAnnotationCanvaProps) => {
  const [drawing, setDrawing] = useState(false);
  const [start, setStart] = useState<Point>({ x: 0, y: 0 });
  const [boundingBoxes, setBoundingBoxes] = useState<BoundingBox[]>([]);

  const { addBoxToAnnotation, annotations } = useDataContext();

  useEffect(() => {
    setBoundingBoxes([]);
  }, [image]);

  useEffect(() => {
    if (!image) return;

    if (!annotations.length) {
      setBoundingBoxes([]);
      clearCanvas();
      drawImage(image);
    }
  }, [annotations, image]);

  const drawImage = (image: HTMLImageElement | null) => {
    if (!(canvas && image)) return;

    const ctx = canvas?.getContext('2d');

    const scale = Math.min(
      canvas.width / image.width,
      canvas.height / image.height
    );

    const width = image.width * scale;
    const height = image.height * scale;
    const x = canvas.width / 2 - width / 2;
    const y = canvas.height / 2 - height / 2;

    ctx?.drawImage(image, x, y, width, height);
  };

  const onMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!canvas) return;

    if (!category) {
      toast('Select a category before labeling', {
        type: 'warning',
        position: 'top-center',
      });
      return;
    }

    const normalizedStart = normalizePoint(canvas, {
      x: e.clientX,
      y: e.clientY,
    });

    setStart(normalizedStart);
    setDrawing(true);
  };

  const onMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!(drawing && canvas && category)) return;

    const normalizedEnd = normalizePoint(canvas, {
      x: e.clientX,
      y: e.clientY,
    });

    clearCanvas();
    drawImage(image as HTMLImageElement);
    drawRect(canvas, start, normalizedEnd, category.color);
    drawBoundingBoxes(canvas, boundingBoxes);
  };

  const onMouseUp = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!(canvas && category)) return;

    setDrawing(false);

    const normalizedEnd = normalizePoint(canvas, {
      x: e.clientX,
      y: e.clientY,
    });

    const newBox = {
      topLeftX: start.x,
      topLeftY: start.y,
      width: normalizedEnd.x - start.x,
      height: normalizedEnd.y - start.y,
    };

    setBoundingBoxes((s) => [...s, { ...newBox, color: category.color }]);

    addBoxToAnnotation(category?.id, newBox);
  };

  const clearCanvas = () => {
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    ctx?.clearRect(0, 0, canvas.width, canvas.height);
  };

  return {
    drawImage,
    clearCanvas,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    boundingBoxes,
  };
};
