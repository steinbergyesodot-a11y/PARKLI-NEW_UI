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
  SIGNUP: {
     path: '/signup',
    component: lazy(() => import('../pages/SignupPage')),
    title: 'Signup', 
  },
  LOGIN: {
    path: '/login',
    component: lazy(() => import('../pages/LoginPage.tsx')),
    title: 'Login',
  },
  DASHBOARD: {
    path: '/dashboard',
    component: lazy(() => import('../pages/DashboardPage.tsx')),
    title: 'Dashboard',
    isProtected: true,
    roles: ['admin', 'user'],
  },
  ABOUT: {
    path: '/about',
    component: lazy(() => import('../pages/AboutPage')),
    title: 'About',
  },
 HELP:{
    path: '/help',
    component: lazy(() => import('../pages/HelpPage')),
    title: 'Help',
  },
  BECOME_HOST: {
    path: '/become-host',
    component: lazy(() => import('../pages/BecomeHostPage.tsx')),
    title: 'Become Host',
    isProtected: true,
    roles: ['admin', 'user'],
  },
  MY_BOOKINGS: {
    path: '/my-bookings',
    component: lazy(() => import('../pages/MyBookingsPage')),
    title: 'My Bookings',
    isProtected: true,
    roles: ['admin', 'user'],
  },
  MY_LISTINGS: {
    path: '/my-listings',
    component: lazy(() => import('../pages/MyListingsPage.tsx')),
    title: 'My Listings',
    isProtected: true,
    roles: ['admin', 'user'],
  }
} as const;