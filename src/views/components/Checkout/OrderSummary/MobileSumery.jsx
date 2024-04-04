import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
// import { placeOrder } from "@store/orders/ordersThunk";
import ShippingButton from '@components/Checkout/ShippingDetails/ShippingButton';
import PaymentButton from '@components/Checkout/PaymentMethod/PaymentButton';
import ReviewButton from '@components/Checkout/ReviewCheckout/ReviewButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import './OrderSummary.css';
import usePaymentData from '../PaymentMethod/usePaymentData';
import { useSearchParams } from 'react-router-dom';

function MobileSummary({
  handleClick,
  activeAccordion,
  // paymentMethod,
  shippingDetails,
  isDisabled,
}) {
  const dispatch = useDispatch();
  const placingOrder = useSelector(state => state.orders.placingOrder);
  const paymentData = usePaymentData();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const cartSlice = useSelector(state => state.cart);
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const [buyNowItem, setBuyNowITem] = useState('');

  useEffect(() => {
    const res = cartSlice.cart.find(item => item.id === parseInt(id));

    if (!res) return;
    setBuyNowITem(res);
  });

  const toggleAccordion = () => {
    setIsAccordionOpen(prev => !prev);
  };
  const Button = () => {
    if (activeAccordion === 1) {
      return (
        <ShippingButton
          handleClick={handleClick}
          id={activeAccordion}
          disabled={isDisabled}>
          Review Order
        </ShippingButton>
      );
    } else if (activeAccordion === 2) {
      return (
        <ReviewButton toggleAccordion={handleClick} id={activeAccordion}>
          Proceed
        </ReviewButton>
      );
    } else {
      // const placeOrderFunc = () => {
      //     dispatch(
      //         placeOrder({ paymentMethod }, (link) =>
      //             location.replace(link)
      //         )
      //     );
      // };

      return (
        <PaymentButton
          clickHandler={() => false}
          id={activeAccordion}
          disabled={true}
          isLoading={placingOrder}>
          Select Payment Method
        </PaymentButton>
      );
    }
  };
  return (
    <div>
      <div>
        <div className='summary-card'>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '14px',
              fontWeight: '600',
              fontSize: '14px',
            }}
            onClick={toggleAccordion}>
            <div className='order-summer-mobile-size-data'>
              <span>Order Summary</span>
            </div>
            <div>
              <span>
                {' '}
                <FontAwesomeIcon
                  icon={isAccordionOpen ? faAngleUp : faAngleDown}
                />{' '}
              </span>
            </div>
          </div>
          {isAccordionOpen && (
            <>
              <div className='summary-wrapper'>
                <div className='summary-details'>
                  <ul>
                    <li>
                      <span>Items:</span>
                      <span>({id ? 1 : cartSlice?.details?.total_items})</span>
                    </li>
                    <li>
                      <span>Price:</span>
                      <span>
                        <strong>
                          {buyNowItem.price
                            ? '$' + buyNowItem.price
                            : '$0' || cartSlice?.details?.sub_total
                              ? '$' + cartSlice.details.sub_total
                              : '$0'}
                        </strong>
                      </span>
                    </li>
                    <li>
                      <span>Shipping & handling:</span>
                      <span>
                        {paymentData?.details?.shipment_amount
                          ? '$' +
                            parseFloat(
                              paymentData?.details?.shipment_amount,
                            ).toFixed(2)
                          : 'Free'}
                      </span>
                    </li>
                    {/* <li>
                      <span>Total before tax:</span>
                      <span>--</span>
                    </li> */}
                    {/* <li>
                      <span>Estimated tax to be calculated:</span>
                      <span>--</span>
                    </li> */}
                  </ul>
                </div>
                <div className='order-total'>
                  <ul>
                    <li>
                      <span>
                        <strong>Order Total</strong>
                      </span>
                      <span>
                        <strong>
                          $
                          {buyNowItem?.price ||
                            paymentData?.details?.total ||
                            cartSlice?.details?.total}
                        </strong>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='summary-footer'>
                {/* <Link to={'#'} style={{ color: '#007185' }}>
                  How shipping costs calculates?
                </Link> */}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MobileSummary;
