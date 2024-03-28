import React from 'react';
import Breadcrumb from '@common/Breadrumb/Breadcrumb';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Box,
  Grid,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Card } from '@mantine/core';
import { formatDate } from '../../../core/utils/helpers';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import Recommendation from '../../components/Recommendation/Recommendation';

const OrderDetails = () => {
  const orders = useSelector(state => state?.orders?.successOrders);
  const products = useSelector(state => state?.products?.products);
  const { id } = useParams();
  const filteredOrder = orders?.find(order => id == order?.id);
  const userName = useSelector(state => state?.auth?.user?.name);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const OrderDetailsCard = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  });
  const CardHeader = styled('span')({
    backgroundColor: !isSmallScreen && '#ddd',
    borderBottom: isSmallScreen && '1px solid #ddd',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& div': {
      fontSize: isSmallScreen ? '12px' : '14px',
      lineHeight: '16.94px',
      padding: isSmallScreen ? '6px 1px' : '15px',
      textAlign: 'center',
    },
    '& span': {
      color: '#318243',
      fontSize: '12px',
    },
  });
  const CardContent = styled('div')({
    padding: isSmallScreen ? '10px' : '23px 20px',
    borderBottom: '1px solid #ddd',
    '& div': {
      display: 'flex',
      justifyContent: 'space-between',
    },
    '& h3': {
      fontSize: '16px',
      fontWeight: 600,
    },
    '& span': {
      display: 'flex',
      width: '100%',
    },
    '& .delivery-card-image': {
      width: isSmallScreen ? '20%' : '15%',
    },
    '& .delivery-card-name': {
      color: '#318243',
      paddingTop: '15px',
      paddingLeft: '15px',
      width: isSmallScreen ? '80%' : '100%',
      lineHeight: isSmallScreen && '1.2',
      maxHeight: isSmallScreen && '3.4em',
      overflow: isSmallScreen && 'hidden',
      textOverflow: isSmallScreen && 'ellipsis',
      display: isSmallScreen && '-webkit-box',
      '-webkit-line-clamp': isSmallScreen && 3,
      '-webkit-box-orient': isSmallScreen && 'vertical',
    },
  });
  const OrderSummary = styled('table')({
    width: '200px',
    marginTop: '20px',
    '& h3': {
      fontSize: '14px',
      padding: '10px 0px',
      fontWeight: 600,
    },
    '& td': {
      fontSize: '12px',
      color: '#333333',
      lineHeight: '18.94px',
    },
    '& tr:nth-child(5)': {
      borderBottom: '1px solid #ddd',
    },
    '& tr:nth-child(6)': {
      borderBottom: '1px solid #ddd',
    },
  });
  return (
    <>
      <Box ml={!isSmallScreen && 24}>
        <Breadcrumb />
        <Typography fontSize={28} ml={3}>
          Order Details
        </Typography>
      </Box>
      <OrderDetailsCard>
        <Card
          style={{
            margin: '15px 0px',
            width: isSmallScreen ? '90%' : '70%',

            border: '1px solid #DDDDDD',
          }}
          shadow='sm'
          radius='md'
          withBorder
          className='p-0'>
          <CardHeader>
            {!isSmallScreen && (
              <div>
                Order Placed <br /> {formatDate(filteredOrder?.created_at)}
              </div>
            )}
            {isSmallScreen && (
              <div>
                Tracking id <br />
                {'#' + filteredOrder?.tracking_id
                  ? filteredOrder?.tracking_id
                  : ''}{' '}
              </div>
            )}
            {isSmallScreen && (
              <div>
                Order Placed <br />
                {formatDate(filteredOrder?.created_at)}
              </div>
            )}
            {!isSmallScreen && (
              <div>
                Total <br />${filteredOrder?.total_amount}
              </div>
            )}
            <div>
              {' '}
              Ship To <br /> <span>{userName}</span>
            </div>
            {!isSmallScreen && (
              <div>
                Tracking id <br />
                {'#' + filteredOrder?.tracking_id
                  ? filteredOrder?.tracking_id
                  : ''}{' '}
              </div>
            )}
            {isSmallScreen && (
              <div className='order-status'>
                Total <br /> ${filteredOrder?.sub_total}
              </div>
            )}
          </CardHeader>

          <Grid container justifyContent='space-between'>
            <Grid item lg={8}>
              {!isSmallScreen && (
                <div>
                  <h3
                    style={{
                      paddingTop: '30px',
                      fontSize: '16px',
                      fontWeight: 600,
                      paddingLeft: '20px',
                    }}>
                    Your Order
                  </h3>
                </div>
              )}
              <CardContent>
                <>
                  {filteredOrder?.order_item?.map(item => (
                    <span
                      style={{
                        margin: isSmallScreen
                          ? '0px 0px 1rem 0px'
                          : '0px 0px 3rem 0px',
                      }}>
                      <div className='delivery-card-image'>
                        <LazyLoadImage
                          width={'100%'}
                          height={'100%'}
                          src={item?.product?.image[0]}
                          alt={item?.product?.name
                            ?.trim()
                            ?.split(' ')
                            ?.slice(0, 9)
                            ?.join(' ')}
                        />
                      </div>
                      <Typography
                        style={{
                          fontSize: '12px',
                          fontWeight: 400,
                        }}
                        className='delivery-card-name'>
                        {item?.product?.name}
                      </Typography>
                    </span>
                  ))}
                </>
              </CardContent>
            </Grid>
            {!isSmallScreen && (
              <Grid item lg={3}>
                <OrderSummary>
                  <h3>Order Summary</h3>
                  <tr>
                    <td>Items Subtotal:</td>
                    <td>${filteredOrder?.total_amount}</td>
                  </tr>
                  <tr>
                    <td>Shipping & Handling:</td>
                    {/* <td>${filteredOrder?.shipment_price}</td> */}
                    <td>Free</td>
                  </tr>
                  {/* <tr>
                    <td>Total before tax:</td>
                    <td>${0}</td>
                  </tr> */}
                  {/* <tr>
                    <td>
                      Estimated tax to be
                      <br /> collected
                    </td>
                    <td>${0}</td>
                  </tr> */}
                  <tr>
                    <td style={{ fontWeight: 600 }}>Grand Total</td>
                    <td>${filteredOrder?.sub_total}</td>
                  </tr>
                </OrderSummary>
              </Grid>
            )}
          </Grid>
          {/* <Grid p={2}>
            <Link
              style={{
                fontSize: '12px',
                textDecoration: 'none',
                marginRight: '20px',
              }}>
              Cancel my order
            </Link>{' '}
            <Link style={{ fontSize: '12px', textDecoration: 'none' }}>
              Order invoice
            </Link>
          </Grid> */}
        </Card>
      </OrderDetailsCard>
      {!isSmallScreen && (
        <div
          style={{
            marginTop: '4rem',
            padding: '10px 70px',
            borderTop: '1px solid #D0D0D0',
            borderBottom: '1px solid #D0D0D0',
          }}>
          <Recommendation prod={products} />
        </div>
      )}
    </>
  );
};

export default OrderDetails;
