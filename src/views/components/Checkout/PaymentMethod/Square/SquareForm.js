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
import { useState,useEffect } from "react";
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
    const [mappedData, setMappedData] = useState([]);
    useEffect(() => {

        async function fetchData() {
          try {
            const response = await addListToCartApi({mappedResponse});
            console.log(response,'mappedResponse data')
            
            const mappedResponse = response.map(item => {
              return {
                id: item.id,
                quantity: item.quantity,
                
              };
            });
        
            setMappedData(mappedResponse);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
    console.log(mappedData,'mappedDatamappedDatamappedData')
        fetchData();
      }, []);
    return (
        <div>
            <PaymentForm
                applicationId={process.env.REACT_APP_SQUARE_APPLICATION_ID}
                cardTokenizeResponseReceived={async (token) => {
                    dispatch(PLACING_ORDER());
                    hideCloseBtn();
                    try {
                        let cartItemss = getCartItems()
                        console.log('cartttttt' , cartItemss)
                        /// add to cart item list api
                        const cartData =  cartItemss.map(item => ({                          
                            product_id: item.id,
                            qty: item.quantity
                          }));
                          console.log('cartdata'  , cartData)

                       let responsed= await addListToCartApi(
                        cartData);

                       console.log(responsed,'response data add cart')
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
                            navigate("/thank-you", { state: { order } });
                        } else {
                            navigate("/checkout?error=" + response?.message);
                        }
                    } catch (error) {
                        console.print("error in square api: ", error);
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
