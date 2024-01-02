import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const CheckoutForm = ({ onSubmit }) => {
  const [AdresseLivraison, setAdresseLivraison] = useState('');
  const [ClientMail, setClientMail] = useState('');
  const [ClientPhone, setClientPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Rassemblez les données du formulaire
    const formData = {
      AdresseLivraison,
      ClientMail,
      ClientPhone,
    };

    // Passez les données du formulaire à la fonction de soumission fournie par le parent
    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit} className='text-center p-3'>
      <Form.Group controlId="formAdresseLivraison">
        <Form.Label>Adresse de livraison</Form.Label>
        <Form.Control
          type="text"
          value={AdresseLivraison}
          onChange={(e) => setAdresseLivraison(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formClientMail">
        <Form.Label>Email du client</Form.Label>
        <Form.Control
          type="email"
          value={ClientMail}
          onChange={(e) => setClientMail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formClientPhone">
        <Form.Label>Téléphone du client</Form.Label>
        <Form.Control
          type="tel"
          value={ClientPhone}
          onChange={(e) => setClientPhone(e.target.value)}
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
