import React from 'react';

const Authentication = () => {
    const handleClick = (): void => {
        console.log('Authentication header');
    };
    return (
        <React.Fragment>
            <h1 onClick={handleClick}>Authentication component</h1>
        </React.Fragment>
    );
};

export default Authentication;
