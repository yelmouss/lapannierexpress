// CheckoutForm.js
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const CheckoutForm = ({ onSubmit, setClientMail }) => {
  const [formData, setFormData] = useState({
    AdresseLivraison: '',
    ClientMail: '',
    ClientPhone: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isConfirmed = await onSubmit(formData);

    if (isConfirmed) {
        setClientMail(formData.ClientMail);
        // Réinitialiser le formulaire
        setFormData({
            AdresseLivraison: '',
            ClientMail: '',
            ClientPhone: '',
        });
    }
};

  return (
    <Form onSubmit={handleSubmit} className='text-center p-3 col-lg-6 col-12 bg-light'>
      <Form.Group controlId="formAdresseLivraison">
        <Form.Label>Adresse de livraison</Form.Label>
        <hr />
        <Form.Control
          type="text"
          name="AdresseLivraison"
          value={formData.AdresseLivraison}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formClientMail">
        <Form.Label>Email :</Form.Label>
        <hr />
        <Form.Control
          type="email"
          name="ClientMail"
          value={formData.ClientMail}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formClientPhone">
        <Form.Label>Téléphone :</Form.Label>
        <hr />
        <Form.Control
          type="tel"
          name="ClientPhone"
          value={formData.ClientPhone}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <hr />
      <Button variant="success" type="submit">
        Passer la commande
      </Button>
    </Form>
  );
};

export default CheckoutForm;