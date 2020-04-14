import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LazyLoadingSpinner from 'components/LazyLoadingSpinner';
import { useWindowSize } from 'hooks/useWindowSize';
import { isUserLoading } from 'store/user/selectors';
import styles from './Home.module.scss';

const Home = (): JSX.Element => {
    const userLoading = useSelector(isUserLoading);
    const [isAsideOpen, setAsideOpen] = useState(true);
    const useWindowSizeResult = useWindowSize(true);
    useEffect(() => {
        if (useWindowSizeResult.isPhone && isAsideOpen) {
            setAsideOpen(false);
        }
    }, [useWindowSizeResult, isAsideOpen]);
    const handleSetAsideOpen = () => {
        setAsideOpen(!isAsideOpen);
    };
    return (
        <React.Fragment>
            {userLoading ? (
                <LazyLoadingSpinner />
            ) : (
                <div
                    className={classNames(styles.wrapper, {
                        [styles.asideOpen]: isAsideOpen,
                    })}
                >
                    <aside className={classNames(styles.asideMenu)} />
                    <div className={classNames(styles.homeWrapper)}>
                        <header>
                            <button onClick={handleSetAsideOpen}>
                                {isAsideOpen ? 'close' : 'open'}
                            </button>
                        </header>
                        <main />
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};

export default Home;
