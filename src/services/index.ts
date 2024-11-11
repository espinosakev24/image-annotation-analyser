import { Annotation, Category, ImageRepresentation } from '../types';
import { fetchHandler } from '../utils/fetchHandler';

// URLs can be imported from .env like this: import.meta.env.VITE_APP_API_URL;
// for practical usage will hardcode them

export const getImages = () =>
  fetchHandler<ImageRepresentation[]>(
    'https://5f2f729312b1481b9b1b4eb9d00bc455.api.mockbin.io/unanalyzed-images'
  );

export const getCategories = () =>
  fetchHandler<Category[]>(
    'https://f6fe9241e02b404689f62c585d0bd967.api.mockbin.io/categories'
  );

export const submitBoxes = (imageId: number, annotations: Annotation[]) =>
  fetchHandler(
    'https://eb1b6f8bfab448df91c68bd442d6a968.api.mockbin.io/annotations',
    {
      method: 'POST',
      body: {
        imageId,
        annotations,
      },
    }
  );

export const discardBoxes = (imageId: number) =>
  fetchHandler(
    'https://eb1b6f8bfab448df91c68bd442d6a968.api.mockbin.io/annotations',
    {
      method: 'POST',
      body: {
        imageId,
        annotations: [],
      },
    }
  );
