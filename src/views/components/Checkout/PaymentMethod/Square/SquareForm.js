import { PaymentForm, CreditCard } from "react-square-web-payments-sdk";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    getCartItems,
    updateLocalPropertyOfAllItems,
} from "../../../../../core/utils/cartHelpers";
import {
    CLEAR_CART,
    UPDATE_LOCAL_PROPERTY_OF_ALL_ITEMS,
} from "@store/cart/cartSlice";
import { PLACING_ORDER, ORDER_PLACED } from "@store/orders/ordersSlice";
import { sendTokenApi } from "@api/square";
import { addListToCartApi } from "../../../../../core/api/cart";
import { clearCartLocally, getCartDetails } from "@utils/cartHelpers";
import {
    saveGuestUserEmail,
    deleteGuestUserEmail,
} from "@services/authService";

import "./SquareForm.css";

export const SquareForm = ({ hideCloseBtn, hideModal, shippingDetails }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const placingOrder = useSelector((state) => state.orders.placingOrder);

    const cartItems = useSelector((state) => state.cart.cart);
    const cartDetails = useSelector((state) => state.cart.details);
    const buttonProps = {
        css: {
            backgroundColor: "#318243",
            fontSize: "14px",
            "&:hover": {
                backgroundColor: "#2e663b",
            },
        },
        isLoading: placingOrder,
    };
    const creditCardStyle = {
        input: {
            fontSize: "14px",
        },
    };

    const destroyCart = () => {
        // deleteGuestUserEmail();
        clearCartLocally();
        dispatch(CLEAR_CART());
    };

    // const updateCart = () => {
    //     saveGuestUserEmail(shippingDetails?.email);
    //     updateLocalPropertyOfAllItems();
    //     dispatch(UPDATE_LOCAL_PROPERTY_OF_ALL_ITEMS());
    // };
    async function onTokenSuccess(token) {
        dispatch(PLACING_ORDER());
        hideCloseBtn();
        // let itemsAdded = false;
        // if (!isAuthenticated) {
        //     try {
        //         let cartItemss = getCartItems();
        //         /// add to cart item list api
        //         const cartData = cartItemss
        //             .filter((item) => !item.notLocal)
        //             .map((item) => ({
        //                 product_id: item.id,
        //                 qty: item.quantity,
        //             }));

        //         await addListToCartApi({
        //             cartItems: cartData,
        //             shipping_address: shippingDetails,
        //         });
        //         itemsAdded = true;
        //     } catch (error) {
        //         console.print("error in addLocalListToCart api: ", error);
        //         navigate("/checkout?error=Something Went Wrong");
        //     }
        // }
        // if (isAuthenticated || itemsAdded) {
        try {
            /// add to cart item list api
            let total_quantity = 0;
            const cartData = cartItems?.map((item) => {
                total_quantity += item?.quantity;
                return {
                    product_id: item.id,
                    qty: item.quantity,
                };
            });

            let paymentParams = {
                source_id: token.token,
                shipping_address: shippingDetails,
            };
            if (!isAuthenticated)
                paymentParams = {
                    ...paymentParams,
                    is_guest: true,
                    cart_items: cartData,
                    details: {
                        ...cartDetails,
                        shipment_amount: cartDetails.shipment_amount || 0,
                        estimate_days: cartDetails.estimate_days || 0,
                        total_quantity,
                    },
                };
            let response = await sendTokenApi(paymentParams);

            if (response?.status == 200) {
                console.print("payment successful");
                destroyCart();
                const order = response.data;
                console.print(order, "thank order details");
                navigate("/thank-you", {
                    state: { order },
                });
            } else {
                navigate("/checkout?error=" + response?.message);
            }
        } catch (error) {
            // updateCart();
            console.print("error in square api: ", error);
            navigate("/checkout?error=Something Went Wrong");
        }
        // }
        hideModal();
        dispatch(ORDER_PLACED());
    }

    return (
        <div>
            <PaymentForm
                applicationId={process.env.REACT_APP_SQUARE_APPLICATION_ID}
                cardTokenizeResponseReceived={(token) => {
                    onTokenSuccess(token);
                }}
                locationId={process.env.REACT_APP_SQUARE_LOCATION_ID}
                formProps={{
                    className: "payment-form",
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
