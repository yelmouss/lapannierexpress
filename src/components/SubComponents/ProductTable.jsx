import React from 'react'
import { Button, Table } from 'react-bootstrap';
function ProductTable({products, handleEditProduct, handleDeleteProduct}) {
  return (
    <Table responsive>
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
    </Table>
  )
}

export default ProductTable