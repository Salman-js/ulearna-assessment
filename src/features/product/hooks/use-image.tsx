'use client';

import { useTheme } from 'next-themes';

export function useDefaultImageColor() {
  const { theme } = useTheme();
  return theme === 'dark' ? 'black' : 'white';
}
