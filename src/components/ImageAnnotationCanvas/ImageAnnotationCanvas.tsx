import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';
import { useAnnotationCanva } from './useAnnotationCanvas';
import { Category } from '../../types';

type ImageAnnotationCanvasProps = {
  imgUrl: string;
  category?: Category | null;
  imageId?: number;
};

export const ImageAnnotationCanvas = ({
  imgUrl,
  category,
}: ImageAnnotationCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  const { drawImage, clearCanvas, onMouseDown, onMouseMove, onMouseUp } =
    useAnnotationCanva({
      canvas: canvasRef.current,
      image,
      category,
    });

  useEffect(() => {
    if (!(imgUrl && canvasRef.current)) return;

    const image = new Image();

    image.src = imgUrl;

    image.onload = () => {
      clearCanvas();
      setImage(image);
      drawImage(image);
    };
  }, [imgUrl]);

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      width={600}
      height={500}
      className={styles.canvas}
    />
  );
};
