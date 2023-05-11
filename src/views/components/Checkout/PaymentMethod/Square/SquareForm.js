import { PaymentForm, CreditCard } from "react-square-web-payments-sdk";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { clearCartLocally } from "@utils/cartHelpers";
import { CLEAR_CART } from "@store/cart/cartSlice";
import { sendTokenApi } from "@api/square";

import "./SquareForm.css";

export const SquareForm = ({ hideCloseBtn }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const buttonProps = {
        css: {
            backgroundColor: "#318243",
            fontSize: "14px",
            "&:hover": {
                backgroundColor: "#2e663b",
            },
        },
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
                    try {
                        hideCloseBtn();
                        let response = await sendTokenApi({
                            source_id: token.token,
                        });

                        if (response.data.code === 200) {
                            clearCartLocally();
                            dispatch(CLEAR_CART());
                            navigate("/success-transaction");
                        } else {
                            navigate(
                                "/checkout?error=" + response.data.message
                            );
                        }
                    } catch (error) {
                        console.log("error in square api: ", e);
                        navigate(
                            "/checkout?error=" + response.derrorata.message
                        );
                    }
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
