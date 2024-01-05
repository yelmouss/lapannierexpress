// ProductFormCategory.js
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Cat } from '../datas/Categories';

const ProductFormCategory = ({ onAddProduct }) => {
  const [formData, setFormData] = useState({
    name: '',
    prixUnite: '',
    Unite: '',
    categorie: '',
    prixKilo: '',
    imageFile: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, imageFile: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, prixUnite, Unite, categorie, prixKilo, imageFile } = formData;

    const formDataToSend = new FormData();
    formDataToSend.append('name', name);
    formDataToSend.append('prixUnite', prixUnite);
    formDataToSend.append('Unite', Unite);
    formDataToSend.append('categorie', categorie);
    formDataToSend.append('prixKilo', prixKilo);
    formDataToSend.append('image', imageFile);

    onAddProduct(formDataToSend);
  };
  
    return (
        <Container fluid className='d-flex justify-content-center'>

            <form onSubmit={handleSubmit} className='card p-5 col-lg-6 '>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nom du produit:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="form-control" required />
                </div>

                <div className="mb-3">
                    <label htmlFor="prixUnite" className="form-label">Prix par unité:</label>
                    <input type="text" id="prixUnite" name="prixUnite" value={formData.prixUnite} onChange={handleChange} className="form-control" required />
                </div>

                <div className="mb-3">
                    <label htmlFor="Unite" className="form-label">Unité:</label>
                    <input type="text" id="Unite" name="Unite" value={formData.Unite} onChange={handleChange} className="form-control" required />
                </div>

                <div className="mb-3">
                    <label htmlFor="categorie" className="form-label">Filtre de la maison:</label>
                    <select
                        id="categorie"
                        name="categorie"
                        value={formData.categorie}
                        onChange={handleChange}
                        className="form-select"
                        required
                    >
                        <option value="" disabled>Select category filter</option>
                        {Cat.map((item) => (
                            <option key={item.id} value={item.title}>{item.title}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="prixKilo" className="form-label">Prix par kilo:</label>
                    <input type="text" id="prixKilo" name="prixKilo" value={formData.prixKilo} onChange={handleChange} className="form-control" required />
                </div>

                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image du produit:</label>
                    <input type="file" id="image" name="image" onChange={handleImageChange} className="form-control" required />
                </div>
                
                <button type="submit" className="btn btn-success">Ajouter le produit</button>
            </form>
        </Container>

    );
};

export default ProductFormCategory;
