import { useSelector } from "react-redux";

function usePaymentData(buyNow = false) {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);

    const cartItems = useSelector((state) => state.cart.cart);
    let cartDetails = useSelector((state) => state.cart.details);
    const shippingDetails = useSelector(
        (state) => state.orders.shippingDetails
    );

    if (buyNow && cartItems.length > 0) {
        const item = cartItems[0];
        cartDetails = {
            total: item.price,
            sub_total: item.price,
            total_items: 1,
            shipment_info: { amount: 0 },
        };
    }
    let total_quantity = 0;
    const cartData = cartItems?.map((item) => {
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
        shipping_address: {
            ...shippingDetails,
            email: shippingDetails?.email || user?.email,
            full_name: shippingDetails?.full_name || user?.name,
        },
    };

    if (!isAuthenticated) {
        paymentPayload = {
            ...paymentPayload,
            is_guest: true,
            cart_items: cartData,
            details: {
                ...cartDetails,
                shipment_amount: cartDetails.shipment_amount || 0,
                estimate_days: cartDetails.estimate_days || 0,
                total_quantity,
            },
        };
    }

    return paymentPayload;
}

export default usePaymentData;
