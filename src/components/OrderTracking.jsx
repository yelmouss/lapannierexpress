import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Form, Button } from 'react-bootstrap';
import html2pdf from 'html2pdf.js';
const OrderDetails = ({ order, getProductDetails }) => (


  <>

    <div className='d-lg-flex justify-content-between  w-100 col-12 text-start'>
      <h3 className='fs-3 text-success'>Order Details</h3>
      <hr />
      <div className="text-success  text-start">
      <p>Status de la commande : {order.Status}</p>
      <p>Adresse de livraison : {order.AdresseLivraison}</p>      
      <p>Numéro de contact : {order.ClientPhone}</p>      
      <p>Email de contact : {order.ClientMail}</p>      
    </div>
    
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
    <hr  className='text-success'/>
    <p className='fs-2 text-success fw-bold'>Total Order Price: {order.prixTotal.reduce((total, price) => total + price, 0)} - MAD</p>
  </>
);

const handleExportPDF = () => {
  const element = document.getElementById('MyPdf');
  if (element) {
    const opt = {
      margin: 10,
      filename: 'map_export.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    html2pdf().from(element).set(opt).save();
  }
};


const OrderTracking = () => {
  document.title = 'Coup de Food - Suivi de commandes'
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
    <div className='container text-center p-5 d-flex flex-column gap-4' >
      <h2 className='fs-1 text-success fw-bold'>Commandes Tracking</h2>
      <hr className='fs-1 text-success fw-bold' />
      <Form className='container p-5 card bg-light bg-opacity-50'>
        <Form.Group controlId='searchInput'>
          <Form.Label>Entrez le numéro de commande que nous vous avons communiqué & envoyé par mail lors de passage du Order :</Form.Label>
          <hr />
          <Form.Control
            type='text'
            placeholder='Enter Order ID'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </Form.Group>
        <br />
        <Button variant='success' className='w-50 align-self-end' onClick={handleSearch}>
          Search
        </Button>
      </Form>
      {orderDetails ? (
        <>
          <div id="MyPdf" className='card   bg-light bg-opacity-50 d-flex align-items-center  justify-content-center p-5 '>
            {Array.isArray(orderDetails) ? (
              orderDetails.map((order) => (
                <OrderDetails key={order._id} order={order} getProductDetails={getProductDetails} />
              ))
            ) : (
              <OrderDetails order={orderDetails} getProductDetails={getProductDetails} />
            )}
          </div>
          <div className="d-flex justify-content-end">
            <button className="btn bg-success text-light  bg-opacity-75 w-50" onClick={handleExportPDF}>
              Exporter en PDF
            </button>
          </div>

        </>
      ) : (
        <p>No order found for the provided ID or phone number.</p>
      )}
    </div>
  );
};

export default OrderTracking;
