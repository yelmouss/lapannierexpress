import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { BsFillSuitHeartFill, BsSuitHeart } from 'react-icons/bs';
import { useCartLikesContext } from './CartLikesContext';

function Offer() {
  const { id } = useParams();
  const [apiData, setApiData] = useState([]);
  const { likes, setLikes, cart, setCart } = useCartLikesContext();


  useEffect(() => {
    // Fetch data from the API on component mount.
    fetch(process.env.REACT_APP_APIURL+'categories/get')
      .then((response) => response.json())
      .then((data) => {
        // Initialize likes state with values from local storage or false for each product
        const likesFromStorage = JSON.parse(localStorage.getItem('likes')) || {};
        const initialLikes = {};
        data.forEach((product) => {
          initialLikes[product._id] = likesFromStorage[product._id] || false;
        });

        setLikes(initialLikes);
        setApiData(data);

        console.table(data);
      })
      .catch((error) => console.error('Error fetching data from API:', error));
  }, []);

  useEffect(() => {
    // Load existing cart from local storage on component mount.
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const offre = apiData.find((offre) => offre._id === id);

  if (offre === undefined) {
    return (
      <>
        <div>404 {id}</div>
      </>
    );
  }

  const existingItem = cart.find((cartItem) => cartItem.id === offre._id);
  const itemQuantity = existingItem ? existingItem.quantity : 0;

  const handleLike = () => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [offre._id]: true,
    }));
    localStorage.setItem('likes', JSON.stringify({
      ...likes,
      [offre._id]: true,
    }));
  };

  const handleDislike = () => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [offre._id]: false,
    }));
    localStorage.setItem('likes', JSON.stringify({
      ...likes,
      [offre._id]: false,
    }));
  };

  const handleAddToCart = () => {
    const existingItem = cart.find((cartItem) => cartItem.id === offre._id);

    if (existingItem) {
      // Si le produit existe déjà dans le panier
      const newCart = cart.map((cartItem) =>
        cartItem.id === offre._id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );

      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
    } else {
      // Si le produit n'est pas encore dans le panier
      const newCart = [
        ...cart,
        { id: offre._id, name: offre.name, price: offre.prixUnite, quantity: 1 },
      ];

      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  };

  const handleRemoveFromCart = () => {
    const existingItem = cart.find((cartItem) => cartItem.id === offre._id);

    if (existingItem && existingItem.quantity > 1) {
      // Si le produit existe et a une quantité supérieure à 1
      const newCart = cart.map((cartItem) =>
        cartItem.id === offre._id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );

      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
    } else if (existingItem) {
      // Si le produit existe mais a une quantité de 1
      const newCart = cart.filter((cartItem) => cartItem.id !== offre._id);

      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  };

  return (
    <Container fluid >
      <Row className=" p-5">
        <Col md={6} className='' >
          <Image src={offre.imageUrl} alt={offre.name} fluid className='OfferImage' />
        </Col>
        <Col md={6}>
          <h1>{offre.name}</h1>
          <hr />
          <p>Description du produit : {offre.description}</p>
          <h2>Prix unité <strong>  {offre.prixUnite} </strong> MAD</h2>
          <p>unité : {offre.Unite}</p>
          <h2>Prix Kilo {offre.prixKilo}</h2>
          <hr />
          <Button variant="success" onClick={handleAddToCart}>
            <AiOutlinePlusCircle /> Ajouter au pannier
          </Button>
          {itemQuantity > 0 && (
            <>
              <Button variant="danger" onClick={handleRemoveFromCart}>
                <AiOutlineMinusCircle /> Remove from Cart
              </Button>
              <span className="mx-2">{itemQuantity}</span>
            </>
          )}

          <Button className="mx-2" onClick={handleLike}>
            {likes[offre._id] ? (
              <BsFillSuitHeartFill className="text-danger" />
            ) : (
              <BsSuitHeart />
            )}
          </Button>
          <Button variant="secondary" onClick={handleDislike}>
            {likes[offre._id] ? 'Dislike' : 'Undislike'}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Offer;
