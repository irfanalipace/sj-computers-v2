import React, { useState } from 'react';
import './OrderReview.css';
import image1 from '../../../assets/images/common/laptop-img.png';
import Rating from '@mui/material/Rating';
import Recommendation from '../Recommendation/Recommendation';
import RecommandSectionsProducts from '../homeproduct/productcategory/ProductsItemsList/RecommandSectionsProducts';

function OrderReview() {
  const [reviewText, setReviewText] = useState('');

  const handleTextChange = event => {
    setReviewText(event.target.value);
  };

  const [cartDetails, setCartDetails] = useState([
    {
      id: 1,
      image: image1,
      name: 'Lorem Ipsum Text Dot Ext not Isxh sdbd sjhk skjdg KMC, Lorem Ipsum Text, Dot Ext',
      quantity: 1,
      rating: 0,
      reviewText: '',
    },
    {
      id: 2,
      image: image1,
      name: 'Lorem Ipsum Text Dot Ext not Isxh sdbd sjhk skjdg KMC, Lorem Ipsum Text, Dot Ext',
      quantity: 2,
      rating: 0,
      reviewText: '',
    },
  ]);

  return (
    <>
      <div className='product-container-review'>
        <div className='customer-review-data'>
          <div>
            <h3 className='my-review-heading'>My Reviews</h3>
            <p className='my-review-heading-paragraph'>
              Order Placed April 17, 2023
            </p>
          </div>
          {cartDetails.length === 0 ? (
            <>
              <div className='empty-review-card'>
                <p>No reviews to display</p>
              </div>
            </>
          ) : (
            <>
              {cartDetails.map((cart, index) => (
                <div
                  className='container-review-inside-data card-details'
                  key={index}>
                  <div className='row'>
                    <div className='col-md-2'>
                      <img src={cart.image} alt='Product' />
                    </div>
                    <div className='col-md-10'>
                      <h5>{cart.name}</h5>
                      <span>QTY: {cart.quantity}</span>

                      <div className='ratind-dev-sections rating-star-images'>
                        <Rating
                          required
                          name={`rating-${index}`}
                          spacing={7}
                          className='custom-rating'
                        />
                      </div>

                      <div className='col-md-12'>
                        <div className='product-review-text-area-rating-review-list'>
                          <textarea
                            required
                            name='text'
                            type='text'
                            value={reviewText}
                            onChange={handleTextChange}
                            placeholder='Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available....'></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          <div className='submit-review-button'>
            <button>Submit</button>
          </div>
        </div>
      </div>
      <div className='desktop-view'>
        <RecommandSectionsProducts />
      </div>
    </>
  );
}

export default OrderReview;
