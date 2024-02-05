// Cart.js
import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { CiTrash } from 'react-icons/ci';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import CheckoutForm from './CheckoutForm';
import html2pdf from 'html2pdf.js';

const MySwal = withReactContent(Swal);

function Cart() {
    document.title = 'Coup de Food - Panier';
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [clientMail, setClientMail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];

        if (storedCart.length > 0) {
            const fetchCartItemDetails = async () => {
                setIsLoading(true);
                try {
                    const itemDetailsPromises = storedCart.map(async (cartItem) => {
                        const response = await fetch(`${process.env.REACT_APP_APIURL}categories/${cartItem.id}`);
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
                } finally {
                    setIsLoading(false);
                }
            };

            fetchCartItemDetails();
        }
    }, []);

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

    // ...

    const handleCheckout = async (formData) => {
        try {
            setIsSubmitting(true); // Mettez à jour isSubmitting pour afficher l'indicateur de chargement

            if (cartItems.length === 0) {
                MySwal.fire({
                    title: 'Panier vide',
                    icon: 'warning',
                    text: 'Votre panier est vide. Ajoutez des articles avant de passer une commande.',
                });
                return;
            }

            const result = await MySwal.fire({
                title: 'Êtes-vous sûr de vouloir passer la commande?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Oui',
                cancelButtonText: 'Non',
            });

            if (result.isConfirmed) {
                try {
                    const response = await fetch(`${process.env.REACT_APP_APIURL}commandes/`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            idProduits: cartItems.map((item) => item.id),
                            quantites: cartItems.map((item) => item.quantity),
                            prixUnitaire: cartItems.map((item) => item.details.prixUnite),
                            prixTotal: cartItems.map((item) => item.details.prixUnite * item.quantity),
                            ...formData,
                        }),
                    });

                    if (response.ok) {
                        const responseData = await response.json();
                        const orderId = responseData.commande._id;

                        // Envoi de l'e-mail avec l'orderId
                        await sendEmail(formData.ClientMail, orderId, formData);

                        // Mise à jour de l'état local du panier seulement après l'envoi de l'e-mail et confirmation de la commande
                        localStorage.removeItem('cart');
                        setCartItems([]);

                        MySwal.fire({
                            title: 'Commande validée avec succès!',
                            icon: 'success',
                            text: `ID de la commande: ${orderId}`,
                        });

                        // Appeler handleCheckoutForm avec l'ID de la commande
                        handleCheckoutForm(orderId);
                    } else {
                        const errorData = await response.json();
                        MySwal.fire({
                            title: 'Erreur lors de la soumission de la commande',
                            icon: 'error',
                            text: errorData.error || "Une erreur inattendue s'est produite.",
                        });
                    }
                } catch (error) {
                    console.error('Erreur lors de la soumission de la commande:', error);
                    MySwal.fire({
                        title: 'Erreur inattendue',
                        icon: 'error',
                        text: "Une erreur inattendue s'est produite.",
                    });
                } finally {
                    setIsSubmitting(false); // Mettez à jour isSubmitting une fois le processus terminé
                }
            }
        } catch (error) {
            console.error('Erreur lors de la soumission de la commande:', error);
            MySwal.fire({
                title: 'Erreur inattendue',
                icon: 'error',
                text: "Une erreur inattendue s'est produite.",
            });
        }
    };

    // ...


    // ...

    const sendEmail = async (clientEmail, orderId, formData) => {
        const element = document.getElementById('MyPdf');
        if (element) {
            const opt = {
                margin: 10,
                filename: 'cart_export.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            };

            try {
                const pdfBlob = await html2pdf().from(element).set(opt).outputPdf('blob');

                const formDataEmail = new FormData();
                formDataEmail.append('to', clientEmail);
                formDataEmail.append('subject', `Commande Reçue en attente de confirmation - Numéro de commande ${orderId}`);
                formDataEmail.append('html', `
              <p class='text-success'>Merci d'avoir passé votre commande!</p>
              <p>Votre commande avec le numéro ${orderId} a été reçue avec succès et est en attente de confirmation.</p>
              <p>Adresse de livraison: ${formData.AdresseLivraison}</p>
              <p>Email du client: ${formData.ClientMail}</p>
              <p>Téléphone du client: ${formData.ClientPhone}</p>
            `);
                formDataEmail.append('attachment', new File([pdfBlob], 'cart_export.pdf', { type: 'application/pdf' }));

                const response = await fetch(`${process.env.REACT_APP_APIURL}mailing/`, {
                    method: 'POST',
                    body: formDataEmail,
                });

                if (response.ok) {
                    MySwal.fire({
                        title: 'Email sent successfully!',
                        icon: 'success',
                    });
                } else {
                    console.error('Error sending email:', await response.text());
                    MySwal.fire({
                        title: 'Error sending email',
                        icon: 'error',
                        text: 'An unexpected error occurred while sending the email.',
                    });
                }
            } catch (error) {
                console.error('Unexpected error:', error);
                MySwal.fire({
                    title: 'Error',
                    icon: 'error',
                    text: 'An unexpected error occurred.',
                });
            }
        }
    };



    const handleCheckoutForm = (orderId) => {
        console.log('Commande confirmée avec ID:', orderId);
    };


    return (
        <>
            <Container className='p-2'>
                <Row className='text-end p-5' xs={1} md={1} lg={1}>
                <h2 className='fs-1 text-success fw-bold text-center'>Mon Panier    <span className='fs-2 text-success text-end' > Total : {calculateTotalPrice()} MAD </span></h2>
                    <Col className=' mt-2 text-center  d-flex align-items-center flex-column'>
                        {!isSubmitting && (
                            <CheckoutForm
                                onSubmit={handleCheckout}
                                setClientMail={setClientMail}
                            />
                        )}
                        {/* Affichez l'indicateur de chargement si la commande est en cours de création */}
                        {isSubmitting &&
                            <>
                                <p>En cours de traitement...</p>
                                <Spinner />
                            </>
                        }
                    </Col>
                    {/* <Col>
                        <span className='fs-2 text-success text-end' > Total : {calculateTotalPrice()} MAD </span>
                    </Col> */}
                </Row>
                <div className="table-container card p-1" id='MyPdf'>
                    <h2 className='fs-1 text-success fw-bold text-center'>  <span className='fs-2 text-success text-end' > Total : {calculateTotalPrice()} MAD </span></h2>
                    <hr className='style-seven' />
                    <p className='text-center fw-bold'>Produits ajoutés: {calculateTotalProducts()}</p>
                    <Table striped hover variant="light" className='text-center' >
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
                            {isLoading ? (
                                <tr>
                                    <td colSpan="5">Chargement en cours...</td>
                                </tr>
                            ) : (
                                cartItems.map((cartItem) => (
                                    <tr key={cartItem.id}>
                                        <td>{cartItem.details.name}</td>
                                        <td>{cartItem.details.prixUnite}</td>
                                        <td>{cartItem.details.prixUnite * cartItem.quantity}</td>
                                        <td>
                                            <AiOutlineMinusCircle className='m-1 text-danger fs-4' onClick={() => updateCartItem(cartItem.id, Math.max(1, cartItem.quantity - 1))} />
                                            {cartItem.quantity}
                                            <AiOutlinePlusCircle className='m-1 text-success fs-4' onClick={() => updateCartItem(cartItem.id, cartItem.quantity + 1)} />
                                        </td>
                                        <td>
                                            <CiTrash onClick={() => removeCartItem(cartItem.id)} className='fs-4 text-danger' />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>
                    <hr />

                </div>

            </Container>
        </>
    );
}

export default Cart;