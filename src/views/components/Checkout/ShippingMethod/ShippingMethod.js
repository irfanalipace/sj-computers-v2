import ApiService from "@services/apiService";

import "./ShippingMethod.css";

const ShippingMehtod = ({ setShippingDetails }) => {
    const shippingMethods = [
        {
            id: 1,
            label: "Free Shipping (3 - 5 days)",
            cost: 0,
        },
        {
            id: 2,
            label: "2 day shipping",
            cost: 10,
        },
        {
            id: 3,
            label: "Next day delivery",
            cost: 30,
        },
    ];

    const handleChange = (e) => {
        setShippingDetails({
            estimatedDelivery: new Date().toString(),
            shippingCost: e.target.value,
        });
    };
    return (
        <div className="shipping-method-container">
            <h3>Shipping Method</h3>
            <div className="shipping-method-inner">
                <form>
                    {shippingMethods.map((shippingMethod, index) => (
                        <div className="shipping-method-input-group">
                            <input
                                id={shippingMethod.id}
                                type="radio"
                                onChange={handleChange}
                                name="shippingMethod"
                                value={shippingMethod.cost}
                                defaultChecked={index == 0}
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
            </div>
        </div>
    );
};

export default ShippingMehtod;
