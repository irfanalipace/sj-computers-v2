import React from 'react';
import { useState, useEffect } from 'react';

import './thankyou.css'; // Import the CSS file for the component
import tickImage from '../../../assets/images/tick1.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCartLocally } from '../../../core/utils/cartHelpers';
import { CLEAR_CART } from '@store/cart/cartSlice';
import { useViewportWidth } from '@hooks/useViewportWidth';
import MobileThanku from './MobileThanku';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { getPaypalOrderDetail } from '../../../core/api/products';
import { makeDataLayerItemObject } from '@utils/helpers';
export default function ThankYou() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const screenWidth = useViewportWidth();
  const [loading, setLoading] = useState(false);
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  }
  let orderFromURL = searchParams.get('orderSuccess');
  let orderNo = searchParams.get('order_no');

  const callPaypalOrderApi = async orderNo => {
    try {
      setLoading(true);
      let res = await getPaypalOrderDetail(orderNo);
      setOrderDetails(res.data);
    } catch (error) {
      console.print('paypal order api error: ' + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderNo) {
      callPaypalOrderApi(orderNo);
    }
  }, []);

  if (orderFromURL) {
    try {
      let lastClosingBracketIndex = orderFromURL.lastIndexOf('}');

      // If there are any characters after the last '}', it means there's some extra content after the JSON object, remove it
      if (lastClosingBracketIndex !== orderFromURL.length - 1) {
        orderFromURL = orderFromURL.slice(0, lastClosingBracketIndex + 1);
      }

      // Parse the fixed JSON string

      // Now orderFromURL should be a valid JSON string
      orderFromURL += ']';
      const index = orderFromURL.indexOf('}]');
      if (index !== -1) {
        // Insert " before "}}]"
        orderFromURL =
          orderFromURL.slice(0, index) + '"' + orderFromURL.slice(index);
      }
      const lastIndex = orderFromURL.lastIndexOf(']');

      if (lastIndex !== -1) {
        // Insert closing curly brace after the last square bracket
        orderFromURL =
          orderFromURL.slice(0, lastIndex + 1) +
          '}' +
          orderFromURL.slice(lastIndex + 1);
      }
      orderFromURL = JSON.parse(orderFromURL);
    } catch (error) {
      console.log('error parsing order: ', error);
    }
  }

  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState({});
  console.log(orderDetails, 'orderDetails');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();
  useEffect(() => {
    const storedOrder = window.localStorage.getItem('thankyouOrderDetails');
    const order =
      location?.state?.order?.order_detail ||
      JSON.parse(storedOrder) ||
      orderFromURL;

    if (order?.id || orderNo) {
      const orderString = JSON.stringify(order);
      window.localStorage.setItem('thankyouOrderDetails', orderString);
      setOrderDetails(order);

      // clearCartLocally();
      // dispatch(CLEAR_CART());
      window.dataLayer = window.dataLayer || [];
      console.log('purchase data lyer');
      window.dataLayer.push({
        event: 'purchase',
        currency: 'USD',
        value: order?.total_amount,
        transaction_id: order.id,
        items: makeDataLayerItemObject(order?.order_item || []),
      });
    } else {
      // navigate('/')
    }
    return () => {
      window.localStorage.removeItem('thankyouOrderDetails');
    };
  }, []);

  const handleWindowSizeChange = () => {
    setIsMobile(window.innerWidth <= 430);
  };

  useEffect(() => {
    const handleResize = () => {
      handleWindowSizeChange();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <>
      {isMobile === true ? (
        <>
          {/* <div className="card-container">
                        {orderDetails?.order_item?.map((data, index) => (
                            <div className="oder-item-card" key={index}>
                                <div className="card-image">
                                    <img
                                        src={
                                            data?.product?.image[0]
                                                ? data?.product?.image[0]
                                                : "https://m.media-amazon.com/images/I/81zf6aaAK1L.jpg"
                                        }
                                        alt="Product"
                                    />
                                </div>
                                <div className="card-content">
                                    <div className="product-name-thanks">
                                        {data && data?.product_name.length > 40
                                            ? data?.product_name.slice(0, 40) +
                                              "..."
                                            : data?.product_name}
                                    </div>
 
                                    <div className="product-details-Thanks">
                                        <div className="quantity">
                                            <span>Quantity:</span>
                                        </div>
                                        <div className="col-12 my-2 quantity">
                                            {data?.qty}
                                        </div>
                                        <div className="col-12 my-2 order-no">
                                            <span>Order No:</span>
                                        </div>
                                        <div className="col-12 my-2 order-no">
                                            {data?.order_id}
                                        </div>
                                        <div className="col-12 my-2 order-date">
                                            <span>Order Date:</span>
                                        </div>
                                        <div className="col-12 my-2 order-date">
                                            {formatDate(data.created_at)}
                                        </div>
                                        <div
                                            style={{ width: "100%" }}
                                            className="col-12 my-2 delivery-details"
                                        >
                                            <span>Delivery Details:</span>
                                        </div>
                                        <div className="col-12 my-2 delivery-details">
                                            {orderDetails?.shipment_days}
                                        </div>
                                        <div className="col-12 my-2 payment-type">
                                            <span>Payment Type:</span>
                                        </div>
                                        <div className="col-12 my-2 payment-type">
                                            Square
                                        </div>
                                        <div className="col-6 my-2 sub-total">
                                            <span>Sub Total:</span>
                                        </div>
                                        <div className="col-6 my-2 sub-total">
                                            ${data.price}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div> */}
          <MobileThanku />
        </>
      ) : (
        <div
          className='thank-you-page'
          style={{ marginLeft: '10%', marginRight: '10%' }}>
          <div className='row margintopBottom'>
            <div className='col-12 my-10'>
              <div className='d-flex justify-content-center align-items-center'>
                {/* <img
          src={circle}
          alt="Circle Image"
          style={{ position: "", zIndex: 1 }}
        /> */}
                <div
                  className='d-flex justify-content-center align-items-center'
                  style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                    backgroundColor: '#318243',
                  }}>
                  <img
                    src={tickImage}
                    alt='Tick Image'
                    style={{
                      position: '',
                      zIndex: 2,
                      marginLeft: '-3.3%',
                    }}
                  />
                </div>
              </div>
            </div>
            <div className='col-12 my-2'>
              <h1>Thanks for Order</h1>
            </div>
            <div className='col-12 my-20'>
              <p className='track-order-paragraph-changes'>
                Your order with tracking No{' '}
                <span style={{ fontWeight: '900' }}>{orderDetails?.id}</span>{' '}
                has been successfully confirmed. We’ll send you an <br></br>{' '}
                email notification once your order has shipped.
              </p>
            </div>
          </div>
          <div></div>
          {/* <div className="product-thumbnail">
              <img src={productImage} alt="Product" />
            </div> */}
          {/* Map through the tableData array and render table rows */}
          {/* <div class="text-truncate"></div> */}
          {/* <div className="product-title">{data?.product_name}</div> */}

          <>
            <table className='thank-you-table'>
              <thead>
                <tr>
                  <th className='product-name-thanks'>
                    <div
                      className='product-title'
                      style={{ fontWeight: '600', fontSize: '14px' }}>
                      Product Name
                    </div>
                  </th>
                  <th>Quantity</th>
                  <th>Order No</th>
                  <th>Order Date</th>
                  <th className='delivery-details'>Delivery Details</th>
                  <th>Payment Type</th>
                  <th>Price</th>
                  <th>Sub Total</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails?.order_item?.map((data, index) => (
                  <tr key={index}>
                    <td>
                      <div style={{ display: 'flex' }}>
                        {data?.product?.image[0] && (
                          <div className='product-thumbnail'>
                            <img
                              src={
                                data?.product?.image[0]
                                  ? data?.product?.image[0]
                                  : 'https://m.media-amazon.com/images/I/81zf6aaAK1L.jpg'
                              }
                              alt='Product'
                            />
                            {data && data?.product_name.length > 20
                              ? data?.product_name.slice(0, 20) + '...'
                              : data?.product_name}
                          </div>
                        )}
                      </div>
                    </td>
                    <td>{data?.qty}</td>
                    <td>{data?.order_id}</td>
                    <td>{formatDate(data.created_at)}</td>
                    <td>{orderDetails?.shipment_days}</td>
                    <td>{orderDetails?.Payment_type || 'Square'}</td>
                    <td>${data?.product?.discounted_price || data.price}</td>
                    <td>
                      $
                      {data?.product?.discounted_price * data?.qty ||
                        data.price * data?.qty}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>

          {!loading ? (
            <>
              <div className='row total-tax-row mx-0'>
                <div className='col-12 d-flex justify-content-end'></div>

                <div className='col-6 d-flex justify-content-start'>
                  <p className='bold-total'>Total</p>
                </div>
                <div className='col-6 d-flex justify-content-end'>
                  <p className='bold-total'>
                    $
                    {orderDetails?.total_amount
                      ? orderDetails?.total_amount
                      : 'N/A'}
                  </p>
                </div>
              </div>
              <div className='row mx-0 mb-5'>
                <div
                  className='col-12 d-flex '
                  style={{ justifyContent: 'center' }}>
                  <button
                    className='shop-more-btn'
                    onClick={() => {
                      if (orderDetails?.guest) {
                        window.location.pathname = '/';
                      } else {
                        navigate('/');
                      }
                    }}>
                    Shop again
                  </button>
                </div>
              </div>
            </>
          ) : (
            <Box
              sx={{
                mt: 5,
                justifyContent: 'center',
                display: 'flex',
                width: '100%',
              }}>
              <CircularProgress sx={{ color: 'black' }} />
            </Box>
          )}
        </div>
      )}
    </>
  );
}
