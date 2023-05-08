import React, { useState } from 'react';
import ModelBox from './ModelBox';
import './MobileScreenModel.css'
import imges1 from "@images/cart-product/location.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';
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
  <FontAwesomeIcon icon={faMapMarker} style={{ marginRight: '0.5em' }} />
  <span style={{ color: 'white' }}>Enter US zip code</span>
</button>


                     
                </div>
    </header>
    {showModal && <ModelBox closeModal={closeModal} />}
  </div>
  );
};

export default MobileScreenModel;
