import React, { useState, useEffect, useRef } from 'react';
import { Button, Tab, Tabs, Container, Row, Col, Table, Card } from 'react-bootstrap';
import ProductFormCategory from './ProductFormCategory';
import {
  fetchProducts,
  addProduct,
  editProduct,
  updateProduct,
  deleteProduct,
} from './productFunctionsCategory';
import axios from 'axios';
import { GiConfirmed } from 'react-icons/gi';
import { TbTruckDelivery } from 'react-icons/tb';
import { ImCancelCircle } from 'react-icons/im';
import { CiTimer } from 'react-icons/ci';
import ProductTable from './SubComponents/ProductTable';
import ProductModel from './ProductModel';
import OrderManagement from './SubComponents/OrderManagement';
import Swal from 'sweetalert2';  // Import SweetAlert

import $ from 'jquery';

const ProductAddPageCategory = () => {

  const showSuccessAlert = (message) => {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: message,
    });
  };

  const showErrorAlert = (message) => {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
    });
  };

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

  const ordersTableRef = useRef(null);
  const ProductTableref = useRef(null);

  useEffect(() => {
    fetchOrders();
    fetchProductData();
  }, []);

  useEffect(() => {
    // Initialize DataTable after orders are fetched
    if (orders.length > 0 && ordersTableRef.current) {
      $(ordersTableRef.current).DataTable();
    }
  }, [orders]);

  useEffect(() => {
    // Cleanup DataTable when component unmounts
    return () => {
      if (ordersTableRef.current) {
        const dataTable = $(ordersTableRef.current).DataTable({
          responsive: true
        });
        dataTable.clear().destroy();
      }
    };
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
      .then(() => {
        fetchProductData();
        showSuccessAlert('Product added successfully!');
      })
      .catch((error) => {
        console.error(error);
        showErrorAlert('Failed to add product');
      });
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
    deleteProduct(process.env.REACT_APP_APIURL, id, setProducts)
      .then(() => {
        showSuccessAlert('Product deleted successfully!');
      })
      .catch((error) => {
        console.error(error);
        showErrorAlert('Failed to delete product');
      });
  };

  const updateOrderStatus = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_APIURL}commandes/${orderId}/status`, { newStatus });
      fetchOrders();
      showSuccessAlert('Order status updated successfully!');
    } catch (error) {
      console.error('Error updating order status:', error);
      showErrorAlert('Failed to update order status');
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_APIURL}commandes/${orderId}`);
      fetchOrders();
      showSuccessAlert('Order deleted successfully!');
    } catch (error) {
      console.error('Error deleting order:', error);
      showErrorAlert('Failed to delete order');
    }
  };

  const formatDate = (dateString) => {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };

    const formattedDate = new Date(dateString).toLocaleString('fr-FR', options);
    return formattedDate;
  };

  useEffect(() => {
    // Initialize DataTable after orders are fetched
    if (products.length > 0 && ProductTableref.current) {
      $(ProductTableref.current).DataTable();
    }
  }, [products]);

  useEffect(() => {
    // Cleanup DataTable when component unmounts
    return () => {
      if (ProductTableref.current) {
        const dataTable = $(ProductTableref.current).DataTable({
          responsive: true
        });
        dataTable.clear().destroy();
      }
    };
  }, []);

  return (
    <div className='container-fluid text-center p-5'>
      <Tabs defaultActiveKey='Management' id='fill-tab-example' className='mb-3' fill>
        <Tab eventKey='home' title='Ajouter un Produit'>
          <ProductFormCategory onAddProduct={handleAddProduct} />
        </Tab>

        <Tab eventKey='profile' title='Gestion des Produits'>
          <ProductTable
            products={products}
            handleEditProduct={handleEditProduct}
            handleDeleteProduct={handleDeleteProduct}
            ref={ProductTableref}
          />

       
        </Tab>

        <Tab eventKey='Management' title='Management des commandes'>
          <Container className='p-5' fluid>

            <Row className='d-flex align-items-stretch' lg={4} xs={1}>
              <Col className='p-2'>
                <Card className='bg-warning  fw-bold  h-100  d-flex align-items-center p-2'>
                  <CiTimer className='fs-1' />
                  <p>
                    En attente de confirmation: {orders.filter((order) => order.Status === 'En attente de confirmation').length}
                  </p>
                </Card>
              </Col>
              <Col className='p-2'>
                <Card className='bg-info  fw-bold  h-100 d-flex align-items-center p-2'>
                  <GiConfirmed className='fs-1' />
                  <p> Confirmée: {orders.filter((order) => order.Status === 'Confirmée').length}</p>
                </Card>
              </Col>
              <Col className='p-2'>
                <Card className='bg-danger  text-light fw-bold h-100  d-flex align-items-center p-2'>
                  <ImCancelCircle className='fs-1' />
                  <p>
                    Annulée: {orders.filter((order) => order.Status === 'Annulée').length}
                  </p>
                </Card>
              </Col>
              <Col className='p-2'>
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

                <hr />

                <OrderManagement
                  orderId={orderId}
                  newStatus={newStatus}
                  setOrderId={setOrderId}
                  setNewStatus={setNewStatus}
                  updateOrderStatus={updateOrderStatus}
                />
                <hr ></hr>
                <Card className='p-1'>
                  <Table striped bordered hover responsive id='ordersTable' ref={ordersTableRef}>
                    <thead>
                      <tr>
                        <th>Numéro Client</th>
                        <th>Order ID</th>
                        <th>Status</th>
                        <th>Created At</th>
                        <th>Products</th>
                        <th>Quantities</th>
                        <th>Unit Prices</th>
                        <th>Total Par Produit</th>
                        <th>Total à Payer TTC</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order._id}>
                          <td>{order.ClientPhone}</td>
                          <td>{order._id}</td>
                          <td>{order.Status}</td>
                          <td>{formatDate(order.createdAt)}</td>
                          <td>
                            {/* Afficher les détails des produits ici */}
                            <ul>
                              {order.idProduits.map((productId, index) => (
                                <li key={productId}>
                                  {/* Recherchez le produit correspondant dans la liste des produits */}
                                  {products.map((product) => product._id === productId && (
                                    <span className='text-nowrap' key={productId}>{product.name}</span>
                                  ))}
                                </li>
                              ))}
                            </ul>
                          </td>
                          <td>
                            <ul>
                              {order.quantites.map((quantity, index) => (
                                <li key={index}>{quantity}</li>
                              ))}
                            </ul>
                          </td>
                          <td>
                            <ul>
                              {order.prixUnitaire.map((unitPrice, index) => (
                                <li key={index}>{unitPrice}</li>
                              ))}
                            </ul>
                          </td>
                          <td>
                            <ul>
                              {order.prixTotal.map((totalPrice, index) => (
                                <li key={index}>{totalPrice}</li>
                              ))}
                            </ul>
                          </td>
                          <td>
                            {order.prixTotal.reduce((acc, totalPrice) => acc + totalPrice, 0)}
                          </td>
                          <td>
                            <Button variant='danger' onClick={() => deleteOrder(order._id)}>
                              Supprimer
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card>
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
