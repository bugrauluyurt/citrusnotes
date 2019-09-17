import React from 'react';

const Settings = () => {
    const handleClick = (): void => {
        console.log('Settings header');
    };
    return (
        <React.Fragment>
            <h1 onClick={handleClick}>Settings component header</h1>
        </React.Fragment>
    );
};

export default Settings;
