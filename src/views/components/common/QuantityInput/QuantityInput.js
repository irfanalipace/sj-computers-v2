import { useState, useEffect } from "react";

import "./QuantityInput.css";

export const QuantityInput = ({
    onChange,
    minQuantity = 0,
    maxQuantity = 100,
}) => {
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (typeof onChange === "function") onChange(quantity);
    }, [quantity]);

    return (
        <div className="quantity-container">
            <p className="mb-1">Quantity</p>
            <div className="quantity-inner">
                <button
                    className="quantity-button"
                    onClick={(e) =>
                        setQuantity(
                            quantity < maxQuantity ? quantity + 1 : quantity
                        )
                    }
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
                    onClick={(e) =>
                        setQuantity(
                            quantity > minQuantity ? quantity - 1 : quantity
                        )
                    }
                >
                    -
                </button>
            </div>
        </div>
    );
};
