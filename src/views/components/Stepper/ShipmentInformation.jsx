import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

export default function ShipmentInformation({ trackingInfo, user }) {
  return (
    <Box
      px={3}
      py={4}
      pt={4.5}
      // border={'1px solid lightgray'}
    >
      <Typography
        fontFamily={'Inter'}
        fontWeight={500}
        fontSize={'16px'}
        lineHeight={'19px'}>
        Shipment Information
      </Typography>
      <Stack spacing={2} mt={2}>
        <Row label='Shipper:' value='FedEx Home delivery' />
        <Row
          label='Tracking ID#:'
          value={
            <div style={{ textDecoration: 'underline' }}>
              {trackingInfo?.trackingNumberInfo?.trackingNumber}
            </div>
          }
        />
        <Row
          label='Shipping To:'
          value={
            <div style={{ lineHeight: '1.1rem' }}>
              {' '}
              <span style={{ fontWeight: '500' }}>
                {user?.name ? user?.name : 'Guest'}
              </span>
              <br /> {trackingInfo?.recipientInformation?.address?.city},{' '}
              {trackingInfo?.recipientInformation?.address?.stateOrProvinceCode}
              {/* <br /> New York, NY street */}
              <br />{' '}
              {trackingInfo?.recipientInformation?.address?.postalCode ||
                trackingInfo?.recipientInformation?.address?.countryCode}
              ,{trackingInfo?.recipientInformation?.address?.countryName}
              <br />{' '}
              {trackingInfo?.recipientInformation?.contact?.length > 0
                ? 'Phone number' +
                  trackingInfo?.recipientInformation?.contact[0]
                : ''}
            </div>
          }
        />
      </Stack>
    </Box>
  );
}

const Row = ({ label, value }) => {
  return (
    <Stack direction={'row'} spacing={1}>
      <Typography
        minWidth={'140px'}
        fontFamily={'Inter'}
        fontWeight={500}
        fontSize={'12px'}
        lineHeight={'14px'}>
        {label}
      </Typography>
      <Typography
        fontFamily={'Inter'}
        fontWeight={400}
        fontSize={'12px'}
        lineHeight={'14px'}>
        {value}
      </Typography>
    </Stack>
  );
};
