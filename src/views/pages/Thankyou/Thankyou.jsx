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
export default function ThankYou() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const screenWidth = useViewportWidth();
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  }
  let orderFromURL = searchParams.get('orderSuccess');
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
    if (order?.id) {
      const orderString = JSON.stringify(order);
      window.localStorage.setItem('thankyouOrderDetails', orderString);
      setOrderDetails(order);
      clearCartLocally();
      dispatch(CLEAR_CART());
      if (!window.dataLayer) {
        window.dataLayer = window.dataLayer || [];
      }
      console.log('purchase data lyer');
      window.dataLayer.push({
        event: 'purchase',
        currency: 'USD',
        // value: data.cartItem.price,
        transaction_id: '123',
        // items: makeDataLayerItemObject([{ ...data }]),
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
              <p>
                Your order with tracking No{' '}
                <span style={{ fontWeight: '900' }}>{orderDetails?.id}</span>{' '}
                has been successfully confirmed. We’ll send you an email
                notification once your order has shipped.
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
                    <div className='product-title'>Product Name</div>
                  </th>
                  <th>Quantity</th>
                  <th>Order No</th>
                  <th>Order Date</th>
                  <th className='delivery-details'>Delivery Details</th>
                  <th>Payment Type</th>
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
                    <td>${data.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>

          <div className='row total-tax-row mx-0'>
            <div className='col-12 d-flex justify-content-end'>
              {/* <p >Tax ${120.6}</p> */}
            </div>
            {/* <div className='col-12 d-flex justify-content-end'>
              <p style={{ marginRight: '1%', marginTop: '2%' }}>Tax ${'N/A'}</p>
            </div> */}
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
            <div className='col-6 d-flex justify-content-start'>
              {/* {isAuthenticated && (
                        <div className="col-6 d-flex justify-content-start">
                            <button
                                className="track-order-btn"
                                onClick={() => navigate("/account/orders")}
                            >
                                Track your order
                            </button>
                        </div>
                    )} */}
            </div>
            <div className='col-6 d-flex justify-content-end'>
              <button className='shop-more-btn' onClick={() => navigate('/')}>
                Shop more
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
