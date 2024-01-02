import React, { useState } from 'react'


const CommandeForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        prixUnite: '',
        Unite: '',
        homeFilter: '',
        prixKilo: '',
        imageFile: null,
    });

  return (
    <div>CommandeForm</div>
  )
}

export default CommandeForm