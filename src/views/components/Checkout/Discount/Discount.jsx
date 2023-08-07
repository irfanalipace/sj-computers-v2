import { useState, useEffect } from "react";
import "./Discount.css";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { placeOrder } from "@store/orders/ordersThunk";


const Discount = ({
    handleClick,
    activeAccordion=2,
    paymentMethod,
    shippingDetails,
}) => {
    const dispatch = useDispatch();
    const [disabled, setDisabled] = useState(true);
    const placingOrder = useSelector((state) => state.orders.placingOrder);

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    
    useEffect(() => {
        if (paymentMethod) setDisabled(false);
    }, [paymentMethod]);
const Heading = () => {
    if (activeAccordion === 1) {
        return (
            <h3
                handleClick={handleClick}
                id={activeAccordion}
            >
                Get Discount & Benefits
                </h3>

        );
    }  else if (activeAccordion === 2) {
        return (
            <h3
                toggleAccordion={handleClick}
                id={activeAccordion}
               
            >
                Get Discount & Benefits
            </h3>
        );
    } else {
        const placeOrderFunc = () => {
            dispatch(
                placeOrder({ paymentMethod }, (link) =>
                    location.replace(link)
                )
            );
        };

        return (
            
            <h3
                clickHandler={() => false}
                id={activeAccordion}
              
                isLoading={placingOrder}
            >
                Login to Track order
            </h3>
        );
    }
}


    return (
        <div className="summary-card discount-card-data-checkout">
            <div className="summary-wrapper">
                <div className="discount-data-heading">
                    <Heading />
                   
                    <p>
                        Get track history, sales & discounts benefits only by
                        placing an order from your SJ account.
                    </p>
                    <hr />
                </div>
                <div className="discount-data-address-div-data-count">
                    <Link className="text-decoration-none" to={"/login"}>
                        Login to continue
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Discount;
