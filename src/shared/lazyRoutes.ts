import loadable from '@loadable/component';

export const Authorization = loadable(() => import('./pages/Authorization'));
export const Home = loadable(() => import('./pages/Home'));
export const Settings = loadable(() => import('./pages/Settings'));
