import { PaymentForm, CreditCard } from 'react-square-web-payments-sdk';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DELETE_ITEM } from '@store/cart/cartSlice';
import { PLACING_ORDER, ORDER_PLACED } from '@store/orders/ordersSlice';
import PaymentService from '../../../../../core/services/PaymentService';
import { PAYMENT_METHODS } from '../../../../../core/utils/constants';

import './SquareForm.css';
import {
  clearCartLocally,
  getCartDetails,
  getCartItems,
} from '../../../../../core/utils/cartHelpers';
import usePaymentData from '../usePaymentData';
import { makeDataLayerItemObject } from '../../../../../core/utils/helpers';
import config from '../../../../../core/services/configService';
import { useSearchParams } from 'react-router-dom';
import { CLEAR_CART } from '../../../../../core/store/cart/cartSlice';
import { syncCartItems } from '@store/cart/cartThunks';
export const SquareForm = ({ hideCloseBtn, hideModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const paymentPayload = usePaymentData();
  const placingOrder = useSelector(state => state.orders.placingOrder);
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

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
    if (!response.data.Order.order_detail?.guest) {
      dispatch(syncCartItems()); //gets all the cart items stored in database and stores them in store and local storage similarly stores local cart items in database
    }

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
    window.dataLayer = window.dataLayer || [];
    console.log('add_payment_info', {
      value: getCartDetails().sub_total,
      items: makeDataLayerItemObject(getCartItems()),
    });
    window.dataLayer.push({
      event: 'add_payment_info',
      currency: 'USD',
      value: getCartDetails().sub_total,
      items: makeDataLayerItemObject(getCartItems()),
    });
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
        applicationId={config.VITE_APP_SQUARE_APPLICATION_ID}
        cardTokenizeResponseReceived={onTokenSuccess}
        locationId={config.VITE_APP_SQUARE_LOCATION_ID}
        formProps={{
          className: 'payment-form',
        }}>
        <CreditCard
          includeInputLabels
          buttonProps={buttonProps}
          style={creditCardStyle}
        />
      </PaymentForm>
    </div>
  );
};
