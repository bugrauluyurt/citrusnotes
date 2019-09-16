import { Locale } from './types';

export enum AppActions {
    SET_LOCALE = 'APP::SET_LOCALE',
}

export const setLocale = (locale: Locale) => ({
    type: AppActions.SET_LOCALE,
    payload: locale,
});
