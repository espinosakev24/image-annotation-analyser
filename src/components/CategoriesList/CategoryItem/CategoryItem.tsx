import styles from './styles.module.css';

type CategoryItemProps = {
  id: number;
  name: string;
  color: string | undefined;
  isSelected?: boolean;
  onSelectCategory: (
    id: number,
    name: string,
    color: string | undefined
  ) => void;
};

export const CategoryItem = ({
  id,
  name,
  color,
  isSelected = false,
  onSelectCategory,
}: CategoryItemProps) => {
  return (
    <div className={styles.categoryItem}>
      <div
        className={styles.colorPoint}
        style={{
          backgroundColor: color,
        }}
      />
      <p
        className={isSelected ? styles.selected : ''}
        onClick={() => onSelectCategory(id, name, color)}
      >
        {name}
      </p>
    </div>
  );
};
