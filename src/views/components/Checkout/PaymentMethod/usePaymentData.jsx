import { useSelector } from "react-redux";
import { PAYMENT_METHODS } from "../../../../core/utils/constants";

function usePaymentData() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);

    const cartItems = useSelector((state) => state.cart.cart);
    const cartDetails = useSelector((state) => state.cart.details);

    let total_quantity = 0;
    const cartData = this.cartItems?.map((item) => {
        // map item according to the request payload format
        total_quantity += item?.quantity;
        const obj = {
            product_id: item.id,
            qty: item.quantity,
        };
        if (item.plan?.value && !isAuthenticated) {
            obj.protection_plan_id = item.plan.value;
        }
        return obj;
    });

    let paymentPayload = {
        payment_type: this.paymentType,
        shipping_address: {
            ...this.shippingDetails,
            email: this.shippingDetails?.email || this.user?.email,
            full_name: this.shippingDetails?.full_name || this.user?.name,
        },
    };
    if (this.paymentType === PAYMENT_METHODS.SQUARE)
        paymentPayload.source_id = this.token;

    if (!this.isAuthenticated) {
        paymentPayload = {
            ...paymentPayload,
            is_guest: true,
            cart_items: cartData,
            details: {
                ...this.cartDetails,
                shipment_amount: this.cartDetails.shipment_amount || 0,
                estimate_days: this.cartDetails.estimate_days || 0,
                total_quantity,
            },
        };
    }

    return paymentPayload;
}

export default usePaymentData;
