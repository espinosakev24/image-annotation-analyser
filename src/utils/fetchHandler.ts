import { notify } from './notifications';

type FetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: HeadersInit;
};

export const fetchHandler = async <T>(
  url: string,
  options: FetchOptions = {}
): Promise<T> => {
  try {
    const response = await fetch(url, {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
      // for now I just throw an error for 404 and a default one
      // but we can handle different status codes :)
      switch (response.status) {
        case 404:
          throw new Error('Not found');
        default:
          throw new Error(`HTTP error! status: ${response.status}`);
      }
    }

    const data = await response.json();

    return data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An error occurred';
    notify(errorMessage, 'error');
    throw error;
  }
};
