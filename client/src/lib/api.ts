import ky, { type KyInstance, type Options } from 'ky';
import useSWR, { type SWRConfiguration, type SWRResponse } from 'swr';

// Configure ky instance with default options
const rmndApiClient: KyInstance = ky.create({
  prefixUrl: 'http://localhost:4000',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  hooks: {
    beforeRequest: [
      (request) => {
        // Add authorization token if available
        const token = localStorage.getItem('token');
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
  },
});

// GET request
export async function get<T>(url: string, options?: Options): Promise<T> {
  return rmndApiClient.get(url, options).json<T>();
}

// POST request
export async function post<T>(
  url: string,
  data?: unknown,
  options?: Options
): Promise<T> {
  return rmndApiClient.post(url, { json: data, ...options }).json<T>();
}

// PUT request
export async function put<T>(
  url: string,
  data?: unknown,
  options?: Options
): Promise<T> {
  return rmndApiClient.put(url, { json: data, ...options }).json<T>();
}

// DELETE request
export async function del<T>(url: string, options?: Options): Promise<T> {
  return rmndApiClient.delete(url, options).json<T>();
}

// SWR hook for GET requests with type safety
export function useGet<T>(
  url: string | null,
  options?: Options,
  swrOptions?: SWRConfiguration<T>
): SWRResponse<T> {
  return useSWR<T>(
    url,
    async (key: string) => get<T>(key, options),
    swrOptions
  );
}

// SWR hook with custom fetcher
export function useFetch<T>(
  key: string | null,
  fetcher: () => Promise<T>,
  options?: SWRConfiguration<T>
): SWRResponse<T> {
  return useSWR<T>(key, fetcher, options);
}

// Export the configured ky instance for direct use
export { rmndApiClient };
