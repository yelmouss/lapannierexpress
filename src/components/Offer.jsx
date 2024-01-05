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
    fetch(process.env.REACT_APP_APIURL + 'categories/get')
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
    <Container  >
      <Row className="  ">
        <Row xs={1} lg={2}>
          <Col className='d-flex justify-content-center align-items-center'>  <h1 className='fs-1 text-success fw-bold text-start p-5'> {offre.name}</h1></Col>
          <Col className='d-flex justify-content-center align-items-center'>
            <h2 className="text-success fst-italic">Prix unité <strong>{offre.prixUnite}</strong> MAD</h2>
          </Col>
        </Row>

        <hr />
        <Col md={6} className=' p-2 d-flex justify-content-center' >
          <div className="card p-3">
            <Image src={offre.imageUrl} alt={offre.name} fluid className='OfferImage shadow-lg moving-left rounded' />

          </div>
        </Col>
        <Col md={6} >
          <>
            {itemQuantity > 0 && (


              <span className="mx-2 text-success fw-bold text-start fs-1">{itemQuantity} dans le panier</span>
            )}

            <div className="d-flex">
            <Button variant="success" onClick={handleAddToCart}>
              <AiOutlinePlusCircle /> Ajouter au panier
            </Button>

            {itemQuantity > 0 && (
              <>
                <Button  onClick={handleRemoveFromCart} className='m-1 bg-danger bg-opacity-75'>
                  <AiOutlineMinusCircle className='text-light' />
                </Button>
              </>
            )}

            <Button className="mx-2 m-1"  onClick={handleLike} variant='light'>
              {likes[offre._id] ? (
                <BsFillSuitHeartFill className="text-danger" />
              ) : (
                <BsSuitHeart />
              )}
            </Button>

            {likes[offre._id] && <Button variant='light' onClick={handleDislike} className="text-danger">Dislike</Button>}
            </div>
      

          </>

          <hr />
          <div className="text-center card bg-light bg-opacity-50">
            <p className="font-italic text-muted">Description du produit : {offre.description}</p>

            <p>unité : {offre.Unite}</p>
            <h2 className="text-success fst-italic">Prix Kilo {offre.prixKilo}</h2>


          </div>


        </Col>
      </Row>
    </Container>
  );
}

export default Offer;
