import React from 'react';

const Home = () => {
    const handleClick = (): void => {
        console.log('Home header');
    };
    return (
        <React.Fragment>
            <h1 onClick={handleClick}>Home component header</h1>
        </React.Fragment>
    );
};

export default Home;
