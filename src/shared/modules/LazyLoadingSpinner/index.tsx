import React from 'react';
import classNames from 'classnames';
import styles from './LazyLoadingSpinner.module.scss';

const LazyLoadingSpinner = (): JSX.Element => {
    return (
        <div className={classNames(styles.wrapper, 'flex items-center justify-center')}>
            <div className={styles.loading}>
                <div className={styles.loading_inner}>
                    <div />
                </div>
            </div>
        </div>
    );
};

export default LazyLoadingSpinner;
