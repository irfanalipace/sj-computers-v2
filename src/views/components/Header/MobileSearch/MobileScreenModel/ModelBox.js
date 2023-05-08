import React from 'react';
import './MobileScreenModel.css'
import imges1 from "@images/cart-product/location.png";
const ModelBox = ({ closeModal }) => {
    return (
        <div className="modal-mobile-screen">
        <div className="modal-content-mobile-screen">
        

        <div>
        <h5 className='box-text-dilver-location'>Choose your location</h5>
         
        <p className='box-text-dilver-location-text-p'>Delivery options and delivery speed may vary for different locations </p>
       <div className='padding-bottom-text-mobile-screen'> 
        <button className='done-dilvery-button'>Sign to see your address</button>
       </div>
        <div>  
        <div className="color-card-dev">
                    <button className="mobile-zip-code-box-image">
                        <img src={imges1} /> {' '} {' '} Enter US zip code
                      
                    </button>
                </div>
        </div>
        </div>
  
          <button className="close-button-done" onClick={closeModal}>
            <span className='box-button-text-mobile-screen'>Done</span>
          </button>
        
        </div>
        
     
      </div>
      
    );
  };

export default ModelBox;
