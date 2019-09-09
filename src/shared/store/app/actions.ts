import { Locale } from './types';

export enum AppActions {
    SET_LOCALE = 'app/set-locale',
}

export const setLocale = (locale: Locale) => ({
    type: AppActions.SET_LOCALE,
    payload: locale,
});
