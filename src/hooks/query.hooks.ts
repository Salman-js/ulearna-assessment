'use client';

import {
  useQuery,
  UseQueryOptions,
  QueryKey,
  UseMutationOptions,
  useMutation,
} from '@tanstack/react-query';

export function useFetchQuery<TData = any>(
  url: string,
  queryKey: QueryKey,
  queryParams?: Record<string, any>,
  initialData?: TData,
  queryOptions?: UseQueryOptions<TData>
) {
  const queryFn = async (): Promise<TData> => {
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

type Method = 'get' | 'post' | 'put' | 'delete' | 'patch';
export const useMutate = <TData = any, TVariables = any>(
  url: string,
  method: Method = 'post',
  mutationOptions?: UseMutationOptions<TData, any, TVariables, unknown>,
  contentTypes?: string | string[]
) => {
  const mutationFn = async (variables: TVariables) => {
    const headers: HeadersInit = {
      'Content-Type':
        (Array.isArray(contentTypes) ? contentTypes[0] : contentTypes) ??
        'application/json',
    };

    const config: RequestInit = {
      method,
      headers,
      body: variables ? JSON.stringify(variables) : undefined,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data as TData;
  };

  return useMutation<TData, any, TVariables, unknown>({
    mutationFn,
    ...mutationOptions,
  });
};
