import { Stack, Typography } from '@mui/material';
import React from 'react';
import StarRatings from 'react-star-ratings';

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
          <Stack key={index} direction={'row'} spacing={1} mb={0.7}>
            <label
              className='radio-container'
              htmlFor={reveiw.value.toString()}>
              <input
                id={reveiw.value.toString()}
                type='checkbox'
                onChange={event => onChange(event, 'reveiw', reveiw)}
              />
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
