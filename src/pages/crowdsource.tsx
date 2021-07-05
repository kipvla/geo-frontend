import React, { useState, useRef } from 'react';
import ImageUploader from 'react-images-upload';
import Navbar from '../components/presentational/Navbar';
import formatImages from '../lib/images/base64';
import apiService from '../services/apiService';

const CrowdSource = () => {
  const inputEl = useRef(null);

  const [photosToSend, setPhotosToSend] = useState([]);

  const imageHandler = async (arrayOfImages) => {
    const formattedImages = await formatImages(arrayOfImages);
    setPhotosToSend(formattedImages);
  };
  console.log(photosToSend);

  const submitPhotos = async (e) => {
    e.preventDefault();
    const response = await apiService.submitCrowdsourceImages(photosToSend);
    console.log(response);
  };

  return (
    <div className="container">
      <Navbar auth />
      <form onSubmit={submitPhotos} className="image-uploader">
        <ImageUploader
          style={{ backgroundColor: '#fbf3ea' }}
          ref={inputEl}
          withIcon
          buttonText="Upload Images"
          onChange={(images) => imageHandler(images)}
          imgExtension={['.jpg', '.gif', '.png', '.gif', '.heif']}
          maxFileSize={5242880}
          label="Max size: 5mb, Accepted images: jpg|gif|png"
          withPreview
        />
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
