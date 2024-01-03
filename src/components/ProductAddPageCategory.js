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

const ProductAddPageCategory = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    prixUnite: '',
    Unite: '',
    categorie: '',
    prixKilo: '',
    imageFile: null,
  });

  const [editingProductId, setEditingProductId] = useState(null);
  const [editingProductData, setEditingProductData] = useState({
    name: '',
    prixUnite: '',
    Unite: '',
    categorie: '',
    prixKilo: '',
    imageFile: null,
  });

  const [orders, setOrders] = useState([]);
  const [orderId, setOrderId] = useState('');
  const [newStatus, setNewStatus] = useState('');

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
    <div className='container text-center p-5'>
      <Tabs defaultActiveKey="Management" id="fill-tab-example" className="mb-3" fill>
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
          <Container className='card'>
            <h2>Order Management</h2>

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
              <Col>
                <h3>Orders</h3>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Status</th>
                      <th>Created At</th>
                      <th>Updated At</th>
                      <th>Products</th>
                      <th>Quantities</th>
                      <th>Unit Prices</th>
                      <th>Total Prices</th>
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
                                  <div key={product._id}>
                                    <p>Name: {product.name}</p>
                                    <p>Price: {product.prixUnite}</p>
                                    <p>Category: {product.categorie}</p>
                                    {/* Ajoutez d'autres détails du produit si nécessaire */}
                                  </div>
                                ))}
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td>
                          {order.quantites.map((quantity, index) => (
                            <span key={index}>{quantity}, </span>
                          ))}
                        </td>
                        <td>
                          {order.prixUnitaire.map((unitPrice, index) => (
                            <span key={index}>{unitPrice}, </span>
                          ))}
                        </td>
                        <td>
                          {order.prixTotal.map((totalPrice, index) => (
                            <span key={index}>{totalPrice}, </span>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>


            {/* Update Order Status */}
            <Row>
              <Col>
                <h3>Update Order Status</h3>
                <Form>
                  <Form.Group controlId="orderId">
                    <Form.Label>Order ID</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Order ID"
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="newStatus">
                    <Form.Label>New Status</Form.Label>
                    <Form.Control
                      as="select"
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                    >
                      <option value="En attente de confirmation">En attente de confirmation</option>
                      <option value="Confirmée">Confirmée</option>
                      <option value="Livrée">Livrée</option>
                      <option value="Annulée">Annulée</option>
                    </Form.Control>
                  </Form.Group>
                  <Button variant="primary" onClick={updateOrderStatus}>
                    Update Status
                  </Button>
                </Form>
              </Col>
            </Row>

            {/* Delete Order */}
            <Row>
              <Col>
                <h3>Delete Order</h3>
                <Form>
                  <Form.Group controlId="orderIdDelete">
                    <Form.Label>Order ID</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Order ID"
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                    />
                  </Form.Group>
                  <Button variant="danger" onClick={deleteOrder}>
                    Delete Order
                  </Button>
                </Form>
              </Col>
            </Row>
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
