
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import './App.css'
import Footer from './components/Footer';
import ProductAddPage from './components/ProductAddPage';
import MapLivraison from './components/MapLivraison';
import Offer from './components/Offer';

import Font from 'react-font'
import { CartLikesProvider } from './components/CartLikesContext';
import Cart from './components/Cart';
function App() {
  return (
    <BrowserRouter >
     <CartLikesProvider>
      <Font family='Montserrat'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/AddHome' element={<ProductAddPage />} />
        <Route path='/LivraisonMap' element={<MapLivraison />} />
        <Route path='/Cart' element={<Cart />} />
        <Route path='/offre/:id' element={<Offer />} />
      </Routes>
      <Footer />
      </Font>
      </CartLikesProvider>
    </BrowserRouter>

  );
}

export default App;
