import React from 'react';
import styles from './Home.module.scss';

const Home = () => {
    const handleClick = (): void => {
        console.log('Home header');
    };
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.redColor} onClick={handleClick}>
                Home component
            </h1>
        </div>
    );
};

export default Home;
