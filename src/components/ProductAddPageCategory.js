import React, { useState, useEffect } from 'react';
import { Button, Form, Tab, Tabs, Container, Row, Col, Table, Card } from 'react-bootstrap';
import ProductFormCategory from './ProductFormCategory';
import {
  fetchProducts,
  addProduct,
  editProduct,
  updateProduct,
  deleteProduct,
} from './productFunctionsCategory';
import axios from 'axios';
import { GiConfirmed } from "react-icons/gi";
import { TbTruckDelivery } from "react-icons/tb";
import { ImCancelCircle } from "react-icons/im";
import { CiTimer } from "react-icons/ci";
import ProductTable from './SubComponents/ProductTable';
import ProductModel from './ProductModel';
import OrderManagement from './SubComponents/OrderManagement';

const ProductAddPageCategory = () => {

  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [orderId, setOrderId] = useState('');
  const [newStatus, setNewStatus] = useState('');  
  const [editingProductData, setEditingProductData] = useState({
    name: '',
    prixUnite: '',
    Unite: '',
    categorie: '',
    prixKilo: '',
    imageFile: null,
  });


  useEffect(() => {
    fetchOrders();
    fetchProductData();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_APIURL}commandes/`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchProductData = () => {
    fetchProducts(`${process.env.REACT_APP_APIURL}categories/get`)
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  };

  const handleAddProduct = (formData) => {
    addProduct(`${process.env.REACT_APP_APIURL}categories/`, formData)
      .then(() => fetchProductData())
      .catch((error) => console.error(error));
  };

  const handleEditProduct = (id, productData) => {
    editProduct(id, productData, setEditingProductId, setEditingProductData);
  };

  const handleUpdateProduct = () => {
    updateProduct(
      `${process.env.REACT_APP_APIURL}categories/`,
      editingProductId,
      editingProductData,
      setProducts,
      setEditingProductId,
      setEditingProductData
    ).then(() => fetchProductData())
      .catch((error) => console.error(error));
  };

  const handleDeleteProduct = (id) => {
    deleteProduct(process.env.REACT_APP_APIURL, id, setProducts);
  };

  const updateOrderStatus = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_APIURL}commandes/${orderId}/status`, { newStatus });
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const deleteOrder = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_APIURL}commandes/${orderId}`);
      fetchOrders();
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <div className='container-fluid text-center p-5'>
      <Tabs defaultActiveKey="Management" id="fill-tab-example" className="mb-3 " fill>
        <Tab eventKey="home" title="Ajouter un Produit">
          <ProductFormCategory onAddProduct={handleAddProduct} />
        </Tab>

        <Tab eventKey="profile" title="Gestion des Produits">
          <ProductTable
            products={products}
            handleEditProduct={handleEditProduct}
            handleDeleteProduct={handleDeleteProduct}
          />
        </Tab>

        <Tab eventKey="Management" title="Management des commandes">
          <Container className='card p-5' fluid>
            <h2>Order Management</h2>
            <hr />
            {/* Code for order cards and tables here */}
            <Row className='d-flex align-items-stretch'>
              <Col>
                <Card className='bg-warning  fw-bold  h-100  d-flex align-items-center p-2'>
                  <CiTimer className='fs-1' />
                  <p>
                    En attente de confirmation: {orders.filter((order) => order.Status === 'En attente de confirmation').length}
                  </p>
                </Card>
              </Col>
              <Col>
                <Card className='bg-info  fw-bold  h-100 d-flex align-items-center p-2'>
                  <GiConfirmed className='fs-1' />
                  <p> Confirmée: {orders.filter((order) => order.Status === 'Confirmée').length}</p>
                </Card>
              </Col>
              <Col>
                <Card className='bg-danger  text-light fw-bold h-100  d-flex align-items-center p-2'>
                  <ImCancelCircle className='fs-1' />
                  <p>
                    Annulée: {orders.filter((order) => order.Status === 'Annulée').length}
                  </p>
                </Card>
              </Col>
              <Col>
                <Card className='bg-success text-light fw-bold h-100 d-flex align-items-center p-2'>
                  <TbTruckDelivery className='fs-1' />
                  <p>
                    Livrée: {orders.filter((order) => order.Status === 'Livrée').length}
                  </p>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col className='card p-2 mt-2'>
                <h3>Orders</h3>
                <Card >
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Status</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Products</th>
                        <th>Quantities</th>
                        <th>Unit Prices</th>
                        <th>Total Par Produit</th>
                        <th>Total à Payer TTC</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order._id}>
                          <td>{order._id}</td>
                          <td>{order.Status}</td>
                          <td>{order.createdAt}</td>
                          <td>{order.updatedAt}</td>
                          <td>
                            {/* Afficher les détails des produits ici */}
                            <ul>
                              {order.idProduits.map((productId, index) => (
                                <li key={productId}>
                                  {/* Recherchez le produit correspondant dans la liste des produits */}
                                  {products.map((product) => product._id === productId && (
                                    product.name
                                  ))}
                                  <hr />
                                </li>
                              ))}
                            </ul>
                          </td>
                          <td>
                            <ul>
                              {order.quantites.map((quantity, index) => (
                                <li key={index}>{quantity}   <hr /> </li>
                              ))}
                            </ul>
                          </td>
                          <td>
                            <ul>
                              {order.prixUnitaire.map((unitPrice, index) => (
                                <li key={index}>{unitPrice}   <hr /> </li>
                              ))}
                            </ul>
                          </td>
                          <td>
                            <ul>
                              {order.prixTotal.map((totalPrice, index) => (
                                <li key={index}>{totalPrice}   <hr /> </li>
                              ))}
                            </ul>
                          </td>

                          <td>
                            {order.prixTotal.reduce((acc, totalPrice) => acc + totalPrice, 0)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card>
              </Col>
            </Row>
            {/* Update Order Status */}
            <OrderManagement
              orderId={orderId}
              newStatus={newStatus}
              setOrderId={setOrderId}
              setNewStatus={setNewStatus}
              updateOrderStatus={updateOrderStatus}
              deleteOrder={deleteOrder}
            />
          </Container>
        </Tab>
      </Tabs>

      {/* Modal de modification de produit */}
      <ProductModel
        editingProductId={editingProductId}
        setEditingProductId={setEditingProductId}
        editingProductData={editingProductData}
        setEditingProductData={setEditingProductData}
        handleUpdateProduct={handleUpdateProduct}
      />
    </div>
  );
};

export default ProductAddPageCategory;
