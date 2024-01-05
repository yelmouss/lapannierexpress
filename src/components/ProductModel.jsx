import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

function ProductModel({
  editingProductId,
  setEditingProductId,
  editingProductData,
  handleUpdateProduct,
  setEditingProductData,
}) {
  const handleCloseModal = () => {
    setEditingProductId(null);
  };

  return (
    <Modal show={!!editingProductId} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Modifier le produit</Modal.Title>
      </Modal.Header>
    <Modal.Body>
      <Form>
        {/* Ajoutez les champs d'édition ici */}
        <Form.Group controlId='formName'>
          <Form.Label>Nom du produit</Form.Label>
          <Form.Control
            type='text'
            value={editingProductData.name}
            onChange={(e) => setEditingProductData({ ...editingProductData, name: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId='formPrixUnite'>
          <Form.Label>Prix par unité</Form.Label>
          <Form.Control
            type='text'
            value={editingProductData.prixUnite}
            onChange={(e) => setEditingProductData({ ...editingProductData, prixUnite: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId='formPrixUnite'>
          <Form.Label>Prix par prixKilo</Form.Label>
          <Form.Control
            type='text'
            value={editingProductData.prixKilo}
            onChange={(e) => setEditingProductData({ ...editingProductData, prixKilo: e.target.value })}
          />
        </Form.Group>


        {/* Ajoutez des champs supplémentaires pour Unite, categorie, prixKilo, etc. */}

        <Form.Group controlId='formImage'>
          <Form.Label>Image du produit</Form.Label>
          {editingProductData.imageFile && (
            <img src={URL.createObjectURL(editingProductData.imageFile)} alt='Product' style={{ maxWidth: '100px', maxHeight: '100px' }} />
          )}
          <Form.Control
            type='file'
            accept='image/*'
            onChange={(e) => setEditingProductData({ ...editingProductData, imageFile: e.target.files[0] })}
          />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant='secondary' onClick={() => setEditingProductId(null)}>
        Annuler
      </Button>
      <Button variant='primary' onClick={handleUpdateProduct}>
        Enregistrer les modifications
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default ProductModel