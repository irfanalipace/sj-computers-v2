import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// import { placeOrder } from "@store/orders/ordersThunk";
import ShippingButton from '@components/Checkout/ShippingDetails/ShippingButton';
import PaymentButton from '@components/Checkout/PaymentMethod/PaymentButton';
import ReviewButton from '@components/Checkout/ReviewCheckout/ReviewButton';

import './OrderSummary.css';
import usePaymentData from '../PaymentMethod/usePaymentData';

function OrderSummary({
  handleClick,
  activeAccordion,
  // paymentMethod,
  isDisabled,
}) {
  const dispatch = useDispatch();
  const placingOrder = useSelector(state => state.orders.placingOrder);
  const cartSlice = useSelector(state => state.cart);
  const paymentData = usePaymentData(true);

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

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
      {isAuthenticated ? (
        <div>
          <div className='summary-card'>
            <div className='summary-wrapper'>
              <div className='summary-btn summery-btton-order-summery'>
                <Button />
              </div>
              <div className='summary-details'>
                <ul>
                  <li>
                    <span>Items:</span>
                    <span>({cartSlice?.details?.total_items})</span>
                  </li>
                  <li>
                    <span>Price:</span>
                    <span>
                      <strong>
                        {cartSlice?.details?.sub_total
                          ? '$' + cartSlice.details.sub_total
                          : '$0'}
                      </strong>
                    </span>
                  </li>
                  {/* <li>
                    <span>Shipping & handling:</span>
                    <span>
                      {paymentData?.details?.shipment_amount
                        ? '$' +
                          parseFloat(
                            paymentData?.details?.shipment_amount,
                          ).toFixed(2)
                        : '$0'}
                    </span>
                  </li> */}
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
                      <strong>${paymentData?.details?.total}</strong>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className='summary-footer'>
              <p>
                You can track your shipment and view any applicable import fees
                deposit before placing your order.
              </p>
              <Link to={'#'}>How shipping costs calculates?</Link>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className='summary-card'>
            <div className='summary-wrapper summery-data-checkout-data'>
              <h3>Order Summary</h3>

              <div className='summary-details'>
                <ul>
                  <li>
                    <span>Items:</span>
                    <span>({paymentData?.details?.total_items})</span>
                  </li>
                  <li>
                    <span>Price:</span>
                    <span>
                      <strong>
                        {parseInt(paymentData?.details?.sub_total)?.toFixed(2)
                          ? '$' +
                            parseInt(paymentData.details.sub_total)?.toFixed(2)
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
                        ${parseInt(paymentData?.details?.total)?.toFixed(2)}
                      </strong>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className='summary-footer'>
              {/* <Link to={'#'}>How shipping costs calculates?</Link> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderSummary;
