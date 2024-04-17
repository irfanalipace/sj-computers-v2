import React, { useEffect, useState } from 'react';
import './OrderReview.css';
import Rating from '@mui/material/Rating';
import RecommandSectionsProducts from '../homeproduct/productcategory/ProductsItemsList/RecommandSectionsProducts';
import { useSearchParams } from 'react-router-dom';
import {
  getPaypalOrderDetail,
  orderItemReview,
} from '../../../core/api/products';
import { Box, CircularProgress } from '@mui/material';
import { formatDateByMonthName } from '../../../core/utils/helpers';

function OrderReview() {
  const [reveiwData, setReviewData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const orderId = searchParams.get('order_id');
  const handleTextChange = (event, data) => {
    const id = data.product.id;
    const { value } = event.target;
    const index = reveiwData.findIndex(item => item.product_id === id);
    const reveiwDataCopy = [...reveiwData];
    if (index !== -1) {
      reveiwDataCopy[index].body = value;
      setReviewData([...reveiwDataCopy]);
      return;
    }
    if (index === -1) {
      const objectToPushed = {
        product_id: data.product.id,
        rating: 0,
        body: value,
      };
      reveiwDataCopy.push(objectToPushed);
      setReviewData([...reveiwDataCopy]);
      return;
    }
  };

  const handleRatingChange = (event, newValue, data) => {
    const id = data.product.id;
    const index = reveiwData.findIndex(item => item.product_id === id);
    const reveiwDataCopy = [...reveiwData];
    if (index !== -1) {
      reveiwDataCopy[index].rating = newValue || 0;
      setReviewData([...reveiwDataCopy]);
      return;
    }
    if (index === -1) {
      const objectToPushed = {
        product_id: data.product.id,
        rating: newValue || 0,
        body: '',
      };
      reveiwDataCopy.push(objectToPushed);
      setReviewData([...reveiwDataCopy]);
      return;
    }
  };

  const [orders, setOrders] = useState([]);

  const [orderFetching, setOrderFetching] = useState(false);
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [errors, setErrors] = useState([]);

  const getOrders = async () => {
    if (!orderId) return;
    try {
      setOrderFetching(true);
      const res = await getPaypalOrderDetail(atob(orderId));
      setOrders(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setOrderFetching(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, [orderId]);

  const handleSubmit = async () => {
    const errors = reveiwData.filter(
      review => review.rating > 0 && !review.body,
    );
    setErrors([...errors]);
    if (errors.length) return;
    const removeEmptyReview = reveiwData.filter(review => review.body);
    const apiPayload = {
      review_items: [...removeEmptyReview],
    };
    if (orders?.guest_id) {
      apiPayload.guest_id = orders.guest_id;
    } else {
      apiPayload.user_id = orders.user_id;
    }

    try {
      setReviewSubmitting(true);
      const res = await orderItemReview(apiPayload);
    } catch (error) {
      console.error(error);
    } finally {
      setReviewSubmitting(false);
    }
  };

  return (
    <>
      <div className='product-container-review'>
        <div className='customer-review-data'>
          {!!orders?.order_item?.length && (
            <div>
              <h3 className='my-review-heading'>My Reviews</h3>
              <p className='my-review-heading-paragraph'>
                Order Placed {formatDateByMonthName(orders.created_at)}
              </p>
            </div>
          )}
          {!orderFetching && !orders?.order_item?.length ? (
            <>
              <div className='empty-review-card'>
                <p>No order found</p>
              </div>
            </>
          ) : (
            <>
              {!!orders?.order_item?.length &&
                orders?.order_item?.map((cart, index) => (
                  <div
                    className='container-review-inside-data card-details'
                    key={index}>
                    <div className='row'>
                      <div className='col-md-2'>
                        <img
                          width={'120px'}
                          height={'120px'}
                          style={{ objectFit: 'contain' }}
                          src={cart.product.image[0]}
                          alt='Product'
                        />
                      </div>
                      <div className='col-md-10'>
                        <h5>{cart.name}</h5>
                        <span>QTY: {cart.qty}</span>

                        <div className='ratind-dev-sections rating-star-images'>
                          <Rating
                            required
                            name={`rating-${index}`}
                            spacing={7}
                            value={
                              reveiwData.find(item => item.id === cart.id)
                                ?.rating
                            }
                            className='custom-rating'
                            onChange={(e, newValue) =>
                              handleRatingChange(e, newValue, cart)
                            }
                          />
                        </div>

                        <div className='col-md-12'>
                          <div className='product-review-text-area-rating-review-list'>
                            <textarea
                              required
                              name='text'
                              type='text'
                              value={
                                reveiwData.find(item => item.id === cart.id)
                                  ?.body
                              }
                              onChange={e => handleTextChange(e, cart)}
                              placeholder='Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available....'></textarea>
                            {errors.findIndex(
                              item => item.product_id === cart.product.id,
                            ) !== -1 && (
                              <span className='text-danger'>
                                Review is required
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              {orderFetching && (
                <Box sx={{ display: 'flex' }}>
                  <CircularProgress />
                </Box>
              )}
            </>
          )}
          {!!orders?.order_item?.length && (
            <div className='submit-review-button'>
              <button onClick={handleSubmit}>
                {reviewSubmitting ? (
                  <CircularProgress sx={{ color: 'white' }} />
                ) : (
                  'Submit'
                )}
              </button>
            </div>
          )}
        </div>
      </div>
      <div className='desktop-view'>
        <RecommandSectionsProducts />
      </div>
    </>
  );
}

export default OrderReview;
