import { paymentApi } from "@api/payment";

export default class PaymentService {
    constructor(data) {
        this.setData(data);
    }

    setData({
        paymentType,
        onPaymentApiFailure,
        onQuantityIssue,
        token,
        onProcessEnd,
        onPaymentApiSuccess,
    }) {
        this.paymentType = paymentType;
        this.navigate = navigate;
        this.token = token;
        this.onProcessEnd = onProcessEnd;
        this.onPaymentApiSuccess = onPaymentApiSuccess;
        this.onPaymentApiFailure = onPaymentApiFailure;
        this.onQuantityIssue = onQuantityIssue;
    }

    async processPaymentApi() {
        try {
            let response = await paymentApi(paymentParams);

            if (response?.status == 200) {
                const order = response.data;
                typeof this.onPaymentApiSuccess === "function" &&
                    this.onPaymentApiSuccess(order);

            } else {
                if (response?.cart_error) {
                    this.onQuantityIssue()
                } else {
                    onPaymentApiFailure(response?.message);
                }
            }
        } catch (error) {
            console.log("error in square api: ", error);
            onPaymentApiFailure(error);
        }
        this.onProcessEnd && this.onProcessEnd();
    }
}
