import React from 'react';

const Authentication = () => {
    const handleClick = (): void => {
        console.log('Authentication header');
    };
    return (
        <React.Fragment>
            <div className="authentication-component">
                <div className="authentication-component-inner d-flex" />
            </div>
            <h1 onClick={handleClick}>Authentication componen</h1>
        </React.Fragment>
    );
};

export default Authentication;
