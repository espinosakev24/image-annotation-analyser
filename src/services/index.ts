import { Annotation } from '../types';

export const getImages = () =>
  fetch(
    'https://5f2f729312b1481b9b1b4eb9d00bc455.api.mockbin.io/unanalyzed-images'
  ).then((res) => res.json());

export const getCategories = () =>
  fetch(
    'https://f6fe9241e02b404689f62c585d0bd967.api.mockbin.io/categories'
  ).then((res) => res.json());

export const submitBoxes = (imageId: number, annotations: Annotation[]) =>
  fetch('https://eb1b6f8bfab448df91c68bd442d6a968.api.mockbin.io/annotations', {
    method: 'POST',
    body: JSON.stringify({
      imageId,
      annotations,
    }),
  }).then((res) => res.json());

export const discardBoxes = (imageId: number) =>
  fetch('https://eb1b6f8bfab448df91c68bd442d6a968.api.mockbin.io/annotations', {
    method: 'POST',
    body: JSON.stringify({
      imageId,
      annotations: [],
    }),
  }).then((res) => res.json());
