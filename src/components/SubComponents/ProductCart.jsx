import React from 'react';
import { Card, Col, Button, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { BsFillSuitHeartFill, BsSuitHeart } from 'react-icons/bs';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { MdAddShoppingCart } from 'react-icons/md';

const ProductCart = ({ product, likes, handleLike, handleRemoveFromCart, handleAddToCart, cart }) => {
  // Add null checks for existingCartItem and itemQuantity
  const existingCartItem = cart ? cart.find((cartItem) => cartItem.id === product._id) : null;
  const itemQuantity = existingCartItem ? existingCartItem.quantity : 0;

  return (
    <Col key={product._id}>
      <Card className="text-center mb-2 shadow-lg" style={{ width: '100%' }}>
        <NavLink to={'/offre/' + product._id} className={'nav-link'}>
          <Card.Img variant="top" src={product.imageUrl} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
          <Card.Footer className="text-muted text-truncate">{product.name}</Card.Footer>
        </NavLink>

        {itemQuantity > 0 && (
          <Card.Footer className="text-muted text-truncate"> درهم - {product.prixUnite} - MAD</Card.Footer>
        )}

        <Card.Footer className="text-muted">
          {itemQuantity > 0 && (
            <Row className="align-items-center">
              <Col lg={12}>
                {' '}
                {itemQuantity} au prix de {(itemQuantity * product.prixUnite).toFixed(2)} Dhs
              </Col>
              <Col>
                <Button variant="light" onClick={() => handleRemoveFromCart(product)}>
                  <AiOutlineMinusCircle className="text-danger" />
                </Button>
              </Col>
              <Col>
                <Button variant="light" onClick={() => handleAddToCart(product)}>
                  <AiOutlinePlusCircle className="text-success" />
                </Button>
              </Col>
            </Row>
          )}

          <Card.Footer className="text-muted text-truncate"> درهم - {product.prixUnite} - MAD</Card.Footer>

          {!itemQuantity && (
            <Row className="align-items-center fs-4">
              <Col>
                <Button variant="light" onClick={() => handleAddToCart(product)} className='text-success fw-bold'>
                  <MdAddShoppingCart className='fw-bold fs-3' />
                  <br />
                  <span>Ajouter au panier</span>
                </Button>
              </Col>
              <Col>
                <Button variant="light" onClick={() => handleLike(product._id)}>
                  {likes && likes[product._id] ? (
                    <>
                    <BsFillSuitHeartFill className="text-danger" />
                   
                    </>
                  ) : (
                    <BsSuitHeart className="text-black" />
                  )}
                </Button>
              </Col>
            </Row>
          )}
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default ProductCart;
