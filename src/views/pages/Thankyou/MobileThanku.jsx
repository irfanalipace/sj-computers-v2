import React from 'react';
import { useState, useEffect } from 'react';

import './thankyou.css'; // Import the CSS file for the component
import tickImage from '../../../assets/images/tick1.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCartLocally } from '../../../core/utils/cartHelpers';
import { CLEAR_CART } from '@store/cart/cartSlice';
import { colors } from 'laravel-mix/src/Log';

export default function MobileThanku() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  }
  let orderFromURL = searchParams.get('orderSuccess');

  if (orderFromURL) {
    try {
      orderFromURL = JSON.parse(orderFromURL);
    } catch (error) {
      console.log('error parsing order: ', error);
    }
  }

  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState({});
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();
  useEffect(() => {
    const storedOrder = window.localStorage.getItem('thankyouOrderDetails');
    const order =
      location?.state?.order?.order_detail ||
      JSON.parse(storedOrder) ||
      orderFromURL?.order?.order_details;
    if (order?.id) {
      const orderString = JSON.stringify(order);
      window.localStorage.setItem('thankyouOrderDetails', orderString);
      setOrderDetails(order);
      clearCartLocally();
      dispatch(CLEAR_CART());
    } else {
      // navigate('/')
    }
    return () => {
      window.localStorage.removeItem('thankyouOrderDetails');
    };
  }, []);

  const handleWindowSizeChange = () => {
    setIsMobile(window.innerWidth <= 768);
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
    <div
      className='thank-you-page'
      style={{ marginLeft: '10%', marginRight: '10%' }}>
      <div className='oreder-confirm-page-data'>
        {' '}
        <span>Order Confirmed</span>
      </div>

      <div className='row margintopBottom'>
        <div className='col-12 my-10'>
          <div className='d-flex justify-content-center align-items-center'>
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
        <div className='jhon-name-user-order'>
          <span>Hi {orderDetails?.user?.name}</span>
        </div>
        <div className='col-12 my-2'>
          <div className='oreder-confirm-page-data'>
            {' '}
            <span>Thanks for Order</span>
          </div>
        </div>
        <div className='col-12 my-20'>
          <p className='track-order-paragraph-changes'>
            Your order{' '}
            <span style={{ fontWeight: '900' }}>{orderDetails?.id}</span> has
            been successfully placed. We’ll send you an <br></br> email
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

      {/* {isMobile === true ? (
                <>
                    <div className="card-container">
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
                    </div>
                </>
            ) : (
                <>
                    <table className="thank-you-table">
                        <thead>
                            <tr>
                                <th className="product-name-thanks">
                                    <div className="product-title">
                                        Product Name
                                    </div>
                                </th>
                                <th>Quantity</th>
                                <th>Order No</th>
                                <th>Order Date</th>
                                <th className="delivery-details">
                                    Delivery Details
                                </th>
                                <th>Payment Type</th>
                                <th>Sub Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderDetails?.order_item?.map((data, index) => (
                                <tr key={index}>
                                    <td>
                                        <div style={{ display: "flex" }}>
                                            {data?.product?.image[0] && (
                                                <div className="product-thumbnail">
                                                    <img
                                                        src={
                                                            data?.product
                                                                ?.image[0]
                                                                ? data?.product
                                                                      ?.image[0]
                                                                : "https://m.media-amazon.com/images/I/81zf6aaAK1L.jpg"
                                                        }
                                                        alt="Product"
                                                    />
                                                    {data &&
                                                    data?.product_name.length >
                                                        20
                                                        ? data?.product_name.slice(
                                                              0,
                                                              20
                                                          ) + "..."
                                                        : data?.product_name}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td>{data?.qty}</td>
                                    <td>{data?.order_id}</td>
                                    <td>{formatDate(data.created_at)}</td>
                                    <td>{orderDetails?.shipment_days}</td>
                                    <td>{"Square"}</td>
                                    <td>${data.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )} */}

      <div className='card-container'>
        <span className='order-summery-items-card'>Order Summary</span>
        <div className='oder-item-card'>
          <div className='card-image'></div>
          <div className='card-content'>
            <div className='product-details'>
              {orderDetails?.order_item?.map(item => (
                <>
                  <div className='Items-thanku-view-page-thanks'>
                    <div className=''>
                      <span> Product Name:</span>
                    </div>
                    <div className=' '>
                      <span> {(item?.product?.name).substring(0, 25)}... </span>
                    </div>
                  </div>

                  <div className='Items-thanku-view-page-thanks'>
                    <div className=''>
                      <span> Order No:</span>
                    </div>
                    <div className=' '>
                      <span>{item?.id}</span>
                    </div>
                  </div>

                  <div className='Items-thanku-view-page-thanks'>
                    <div className=''>
                      <span> Quantity:</span>
                    </div>
                    <div className=' '>
                      <span>{item?.qty}</span>
                    </div>
                  </div>
                  <div className='Items-thanku-view-page-thanks'>
                    <div className=''>
                      <span> Price:</span>
                    </div>
                    <div className=' '>
                      <span style={{ fontWeight: '600' }}>
                        {' '}
                        ${item?.product?.discounted_price || item?.price}
                      </span>
                    </div>
                  </div>
                  <div className='Items-thanku-view-page-thanks'>
                    <div className=''>
                      <span> Sub Total:</span>
                    </div>
                    <div className=' '>
                      <span style={{ fontWeight: '600' }}>
                        $
                        {item?.product?.discounted_price
                          ? item?.qty * item?.product?.discounted_price
                          : item?.qty * item?.price}
                      </span>
                    </div>
                  </div>
                  <hr></hr>
                </>
              ))}
              <div className='Items-thanku-view-page-thanks'>
                <div className=''>
                  <span style={{ fontWeight: '600' }}>Order Total:</span>
                </div>
                <div className=' '>
                  <span style={{ color: '#b12704' }}>
                    {' '}
                    ${orderDetails?.total_amount}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className='Items-calcurteing-items'>
            {/* <span> How shipping costs calculates?</span> */}
          </div>
        </div>
      </div>

      <div className='card-container' style={{ marginBottom: '40px' }}>
        <div className='oder-item-card'>
          <button className='shop-more-btn' onClick={() => navigate('/')}>
            Shop again
          </button>
        </div>
      </div>
      {/* <div className="card-container">

<div className="oder-item-card">
<button
className="track-oder-item-card"
onClick={() => navigate("/")}
>
Track Your Order
</button>
</div>


</div> */}
    </div>
  );
}
