import { ChangeEvent } from 'react';
import { Category } from '../../types';
import { CategoryItem } from './CategoryItem';

import styles from './styles.module.css';

type CategoriesListProps = {
  categories: Category[];
  searchValue: string;
  selectedCategory: Category | null | undefined;
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  onSelectCategory: (id: number, name: string, color?: string) => void;
};

export const CategoriesList = ({
  categories,
  searchValue,
  selectedCategory,
  onSearch,
  onSelectCategory,
}: CategoriesListProps) => {
  return (
    <div>
      <div className={styles.searchInput}>
        <input placeholder="Search category" onChange={onSearch} />
      </div>

      <div className={styles.categoriesContainer}>
        {categories
          .filter(({ name }) =>
            name.toLowerCase().includes(searchValue.toLocaleLowerCase())
          )
          .map(({ id, name, color }) => (
            <CategoryItem
              key={id}
              id={id}
              name={name}
              color={color}
              isSelected={selectedCategory?.id === id}
              onSelectCategory={onSelectCategory}
            />
          ))}
      </div>
    </div>
  );
};
