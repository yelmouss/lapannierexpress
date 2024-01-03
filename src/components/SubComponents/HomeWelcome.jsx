import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Cat } from '../../datas/Categories';
import ProductCart from './ProductCart';
import { useCartLikesContext } from '../CartLikesContext';
import Swal from 'sweetalert2'; // Import SweetAlert

function HomeWelcome() {
    const { likes, setLikes, cart, setCart } = useCartLikesContext();
    const [apiData, setApiData] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        // Fetch data from the API on component mount.
        // http://localhost:8000/api/categories/get
        fetch(process.env.REACT_APP_APIURL+"categories/get")
        // fetch(process.env.REACT_APP_APIURL+"categories/get")
            .then(response => response.json())
            .then(data => {
                // Initialize likes state with values from local storage or false for each product
                const likesFromStorage = JSON.parse(localStorage.getItem("likes")) || {};
                const initialLikes = {};
                data.forEach(product => {
                    initialLikes[product._id] = likesFromStorage[product._id] || false;
                });

                // Initialize cart state with values from local storage or an empty array
                const cartFromStorage = JSON.parse(localStorage.getItem("cart")) || [];
                setLikes(initialLikes);
                setApiData(data);
                setCart(cartFromStorage);
                setDataLoaded(true);
            })
            .catch(error => {
                console.error('Error fetching data from API:', error);
                setDataLoaded(true);
            });
    }, []);

    const scrollIntoView = (index) => {
        const element = document.getElementById(index);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const filteredProducts = (filter) => {
        return apiData.filter((product) => product.categorie === filter);
    };

    const handleLike = (productId) => {
        // Toggle like status for the given product
        setLikes(prevLikes => ({
            ...prevLikes,
            [productId]: !prevLikes[productId],
        }));

        // Update local storage with the new likes
        localStorage.setItem("likes", JSON.stringify({
            ...likes,
            [productId]: !likes[productId],
        }));
          // Show SweetAlert when a product is liked
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Like Done",
            showConfirmButton: false,
            timer: 1500,
            customClass: 'small-swal', // Define a custom class for the popup
            
          });
    };

    const updateCart = (newCart) => {
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    };

    const handleAddToCart = (item) => {
        const existingItem = cart.find((cartItem) => cartItem.id === item._id);

        if (existingItem) {
            const newCart = cart.map((cartItem) =>
                cartItem.id === item._id
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
            );
            updateCart(newCart);
            
        } else {
            const newCart = [
                ...cart,
                { id: item._id, name: item.name, price: item.price, quantity: 1 },
            ];
            updateCart(newCart);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Produit Ajouté au panier",
                showConfirmButton: false,
                timer: 1500,
                customClass: 'small-swal', // Define a custom class for the popup
                
              });
        }
    };

    const handleRemoveFromCart = (item) => {
        const existingItem = cart.find((cartItem) => cartItem.id === item._id);
        if (existingItem.quantity > 1) {
            const newCart = cart.map((cartItem) =>
                cartItem.id === item._id
                    ? { ...cartItem, quantity: cartItem.quantity - 1 }
                    : cartItem
            );
            updateCart(newCart);
        } else {
            const newCart = cart.filter((cartItem) => cartItem.id !== item._id);
            updateCart(newCart);
        }
    };
 // Filtrer les catégories en fonction des produits disponibles
 const categoriesWithProducts = Cat.filter((category) =>
 apiData.some((product) => product.categorie === category.title)
);

return (
    <Container fluid>
        <Row xs={1} lg={2} md={1}>
            <Col className='text-start p-3 mt-5 ' lg={3} md={4} xs={12}>
                <Row xs={2} lg={1} md={1} className='d-flex align-items-stretch'>
                    {categoriesWithProducts.map((item, index) => (
                        <Col key={index} className='mb-1 d-flex'>
                            <Link
                                className='mb-1 button-53 myseeetext '
                                to={'#' + item.title}
                                onClick={() => scrollIntoView(index)}
                            >
                                {item.title}
                            </Link>
                        </Col>
                    ))}
                </Row>
            </Col>
            <Col lg={8} md={6} className='p-5'>
                {dataLoaded && (
                    <>
                        {categoriesWithProducts.map((item, index) => (
                            <div key={index} id={index} className='p-1'>
                                <hr />
                                <div className="titleHomeProduct">
                                <h2 className='fw-bold fs-1'>{item.title}</h2>

                                </div>
                                <br />
                                <Row lg={4} md={1} xs={1} className='p-2'>
                                    {filteredProducts(item.title).map((product, pIndex) => (
                                        <ProductCart
                                            key={pIndex + product.name}
                                            product={product}
                                            likes={likes}
                                            handleLike={handleLike}
                                            handleRemoveFromCart={handleRemoveFromCart}
                                            handleAddToCart={handleAddToCart}
                                            cart={cart}
                                        />
                                    ))}
                                </Row>
                            </div>
                        ))}
                    </>
                )}
            </Col>
        </Row>
    </Container>
);
}

export default HomeWelcome;