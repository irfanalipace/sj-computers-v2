import { Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';

export default function PriceWithLabel({
  price,
  label = '$',
  color = '#B12704',
  sx,
}) {
  const theme = useTheme();

  const isUpSmall = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <Typography
      sx={sx}
      fontWeight={400}
      color={color}
      fontSize={isUpSmall ? '28px' : '18px'}
      lineHeight={isUpSmall ? '33px' : '25px'}
    >
      <sup
        style={{
          fontWeight: 400,
          fontSize: isUpSmall ? '18px' : '12px',
          lineHeight: '15px',
        }}
      >
        {label}
      </sup>
      {price?.toString().split('.')[0]}
      <sup
        style={{
          fontWeight: 400,
          fontSize: isUpSmall ? '16px' : '12px',
          lineHeight: '15px',
        }}
      >
        {price?.toString().split('.')[1]}
      </sup>
    </Typography>
  );
}
