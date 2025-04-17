import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRouteTitle(route: string): string {
  const pureRoutes = route.toString().split('/');
  const routeName = pureRoutes[1];
  const routeTitle = routeName.charAt(0).toUpperCase() + routeName.slice(1);
  return routeTitle.trim().length ? routeTitle : 'Dashboard';
}

export function formatCurrency(num: number | string | undefined): string {
  const value = roundNumber(Number(num ?? 0));
  return value
    ? value.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : '0.00';
}

export function roundNumber(num: number): number {
  return Math.round(num * 100) / 100;
}
export function getRandomNumber(min: number, max: number) {
  if (min > max) {
    [min, max] = [max, min];
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}
