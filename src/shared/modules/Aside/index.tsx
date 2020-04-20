import React from 'react';
import { IAside } from 'modules/Aside/Aside.module';
import styles from './Aside.module.scss';
import { AsideProjectSelector } from './AsideProjectSelector';

const Aside: React.FC<IAside.IProps> = (): JSX.Element => {
    return (
        <div className={styles.wrapper}>
            <AsideProjectSelector />
            {/*<AsideMenu />*/}
            {/*<AsideTeams />*/}
            Menu should come here
        </div>
    );
};

export { Aside };
