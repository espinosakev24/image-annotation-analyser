import { BoundingBox, Point } from '../types';

export const normalizePoint = (canvas: HTMLCanvasElement, point: Point) => {
  const canvasViewportPos = canvas.getBoundingClientRect();

  return {
    x: point.x - canvasViewportPos.left,
    y: point.y - canvasViewportPos.top,
  };
};

export const drawRect = (
  canvas: HTMLCanvasElement,
  start: Point,
  end: Point,
  color?: string
) => {
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  if (!ctx) return;

  ctx.beginPath();

  const width = end.x - start.x;
  const heigth = end.y - start.y;

  ctx.lineWidth = 3;

  ctx.strokeStyle = color || '';

  ctx?.rect(start.x, start.y, width, heigth);
  ctx?.stroke();
};

export const drawBoundingBoxes = (
  canvas: HTMLCanvasElement,
  boxes: BoundingBox[]
) => {
  const ctx = canvas.getContext('2d');

  if (!ctx) return;

  boxes.forEach(({ topLeftX, topLeftY, width, height, color }) => {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = color || '';
    ctx.rect(topLeftX, topLeftY, width, height);
    ctx.stroke();
    ctx.closePath();
  });
};

export const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
