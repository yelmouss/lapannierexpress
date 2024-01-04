// OrderManagement.js
import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

const OrderManagement = ({ orderId, newStatus, setOrderId, setNewStatus, updateOrderStatus, deleteOrder }) => {
  return (
    <div>
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
    </div>
  );
};

export default OrderManagement;
