import styles from './styles.module.css';

type ActionButtonsProps = {
  onConfirm: () => void;
  onDiscard: () => void;
  confirmDisabled: boolean;
};

export const ActionButtons = ({
  onConfirm,
  onDiscard,
  confirmDisabled,
}: ActionButtonsProps) => {
  return (
    <div className={styles.buttons}>
      <button onClick={onDiscard}>Discard</button>
      <button onClick={onConfirm} disabled={confirmDisabled}>
        Confirm
      </button>
    </div>
  );
};
