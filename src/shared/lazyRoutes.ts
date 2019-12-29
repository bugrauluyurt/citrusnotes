import loadable from '@loadable/component';

export const Authentication = loadable(() => import('./pages/Authentication'));
export const Browse = loadable(() => import('./pages/Browse'));
export const Settings = loadable(() => import('./pages/Settings'));
