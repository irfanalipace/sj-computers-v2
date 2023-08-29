import { PaymentForm, CreditCard } from "react-square-web-payments-sdk";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCartItems } from "../../../../../core/utils/cartHelpers";
import { clearCartLocally } from "@utils/cartHelpers";
import { CLEAR_CART } from "@store/cart/cartSlice";
import { PLACING_ORDER, ORDER_PLACED } from "@store/orders/ordersSlice";
import { sendTokenApi } from "@api/square";
import { addListToCartApi } from "../../../../../core/api/cart";
import "./SquareForm.css";
export const SquareForm = ({ hideCloseBtn, hideModal, shippingDetails }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const placingOrder = useSelector((state) => state.orders.placingOrder);
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

    async function onTokenSuccess(token) {
        try {
            dispatch(PLACING_ORDER());
            hideCloseBtn();

            if (!isAuthenticated) {
                try {
                    let cartItemss = getCartItems();
                    /// add to cart item list api
                    const cartData = cartItemss.map((item) => ({
                        product_id: item.id,
                        qty: item.quantity,
                    }));

                    await addListToCartApi({
                        cartItems: cartData,
                        shipping_address: shippingDetails,
                    });
                } catch (error) {
                    console.print("error in addLocalListToCart api: ", error);
                    navigate("/checkout?error=Something Went Wrong");
                }
            }
            try {
                let response = await sendTokenApi({
                    source_id: token.token,
                    shipping_address: shippingDetails,
                });

                if (response?.status == 200) {
                    console.print("payment successful");
                    clearCartLocally();
                    dispatch(CLEAR_CART());
                    const order = response.data;
                    console.print(order, "thank order details");
                    navigate("/thank-you", {
                        state: { order },
                    });
                } else {
                    navigate("/checkout?error=" + response?.message);
                }
            } catch (error) {
                console.print("error in square api: ", error);
                navigate("/checkout?error=Something Went Wrong");
            }
            hideModal();
            dispatch(ORDER_PLACED());
        } catch (error) {
            console.error("Error fetching data:", error);
        }
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
