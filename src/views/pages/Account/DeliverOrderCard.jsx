import {
  Grid,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Card } from '@mantine/core';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { formatDate } from '../../../core/utils/helpers';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const DeliveryOrderCard = ({ data, cancelled }) => {
  const [expandedOrders, setExpandedOrders] = useState([]);

  const filteredData = data?.filter(
    orders => orders?.fedex_status === 'DELIVERED',
  );
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const userName = useSelector(state => state?.auth?.user?.name);
  const CardHeader = styled('span')({
    backgroundColor: isSmallScreen ? '#fff' : '#ddd',
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
    padding: '20px',
    borderBottom: '1px solid #ddd',
    '& div': {
      display: 'flex',
      justifyContent: 'space-between',
    },
    '& button': {
      backgroundColor: '#318243',
      color: '#fff',
      borderRadius: '8px',
      outline: 'none',
      border: 'none',
      height: '32px',
      padding: '0px 20px',
      marginTop: '8px',
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
      width: isSmallScreen ? '18%' : '15%',
    },
    '& .delivery-card-name': {
      color: '#318243',
      paddingTop: '15px',
      paddingLeft: '15px',
      width: isSmallScreen ? '57%' : '68%',
      lineHeight: isSmallScreen && '1.2',
      maxHeight: isSmallScreen && '3.4em',
      overflow: isSmallScreen && 'hidden',
      textOverflow: isSmallScreen && 'ellipsis',
      display: isSmallScreen && '-webkit-box',
      '-webkit-line-clamp': isSmallScreen && 3,
      '-webkit-box-orient': isSmallScreen && 'vertical',
    },
  });
  const InvoiceCard = styled('div')({
    '& button': {
      backgroundColor: '#318243',
      color: '#fff',
      fontSize: '16px',
      borderRadius: '8px',
      outline: 'none',
      border: 'none',
      height: '39px',
      width: '100%',
      padding: '0px 40px',
    },
    '& p': {
      fontSize: '10px',
      textAlign: 'center',
      lineHeight: '12.1px',
      padding: '8px 20px',
    },
    '& .order-invoice-conatiner': {
      padding: '20px',
    },
    '& .order-invoice-footer': {
      color: '#1270C4',
      padding: '20px',
      backgroundColor: '#ddd',
      fontSize: '10px',
    },
  });

  const toggleExpanded = orderId => {
    setExpandedOrders(prevOrders =>
      prevOrders.includes(orderId)
        ? prevOrders.filter(id => id !== orderId)
        : [...prevOrders, orderId],
    );
  };
  return filteredData?.map(orders => (
    <Grid container>
      <Card
        style={{
          margin: '15px 0px',
          width: isSmallScreen ? '100%' : '55%',
          border: '1px solid #DDDDDD',
        }}
        shadow='sm'
        radius='md'
        withBorder
        className='p-0'>
        <CardHeader>
          {!isSmallScreen && (
            <div>
              Order Placed <br /> {formatDate(orders?.created_at)}
            </div>
          )}
          {isSmallScreen && (
            <div>
              Tracking id <br />
              {'#' + orders?.tracking_id ? orders?.tracking_id : ''}{' '}
            </div>
          )}
          {isSmallScreen && (
            <div>
              {orders?.fedex_status || orders?.status} <br />{' '}
              {orders?.shipment_days}
            </div>
          )}
          {!isSmallScreen && (
            <div>
              Total <br />${orders?.total_amount}
            </div>
          )}
          <div>
            Ship To <br /> <span>{userName}</span>
          </div>
          {isSmallScreen && (
            <div className='order-status'>
              Total <br /> ${orders?.sub_total}
            </div>
          )}
          {!isSmallScreen && (
            <div>
              Tracking id {'#' + orders?.tracking_id ? orders?.tracking_id : ''}{' '}
              <br /> <span>View Order Details</span>
            </div>
          )}
        </CardHeader>
        <CardContent>
          {!isSmallScreen && (
            <div>
              <h3>{cancelled ? 'Cancelled' : 'Your Order'}</h3>
              {!cancelled && <button>Track Package</button>}
            </div>
          )}
          {orders?.order_item?.map((item, index) =>
            isSmallScreen ? (
              index === 0 && (
                <>
                  <span
                    style={{
                      margin: isSmallScreen ? '0px' : '2rem 0px 0px 0px',
                    }}
                    key={index}>
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
                    {index === 0 && isSmallScreen && (
                      <Link style={{ textDecoration: 'none' }}>
                        Order Invoice
                      </Link>
                    )}
                  </span>
                  {isSmallScreen && !expandedOrders.includes(orders.id) && (
                    <div className='row mt-4'>
                      <div className='col-5'>
                        <Link
                          style={{
                            color: '#318243',
                            textDecoration: 'none',
                            fontSize: '12px',
                          }}>
                          View Order Details
                        </Link>
                      </div>
                      <div className='col-6'>
                        <button className='pending-order-button'>
                          Track Package
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )
            ) : (
              <span
                style={{
                  margin: isSmallScreen ? '10px 0px' : '2rem 0px 0px 0px',
                }}
                key={index}>
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
                {index === 0 && isSmallScreen && (
                  <Link style={{ textDecoration: 'none' }}>Order Invoice</Link>
                )}
              </span>
            ),
          )}
          <>
            {expandedOrders.includes(orders.id) &&
              orders?.order_item?.map((item, index) => (
                <>
                  {index !== 0 && (
                    <>
                      <span
                        style={{
                          margin: isSmallScreen
                            ? '15px 0px'
                            : '2rem 0px 0px 0px',
                        }}
                        key={index}>
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
                        {index === 0 && isSmallScreen && (
                          <Link style={{ textDecoration: 'none' }}>
                            Order Invoice
                          </Link>
                        )}
                      </span>
                    </>
                  )}
                </>
              ))}
          </>
        </CardContent>
        <button className='cancel-my-order-btn'>Cancel my order</button> |
        {isSmallScreen && (
          <button
            className='cancel-my-order-btn'
            onClick={() => toggleExpanded(orders.id)}>
            {expandedOrders.includes(orders?.id) ? 'Show less' : 'Show more'}
          </button>
        )}
      </Card>
      <Grid item lg={0.5}></Grid>
      {!isSmallScreen && (
        <Card
          style={{
            margin: '15px 0px',
            width: '25%',
            height: '310px',
            border: '1px solid #DDDDDD',
          }}
          shadow='sm'
          radius='md'
          withBorder
          className='p-0'>
          <InvoiceCard>
            <div className='order-invoice-conatiner'>
              <button>Order Invoice</button>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s,
              </p>
              <hr />
              <Grid container justifyContent='space-between' py={1}>
                <Grid item>Item:</Grid>
                <Grid item>
                  {orders?.order_item?.map((item, index) => {
                    if (index === 0) {
                      const productName = item?.product?.name;
                      const words = productName.split(' ');
                      const truncatedName = words.slice(0, 2).join(' ');
                      const truncatedProductName =
                        words.length > 2
                          ? truncatedName + '...'
                          : truncatedName;

                      return <span>{truncatedProductName}</span>;
                    }
                    return null;
                  })}
                </Grid>
              </Grid>{' '}
              <Grid container justifyContent='space-between' py={1}>
                <Grid item>Price</Grid>
                <Grid item sx={{ fontWeight: 600 }}>
                  ${orders?.total_amount}
                </Grid>
              </Grid>{' '}
              <Grid container justifyContent='space-between' py={1}>
                <Grid item>Shipping & handling</Grid>
                <Grid item>${orders?.shipment_price}</Grid>
              </Grid>
              <hr />
              <Grid container justifyContent='space-between' py={1}>
                <Grid
                  item
                  sx={{ fontSize: '14px', color: '#DD6500', fontWeight: 600 }}>
                  Order total:
                </Grid>
                <Grid
                  item
                  sx={{ fontSize: '14px', color: '#DD6500', fontWeight: 600 }}>
                  ${orders?.sub_total}
                </Grid>
              </Grid>
            </div>
            <div className='order-invoice-footer'>
              How shipping costs calculates?
            </div>
          </InvoiceCard>
        </Card>
      )}
    </Grid>
  ));
};

export default DeliveryOrderCard;
