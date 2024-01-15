import { paymentApi } from "@api/payment";
import { PAYMENT_METHODS } from "../utils/constants";

export default class PaymentService {
    constructor(data) {
        this.setData(data);
    }

    setData({
        cartItems,
        shippingDetails,
        cartDetails,
        user,
        isAuthenticated,
        paymentType,
        navigate,
        token,
        onApiResponse,
        onPaymentSuccess,
    }) {
        this.cartItems = cartItems;
        this.shippingDetails = shippingDetails;
        this.cartDetails = cartDetails;
        this.user = user;
        this.isAuthenticated = isAuthenticated;
        this.paymentType = paymentType;
        this.navigate = navigate;
        this.token = token;
        this.onApiResponse = onApiResponse;
        this.onPaymentSuccess = onPaymentSuccess;
    }

    async processPaymentApi() {
        try {
            const cartData = this.cartItems?.map((item) => {
                return {
                    product_id: item.id,
                    qty: item.quantity,
                };
            });

            let paymentParams = {
                payment_type: this.paymentType,
                shipping_address: {
                    ...this.shippingDetails,
                    email: this.shippingDetails?.email || this.user?.email,
                    full_name:
                        this.shippingDetails?.full_name || this.user?.name,
                },
            };
            if (this.paymentType === PAYMENT_METHODS.SQUARE)
                paymentParams.source_id = this.token;

            if (!this.isAuthenticated) {
                paymentParams = {
                    ...paymentParams,
                    is_guest: true,
                    cart_items: cartData,
                    details: {
                        ...this.cartDetails,
                        shipment_amount: this.cartDetails.shipment_amount || 0,
                        estimate_days: this.cartDetails.estimate_days || 0,
                        total_quantity: this.cartItems?.reduce(
                            (acc, item) => acc + item?.quantity,
                            0
                        ),
                    },
                };
            }

            let response = await paymentApi(paymentParams);

            if (response?.status == 200) {
                console.log("payment successful");
                typeof this.onPaymentSuccess === "function" &&
                    this.onPaymentSuccess();
                const order = response.data;
                console.log(order, "thank order details");
                this.navigate("/thank-you", {
                    state: { order },
                });
            } else {
                if (response?.cart_error) {
                    this.navigate("/cart", {
                        state: { error: true },
                    });
                } else {
                    this.navigate("/checkout?error=" + response?.message);
                }
            }
        } catch (error) {
            console.log("error in square api: ", error);
            this.navigate("/checkout?error=Something Went Wrong");
        }
        this.onApiResponse && this.onApiResponse();
    }
}
