import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { CiTrash } from "react-icons/ci";
function Cart() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // Fetch the cart items from local storage
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];

        // If there are items in the cart, fetch their details from the API
        if (storedCart.length > 0) {
            const fetchCartItemDetails = async () => {
                try {
                    const itemDetailsPromises = storedCart.map(async (cartItem) => {
                        const response = await fetch(`http://localhost:8000/api/${cartItem.id}`);
                        const productDetails = await response.json();
                        return {
                            ...cartItem,
                            details: productDetails,
                        };
                    });

                    const cartItemsWithDetails = await Promise.all(itemDetailsPromises);
                    setCartItems(cartItemsWithDetails);
                } catch (error) {
                    console.error('Error fetching product details:', error);
                }
            };

            fetchCartItemDetails();
        }
    }, []); // The empty dependency array ensures that this effect runs only once, similar to componentDidMount

    const updateCartItem = (itemId, newQuantity) => {
        const updatedCart = cartItems.map((cartItem) =>
            cartItem.id === itemId ? { ...cartItem, quantity: newQuantity } : cartItem
        );
        setCartItems(updatedCart);
        updateLocalStorage(updatedCart);
    };

    const removeCartItem = (itemId) => {
        const updatedCart = cartItems.filter((cartItem) => cartItem.id !== itemId);
        setCartItems(updatedCart);
        updateLocalStorage(updatedCart);
    };

    const updateLocalStorage = (cart) => {
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, cartItem) => {
            const itemPrice = cartItem.details.prixUnite || 0;
            return total + itemPrice * cartItem.quantity;
        }, 0);
    };

    const calculateTotalProducts = () => {
        return cartItems.reduce((totalProducts, cartItem) => totalProducts + cartItem.quantity, 0);
    };


    return (
        <>
            <Container className='p-5'>
                <h2>Mon Panier</h2>
                <hr />
                <Row className='text-end'>
                    <p>Produits : {calculateTotalProducts()}</p>
                    <Col>     <p>Prix Total : <span className='fs-2 text-success'>  {calculateTotalPrice()} MAD </span></p></Col>
                </Row>
                <div className="table-container">

                <Table striped hover variant="light" className='text-center'>
                    <thead>
                        <tr>
                            <th>Produit</th>
                            <th>Prix Unité</th>
                            <th>Prix * Qte (Dh)</th>
                            <th>Quantité</th>
                            <th>Annuler </th>
                        </tr>
                    </thead>
                    <tbody>

                        {cartItems.map((cartItem) => (
                            <tr key={cartItem.id}>
                                <td>{cartItem.details.name}</td>
                              
                                <td>{cartItem.details.prixUnite}</td>
                                <td>{cartItem.details.prixUnite * cartItem.quantity }</td>
                                <td>
                                    <AiOutlineMinusCircle  className='m-1 text-danger fs-4' onClick={() => updateCartItem(cartItem.id, Math.max(1, cartItem.quantity - 1))} />
                                    {cartItem.quantity}
                                  
                                    <AiOutlinePlusCircle  className='m-1 text-success fs-4' onClick={() => updateCartItem(cartItem.id, cartItem.quantity + 1)} />

                                </td>

                                <td>
                                <CiTrash onClick={() => removeCartItem(cartItem.id)} className='fs-4 text-danger' />
                                   {/* Retirer du panier */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                </div>
             
              


            </Container>



        </>
    );
}

export default Cart;
