'use client';

import { useQuery, UseQueryOptions, QueryKey } from '@tanstack/react-query';

export function useFetchQuery<TData = any>(
  url: string,
  queryKey: QueryKey,
  queryParams?: Record<string, any>,
  initialData?: TData,
  queryOptions?: UseQueryOptions<TData>
) {
  const queryFn = async (): Promise<TData> => {
    // Append queryParams to the URL if provided
    let finalUrl = url;
    if (queryParams) {
      const params = new URLSearchParams();
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, String(value));
        }
      });
      finalUrl += `?${params.toString()}`;
    }

    const response = await fetch(finalUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch from ${finalUrl}`);
    }

    return response.json() as Promise<TData>;
  };

  return useQuery<TData>({ ...queryOptions, queryKey, queryFn, initialData });
}
