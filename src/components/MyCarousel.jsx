import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';

import LeProd from '../img/LES_PRODUITS_GRAND_FRAIS.webp';
import Livraison from '../img/livraison77.webp';
import Panier from '../img/Panier_gourmands_3.webp';

function MyCarousel() {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const imageClassName = `d-block mx-auto ${isMobile ? 'w-75' : 'w-50'} sliderimg`;
    const imageStyle = ` ${isMobile ? '' : '150px'} `;

    return (

        <><Carousel className="" controls={false} indicators={false}>
            <Carousel.Item>
                <img
                    className={imageClassName}
                    src={LeProd}
                    style={{ height: imageStyle }}
                    alt="First slide" />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className={imageClassName}
                    src={Livraison}
                    style={{ height: imageStyle }}
                    alt="Second slide" />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className={imageClassName}
                    src={Panier}
                    style={{ height: imageStyle }}
                    alt="Third slide" />
            </Carousel.Item>
        </Carousel></>
    );
}

export default MyCarousel;
