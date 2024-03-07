import { Checkbox, Stack, Typography } from '@mui/material';
import React from 'react';
import StarRatings from 'react-star-ratings';
import './FilterbarLayout2.css';
export default function ReviewFilter({ onChange }) {
  const reveiwData = [
    { label: '4.5 & up', value: 4.5 },
    { label: '4 & up', value: 4 },
    { label: '3 & up', value: 3 },
    { label: '2 & up', value: 2 },
  ];
  return (
    <>
      {reveiwData.map((reveiw, index) => {
        return (
          <Stack key={index} direction={'row'} spacing={1} mb={0.7} mt={1}>
            <label
              className='checkbox-container'
              htmlFor={reveiw.value.toString()}>
              <Checkbox
                id={reveiw.value.toString()}
                style={{
                  color: ' #f2a742',
                  padding: '0 !important',
                }}
                icon={<span style={unchecked} />}
                checkedIcon={<span style={checked} />}
                onChange={event => onChange(event, 'reveiw', reveiw)}
              />
              {/* <input
                id={reveiw.value.toString()}
                type='checkbox'
                style={{
                  color: '#f2a742', // Default color
                  padding: '0 !important',
                  backgroundColor: ' #f2a742', // Background color when checked
                }}
                name={'s'}
                onChange={event => onChange(event, 'reveiw', reveiw)}
              /> */}
              {/* <span className='radiomark '></span> */}
            </label>
            <StarRatings
              starDimension='18px'
              starSpacing='0'
              rating={reveiw.value}
              starRatedColor='orange'
            />
            <Typography
              mb={0.5}
              variant='body2'
              fontSize={'small'}
              className='review-lines'>
              & Up
            </Typography>
          </Stack>
        );
      })}
    </>
  );
}
const checked = {
  backgroundColor: '#f2a742',
  border: '1px solid #000',
  borderRadius: '3px',
  display: 'inline-block',
  width: '13px',
  height: '13px',
};
const unchecked = {
  backgroundColor: '#fff',
  border: '1px solid #000',
  borderRadius: '3px',
  display: 'inline-block',
  width: '13px',
  height: '13px',
};
