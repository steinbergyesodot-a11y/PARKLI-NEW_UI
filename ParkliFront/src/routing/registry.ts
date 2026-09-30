import { type ComponentType, lazy } from 'react';


export type UserRole = 'admin' | 'user' | 'guest';


export interface RouteEntry {
  path: string;
  component: ComponentType<any>;
  title: string;
  isProtected?: boolean;
  roles?: UserRole[];
}


export const ROUTE_REGISTRY = {
  HOME: {
    path: '/',
    component: lazy(() => import('../pages/HomePage')),
    title: 'Home',
  },
  LOGIN: {
    path: '/login',
    component: lazy(() => import('../pages/LoginPage.tsx')),
    title: 'Login',
  }
} as const;