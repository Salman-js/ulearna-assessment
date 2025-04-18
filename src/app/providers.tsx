'use client';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import NextTopLoader from 'nextjs-toploader';
import { useTheme } from 'next-themes';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  const { theme } = useTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <NextTopLoader color={theme === 'light' ? '#18181b' : '#fafafa'} />
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
