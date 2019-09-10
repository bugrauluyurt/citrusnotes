import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Features.module.scss';

const Features = () => {
    const { t } = useTranslation();
    return (
        <React.Fragment>
            <h2>{t('features')}</h2>
            <ul className={styles.wrapper}>
                <li className={styles.react}>React 16.x (latest)</li>
                <li className={styles.webpack}>Webpack 4</li>
                <li className={styles.linter}>ESLint 5</li>
                <li className={styles.hot}>Babel 7</li>
                <li className={styles.hot}>TypeScript (using Babel 7)</li>
                <li className={styles.jest}>Jest 24</li>
                <li className={styles.rtl}>React Testing Library</li>
                <li className={styles.i18n}>{t('i18n-support')}</li>
                <li>React Router 5</li>
                <li>Redux (+ Thunk)</li>
                <li>Immer</li>
                <li>Reselect</li>
                <li>React Helmet</li>
                <li>Express Webserver + Server Side Rendering</li>
                <li>CSS Modules</li>
                <li>PostCSS</li>
                <li>Prettier (incl. precommit-hook via lint-staged + husky)</li>
                <li>HMR</li>
            </ul>
        </React.Fragment>
    );
};

export default Features;
