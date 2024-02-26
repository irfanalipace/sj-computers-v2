import { PaymentForm, CreditCard } from 'react-square-web-payments-sdk';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CLEAR_CART } from '@store/cart/cartSlice';
import { PLACING_ORDER, ORDER_PLACED } from '@store/orders/ordersSlice';
import PaymentService from '../../../../../core/services/PaymentService';
import { PAYMENT_METHODS } from '../../../../../core/utils/constants';

import './SquareForm.css';
import { clearCartLocally } from '../../../../../core/utils/cartHelpers';
import usePaymentData from '../usePaymentData';

export const SquareForm = ({ hideCloseBtn, hideModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const paymentPayload = usePaymentData();
  const placingOrder = useSelector(state => state.orders.placingOrder);

  const buttonProps = {
    css: {
      backgroundColor: '#318243',
      fontSize: '14px',
      '&:hover': {
        backgroundColor: '#2e663b',
      },
    },
    isLoading: placingOrder,
  };
  const creditCardStyle = {
    input: {
      fontSize: '14px',
    },
  };

  const onPaymentApiSuccess = response => {
    // deleteGuestUserEmail();
    clearCartLocally();
    dispatch(CLEAR_CART());
    navigate('/thank-you', {
      state: { order: response.data.Order },
    });
  };

  const onProcessEnd = () => {
    hideModal();
    dispatch(ORDER_PLACED());
  };
  const onPaymentApiFailure = error => {
    // navigate("/checkout?error=" + response?.message);
    navigate('/checkout', {
      state: { error },
    });
  };
  const onQuantityIssue = () => {
    navigate('/cart', {
      state: { error: true },
    });
  };

  async function onTokenSuccess({ token }) {
    dispatch(PLACING_ORDER());
    hideCloseBtn();

    const paymentService = new PaymentService({
      token,
      paymentType: PAYMENT_METHODS.SQUARE,
      paymentPayload,
      onPaymentApiFailure,
      onQuantityIssue,
      onPaymentApiSuccess,
      onProcessEnd,
    });
    paymentService.processPaymentApi();
  }
  return (
    <div>
      <PaymentForm
        applicationId={import.meta.env.VITE_APP_SQUARE_APPLICATION_ID}
        cardTokenizeResponseReceived={onTokenSuccess}
        locationId={import.meta.env.VITE_APP_SQUARE_LOCATION_ID}
        formProps={{
          className: 'payment-form',
        }}
      >
        <CreditCard
          includeInputLabels
          buttonProps={buttonProps}
          style={creditCardStyle}
        />
      </PaymentForm>
    </div>
  );
};
