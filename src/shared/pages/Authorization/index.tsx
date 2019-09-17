import React from 'react';

const Authorization = () => {
    const handleClick = (): void => {
        console.log('Authorization header');
    };
    return (
        <React.Fragment>
            <h1 onClick={handleClick}>Authorization component header</h1>
        </React.Fragment>
    );
};

export default Authorization;
