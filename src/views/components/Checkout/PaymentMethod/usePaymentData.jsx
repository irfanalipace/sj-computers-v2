import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function usePaymentData(buyNow = false) {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);
    const [itemsToShow, setItemsToShow] = useState([]);
    const [searchParams] = useSearchParams();

    const cartItems = useSelector((state) => state.cart.cart);
    let cartDetails = useSelector((state) => state.cart.details);

    const shippingDetails = useSelector(
        (state) => state.orders.shippingDetails,
    );

    const id = searchParams.get("id");
    const items = () => {
        if (id && buyNow) {
            const oneItem = cartItems?.find((item) => item.id === parseInt(id));
            setItemsToShow([oneItem]);
        } else {
            setItemsToShow(cartItems);
        }
    };

    useEffect(() => {
        items();
    }, []);

    let total_quantity = 0;
    const cartData = itemsToShow?.map((item) => {
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
                shipment_amount: cartDetails.shipment_amount || 0,
                estimate_days: cartDetails.estimate_days || 0,
                total_quantity,
            },
        };
        if (buyNow && id) {
            const buyNowItem = itemsToShow[0];
            paymentPayload.details.total = buyNowItem?.price;
            paymentPayload.details.sub_total = buyNowItem?.price;
            paymentPayload.details.total_items = 1;
        } else {
            paymentPayload.details = cartDetails;
        }
    }

    return paymentPayload;
}

export default usePaymentData;
