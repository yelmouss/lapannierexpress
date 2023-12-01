import React from 'react'
import { Button } from 'react-bootstrap';
import { CiLocationOn, CiSearch, CiHeart, CiShoppingCart } from "react-icons/ci";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { NavLink } from 'react-router-dom';

function Header() {
    return (
        <Navbar expand="lg" className="bg-success text-light" variant='dark'>
            <Container className='text-light'>
                <Navbar.Brand href="/">
                <Button className='btn-light'>
                            <CiLocationOn />  On vous livre où ?
                        </Button>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                       
                    </Nav>

                    <Nav className='d-flex align-items-center justify-content-center'>

                        <InputGroup >
                            <InputGroup.Text id="inputGroup-sizing-default">
                                <CiSearch />
                            </InputGroup.Text>
                            <Form.Control
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                                placeholder='Recherchez un produit'
                            />
                        </InputGroup>

                        <NavLink to={'/'} className={'nav-link fs-2 fw-bold ml-2'}><CiHeart /> </NavLink>
                        <NavLink to={'/'} className={'nav-link fs-2 fw-bold ml-2'}>  <CiShoppingCart /> </NavLink>


                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;