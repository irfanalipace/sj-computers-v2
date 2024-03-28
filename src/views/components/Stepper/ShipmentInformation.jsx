import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import './Shipmentinformation.css';
import { Link } from 'react-router-dom';

export default function ShipmentInformation({
  trackingInfo,
  user,
  shipmentData,
  trackingId,
}) {
  const userInfo = shipmentData?.data
    ? shipmentData?.data[0]?.user?.shipping_address
    : {};

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
            <Link
              target='blank'
              to={
                trackingId === 'null'
                  ? ''
                  : `https://www.fedex.com/fedextrack/?trknbr=${trackingId}&trkqual=12026~787157650129~FDEG`
              }
              style={{ textDecoration: 'underline', color: 'black' }}>
              {/* {trackingInfo?.trackingNumberInfo?.trackingNumber} */}
              {trackingId === 'null' ? 'N/A' : trackingId}
            </Link>
          }
        />
        <Row
          label='Shipping To:'
          value={
            <div style={{ lineHeight: '1.1rem' }}>
              {' '}
              <span style={{ fontWeight: '500' }}>{userInfo?.full_name}</span>
              <br />
              {/* <br /> New York, NY street */}
              {userInfo?.city} , {userInfo?.address}
              {/* ,{userInfo?.apartment} */}
              <br /> {userInfo?.zip_code} , {userInfo?.country}
              <br />
              {'Phone number: ' + userInfo?.phone_number}
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
