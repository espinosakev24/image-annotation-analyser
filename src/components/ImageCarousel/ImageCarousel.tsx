import { responsive } from '../../utils/carouselConfig';
import Carousel from 'react-multi-carousel';
import { ImageRepresentation } from '../../types';
import styles from './styles.module.css';

type ImageCarouselProps = {
  images: ImageRepresentation[];
  onImageClick: (id: number, url: string) => void;
};

export const ImageCarousel = ({ images, onImageClick }: ImageCarouselProps) => {
  return (
    <div className="images-wrapper">
      <Carousel responsive={responsive}>
        {images.map(({ id, url }) => (
          <div
            key={id}
            className={styles.imageContainer}
            onClick={() => onImageClick(id, url)}
          >
            <img src={url} className={styles.carouselImage} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};
