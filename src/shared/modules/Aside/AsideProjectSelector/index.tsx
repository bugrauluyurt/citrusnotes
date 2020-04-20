import React from 'react';
import { IAsideProjectSelector } from 'modules/Aside/AsideProjectSelector/AsideProjectSelector.module';
import styles from './AsideProjectSelector.module.scss';

const AsideProjectSelector: React.FC<IAsideProjectSelector.IProps> = (): JSX.Element => {
    return <div className={styles.wrapper}>Project selector</div>;
};

export { AsideProjectSelector };
