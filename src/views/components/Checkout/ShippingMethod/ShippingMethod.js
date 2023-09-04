import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setCartDetails } from "@store/cart/cartThunks";
import { applyShipment, applyShipmentForGuest } from "@api/checkout";
import OverlayLoader from "@common/LoaderComponent/OverlayLoader";

import "./ShippingMethod.css";
import {
    getCartDetails,
    getTotalQuantity,
    updateCartDetails,
} from "../../../../core/utils/cartHelpers";

const ShippingMehtod = () => {
    const [activeMethod, setActiveMethod] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const currentState = useSelector((state) => state.states.currentState);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const dispatch = useDispatch();
    const shippingMethods = [
        {
            id: 0,
            label: "Free Shipping (3 - 5 days)",
            cost: 0,
        },
        {
            id: 2,
            label: "2 day shipping",
            cost: 15,
        },
        {
            id: 1,
            label: "Next day delivery",
            cost: 30,
        },
    ];

    const handleChange = async (e) => {
        const cartDetails = getCartDetails();
        const total_quantity = getTotalQuantity();
        if (isLoading) return false;
        else {
            setIsLoading(true);
            if (isAuthenticated) {
                try {
                    let response = await applyShipment({
                        shipment_days: e.target.value,
                        state_id: currentState?.id,
                    });
                    setActiveMethod(e.target.value);
                    dispatch(
                        setCartDetails({
                            ...response.data.details,
                        })
                    );
                } catch (error) {
                    console.print("error: ", error);
                }
            } else {
                try {
                    let response = await applyShipmentForGuest({
                        shipment_days: e.target.value,
                        total_amount: cartDetails.sub_total,
                        total_quantity,
                    });
                    setActiveMethod(e.target.value);
                    const updatedCartDetails = {
                        ...cartDetails,
                        ...response.data,
                        total: response?.data?.estimate_amount,
                    };
                    updateCartDetails(updatedCartDetails);
                    dispatch(setCartDetails(updatedCartDetails));
                } catch (error) {
                    console.print("error: ", error);
                }
            }

            setIsLoading(false);
        }
    };
    return (
        <div className="shipping-method-container">
            <h3>Shipping Method</h3>
            <div className="shipping-method-inner">
                <form>
                    {shippingMethods.map((shippingMethod) => (
                        <div
                            className={`shipping-method-input-group ${
                                activeMethod == shippingMethod.id && "active"
                            }`}
                            key={shippingMethod.id}
                        >
                            <input
                                id={shippingMethod.id}
                                type="radio"
                                onChange={handleChange}
                                name="shippingMethod"
                                value={shippingMethod.id}
                                defaultChecked={
                                    activeMethod === shippingMethod.id
                                }
                            />
                            <label htmlFor={shippingMethod.id}>
                                <span>{shippingMethod.label}</span>
                                <span>
                                    {shippingMethod.cost
                                        ? "$" + shippingMethod.cost
                                        : "Free"}
                                </span>
                            </label>
                        </div>
                    ))}
                </form>
                <OverlayLoader isLoading={isLoading} />
            </div>
        </div>
    );
};

export default ShippingMehtod;
