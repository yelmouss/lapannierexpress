import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { CiTrash } from "react-icons/ci";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import CheckoutForm from './CheckoutForm.jsx';

const MySwal = withReactContent(Swal);


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
                        // process.env.REACT_APP_APIURL
                        const response = await fetch(`${process.env.REACT_APP_APIURL}${cartItem.id}`);
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


    const handleCheckout = async (formData) => {
        try {
          if (cartItems.length === 0) {
            // Afficher une alerte indiquant que le panier est vide
            MySwal.fire({
              title: 'Panier vide',
              icon: 'warning',
              text: 'Votre panier est vide. Ajoutez des articles avant de passer une commande.',
            });
            return; // Arrêter la fonction ici si le panier est vide
          }
    
          const result = await MySwal.fire({
            title: 'Êtes-vous sûr de vouloir passer la commande?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Oui',
            cancelButtonText: 'Non',
          });
    
          if (result.isConfirmed) {
            // Envoi de la requête POST vers l'API avec les données du formulaire et du panier
            const response = await fetch(`${process.env.REACT_APP_APIURL}commandes/`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                idProduits: cartItems.map(item => item.id),
                quantites: cartItems.map(item => item.quantity),
                prixUnitaire: cartItems.map(item => item.details.prixUnite),
                prixTotal: cartItems.map(item => item.details.prixUnite * item.quantity),
                ...formData,
              }),
            });
    
            if (response.ok) {
              // Effacer le panier local après la commande réussie
              localStorage.removeItem('cart');
              setCartItems([]);
    
              // Afficher une alerte de succès avec l'ID de la commande
              const responseData = await response.json();
              MySwal.fire({
                title: 'Commande validée avec succès!',
                icon: 'success',
                text: `ID de la commande: ${responseData.commande._id}`,
              });
            } else {
              console.error('Erreur lors de la soumission de la commande');
              // Gérer les erreurs de requête ici
            }
          }
        } catch (error) {
          console.error('Erreur lors de la soumission de la commande:', error);
          // Gérer les erreurs ici
        }
      };
    

    return (
        <>
            <Container className='p-5'>
              
                <h2>Mon Panier</h2>
                <hr />
                <Row className='text-end'>
                    <p>Produits : {calculateTotalProducts()}</p>
                    <Col>
                    <CheckoutForm onSubmit={handleCheckout} />
                    
                    </Col>
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
