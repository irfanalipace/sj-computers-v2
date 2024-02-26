import { Box, Typography } from '@mui/material';
import React from 'react';

export default function CustomTab({ currentTab, eventKey }) {
  return (
    <Box
      sx={{
        border: `1px solid  ${currentTab === eventKey ? '#B12704' : '#333'}`,
      }}
      px={0.8}
      py={0.3}
    >
      <Typography fontSize={'11px'} fontWeight={400}>
        27” Full HD IPS
      </Typography>
      <Typography
        fontWeight={400}
        color={currentTab === eventKey ? '#B12704' : 'balck'}
        fontSize={'11px'}
      >
        US$ 149.99
      </Typography>
    </Box>
  );
}
