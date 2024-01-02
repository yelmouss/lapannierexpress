import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Tab, Tabs } from 'react-bootstrap';
import ProductFormCategory from './ProductFormCategory';
import {
  fetchProducts,
  addProduct,
  editProduct,
  updateProduct,
  deleteProduct,
} from './productFunctionsCategory';

const ProductAddPageCategory = () => {
  // State for managing products and form data
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    prixUnite: '',
    Unite: '',
    categorie: '',
    prixKilo: '',
    imageFile: null,
  });

  // State for managing editing mode and editing product data
  const [editingProductId, setEditingProductId] = useState(null);
  const [editingProductData, setEditingProductData] = useState({
    name: '',
    prixUnite: '',
    Unite: '',
    categorie: '',
    prixKilo: '',
    imageFile: null,
  });

  useEffect(() => {
    // Fetch products on component mount
    fetchProductData();
  }, []);

  // Utility function to fetch products and handle errors
  const fetchProductData = () => {
    fetchProducts(`${process.env.REACT_APP_APIURL}categories/get`)
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  };

  // Handler for adding a new product
  const handleAddProduct = (formData) => {
    addProduct(`${process.env.REACT_APP_APIURL}categories/`, formData)
      .then(() => fetchProductData()) // Fetch products after successful addition
      .catch((error) => console.error(error));
  };

  // Handler for editing a product
  const handleEditProduct = (id, productData) => {
    editProduct(id, productData, setEditingProductId, setEditingProductData)
      
  };

  // Handler for updating a product
  const handleUpdateProduct = () => {
    updateProduct(
      `${process.env.REACT_APP_APIURL}categories/`,
      editingProductId,
      editingProductData,
      setProducts,
      setEditingProductId,
      setEditingProductData
    ).then(() => fetchProductData()) // Fetch products after successful addition
    .catch((error) => console.error(error));
  };

  // Handler for deleting a product
  const handleDeleteProduct = (id) => {
    deleteProduct(process.env.REACT_APP_APIURL, id, setProducts);
  };

  return (
    <div className='container text-center p-5'>
      <Tabs
        defaultActiveKey="profile"
        id="fill-tab-example"
        className="mb-3"
        fill
      >
        {/* Tab for adding a new product */}
        <Tab eventKey="home" title="Ajouter un Produit">
          <ProductFormCategory onAddProduct={handleAddProduct} />
        </Tab>

        {/* Tab for managing existing products */}
        <Tab eventKey="profile" title="Gestion des Produits">
          <table className='table'>
            <thead>
              <tr>
                <th>Produit</th>
                <th>prixUnite</th>
                <th>Unite</th>
                <th>Categorie</th>
                <th>prixKilo</th>
                <th>imageUrl</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.prixUnite}</td>
                  <td>{product.Unite}</td>
                  <td>{product.categorie}</td>
                  <td>{product.prixKilo}</td>
                  <td>
                    <img src={product.imageUrl} className='img-fluid w-25' alt='Product' />
                  </td>
                  <td>
                    <Button variant='info' onClick={() => handleEditProduct(product._id, product)}>
                      Modifier
                    </Button>{' '}
                    -{' '}
                    <Button variant='danger' onClick={() => handleDeleteProduct(product._id)}>
                      Supprimer
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Tab>
      </Tabs>

      <Modal show={!!editingProductId} onHide={() => setEditingProductId(null)}>
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
    </div>
  );
};

export default ProductAddPageCategory;
