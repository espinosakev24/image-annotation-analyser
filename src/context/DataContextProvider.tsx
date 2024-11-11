import { createContext, ReactNode, useContext, useState } from 'react';
import { Annotation, BoundingBox } from '../types';

type DataContextProps = {
  addBoxToAnnotation(id: number, box: BoundingBox): void;
  annotations: Annotation[];
  discardAnnotations(): void;
};

const DataContext = createContext<DataContextProps>({
  addBoxToAnnotation: () => {},
  annotations: [],
  discardAnnotations: () => {},
});

export const useDataContext = () => useContext(DataContext);

type DataContextProviderProps = {
  children: ReactNode;
};

export const DataContextProvider = ({ children }: DataContextProviderProps) => {
  const [annotations, setAnnotations] = useState<Annotation[]>([]);

  const addBoxToAnnotation = (id: number, box: BoundingBox) => {
    setAnnotations((s) => {
      const existingAnnotation = s.find(
        (annotation) => annotation.categoryId === id
      );

      if (existingAnnotation) {
        return s.map((annotation) =>
          annotation.categoryId === id
            ? {
                ...annotation,
                boundingBoxes: [...annotation.boundingBoxes, box],
              }
            : annotation
        );
      } else {
        return [...s, { categoryId: id, boundingBoxes: [box] }];
      }
    });
  };

  const discardAnnotations = () => {
    setAnnotations([]);
  };

  return (
    <DataContext.Provider
      value={{ addBoxToAnnotation, annotations, discardAnnotations }}
    >
      {children}
    </DataContext.Provider>
  );
};
