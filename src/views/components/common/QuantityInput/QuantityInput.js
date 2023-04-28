import { useState, useEffect } from "react";

import "./QuantityInput.css";

export const QuantityInput = ({
    onChange,
    value,
    minQuantity = 1,
    maxQuantity = 100,
}) => {
    const [quantity, setQuantity] = useState(parseInt(value) || minQuantity);
    const [hasRendered, setHasRendered] = useState(false);

    useEffect(() => {
        if (hasRendered) {
            if (typeof onChange === "function") onChange(quantity || 0);
        } else {
            setHasRendered(true);
        }
    }, [quantity]);

    return (
        <div className="quantity-container">
            <p className="mb-1">Quantity</p>
            <div className="quantity-inner">
                <button
                    className="quantity-button"
                    onClick={(e) =>
                        setQuantity(
                            quantity < maxQuantity
                                ? parseInt(quantity) + 1
                                : quantity
                        )
                    }
                >
                    +
                </button>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                        e.target.value >= minQuantity &&
                        e.target.value <= maxQuantity
                            ? setQuantity(e.target.value)
                            : quantity
                    }
                />
                <button
                    className="quantity-button"
                    onClick={(e) =>
                        setQuantity(
                            quantity > minQuantity
                                ? parseInt(quantity) - 1
                                : quantity
                        )
                    }
                >
                    -
                </button>
            </div>
        </div>
    );
};
