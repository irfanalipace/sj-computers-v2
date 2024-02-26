import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

export default function TrackingHistory() {
  return (
    <Box border={'1px solid lightgray'}>
      <Box px={3} py={3}>
        <Typography
          fontFamily={'Inter'}
          fontWeight={500}
          fontSize={'16px'}
          lineHeight={'19px'}
        >
          Tracking History
        </Typography>
        <Typography
          sx={{ maxWidth: '300px', mt: 1 }}
          fontFamily={'Inter'}
          fontWeight={400}
          fontSize={'12px'}
          lineHeight={'17px'}
        >
          Lorem ipsum Lorem Ipsum is simply dummy text text ever since the
          1500s, when an unknown dknfd.
        </Typography>
      </Box>
      <Box display={'flex'} height={'43px'} bgcolor={'#DDDDDD'}>
        <Typography
          fontFamily={'Inter'}
          fontWeight={500}
          fontSize={'14px'}
          lineHeight={'17px'}
          sx={{ my: 'auto', ml: 3 }}
        >
          April 11, 2023
        </Typography>
      </Box>
      <Stack px={3} py={3} spacing={2} mt={2}>
        <Row
          label='11:59pm'
          address='City of Industry, CA, USA'
          status='Arrived at FedEx location'
        />
        <Row
          label='11:59pm'
          address='City of Industry, CA, USA'
          status='Arrived at FedEx location'
        />
        <Row
          label='11:59pm'
          address='City of Industry, CA, USA'
          status='Arrived at FedEx location'
        />
      </Stack>
    </Box>
  );
}

const Row = ({ label, address, status }) => {
  return (
    <Stack direction={'row'} spacing={1}>
      <Typography
        minWidth={'140px'}
        fontFamily={'Inter'}
        fontWeight={400}
        fontSize={'14px'}
        lineHeight={'16px'}
      >
        {label}
      </Typography>
      <Stack spacing={1}>
        <Typography
          fontFamily={'Inter'}
          fontWeight={400}
          fontSize={'14px'}
          lineHeight={'16px'}
        >
          {address}
        </Typography>
        <Typography
          fontFamily={'Inter'}
          fontWeight={400}
          fontSize={'12px'}
          lineHeight={'17px'}
        >
          {status}
        </Typography>
      </Stack>
    </Stack>
  );
};
