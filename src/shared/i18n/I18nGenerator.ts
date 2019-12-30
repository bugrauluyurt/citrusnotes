import fs from 'fs';
import i18next from 'i18next';
import i18nextXHRBackend from 'i18next-xhr-backend';
import enUS from './locales/en_US/translation.json';

const generateI18next = (isBrowser: boolean): Promise<any> => {
    const languages = ['en_US', 'de_DE'];
    const i18nextOptions = {
        backend: {
            // for all available options read the backend's repository readme file
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
        react: {
            // Must be false until Suspense is supported on the server side
            useSuspense: false,
            wait: true,
        },
        debug: process.env.NODE_ENV === 'development' && isBrowser,
        fallbackLng: 'en_US',
        fallbackNS: ['translation'],
        // This option is necessary to tell i18next to try loading missing resources via
        // i18next-xhr-backend, otherwise no calls will be made if resources are defined.
        partialBundledLanguages: true,
        resources: {
            //de_DE: { translation: deDE },
            en_US: { translation: enUS },
        },
        parseMissingKeyHandler: (missing: any) => {
            if (process.env.NODE_ENV === 'development' && isBrowser) {
                console.warn('MISSING TRANSLATION:', missing);
            }
            return missing;
        },
    };

    if (isBrowser) {
        i18next.use(i18nextXHRBackend);
    } else {
        const restOfLanguages = languages.slice(1, languages.length);
        restOfLanguages.forEach((locale: string) => {
            // @ts-ignore
            i18nextOptions.resources[locale] = { translation: undefined };
            const json = fs.readFileSync(`${__dirname}/locales/${locale}/translation.json`, {
                encoding: 'utf-8',
            });
            // @ts-ignore
            i18nextOptions.resources[locale].translation = JSON.parse(json);
        });
    }
    i18next.languages = languages;
    return i18next.init(i18nextOptions);
};

export default generateI18next;
