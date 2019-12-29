import React from 'react';
import styles from './Browse.module.scss';

const Browse = () => {
    const handleClick = (): void => {
        console.log('Browse header');
    };
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.redColor} onClick={handleClick}>
                Browse component
            </h1>
        </div>
    );
};

export default Browse;
