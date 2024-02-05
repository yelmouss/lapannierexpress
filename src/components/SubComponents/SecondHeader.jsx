import React, { useCallback, useEffect, useState } from 'react';
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import { Card, Col, Container, NavLink, Row } from 'react-bootstrap';
import { Cat } from '../../datas/Categories';
import Categories from './Categories';
import CustomScroll from 'react-custom-scroll';
import Slider from 'react-slick';

import { Fade, Slide } from 'react-awesome-reveal';
import { Link } from 'react-router-dom';
import { MdHeight } from 'react-icons/md';


function SecondHeader() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  const [slidesToShow, setSlidesToShow] = useState(3); // Par défaut, 3 éléments par diapositive

  const settings = {

    infinite: true,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 6000,
    cssEase: 'linear',
    dots: false, // Désactiver les points
    arrows: true
  };

  // Fonction pour mettre à jour le nombre d'éléments par diapositive en fonction de la largeur de l'écran
  const updateSlidesToShow = () => {
    if (window.innerWidth <= 768) {
      setSlidesToShow(3); // Pour les écrans de largeur <= 768 (mobile), affiche 1 élément par diapositive
    }
    else if (window.innerWidth <= 968) {
      setSlidesToShow(6); // Pour les écrans de largeur <= 768 (mobile), affiche 1 élément par diapositive
    }
    else {
      setSlidesToShow(10); // Pour les écrans de largeur > 768, affiche 3 éléments par diapositive
    }
  };

  // Utilisation de useEffect pour mettre à jour le nombre d'éléments par diapositive lors du chargement initial et lors du redimensionnement de la fenêtre
  useEffect(() => {
    updateSlidesToShow();
    window.addEventListener('resize', updateSlidesToShow);

    // Nettoie l'écouteur d'événements lors du démontage du composant
    return () => {
      window.removeEventListener('resize', updateSlidesToShow);
    };
  }, []);

  return (
    <>

      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fpsLimit: 40, // Réduisez la limite de FPS pour rendre l'animation plus lente
          // interactivity: {
          //   events: {
          //     onClick: {
          //       enable: false,
          //       mode: "push",
          //     },
          //     onHover: {
          //       enable: false,
          //       mode: "repulse",
          //     },
          //     resize: true,
          //   },
          //   modes: {
          //     push: {
          //       quantity: 2, // Réduisez la quantité de particules lors du clic
          //     },
          //     repulse: {
          //       distance: 100,
          //       duration: 0.4,
          //     },
          //   },
          // },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#B0D9B1",
              distance: 150,
              enable: true,
              opacity: 0.3, // Réduisez l'opacité des liens
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 0.5, // Réduisez la vitesse de déplacement des particules
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 500, // Réduisez la densité d'apparition des particules
              },
              value: 10, // Réduisez le nombre total de particules
            },
            opacity: {
              value: 0.8,
            },
            shape: {
              type: "char",
              character: [
                { value: "🍏", density: 10 }, // Pomme verte
                { value: "🍎", density: 10 }, // Pomme rouge
                { value: "🍐", density: 10 }, // Poire
                // { value: "🍑", density: 10 }, // Pêche
                { value: "🍒", density: 10 }, // Cerise
                { value: "🍓", density: 10 }, // Fraise
                { value: "🥝", density: 10 }, // Kiwi
                { value: "🍅", density: 10 }, // Tomate
                // { value: "🍆", density: 10 }, // Aubergine
                { value: "🥑", density: 10 }, // Avocat
                // { value: "🌽", density: 10 }, // Maïs
                // { value: "🥕", density: 10 }, // Carotte
                // { value: "🥦", density: 10 }, // Brocoli
                { value: "🍇", density: 10 }, // Raisin
                { value: "🍈", density: 10 }, // Melon
                { value: "🍉", density: 10 }, // Pastèque
                { value: "🍊", density: 10 }, // Orange
                { value: "🍋", density: 10 }, // Citron
                // { value: "🍌", density: 10 }, // Banane
                { value: "🍍", density: 10 }, // Ananas
                { value: "🥭", density: 10 }, // Mangue
                // Ajoutez autant d'autres emojis que nécessaire
              ],
            },
            size: {
              value: { min: 5, max: 15 },
            },
          },
          detectRetina: true,
        }}
      />

      <Container>
        <Container >
          <CustomScroll>
            <Fade direction='up' className='' >
              <Container className='p-4   ' fluid>
                <Slider {...settings} className='' >
                  {Cat.map((item, index) => (
                    <>
                      <div className="bouncy" key={index}>
                        <Categories className='text-nowrap' title={item.title} imageUrl={item.ImageUrl} />
                      </div>
                    </>
                  ))}
                </Slider>
              </Container>
            </Fade>

          </CustomScroll>


        </Container>

      </Container>



    </>
  );
}

export default SecondHeader;
