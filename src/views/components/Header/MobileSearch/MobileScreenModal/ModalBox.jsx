import React from 'react';
import './MobileScreenModal.css';
import imges1 from '@images/cart-product/location.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const ModalBox = ({ closeModal }) => {
  return (
    <div className='modal-mobile-screen'>
      <div className='modal-content-mobile-screen'>
        <div>
          <h5 className='box-text-dilver-location'>Choose your location</h5>

          <p className='box-text-dilver-location-text-p'>
            Delivery options and delivery speed may vary for different locations{' '}
          </p>
          <div className='padding-bottom-text-mobile-screen'>
            <Link
              to='/login'
              className='done-dilvery-button text-decoration-none'
              onClick={() => toggleSidebar()}
            >
              Sign to see your address
            </Link>
          </div>
          <div>
            {/* <div className="color-card-dev">
                            <button className="mobile-zip-code-box-image">
                                <FontAwesomeIcon
                                    icon={faMapMarker}
                                    style={{ marginRight: "0.5em" }}
                                />
                                <span>Enter US zip code</span>
                            </button>
                        </div> */}
          </div>
        </div>

        <button className='close-button-done' onClick={closeModal}>
          <span className='box-button-text-mobile-screen'>Done</span>
        </button>
      </div>
    </div>
  );
};

export default ModalBox;
