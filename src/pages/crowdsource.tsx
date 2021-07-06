import React, { useState, useRef } from 'react';
import ImageUploader from 'react-images-upload';
import Navbar from '../components/presentational/Navbar';
import formatImages from '../lib/images/base64';
import apiService from '../services/apiService';

const CrowdSource = () => {
  const inputEl = useRef(null);
  const [error, setError] = useState('');
  const [photosToSend, setPhotosToSend] = useState([]);
  console.log(inputEl);

  const imageHandler = async (arrayOfImages) => {
    const formattedImages = await formatImages(arrayOfImages);
    setPhotosToSend(formattedImages);
    setError('');
  };

  const submitPhotos = async (e) => {
    e.preventDefault();
    const response = await apiService.submitCrowdsourceImages(photosToSend);
    if (!response.ok) {
      const body = await response.json();
      setError(body.msg);
    }
    inputEl.current.state.pictures = [];
    inputEl.current.state.files = [];
    setPhotosToSend([]);
    console.log(inputEl);
  };

  return (
    <div className="page__container container">
      <Navbar auth />
      <form onSubmit={submitPhotos} className="container">
        <ImageUploader
          style={{ backgroundColor: '#fbf3ea' }}
          ref={inputEl}
          withIcon
          buttonText="Upload Images"
          onChange={(images) => imageHandler(images)}
          imgExtension={['.jpg']}
          maxFileSize={5242880}
          label="Max size: 5mb, Accepted images: jpg"
          withPreview
        />
        {error && <p>{error}</p>}
        <button
          type="submit"
          disabled={photosToSend.length === 0}
          className="button__primary"
          style={{ margin: 0 }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CrowdSource;
