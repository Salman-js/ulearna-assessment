'use client';

import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import NextTopLoader from 'nextjs-toploader';
import { useTheme } from 'next-themes';
import { ThemeProvider } from '@/components/theme-provider';

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
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
      <QueryClientProvider client={queryClient}>
        <NextTopLoader color={theme === 'light' ? '#18181b' : '#fafafa'} />
        {children}
      </QueryClientProvider>
    </ThemeProvider>
  );
}
