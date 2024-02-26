import React from 'react';
import './SubTotal.css';
export const SubTotal = () => {
  return (
    <div>
      <div className='card card-checkout'>
        <div className='card-body'>
          <div className='card-body-text'>
            <span className='sub-title'>
              Subtotal( 2 items):<strong>$120.50</strong>
            </span>
            <label>
              <input
                type='checkbox'
                name='myCheckbox'
                className='checkbox-paragraph'
              />
              This is a paragraph with a checkbox.
            </label>
          </div>
          <button className='btn btn-primary checkout-button'>
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
};
