import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file_name', file);

      const response = await axios.post('http://localhost:3002/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage('Erro ao enviar arquivo');
    }
  };

  return (
    <div className="form-container">
      <div className="form-group">
        <label htmlFor="file-input" className="file-label">
          Escolher Arquivo
          <input type="file" id="file-input" onChange={handleFileChange} className="file-input" />
        </label>
      </div>
      <button onClick={handleUpload} className="blue-button">Enviar</button>
      <p>{message}</p>
    </div>
  );
};

const ImageList = ({ images }) => {
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

const App = () => {
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:3002/images');
      setImages(response.data.images);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="container">
      <FileUpload />
      <ImageList images={images} />
    </div>
  );
};

export default App;
