import { useState, useEffect } from 'react';

import './QuantityInput.css';
import { useSelector } from 'react-redux';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
export const QuantityInput = ({
  onChange,
  value,
  minQuantity = 1,
  maxQuantity,
  cartPage = false,
}) => {
  const [quantity, setQuantity] = useState(parseInt(value) || minQuantity);
  const [hasRendered, setHasRendered] = useState(false);
  const isAuthenticated = useSelector(state => state?.auth?.isAuthenticated);
  const [maxQuantityLocal, setMaxQuantity] = useState(maxQuantity);
  useEffect(() => {
    if (hasRendered) {
      if (typeof onChange === 'function') onChange(quantity || 0);
    } else {
      setHasRendered(true);
    }
  }, [quantity]);
  useEffect(() => {
    if (maxQuantity > 30) {
      setMaxQuantity(30);
    } else {
      setMaxQuantity(maxQuantity);
    }
  }, [maxQuantity]);

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

  const handleChange = event => {
    setQuantity(event.target.value);
  };
  function createArrayUpToMax(max) {
    var array = [];
    for (var i = 1; i <= max; i++) {
      array.push(i);
    }
    return array;
  }
  return (
    <>
      <FormControl
        sx={{
          minWidth: cartPage ? '50px' : '100%',
        }}
        size='small'>
        <Select
          sx={{
            background: '#F0F2F2',
            borderRadius: '7px',
            boxShadow: '0 2px 5px rgba(15,17,17,.15)',
            height: cartPage ? '30px' : '',
          }}
          labelId='demo-select-small-label'
          id='demo-select-small'
          value={quantity}
          onChange={handleChange}
          renderValue={value => `${cartPage ? 'Qty' : 'Quantity'} - ${value}`}>
          {createArrayUpToMax(maxQuantityLocal)?.map(item => {
            return <MenuItem value={item}>{item}</MenuItem>;
          })}
        </Select>
      </FormControl>

      <div className='quantity-container'>
        <div className='quantity-inner'>
          {/* <button
            className='quantity-button'
            onClick={e =>
              setQuantity(
                quantity > minQuantity ? parseInt(quantity) - 1 : quantity,
              )
            }>
            -
          </button> */}
          {/* <input
            type='number'
            value={quantity}
            onChange={e =>
              e.target.value >= minQuantity && e.target.value <= maxQuantity
                ? setQuantity(e.target.value)
                : quantity
            }
          /> */}
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
          {/* <button
            className='quantity-button'
            onClick={e =>
              setQuantity(
                quantity < maxQuantity ? parseInt(quantity) + 1 : quantity,
              )
            }>
            +
          </button> */}
        </div>
      </div>
    </>
  );
};
