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

  return (
    // <BrowserRouter>
    <Router>
      <CartLikesProvider>
      


<Font family='Marmelad'>
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
