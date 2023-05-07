import React, { useState } from 'react';
import ModelBox from './ModelBox';
import './MobileScreenModel.css'
import imges1 from "@images/cart-product/location.png";
const MobileScreenModel = () => {
    const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <div>
    <header>
      <div className="color-card-dev">
                    <button className="mobile-zip-code-box-image-dilvery-box" onClick={handleButtonClick}>
                        <img src={imges1} className='color-image-dilvery-box-mobile-screen'/> {' '} {' '} Enter US zip code
                      
                    </button>
                </div>
    </header>
    {showModal && <ModelBox closeModal={closeModal} />}
  </div>
  );
};

export default MobileScreenModel;
