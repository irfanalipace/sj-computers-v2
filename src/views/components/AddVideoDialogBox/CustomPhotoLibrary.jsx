import React, { useState } from 'react';

const CustomPhotoLibrary = () => {
  const [images, setImages] = useState([]);

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const newImages = [...images];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Ensure it's an image file
      if (file.type.startsWith('image/')) {
        newImages.push(file);
      }
    }

    setImages(newImages);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    handleFiles(files);
  };

  const handleUploadClick = () => {
    // Perform the actual upload logic here
    // You can send the images to a server or process them as needed
    console.log('Uploading images:', images);
    // Clear the images after upload
    setImages([]);
  };

  return (
    <div className='card'>
     
    </div>
  );
};



export default CustomPhotoLibrary;
