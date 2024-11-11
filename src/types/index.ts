export type Rect = {
  x: number;
  y: number;
  w: number;
  h: number;
};

export type Point = {
  x: number;
  y: number;
};

export type Rectangle = {
  start: Point;
  end: Point;
};

export type BoundingBox = {
  topLeftX: number;
  topLeftY: number;
  width: number;
  height: number;
  color?: string;
};

export type Category = {
  id: number;
  name: string;
  color?: string;
};

export type Annotation = {
  categoryId: number;
  boundingBoxes: BoundingBox[];
};

export type RequestData = {
  imageId: number;
  annotations: Annotation[];
};

export type ImageRepresentation = {
  id: number;
  url: string;
};
