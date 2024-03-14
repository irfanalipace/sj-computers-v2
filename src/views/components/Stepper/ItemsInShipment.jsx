import { Box, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ItemImage from '../../../assets/images/trackorder/item.png';
import { getOrderDetailsSJ } from '../../../core/api/refund-order';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './ItemsInShipment.css';

// Install Swiper navigation plugin
SwiperCore.use([Navigation]);
SwiperCore.use([Pagination]);

export default function ItemsInShipment({ user, shipmentData }) {
  console.print(shipmentData, 'shipmentData');
  const twoLineTypography = {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    WebkitLineClamp: 2, // Limit the number of displayed lines
    lineHeight: '1.5em', // Adjust the line height as needed
  };

  return (
    <Box
      className='shipment-box'
      alignItems={'baseline'}
      px={3}
      pt={4.5}
      // border={'1px solid lightgray'}
      py={2.5}>
      <Typography
        fontFamily={'Inter'}
        fontWeight={500}
        fontSize={'16px'}
        lineHeight={'19px'}>
        Items in Shipment
      </Typography>

      <Swiper
        className='items-in-shipment'
        slidesPerView={1}
        // style={{ paddingLeft: '20px' }}
        pagination={{
          type: 'fraction',
        }}
        navigation={{
          nextEl: '.shipment-box .swiper-button-next',
          prevEl: '.shipment-box .swiper-button-prev',
        }}>
        {shipmentData?.data &&
          shipmentData?.data[0]?.order_item?.map((item, index) => (
            <SwiperSlide
              key={`${index}-shipment-box`}
              style={{ padding: '0px 20px' }}>
              <Stack direction={'row'} mt={3} spacing={2}>
                <div style={{ width: '30%' }}>
                  <div
                    style={{
                      height: '150px',
                      width: '150px',
                      maxWidth: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <img
                      src={item?.product.image[0]}
                      style={{ maxHeight: '100%', maxWidth: '100%' }}
                      alt='item'
                    />
                  </div>
                </div>
                <div style={{ width: '70%' }}>
                  <Stack>
                    <Stack mt={2.5} spacing={0.5}>
                      <Typography
                        fontFamily={'Inter'}
                        fontWeight={400}
                        fontSize={'14px'}
                        lineHeight={'16px'}
                        sx={{ ...twoLineTypography }}
                        color={'#007185'}>
                        {item.product_name}
                      </Typography>
                      <Typography
                        fontFamily={'Inter'}
                        fontWeight={400}
                        fontSize={'12px'}
                        lineHeight={'17px'}>
                        {/* Lorem ipsum Lorem Ipsum is simply dummy.{' '} */}
                      </Typography>
                    </Stack>
                    <Typography
                      fontFamily={'Inter'}
                      fontWeight={500}
                      fontSize={'12px'}
                      lineHeight={'14px'}
                      sx={{ mt: 2 }}>
                      Quantity: {item.qty}
                    </Typography>
                  </Stack>
                </div>
              </Stack>
            </SwiperSlide>
          ))}
      </Swiper>
      <div className='swiper-button-prev'></div>
      <div className='swiper-button-next'></div>
    </Box>
  );
}
