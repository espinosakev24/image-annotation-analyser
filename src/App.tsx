import { ChangeEvent, useEffect, useState } from 'react';
import './App.css';
import { ImageAnnotationCanvas } from './components';
import {
  discardBoxes,
  getCategories,
  getImages,
  submitBoxes,
} from './services';
import { getRandomColor } from './utils/draw';
import { Category, ImageRepresentation } from './types';
import { useDataContext } from './context';
import { notify } from './utils/notifications';
import { CategoriesList } from './components/CategoriesList';
import { ActionButtons } from './components/ActionButtons';
import { ImageCarousel } from './components/ImageCarousel';

function App() {
  const [currentImage, setCurrentImage] = useState<ImageRepresentation>();
  const [images, setImages] = useState<ImageRepresentation[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [category, setCategory] = useState<Category | null>();
  const { annotations, discardAnnotations } = useDataContext();

  const handleImageClick = (id: number, imgUrl: string) => {
    setCategory(null);
    fetch(imgUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        setCurrentImage({ url, id });
      })
      .catch((error: Error) => {
        notify(error.message, 'error');
      });
  };

  useEffect(() => {
    getImages().then((res) => {
      setImages(res);
    });

    getCategories().then((res) => {
      setCategories(
        res.map((category) => ({
          ...category,
          color: getRandomColor(),
        }))
      );
    });
  }, []);

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const onSelectCategory = (id: number, name: string, color?: string) => {
    setCategory({ id, name, color });
  };

  const onConfirm = () => {
    if (!currentImage) return;

    submitBoxes(currentImage?.id, annotations).then(() => {
      notify('Annotations submitted successfully', 'success');
    });
  };

  const onDiscard = () => {
    if (!currentImage) return;

    discardBoxes(currentImage.id).then(() => {
      discardAnnotations();
    });
  };

  const confirmDisabled = !category || annotations.length === 0;

  return (
    <div>
      <div className="annotations-container">
        <div className="canvas-container">
          <ImageAnnotationCanvas
            imgUrl={currentImage?.url || ''}
            imageId={currentImage?.id}
            category={category}
          />
        </div>
        <div>
          <CategoriesList
            categories={categories}
            searchValue={searchValue}
            selectedCategory={category}
            onSearch={onSearch}
            onSelectCategory={onSelectCategory}
          />
          <ActionButtons
            onConfirm={onConfirm}
            onDiscard={onDiscard}
            confirmDisabled={confirmDisabled}
          />
        </div>
      </div>
      <ImageCarousel images={images} onImageClick={handleImageClick} />
    </div>
  );
}

export default App;
