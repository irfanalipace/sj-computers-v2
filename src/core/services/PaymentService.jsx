import { paymentApi } from '@api/payment';
import { PAYMENT_METHODS } from '../utils/constants';
import { toast } from 'react-toastify';
import { extractJsonObjectFromError } from '../utils/helpers';

export default class PaymentService {
  constructor(data) {
    this.setData(data);
  }

  setData({
    paymentType,
    onPaymentApiFailure,
    onQuantityIssue,
    paymentPayload,
    token,
    onProcessEnd,
    onPaymentApiSuccess,
  }) {
    this.paymentType = paymentType;
    this.token = token;
    this.paymentPayload = paymentPayload;
    this.onProcessEnd = onProcessEnd;
    this.onPaymentApiSuccess = onPaymentApiSuccess;
    this.onPaymentApiFailure = onPaymentApiFailure;
    this.onQuantityIssue = onQuantityIssue;
  }

  async processPaymentApi() {
    try {
      this.paymentPayload.payment_type = this.paymentType;
      if (this.paymentType === PAYMENT_METHODS.SQUARE)
        this.paymentPayload.source_id = this.token;
      let response = await paymentApi(this.paymentPayload);
      if (response?.status == 200) {
        typeof this.onPaymentApiSuccess === 'function' &&
          this.onPaymentApiSuccess(response);
      } else {
        typeof this.onPaymentApiFailure === 'function' &&
          this.onPaymentApiFailure(response?.data?.message);
      }
    } catch (error) {
      const errorString = error?.data?.errors;
      Object.values(error?.data?.errors).map(row => {
        toast.error(row[0]);
      });
      // toast.error(Object.values(error?.data?.errors));
      // console.log(Object.values(error?.data?.errors), 'lollol');
      const errors = extractJsonObjectFromError(errorString);
      if (errors?.cartError) {
        typeof this.onQuantityIssue === 'function' && this.onQuantityIssue();
      } else
        typeof this.onPaymentApiFailure === 'function' &&
          this.onPaymentApiFailure(error?.data?.errors);
    }
    this.onProcessEnd && this.onProcessEnd();
  }
}
