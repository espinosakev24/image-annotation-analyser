import { toast } from 'react-toastify';

export const notify = (
  message: string,
  type: 'success' | 'error' | 'info' | 'warning'
) => {
  toast(message, { type, position: 'top-center' });
};
