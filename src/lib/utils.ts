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
