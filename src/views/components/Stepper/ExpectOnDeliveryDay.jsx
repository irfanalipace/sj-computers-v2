import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import HomeImage from '../../../assets/images/trackorder/home.png';
import { useViewportWidth } from '@hooks/useViewportWidth';

export default function ExpectOnDeliveryDay() {
  const screenWidth = useViewportWidth();

  return (
    <Box
      px={3}
      pt={4.5}
      // border={'1px solid lightgray'}
      p={3}>
      <Typography
        fontFamily={'Inter'}
        fontWeight={500}
        fontSize={'16px'}
        lineHeight={'19px'}>
        What to Expect on Delivery Day
      </Typography>

      <Stack
        direction={screenWidth < 575 ? 'column' : 'row'}
        mt={3}
        spacing={1}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <img src={HomeImage} alt='item' />
        </Box>

        <Typography
          sx={{ display: 'block' }}
          fontFamily={'Inter'}
          fontWeight={400}
          fontSize={'12px'}
          lineHeight={'17px'}>
          Once your Order is shipped, you'll recieve a conformation email with
          tracking details. You can expect secure packaging and timelyy delivery
          on all your products. It is important to note that some orders ma
          require a signature upon delivery so have someoe present at the time
          of delivery. Enjoy the unboxing experience and perform a quick quality
          check upon arrival to make sure you got everything your ordered. To
          make things easier, our customer support team is availablefor any
          assistance needed. Your statifaction is our priority t SJ Computers.
        </Typography>
      </Stack>
    </Box>
  );
}
