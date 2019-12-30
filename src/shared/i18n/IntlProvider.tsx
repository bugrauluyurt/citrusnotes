import React, { useEffect } from 'react';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getLocale } from '../store/app/selectors';

const I18N: React.FC<any> = ({ children }) => {
    const locale = useSelector(getLocale);
    useEffect(() => {
        i18next.changeLanguage(locale);
    }, [locale]);

    return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
};

export default React.memo(I18N);
