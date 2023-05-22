import { PaymentForm, CreditCard } from "react-square-web-payments-sdk";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { clearCartLocally } from "@utils/cartHelpers";
import { CLEAR_CART } from "@store/cart/cartSlice";
import { PLACING_ORDER, ORDER_PLACED } from "@store/orders/ordersSlice";
import { sendTokenApi } from "@api/square";

import "./SquareForm.css";

export const SquareForm = ({ hideCloseBtn, hideModal, shippingDetails }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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

    return (
        <div>
            <PaymentForm
                applicationId={process.env.REACT_APP_SQUARE_APPLICATION_ID}
                cardTokenizeResponseReceived={async (token) => {
                    dispatch(PLACING_ORDER());
                    hideCloseBtn();
                    try {
                        let response = await sendTokenApi({
                            source_id: token.token,
                            shipping_address: shippingDetails,
                        });

                        if (response.code === 200) {
                            clearCartLocally();
                            dispatch(CLEAR_CART());
                            navigate("/thank-you", { state: { response } });
                        } else {
                            navigate("/checkout?error=" + response.message);
                        }
                    } catch (error) {
                        console.log("error in square api: ", error);
                        navigate("/checkout?error=Something Went Wrong");
                    }
                    hideModal();
                    dispatch(ORDER_PLACED());
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
