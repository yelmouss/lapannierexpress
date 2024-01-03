import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCart from './SubComponents/ProductCart'; // Import ProductCard component
import { useCartLikesContext } from './CartLikesContext';

const CategoryProducts = () => {
  document.title = 'Coup de Food - Store'
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const { likes, setLikes, cart, setCart } = useCartLikesContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_APIURL}categories/get`);
        // Filtrer les produits par catégorie
        const filteredProducts = response.data.filter(
          (product) => product.categorie === categoryName
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [categoryName]);

  // Define functions to handle likes and shopping cart
  
  const handleLikeInCategory = (productId) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [productId]: !prevLikes[productId],
    }));

    // Update local storage with the new likes
    localStorage.setItem("likes", JSON.stringify({
      ...likes,
      [productId]: !likes[productId],
    }));
  };
  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handleAddToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item._id);

    if (existingItem) {
      const newCart = cart.map((cartItem) =>
        cartItem.id === item._id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      updateCart(newCart);
    } else {
      const newCart = [
        ...cart,
        { id: item._id, name: item.name, price: item.price, quantity: 1 },
      ];
      updateCart(newCart);
    }
  };

  const handleRemoveFromCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item._id);
    if (existingItem.quantity > 1) {
      const newCart = cart.map((cartItem) =>
        cartItem.id === item._id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
      updateCart(newCart);
    } else {
      const newCart = cart.filter((cartItem) => cartItem.id !== item._id);
      updateCart(newCart);
    }
  };

  return (
    <div className='container p-5  vh-100'>
      <h2 className='text-center'>Products in Category: {categoryName}</h2>
      <hr />
      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No products available for this category in this period.</p>
      ) : (
        <div className='row'>
          {products.map((product) => (
            // Use ProductCard component for each product
            <div className='col-lg-3 col-md-6 p-2' key={product._id}>
              <ProductCart
                product={product}
                handleLike={handleLikeInCategory}
                handleAddToCart={handleAddToCart}
                handleRemoveFromCart={handleRemoveFromCart}
                cart={cart}
                likes={likes}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;