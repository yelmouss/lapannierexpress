

export const fetchProducts = async (apiUrl) => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  
  export const addProduct = async (apiUrl, formData, setProducts) => {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setProducts((prevProducts) => [...prevProducts, data]);
    } catch (error) {
      console.error(error);
    }
  };
  
  export const editProduct = (id, productData, setEditingProductId, setEditingProductData) => {
    setEditingProductId(id);
    setEditingProductData(productData);
  };
  
  export const updateProduct = async (apiUrl, editingProductId, editingProductData, setProducts, setEditingProductId, setEditingProductData) => {
    try {
      const formDataToUpdate = new FormData();
      // Ajoutez les autres champs
      formDataToUpdate.append('name', editingProductData.name);
      formDataToUpdate.append('prixUnite', parseInt(editingProductData.prixUnite));
      formDataToUpdate.append('Unite', editingProductData.Unite);
      formDataToUpdate.append('categorie', editingProductData.categorie);
      formDataToUpdate.append('prixKilo', parseInt(editingProductData.prixKilo));
  
      // Ajoutez le fichier image uniquement s'il est sélectionné
      if (editingProductData.imageFile) {
        formDataToUpdate.append('image', editingProductData.imageFile);
      }
  
      const response = await fetch(`${apiUrl}/${editingProductId}`, {
        method: 'PUT',
        body: formDataToUpdate,
      });
      const data = await response.json();
      setProducts((prevProducts) => prevProducts.map((product) => (product._id === editingProductId ? data : product)));
      setEditingProductId(null);
      setEditingProductData({
        name: '',
        prixUnite: '',
        Unite: '',
        categorie: '',
        prixKilo: '',
        imageFile: null,
      });
    } catch (error) {
      console.error(error);
    }
  };
  
  export const deleteProduct = async (apiUrl, id, setProducts) => {
    try {
      await fetch(`${apiUrl}categories/${id}`, {
        method: 'DELETE',
      });
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
    } catch (error) {
      console.error(error);
    }
  };
  