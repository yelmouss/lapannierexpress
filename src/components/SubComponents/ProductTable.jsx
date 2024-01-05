import React, { useState } from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import { CiTrash, CiEdit  } from 'react-icons/ci';
function ProductTable({ products, handleEditProduct, handleDeleteProduct }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const filteredProducts = products
    .filter(product =>
      Object.values(product).some(prop =>
        prop &&
        typeof prop === 'string' &&
        prop.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      // Modifie ici en fonction de la propriété que tu veux trier (dans cet exemple, par nom)
      const propA = a.name ? a.name.toUpperCase() : '';
      const propB = b.name ? b.name.toUpperCase() : '';

      if (sortOrder === 'asc') {
        return propA.localeCompare(propB);
      } else {
        return propB.localeCompare(propA);
      }
    });

  return (
    <div className='card p-4' style={{ height: '500px', overflowY: 'auto' }}>
      <Form className="mb-3">
        <Form.Control
          type="text"
          placeholder="Rechercher un produit"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form>

      <Table responsive>
        <thead>
          <tr>
            <th onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>Produit</th>
            <th>prixUnite</th>
            <th>Unite</th>
            <th>Categorie</th>
            <th>prixKilo</th>
            <th>imageUrl</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.prixUnite}</td>
              <td>{product.Unite}</td>
              <td>{product.categorie}</td>
              <td>{product.prixKilo}</td>
              <td>
                <img src={product.imageUrl} className='img-fluid w-25' alt='Product' />
              </td>
              <td className='text-nowrap'>
                <CiEdit  className='fs-2 text-success' onClick={() => handleEditProduct(product._id, product)} />
                
                -{' '}
                
                 <CiTrash className='fs-2 text-danger' onClick={() => handleDeleteProduct(product._id)} />
             
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ProductTable;
