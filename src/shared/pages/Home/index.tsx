import React from 'react';
import { useSelector } from 'react-redux';
import LazyLoadingSpinner from 'components/LazyLoadingSpinner';
import { isUserLoading } from 'store/user/selectors';
import styles from './Home.module.scss';

const Home = () => {
    const userLoading = useSelector(isUserLoading);
    return (
        <React.Fragment>
            {userLoading ? (
                <LazyLoadingSpinner />
            ) : (
                <div className={styles.wrapper}>
                    <h1 className={styles.redColor}>Home component header</h1>
                </div>
            )}
        </React.Fragment>
    );
};

export default Home;
