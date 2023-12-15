import { PaymentForm, CreditCard } from "react-square-web-payments-sdk";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import {
//     getCartItems,
//     updateLocalPropertyOfAllItems,
// } from "../../../../../core/utils/cartHelpers";
import {
    CLEAR_CART,
    // UPDATE_LOCAL_PROPERTY_OF_ALL_ITEMS,
} from "@store/cart/cartSlice";
import { PLACING_ORDER, ORDER_PLACED } from "@store/orders/ordersSlice";
import { sendTokenApi } from "@api/square";
// import { addListToCartApi } from "../../../../../core/api/cart";
import { clearCartLocally, getCartDetails } from "@utils/cartHelpers";
// import {
//     saveGuestUserEmail,
//     deleteGuestUserEmail,
// } from "@services/authService";

import "./SquareForm.css";

export const SquareForm = ({ hideCloseBtn, hideModal, shippingDetails }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);
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
                // map item according to the request payload format
                total_quantity += item?.quantity;
                return {
                    product_id: item.id,
                    qty: item.quantity,
                };
            });
            let paymentParams = {
                source_id: token.token,
                shipping_address: {
                    ...shippingDetails,
                    email: shippingDetails?.email || user?.email,
                    full_name: shippingDetails?.full_name || user?.name,
                },
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
                if (response?.cart_error) {
                    navigate("/cart", {
                        state: { error: true },
                    }); // navigating to cart to update the cart according to available quantity
                } else navigate("/checkout?error=" + response?.message); // sets error in search params and checkout component reads this error and opens the shipping form and hides this modal
            }
        } catch (error) {
            // updateCart();
            console.print("error in square api: ", error);
            navigate("/checkout?error=Something Went Wrong"); // sets error in search params and checkout component reads this error and opens the shipping form and hides this modal
        }
        // }
        hideModal();
        dispatch(ORDER_PLACED());
    }
    console.log(
        "import.meta.VITE_APP_SQUARE_LOCATION_ID".import.meta
            .VITE_APP_SQUARE_LOCATION_ID
    );
    console.log("import.meta.VITE_APP_SQUARE_APPLICATION_ID"),
        import.meta.VITE_APP_SQUARE_APPLICATION_ID;
    return (
        <div>
            <PaymentForm
                applicationId={import.meta.VITE_APP_SQUARE_APPLICATION_ID}
                cardTokenizeResponseReceived={(token) => {
                    onTokenSuccess(token);
                }}
                locationId={import.meta.VITE_APP_SQUARE_LOCATION_ID}
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
