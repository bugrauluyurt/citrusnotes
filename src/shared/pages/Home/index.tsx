import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MenuFoldOutlined } from '@ant-design/icons';
import LazyLoadingSpinner from 'components/LazyLoadingSpinner';
import { Header } from 'components/Header';
import { useWindowSize } from 'hooks/useWindowSize';
import { isUserLoading } from 'store/user/selectors';
import styles from './Home.module.scss';

const Home = (): JSX.Element => {
    const userLoading = useSelector(isUserLoading);
    const useWindowSizeResult = useWindowSize(true);
    const [isAsideOpen, setAsideOpen] = useState(useWindowSizeResult.current.isTabletLandscapeUp);
    const isCurrentTableLandscapeUp = useWindowSizeResult.current.isTabletLandscapeUp;
    useEffect(() => {
        if (
            !useWindowSizeResult.current.isTabletLandscapeUp &&
            useWindowSizeResult.previous.isTabletLandscapeUp &&
            isAsideOpen
        ) {
            setAsideOpen(false);
        }
        if (
            !useWindowSizeResult.previous.isTabletLandscapeUp &&
            useWindowSizeResult.current.isTabletLandscapeUp &&
            !isAsideOpen
        ) {
            setAsideOpen(true);
        }
    }, [isCurrentTableLandscapeUp]);
    const handleSetAsideToggle = () => {
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
                    <aside className={styles.asideMenu}>
                        {isAsideOpen && (
                            <button onClick={handleSetAsideToggle} className={styles.menuHamburger}>
                                <MenuFoldOutlined />
                            </button>
                        )}
                    </aside>
                    <div className={styles.homeWrapper}>
                        <Header onMenuToggle={handleSetAsideToggle} isAsideOpen={isAsideOpen} />
                        <main>This is the main component</main>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};

export default Home;
