import React, { useState, useEffect } from 'react';
import api from './api';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
        withCredentials: true,
      });
      console.log(response.data);
      setImages([...images, response.data.image]);
      setFile(null);
      setSuccessMessage('Imagem enviada com sucesso!');
      setErrorMessage('');
    } catch (err) {
      console.log(err);
      setErrorMessage('Erro ao enviar a imagem. Por favor, tente novamente.');
      setSuccessMessage('');
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const renderImages = () => {
    return (
      <div className="card-container">
        {images.map((image) => (
          <div className="card" key={image.id}>
            <img src={`http://localhost:3002/${image.path}`} alt={image.file_name} className="card-image" />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label htmlFor="file-input" className="file-label">
            Escolher Arquivo
            <input type="file" id="file-input" onChange={handleFileChange} className="file-input" />
          </label>
        </div>
        <button type="submit" className="blue-button">Enviar</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {renderImages()}
    </div>
  );
}

export default App;
