import React, { useState, useEffect } from 'react';
import api from './api';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await api.get('/images');
        setImages(response.data.images);
      } catch (err) {
        console.error(err);
      }
    };

    fetchImages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file_name', file);

    try {
      const response = await api.post('/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true, // adicione esta opção
      });
      console.log(response.data);
      setImages([...images, response.data.image]);
      setSuccessMessage(true);
      setFile(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const renderImages = () => {
    return (
      <ul>
        {images.map((image) => (
          <li key={image.id}>
            <img src={`/images/${image.path}`} alt={image.file_name} />
          </li>
        ))}
      </ul>
    );
  };
  

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit" className="blue-button">Enviar</button>
      </form>
      {successMessage && <p>Imagem enviada com sucesso!</p>}
      {renderImages()}
    </div>
  );
}

export default App;