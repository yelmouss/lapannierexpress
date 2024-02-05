import React, { useEffect, useState } from 'react';
import { CiLocationOn, CiSearch, CiHeart, CiShoppingCart, CiHome, CiUnread, CiCircleChevDown } from 'react-icons/ci';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { NavLink } from 'react-router-dom';
// import Logo from '../../img/coup de food-logos_transparent.png'
import Logo from '../../img/IMG_0534-removebg-preview.png'
import Logo2 from '../../img/coupdefood-logos.jpeg'



function Header() {
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        // Fonction pour mettre à jour les compteurs
        const updateCounts = (event) => {
            const cartCount = event ? event.detail.cartCount || 0 : 0;
            setCartCount(cartCount);
        };


        document.addEventListener('updateCartCount', updateCounts);

        // Mettre à jour les compteurs au montage initial
        updateCounts();

        // Nettoyer les écouteurs d'événements lorsque le composant est démonté
        return () => {
            document.removeEventListener('updateCartCount', updateCounts);
        };
    }, []);


    return (
        <Navbar expand="lg" className="bgBrand2 text-light sticky-top textbrand" sticky="top">
            <Container>
                <NavLink to="/" className={'nav-brand'}>
                    <img
                       src={Logo}
                       width="110"
                       height="70"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                </NavLink>
       
                <Navbar.Collapse id="basic-navbar-nav ">
                    <Nav>
                        <NavLink to={'/Suivi'} className={'nav-link fw-bold ml-2 textbrand'}>
                            <CiUnread /> Suivi de commande
                        </NavLink>

                        <NavLink to={'/LivraisonMap'} className={'nav-link fw-bold ml-2 textbrand'}>
                            <CiLocationOn /> On vous livre où ?
                        </NavLink>
                    </Nav>

                </Navbar.Collapse>
                <Nav>
                    <NavLink to={'cart'} className={'nav-link fw-bold ml-auto fs-5 textbrand'}>
                        <CiShoppingCart className='textbrand fw-bold fs-2' /> Panier {" "}
                        {cartCount > 0 && (
                            <span className="badge bg-danger rounded-pill position-absolute top-5 translate-middle">
                                {cartCount}
                            </span>
                        )}
                    </NavLink>
                </Nav>

                <Navbar.Toggle aria-controls="basic-navbar-nav">
                    <CiCircleChevDown />
                </Navbar.Toggle>
            </Container>
        </Navbar>
    );
}

export default Header;
