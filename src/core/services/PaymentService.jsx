import { paymentApi } from "@api/payment";
import { PAYMENT_METHODS } from "../utils/constants";

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
                typeof this.onPaymentApiSuccess === "function" &&
                    this.onPaymentApiSuccess(response);
            } else {
                if (response?.cart_error) {
                    typeof this.onQuantityIssue === "function" &&
                        this.onQuantityIssue();
                } else {
                    typeof this.onPaymentApiFailure === "function" &&
                        this.onPaymentApiFailure(response?.message);
                }
            }
        } catch (error) {
            console.log("error in square api: ", error);
            typeof this.onPaymentApiFailure === "function" &&
                this.onPaymentApiFailure(error);
        }
        this.onProcessEnd && this.onProcessEnd();
    }
}
