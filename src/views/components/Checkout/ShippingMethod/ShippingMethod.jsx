import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setCartDetails } from "@store/cart/cartThunks";
import { applyShipment, applyShipmentForGuest } from "@api/checkout";
import { shippingMethods } from "@utils/constants";
import OverlayLoader from "@common/LoaderComponent/OverlayLoader";
import { useViewportWidth } from "@hooks/useViewportWidth";
import "./ShippingMethod.css";
import {
    getCartDetails,
    getTotalQuantity,
    updateCartDetails,
} from "../../../../core/utils/cartHelpers";
import { IS_CHRISTMAS_HOLIDAYS } from "../../../../core/utils/constants";

const ShippingMehtod = () => {
    const [activeMethod, setActiveMethod] = useState(0);
    const screenWidth = useViewportWidth();

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
    const [isLoading, setIsLoading] = useState(false);
    const currentState = useSelector((state) => state.states.currentState);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const activeShippingMethod =
        useSelector((state) => state.cart.details.activeMethod) || 0;
    const orderEstimatedDelivery = useSelector(
        (state) => state.orders.orderEstimatedDelivery,
    );
    const dispatch = useDispatch();

    const handleChange = async (e) => {
        const cartDetails = getCartDetails();
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
                            ...response.data,
                            activeMethod: e.target.value,
                        }),
                    );
                } catch (error) {
                    console.print("error: ", error);
                }
            } else {
                const total_quantity = getTotalQuantity();
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
                        activeMethod: e.target.value,
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
    const handleWindowSizeChange = () => {
        setIsMobile(window.innerWidth <= 600);
    };

    useEffect(() => {
        const handleResize = () => {
            handleWindowSizeChange();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return (
        <div className="shipping-method-container">
            <h3 className="Shipping-Method-heading-data">Shipping Method</h3>
            <div className="shipping-method-inner">
                <form>
                    {shippingMethods.map((shippingMethod) => (
                        <div
                            className={`shipping-method-input-group ${
                                activeShippingMethod == shippingMethod?.id &&
                                "active"
                            }`}
                            key={shippingMethod?.id}
                        >
                            <input
                                id={shippingMethod?.id}
                                type="radio"
                                onChange={handleChange}
                                name="shippingMethod"
                                value={shippingMethod?.id}
                                // defaultChecked={
                                //     activeShippingMethod == shippingMethod?.id
                                // }
                                checked={
                                    activeShippingMethod == shippingMethod?.id
                                }
                                className={
                                    activeShippingMethod == shippingMethod?.id
                                        ? "checked"
                                        : ""
                                }
                            />
                            <label htmlFor={shippingMethod?.id}>
                                {isMobile == true ? (
                                    <div style={{ marginTop: "22px" }}>
                                        <span
                                            style={{
                                                fontWeight: "500",
                                            }}
                                        >
                                            Free Shipping
                                            <p
                                                style={{
                                                    fontSize: "10px",
                                                    paddingTop: "5px",
                                                }}
                                            >
                                                Mon, Nov 13
                                            </p>
                                        </span>
                                    </div>
                                ) : (
                                    <div>
                                        <span>{shippingMethod?.label}</span>
                                    </div>
                                )}

                                <span>
                                    {shippingMethod?.cost
                                        ? "$" + shippingMethod?.cost
                                        : "Free"}
                                </span>
                            </label>
                        </div>
                    ))}
                </form>
                <OverlayLoader isLoading={isLoading} />
            </div>
            {IS_CHRISTMAS_HOLIDAYS && (
                <div className="card card-checkout mt-3">
                    <div className="card-body">
                        <div className="text-body">
                            <p className="christmas-offer-card">
                                <strong
                                    className="price-items"
                                    style={{
                                        fontWeight: "600",
                                    }}
                                >
                                    Note:
                                </strong>
                                Parcel{" "}
                                <span className="text-danger">
                                    Arrives after Christmas,{" "}
                                </span>
                                on
                                <strong
                                    style={{
                                        fontWeight: "600",
                                    }}
                                >
                                    {" "}
                                    {
                                        orderEstimatedDelivery
                                            ?.free_shipment_amount?.estimate_day
                                    }{" "}
                                </strong>
                                <span className="text-muted">(Tentative)</span>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShippingMehtod;
