import React, { useEffect, useState } from 'react';
import { CiLocationOn, CiSearch, CiHeart, CiShoppingCart, CiHome } from 'react-icons/ci';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { NavLink } from 'react-router-dom';

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
            <Container className="text-light">
                <Nav className="me-auto">
                    <NavLink to={'/'} className={'nav-link fw-bold ml-2'}>
                        <CiHome className="fs-1" />
                    </NavLink>

                </Nav>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to={'/Suivi'} className={'nav-link fw-bold ml-2'}>
                            / Suivi de commande
                        </NavLink>
                        <NavLink to={'/LivraisonMap'} className={'nav-link fw-bold ml-2'}>
                            <CiLocationOn /> On vous livre où ?
                        </NavLink>
                    </Nav>

                    <Nav className="d-flex align-items-center justify-content-center">
                        <InputGroup>
                            <InputGroup.Text id="inputGroup-sizing-default">
                                <CiSearch />
                            </InputGroup.Text>
                            <Form.Control
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                                placeholder="Recherchez un produit"
                            />
                        </InputGroup>

                        <NavLink to={'/'} className={'nav-link  fw-bold ml-2 position-relative'}>
                            <CiHeart className='fs-2' />
                        </NavLink>

                        <NavLink to={'cart'} className={'nav-link  fw-bold ml-2 position-relative'}>
                            <CiShoppingCart className='fs-2' />
                            {cartCount > 0 && <span className="badge bg-danger rounded-pill  position-absolute top-2 start-100 translate-middle">
                                {cartCount}
                            </span>}
                        </NavLink>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
