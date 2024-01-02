
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Layout/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import './App.css'
import Footer from './components/Layout/Footer';
// import ProductAddPage from './components/ProductAddPage';
import MapLivraison from './components/MapLivraison';
import Offer from './components/Offer';

import Font from 'react-font'
import { CartLikesProvider } from './components/CartLikesContext';
import Cart from './components/Cart';
import ErrorNotFound from './components/ErrorNotFound ';
import CategoryProducts from './components/CategoryProducts';
import ProductAddPageCategory from './components/ProductAddPageCategory';
import OrderTracking from './components/OrderTracking';

function App() {
  return (
    <BrowserRouter >
     <CartLikesProvider>
      <Font family='Marmelad'>
      <Header />
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
      <Footer />
      </Font>
      </CartLikesProvider>
    </BrowserRouter>

  );
}

export default App;
