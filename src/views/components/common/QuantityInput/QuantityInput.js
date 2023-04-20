import { useState, useEffect } from "react";

import "./QuantityInput.css";

export const QuantityInput = ({ onChange }) => {
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (typeof onChange === "function") onChange(quantity);
    }, [quantity]);

    return (
        <div className="quantity-container">
            <p>Quantity</p>
            <div className="quantity-inner">
                <button
                    className="quantity-button"
                    onClick={(e) => setQuantity(quantity + 1)}
                >
                    +
                </button>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <button
                    className="quantity-button"
                    onClick={(e) => setQuantity(quantity - 1)}
                >
                    -
                </button>
            </div>
        </div>
    );
};
