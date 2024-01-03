import React, { useEffect, useState } from 'react';
import { CiLocationOn, CiSearch, CiHeart, CiShoppingCart, CiHome, CiUnread, CiCircleChevDown } from 'react-icons/ci';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { NavLink } from 'react-router-dom';
import Logo from '../../img/coup de food-logos_transparent.png'

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
        <Navbar expand="lg" className="bg-success text-light" variant="dark" sticky="top">
            <Container className="text-light text-center">


                <Nav className="me-auto">
                    <NavLink to={'/'} className={'nav-link fw-bold ml-2'}>
                        <img
                            alt=""
                            src={Logo}
                            width="150"
                            height="40"
                            className="d-inline-block align-top"
                        />
                        {/* <CiHome className="fs-1" /> */}
                    </NavLink>

                </Nav>

                <Navbar.Collapse id="basic-navbar-nav ">
                    <Nav className="me-auto">
                        <NavLink to={'/Suivi'} className={'nav-link fw-bold ml-2'}>
                            <CiUnread /> Suivi de commande
                        </NavLink>

                        <NavLink to={'/LivraisonMap'} className={'nav-link fw-bold ml-2'}>
                            <CiLocationOn /> On vous livre où ?
                        </NavLink>
                    </Nav>

                    {/* <Nav >

                      

                        <NavLink to={'cart'} className={'nav-link  fw-bold ml-2 position-relative'}>
                            <CiShoppingCart className='fs-1' /> Mon panier
                            {cartCount > 0 && <span className="badge bg-danger rounded-pill  position-absolute top-5  translate-middle">
                                {cartCount}
                            </span>}
                        </NavLink>

                    </Nav> */}
                </Navbar.Collapse>

                <Nav >                                                    {/* 
                                <NavLink to={'/'} className={'nav-link  fw-bold ml-2 position-relative'}>
                                    <CiHeart className='fs-2' />
                                </NavLink> */}

                    <NavLink to={'cart'} className={'nav-link  fw-bold  position-relative me-auto'}>
                        <CiShoppingCart className='fs-2' /> Mon panier
                        {cartCount > 0 && <span className="badge bg-danger rounded-pill  position-absolute top-5  translate-middle">
                            {cartCount}

                        </span>}
                    </NavLink>
                    {" "}
                </Nav>

                <Navbar.Toggle aria-controls="basic-navbar-nav" >
                    <CiCircleChevDown />
                </Navbar.Toggle>
            </Container>
        </Navbar>
    );
}

export default Header;
