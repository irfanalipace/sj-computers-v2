import { useState, useEffect } from 'react';

import './QuantityInput.css';
import { useSelector } from 'react-redux';

export const QuantityInput = ({
  onChange,
  value,
  minQuantity = 1,
  maxQuantity: initialMaxQuantity = 1000,
}) => {
  const [quantity, setQuantity] = useState(parseInt(value) || minQuantity);
  const [hasRendered, setHasRendered] = useState(false);
  const isAuthenticated = useSelector(state => state?.auth?.isAuthenticated);
  const [maxQuantity, setMaxQuantity] = useState(initialMaxQuantity);
  useEffect(() => {
    if (hasRendered) {
      if (typeof onChange === 'function') onChange(quantity || 0);
    } else {
      setHasRendered(true);
    }
  }, [quantity]);
  useEffect(() => {
    if (!isAuthenticated) {
      setMaxQuantity(10);
    } else {
      setMaxQuantity(initialMaxQuantity);
    }
  }, [isAuthenticated, initialMaxQuantity]);

  // const handleQuantityChange = (e) => {
  //     const newQuantity = parseInt(e.target.value);
  //     if (newQuantity >= minQuantity && newQuantity <= maxQuantity) {
  //         setQuantity(newQuantity);
  //     }
  // };
  // const generateOptions = () => {
  //     const options = [];
  //     for (let i = minQuantity; i <= maxQuantity; i++) {
  //         options.push(
  //             <option
  //                 style={{ justifyContent: "flex-start" }}
  //                 key={i}
  //                 value={i}
  //             >
  //                 {i}
  //             </option>
  //         );
  //     }
  //     return options;
  // };
  return (
    <div className='quantity-container'>
      <p className='mb-1'>Quantity</p>
      <div className='quantity-inner'>
        <button
          className='quantity-button'
          onClick={e =>
            setQuantity(
              quantity > minQuantity ? parseInt(quantity) - 1 : quantity,
            )
          }>
          -
        </button>
        <input
          type='number'
          value={quantity}
          onChange={e =>
            e.target.value >= minQuantity && e.target.value <= maxQuantity
              ? setQuantity(e.target.value)
              : quantity
          }
        />
        {/* <div className="quantity-select-wrapper">
                    <select
                        value={quantity}
                        // onChange={handleQuantityChange}
                        onChange={(e) =>
                            e.target.value >= minQuantity &&
                            e.target.value <= maxQuantity
                                ? setQuantity(e.target.value)
                                : quantity
                        }
                        className="quantity-select"
                    >
                        {generateOptions()}
                    </select>
                </div> */}
        <button
          className='quantity-button'
          onClick={e =>
            setQuantity(
              quantity < maxQuantity ? parseInt(quantity) + 1 : quantity,
            )
          }>
          +
        </button>
      </div>
      {!isAuthenticated && quantity === 10 && (
        <p style={{ color: '#B12704', fontSize: '10px' }}>
          Quantiy can not be greater than 10 for unAuthenticated users
        </p>
      )}
    </div>
  );
};
