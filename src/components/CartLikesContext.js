// CartLikesContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartLikesContext = createContext();

export const CartLikesProvider = ({ children }) => {
    const [likes, setLikes] = useState({});
    const [cart, setCart] = useState([]);
  
    // Utilisez useEffect pour mettre à jour les compteurs
    useEffect(() => {
      const likesCount = Object.values(likes).filter(Boolean).length;
      const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  
      // Émettez des événements personnalisés pour les composants qui écoutent
      document.dispatchEvent(new CustomEvent('updateLikesCount', { detail: { likesCount } }));
      document.dispatchEvent(new CustomEvent('updateCartCount', { detail: { cartCount } }));
    }, [likes, cart]);
  
    return (
      <CartLikesContext.Provider value={{ likes, setLikes, cart, setCart }}>
        {children}
      </CartLikesContext.Provider>
    );
  };
export const useCartLikesContext = () => {
  return useContext(CartLikesContext);
};
