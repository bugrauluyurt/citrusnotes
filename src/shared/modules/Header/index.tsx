import React from 'react';
import { MenuUnfoldOutlined } from '@ant-design/icons';
import { IHeader } from 'modules/Header/Header.module';
import HeaderPageName from './HeaderPageName/HeaderPageName';
import styles from './Header.module.scss';

const Header: React.FC<IHeader.IProps> = ({
    onMenuToggle = () => {},
    isAsideOpen = true,
}): JSX.Element => {
    const handleSetAsideToggle = () => onMenuToggle();
    return (
        <header>
            {!isAsideOpen && (
                <button className={styles.menuHamburgerHighlighted} onClick={handleSetAsideToggle}>
                    <MenuUnfoldOutlined />
                </button>
            )}
            <HeaderPageName />
        </header>
    );
};

export { Header };
