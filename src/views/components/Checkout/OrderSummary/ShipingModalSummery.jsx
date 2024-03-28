import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
// import { placeOrder } from "@store/orders/ordersThunk";
import ShippingButton from '@components/Checkout/ShippingDetails/ShippingButton';
import PaymentButton from '@components/Checkout/PaymentMethod/PaymentButton';
import ReviewButton from '@components/Checkout/ReviewCheckout/ReviewButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import './OrderSummary.css';
import usePaymentData from '../PaymentMethod/usePaymentData';

function ShipingModalSummery({
  handleClick,
  activeAccordion,
  // paymentMethod,
  isDisabled,
  isOpen,
  onClose,
  children,
}) {
  const dispatch = useDispatch();
  const placingOrder = useSelector(state => state.orders.placingOrder);
  const paymentData = usePaymentData(true);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const toggleAccordion = ({ onClose }) => {
    setIsAccordionOpen(prev => !prev);
  };
  if (!isOpen) return null;
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
    <div onClick={onClose}>
      <div className='summer-mobile-modal-overlay'>
        <div className='summer-mobile-modal-content'>
          <div className='order-summer-mobile-size-data'>
            <span>order Summery</span>
          </div>
          <hr></hr>

          <div className='summary-wrapper'>
            <div className='summary-details details-summery-modal-view'>
              <ul>
                <li>
                  <span>Items:</span>
                  <span>({paymentData?.details?.total_items})</span>
                </li>
                <li>
                  <span>Price:</span>
                  <span>
                    <strong>
                      {paymentData?.details?.sub_total
                        ? '$' + paymentData.details.sub_total
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
                    <strong>${paymentData?.details?.total}</strong>
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className='summary-footer'>
            <Link to={'#'} style={{ color: '#007185' }}>
              How shipping costs calculates?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShipingModalSummery;
