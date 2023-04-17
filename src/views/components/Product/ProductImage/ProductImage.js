import React, { useState } from 'react';
import './ProductImage.css';
import image1 from "@images/Product-Page-slider/img1.png";
import image2 from "@images/Product-Page-slider/img2.png";
import image3 from "@images/Product-Page-slider/img3.png";
import image4 from "@images/Product-Page-slider/img4.png";
import image5 from "@images/Product-Page-slider/img5.png";
import image6 from "@images/Product-Page-slider/img6.png";

const SelectedImage = ({ image, onClose }) => {
  return (
    <div className="image-screen">
      <img src={image} className="selected-image" />
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export const ProductImage = () => {
  const [selectedImg, setSelectedImg] = useState(selectedImg);
  const images = [image1, image2, image3, image4, image5, image6];

  return (
    <div className="image-container">
      <div className="horizontal-box">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index}`}
            onClick={() => setSelectedImg(image)}
          />
        ))}
      </div>
      {selectedImg && (
        <SelectedImage image={selectedImg} onClose={() => setSelectedImg(null)} />
      )}
    </div>
  );
};
