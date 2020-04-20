import React from 'react';
import { useTranslation } from 'react-i18next';
import _includes from 'lodash/includes';
import { useRouteMatch } from 'react-router';
import styles from './HeaderPageName.module.scss';

const HeaderPageName: React.FC = (): JSX.Element | null => {
    const { path } = useRouteMatch();
    const { t } = useTranslation();
    if (_includes(path, 'home')) {
        return <div className={styles.headerPageName}>{t('home')}</div>;
    }
    return null;
};

export default HeaderPageName;
