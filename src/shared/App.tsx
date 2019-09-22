import React, { useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link, Route } from 'react-router-dom';
import { Authorization, Home, Settings } from 'lazyRoutes';
import { setLocale } from 'store/app/actions';
import { Locale } from 'store/app/types';
import Features from '../shared/components/Features';
import favicon from '../shared/assets/favicon.png';
// Importing svg files example
// import { ReactComponent as ReactLogo } from './assets/react.svg';

const App: React.FC<any> = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const handleLocaleChange = useCallback(
        (e: React.FormEvent<HTMLButtonElement>) => {
            dispatch(setLocale(e.currentTarget.value as Locale));
        },
        [dispatch]
    );

    return (
        <div id="cr-app">
            <Helmet
                defaultTitle="CitrusNotes - Time tracking with simple notes"
                titleTemplate="%s – Time tracking with simple notess"
                link={[{ rel: 'icon', type: 'image/png', href: favicon }]}
            />
            <Features />
            <h2>{t('i18n-example')}</h2>
            <p>
                <button value="de_DE" onClick={handleLocaleChange}>
                    Deutsch
                </button>
                <button value="en_US" onClick={handleLocaleChange}>
                    English
                </button>
            </p>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/authorization">Authorization</Link>
                </li>
                <li>
                    <Link to="/settings">Settings</Link>
                </li>
            </ul>
            <Route path="/" exact component={Home} />
            <Route path="/authorization/" component={Authorization} />
            <Route path="/settings/" component={Settings} />
        </div>
    );
};

export default App;
