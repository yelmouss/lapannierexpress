// CheckoutForm.js
import React, { useState } from 'react';
import { Bounce } from 'react-awesome-reveal';
import { Form, Button } from 'react-bootstrap';
import { CiShop } from "react-icons/ci";

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
    <Form onSubmit={handleSubmit} className='text-center p-3 col-lg-6 col-12 bgBrand rounded'>
      <Form.Group controlId="formAdresseLivraison">
        <Form.Label>Adresse de livraison</Form.Label>
        
        <Form.Control
          as="textarea"
          name="AdresseLivraison"
          value={formData.AdresseLivraison}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <hr />
      <Form.Group controlId="formClientMail">
        <Form.Label>Email :</Form.Label>
      
        <Form.Control
          type="email"
          name="ClientMail"
          value={formData.ClientMail}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <hr />
      <Form.Group controlId="formClientPhone">
        <Form.Label>Téléphone :</Form.Label>
       
        <Form.Control
          type="tel"
          name="ClientPhone"
          value={formData.ClientPhone}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <hr />
      <button className='btn bgBrand2 textbrand'>
      <CiShop className='fs-2 fw-bold'/>   Passer la commande & le Payement à la livraison
      </button>
    </Form>
  );
};

export default CheckoutForm;