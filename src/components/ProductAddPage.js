// ProductAddPage.js

import React from 'react';
import ProductForm from './ProductForm';

const ProductAddPage = () => {
  const handleAddProduct = (formData) => {
    // Envoyez la requête POST au serveur avec formData
    // Utilisez fetch ou une bibliothèque comme axios

    fetch(process.env.REACT_APP_APIURL, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  };

  return (
    <div className='container text-center p-5'>      
      <ProductForm onAddProduct={handleAddProduct} />
    </div>
  );
};

export default ProductAddPage;
