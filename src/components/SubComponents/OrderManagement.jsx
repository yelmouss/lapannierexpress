// OrderManagement.js
import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

const OrderManagement = ({ orderId, newStatus, setOrderId, setNewStatus, updateOrderStatus }) => {
  return (
   
        <Col lg={6} className='align-self-center'>
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
            <br />
            <Button variant="success" onClick={updateOrderStatus}>
              Update Status
            </Button>
          </Form>
        </Col>
    
  );
};

export default OrderManagement;
