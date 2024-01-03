import React from 'react';
import MyCarousel from './MyCarousel';
import SecondHeader from './SubComponents/SecondHeader';
import HomeWelcome from './SubComponents/HomeWelcome';


function Home() {
    document.title = 'Coup de Food - Home'
    return (
        <>
            <MyCarousel />
            <SecondHeader />
            <HomeWelcome />
        </>

    );
}

export default Home;
