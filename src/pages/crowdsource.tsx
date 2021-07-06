import React, { useState, useRef } from 'react';
import ImageUploader from 'react-images-upload';
import axios from 'axios';
import LoadingBar from 'react-top-loading-bar';
import Navbar from '../components/presentational/Navbar';
import formatImages from '../lib/images/base64';

const CrowdSource = () => {
  const inputEl = useRef(null);
  const [error, setError] = useState('');
  const [photosToSend, setPhotosToSend] = useState([]);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');

  const imageHandler = async (arrayOfImages) => {
    const formattedImages = await formatImages(arrayOfImages);
    setPhotosToSend(formattedImages);
    setError('');
    setSuccessMessage('');
  };

  const submitPhotos = async (e) => {
    e.preventDefault();

    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        const percent = Math.floor((loaded * 100) / total);
        setUploadPercentage(percent);
      },
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axios.post(
        'http://localhost:3000/places/crowdsource',
        JSON.stringify({ placeImages: photosToSend }),
        options
      );
      setSuccessMessage(response.data.msg);
    } catch (err) {
      setError(err.response.data.msg);
    }
    inputEl.current.state.pictures = [];
    inputEl.current.state.files = [];
    setPhotosToSend([]);
  };

  return (
    <div className="page__container container">
      <LoadingBar
        color="#f11946"
        height={10}
        progress={uploadPercentage}
        onLoaderFinished={() => setUploadPercentage(0)}
      />
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
        <div
          style={{
            marginBottom: '30px',
            display: uploadPercentage === 0 && 'none',
          }}
        >
          Loading:
          {`${uploadPercentage}%`}
        </div>

        {error && <p>{error}</p>}
        {successMessage && <p>{successMessage}</p>}
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
