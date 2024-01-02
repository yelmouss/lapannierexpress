import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Form, Button } from 'react-bootstrap';

const OrderDetails = ({ order, getProductDetails }) => (
  <>
    <div className='d-flex justify-content-between p-5'>
      <h3 className='fs-3 text-success'>Order Details</h3>
      <p>Total Order Price: {order.prixTotal.reduce((total, price) => total + price, 0)}</p>
    </div>

    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Unit Price</th>
          <th>Quantity</th>
          <th>Total Price</th>
        </tr>
      </thead>
      <tbody>
        {order.idProduits.map((productId, index) => {
          const productDetails = getProductDetails(productId);
          return (
            <tr key={productId}>
              <td>{productDetails.name}</td>
              <td>{productDetails.prixUnite}</td>
              <td>{order.quantites[index]}</td>
              <td>{order.prixTotal[index]}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  </>
);

const OrderTracking = () => {
  const [searchInput, setSearchInput] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/categories/get');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/commandes/${searchInput}`);
      setOrderDetails(response.data);
    } catch (error) {
      console.error('Error fetching order details:', error);
      setOrderDetails(null);
    }
  };

  const getProductDetails = (productId) => {
    const product = products.find((product) => product._id === productId);
    return product || {};
  };

  return (
    <div className='container text-center p-5'>
      <h2 className='fs-1 text-success fw-bold'>Order Tracking</h2>
      <hr className='fs-1 text-success fw-bold' />
      <Form>
        <Form.Group controlId='searchInput'>
          <Form.Label>Enter Order ID:</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Order ID'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </Form.Group>
        <br />
        <Button variant='success' onClick={handleSearch}>
          Search
        </Button>
      </Form>
      {orderDetails ? (
        <div>
          {Array.isArray(orderDetails) ? (
            <ul>
              {orderDetails.map((order) => (
                <li key={order._id}>
                  <OrderDetails order={order} getProductDetails={getProductDetails} />
                </li>
              ))}
            </ul>
          ) : (
            <OrderDetails order={orderDetails} getProductDetails={getProductDetails} />
          )}
        </div>
      ) : (
        <p>No order found for the provided ID or phone number.</p>
      )}
    </div>
  );
};

export default OrderTracking;
