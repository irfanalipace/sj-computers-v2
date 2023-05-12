import { useState } from "react";
import { useDispatch } from "react-redux";

import { setCartDetails } from "@store/cart/cartThunks";
import { applyShipment } from "@api/checkout";
import OverlayLoader from "@common/LoaderComponent/OverlayLoader";

import "./ShippingMethod.css";

const ShippingMehtod = () => {
    const [activeMethod, setActiveMethod] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const shippingMethods = [
        {
            id: 0,
            label: "Free Shipping (3 - 5 days)",
            cost: 0,
        },
        {
            id: 1,
            label: "2 day shipping",
            cost: 10,
        },
        {
            id: 2,
            label: "Next day delivery",
            cost: 30,
        },
    ];

    const handleChange = async (e) => {
        if (isLoading) return false;
        else {
            setIsLoading(true);
            try {
                let response = await applyShipment({
                    shipment_days: e.target.value,
                });
                setActiveMethod(e.target.value);
                dispatch(
                    setCartDetails({
                        ...response.data.details,
                    })
                );
            } catch (error) {
                console.log("error: ", error);
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
