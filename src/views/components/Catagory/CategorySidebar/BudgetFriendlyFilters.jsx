import { styled } from '@mui/material';
import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const BudgetFriendlyFilters = ({ budgetedDesktops }) => {
  const BudgetFriendlyFilters = styled('div')({
    padding: '5px 20px',

    '& div': {
      display: 'flex',
      justifyContent: 'flex-start',
    },
    '& label': {
      marginLeft: '10px',
    },
    '& p': {
      fontSize: '14px',
      fontWeight: 'bolder',
      paddingBottom: '5px',
    },
    '& span': {
      fontSize: '14px',
      fontWeight: '500',
      color: '#52AC66',
    },
    '& li': {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '16.94px',
      paddingBottom: '10px',
      '&:hover': {
        color: '#e87e24',
        textDecoration: 'underline',
      },
    },
    '& input[type="number"]': {
      padding: '5px',
      borderRadius: '4px',
      fontSize: '14px',
      fontWeight: 400,
      width: '32%',
      marginRight: '10px',
      marginBottom: '20px',
      border: '1px solid #898C8C',
      textAlign: 'center',
      outline: 'none',
    },
    '& button': {
      padding: '2px',
      borderRadius: '4px',
      width: '17%',
      marginRight: '10px',
      boxShadow: '0px 4px 4px 0px #00000029',
      border: '1px solid #C9CCCC',
      backgroundColor: '#fff',
      fontSize: '11px',
      height: '28px',
    },
  });
  const [showCutomPrice, setShowCustomprice] = useState(true);

  const priceArr = [
    { title: budgetedDesktops ? 'Under $10' : 'Under  $250' },
    {
      title: budgetedDesktops ? '$50 to $100' : '$250 -  $1000',
    },
    {
      title: budgetedDesktops ? '$50 to $100' : '$1000 - $2000',
    },
    {
      title: budgetedDesktops ? '$100 to $250' : '$2000 - $5000',
    },
    {
      title: !budgetedDesktops && 'Over $5000',
    },
  ];

  return (
    <BudgetFriendlyFilters>
      <p>Price</p>
      <ul>
        {priceArr?.map((row, index) => (
          <li key={index}>
            <input type='checkbox' id={index} />
            <label for='inStock'>{row?.title}</label>
          </li>
        ))}
      </ul>
      <span
        onClick={() => setShowCustomprice(!showCutomPrice)}
        style={{ cursor: 'pointer' }}>
        <KeyboardArrowDownIcon />
        Custom price
      </span>
      {showCutomPrice && (
        <div>
          <input type='number' placeholder='$Min' />
          <input type='number' placeholder='$Max' max={250} />
          <button>Go</button>
        </div>
      )}
      <p>Trending</p>
      <ul>
        {/* {trending?.map(row => (
          <li>{row?.title}</li>
        ))} */}
      </ul>
      <p>Deals & Discount</p>
      <ul>
        {/* {deals.map(row => (
          <li>{row?.title}</li>
        ))} */}
      </ul>
      <p>Availability</p>
      <ul>
        <li>
          <input type='checkbox' id='inStock' />
          <label for='inStock'>In Stock Only</label>
        </li>
        <li>
          <input type='checkbox' id='outStock' />
          <label for='outStock'>Include Out of Stock</label>
        </li>
      </ul>
    </BudgetFriendlyFilters>
  );
};

export default BudgetFriendlyFilters;
