import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Route, Routes, HashRouter as Router } from 'react-router-dom';
import Header from './components/Layout/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import './App.css';
import Footer from './components/Layout/Footer';
import MapLivraison from './components/MapLivraison';
import Offer from './components/Offer';
import Font from 'react-font';
import { CartLikesProvider } from './components/CartLikesContext';
import Cart from './components/Cart';
import ErrorNotFound from './components/ErrorNotFound ';
import CategoryProducts from './components/CategoryProducts';
import ProductAddPageCategory from './components/ProductAddPageCategory';
import OrderTracking from './components/OrderTracking';
import { Container, Spinner } from 'react-bootstrap';
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";

import image1 from './logo.svg'
import image2 from './logo.svg'
function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Simuler un délai de chargement initial
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Nettoyer le timeout lors du démontage du composant
    return () => clearTimeout(loadingTimeout);
  }, []);
  const particlesInit = useCallback(async engine => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    //await loadFull(engine);
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async container => {
    await console.log(container);
  }, []);

  return (
    // <BrowserRouter>
    <Router>
      <CartLikesProvider>
        <Font family='Marmelad'>


<Particles
  id="tsparticles"
  init={particlesInit}
  loaded={particlesLoaded}
  options={{
    fpsLimit: 50, // Réduisez la limite de FPS pour rendre l'animation plus lente
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: 2, // Réduisez la quantité de particules lors du clic
        },
        repulse: {
          distance: 100,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: "#ffffff",
      },
      links: {
        color: "#ffffff",
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
        speed: 2, // Réduisez la vitesse de déplacement des particules
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
        value: 0.5,
      },
      shape: {
        type: "char",
        character: [
          { value: "🍏", density: 30 }, // Pomme verte
          { value: "🍎", density: 30 }, // Pomme rouge
          { value: "🍐", density: 30 }, // Poire
          { value: "🍑", density: 30 }, // Pêche
          { value: "🍒", density: 30 }, // Cerise
          { value: "🍓", density: 30 }, // Fraise
          { value: "🥝", density: 30 }, // Kiwi
          { value: "🍅", density: 30 }, // Tomate
          { value: "🍆", density: 30 }, // Aubergine
          { value: "🥑", density: 30 }, // Avocat
          { value: "🌽", density: 30 }, // Maïs
          { value: "🥕", density: 30 }, // Carotte
          { value: "🥦", density: 30 }, // Brocoli
          { value: "🍇", density: 30 }, // Raisin
          { value: "🍈", density: 30 }, // Melon
          { value: "🍉", density: 30 }, // Pastèque
          { value: "🍊", density: 30 }, // Orange
          { value: "🍋", density: 30 }, // Citron
          { value: "🍌", density: 30 }, // Banane
          { value: "🍍", density: 30 }, // Ananas
          { value: "🥭", density: 30 }, // Mangue
          // Ajoutez autant d'autres emojis que nécessaire
        ],
      },
      size: {
        value: { min: 5, max: 10 },
      },
    },
    detectRetina: true,
  }}
/>

          <Header />
          {isLoading ? (
            // Afficher le spinner loader pendant le chargement
            <Container className='p-5'>
              <div className="spinner-loader">
                Veuillez patienter chargement en cours...
                <br />
                <Spinner animation="border" variant="success" />
              </div>
            </Container>

          ) : (
            // Afficher les routes une fois le chargement terminé
            <Routes>
              <Route path='/' element={<Home />} />
              {/* <Route path='/AddHome' element={<ProductAddPage />} /> */}
              <Route path='/AddPageCategory' element={<ProductAddPageCategory />} />
              <Route path='/LivraisonMap' element={<MapLivraison />} />
              <Route path='/Cart' element={<Cart />} />
              <Route path='/offre/:id' element={<Offer />} />
              <Route path="*" element={<ErrorNotFound />} />
              <Route path="/categorie/:categoryName" element={<CategoryProducts />} />
              <Route path="/Suivi" element={<OrderTracking />} />
            </Routes>
          )}
          <Footer />
        </Font>
      </CartLikesProvider>
    </Router>

    // </BrowserRouter>
  );
}

export default App;
