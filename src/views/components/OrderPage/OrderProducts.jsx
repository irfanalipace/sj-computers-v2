import { useState } from 'react';
import { Card, useMantineTheme, Button } from '@mantine/core';
import Pagination from '@mui/material/Pagination';

import './OrderProducts.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Typography, useMediaQuery, useTheme } from '@mui/material';

function OrderProducts({ data, totalItems, sendToPage }) {
  const themeMui = useTheme();
  const isSmallScreen = useMediaQuery(themeMui.breakpoints.down('sm'));
  const [expandedOrders, setExpandedOrders] = useState([]);
  const userName = useSelector(state => state?.auth);

  const [totalRecords, setTotalRecords] = useState(
    totalItems?.success_orders?.total,
  );
  const [currentPage, setCurrentPage] = useState(
    totalItems?.success_orders?.current_page,
  );
  const perPage = 12; // Adjust the number of items per page as needed
  // ...

  const pageCount = Math.ceil(totalRecords / perPage);

  const goToPage = (e, page) => {
    setCurrentPage(page);
    sendToPage(page);
  };

  const nextPage = () => {
    if (currentPage < pageCount) {
      // setCurrentPage((prevPage) => prevPage + 1);
      setCurrentPage(currentPage + 1);
      console.print(currentPage, 'current after next');
      console.print(currentPage + 1, '+1 after next');
      sendToPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      sendToPage(currentPage - 1);
    }
  };

  const theme = useMantineTheme();
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  }

  const toggleExpanded = orderId => {
    console.log(orderId);
    setExpandedOrders(prevOrders =>
      prevOrders.includes(orderId)
        ? prevOrders.filter(id => id !== orderId)
        : [...prevOrders, orderId],
    );
  };

  const renderPagination = () => {
    const pages = [];

    // Case 1: More than 5 pages
    if (pageCount > 5) {
      for (let i = 1; i <= 2; i++) {
        pages.push(
          <Button
            style={{
              background: currentPage === i ? '#198754' : 'outline',
              margin: '0px 5px',
            }}
            key={i}
            onClick={() => goToPage(i)}
            variant={currentPage === i ? 'filled' : 'outline'}>
            {i}
          </Button>,
        );
      }
      pages.push(<span key='dots'>...</span>);
      pages.push(
        <Button
          style={{
            background: currentPage === pageCount ? '#198754' : 'outline',
            margin: '0px 5px',
          }}
          key={pageCount}
          onClick={() => goToPage(pageCount)}
          variant={currentPage === pageCount ? 'filled' : 'outline'}>
          {pageCount}
        </Button>,
      );
    }
    // Case 2: Less than or equal to 5 pages
    else {
      for (let i = 1; i <= pageCount; i++) {
        pages.push(
          <Button
            style={{
              background: currentPage === i ? '#198754' : 'outline',
              margin: '0px 5px',
            }}
            key={i}
            onClick={() => goToPage(i)}
            variant={currentPage === i ? 'filled' : 'outline'}>
            {i}
          </Button>,
        );
      }
    }

    return <div>{pages}</div>;
  };

  return (
    <>
      {/* {data.map((product, index) => ( */}
      {data.map(row => (
        <Card
          style={{ margin: isSmallScreen ? '0px 0px 15px 0px' : '15px 0px' }}
          shadow='sm'
          radius='md'
          withBorder
          className='p-0'
          key={row.id}>
          <div className='order-details'>
            <div className='order-header-bar'>
              <div className='order-status'>
                Tracking id {isSmallScreen && <br />} <span>#{row.id}</span>{' '}
                <br />
                {isSmallScreen ? (
                  <></>
                ) : (
                  <Link
                    to={{
                      pathname: `/account/orders/order-details/${row?.id}`,
                    }}
                    style={{
                      color: '#318243',
                      textDecoration: 'none',
                      fontSize: '12px',
                    }}>
                    View Order Details
                  </Link>
                )}
              </div>
              <div className='order-status'>
                {row?.fedex_status || row?.status} <br /> {row.shipment_days}
              </div>
              <div className='order-status'>
                Ship to <br /> <p>{userName?.user?.name}</p>
              </div>
              <div className='order-status'>
                Total <br /> ${row.sub_total}
              </div>
            </div>
            <div className='product-info'>
              <>
                <>
                  {row?.order_item?.map((order, indexOrder) => (
                    <>
                      {indexOrder === 0 && (
                        <div className='order-container' key={indexOrder}>
                          <div className='order-image-container'>
                            <div className='order-image'>
                              <LazyLoadImage
                                width={'100%'}
                                height={'100%'}
                                src={order?.product.image[0]}
                                alt={order?.product?.name
                                  ?.trim()
                                  ?.split(' ')
                                  ?.slice(0, 9)
                                  ?.join(' ')}
                              />
                            </div>
                            <div>
                              <Typography
                                style={{
                                  fontSize: '12px',
                                  fontWeight: 400,
                                }}
                                className='order-nameee'>
                                {order?.product?.name}
                              </Typography>
                            </div>
                          </div>
                          <div style={{ color: '#949494', paddingTop: '20px' }}>
                            Qty:{' '}
                            <span style={{ color: '#000' }}>{order?.qty}</span>
                          </div>
                          <button className='pending-order-button'>
                            {row?.status}
                          </button>
                          {row?.fedex_status !== 'DELIVERED' ? (
                            <Link
                              to={`/track-order/${row?.id}/${row?.tracking_id}`}
                              className='track-order-button'>
                              Track Package
                            </Link>
                          ) : (
                            <p style={{ marginTop: '20px' }}>
                              Price : ${order?.product?.price}
                            </p>
                          )}
                        </div>
                      )}
                    </>
                  ))}
                </>
                <>
                  {expandedOrders.includes(row.id) &&
                    row?.order_item?.map((order, indexOrder) => (
                      <>
                        {indexOrder !== 0 && (
                          <div
                            className='order-container'
                            // style={{ width: '60.6%' }}
                            key={indexOrder}>
                            <div className='order-image-container'>
                              <div className='order-image'>
                                <LazyLoadImage
                                  width={'100%'}
                                  height={'100%'}
                                  src={order?.product.image[0]}
                                  alt={order?.product?.name
                                    ?.trim()
                                    ?.split(' ')
                                    ?.slice(0, 9)
                                    ?.join(' ')}
                                />
                              </div>
                              <div>
                                <Typography
                                  style={{
                                    fontSize: '12px',
                                    fontWeight: 400,
                                  }}
                                  className='order-nameee'>
                                  {order?.product?.name}
                                </Typography>
                              </div>
                            </div>
                            <div
                              style={{ color: '#949494', paddingTop: '20px' }}>
                              Qty:{' '}
                              <span style={{ color: '#000' }}>
                                {order?.qty}
                              </span>
                            </div>
                            <p style={{ marginTop: '20px' }}>
                              Price : ${order?.product?.price}
                            </p>
                          </div>
                        )}
                      </>
                    ))}
                </>
              </>
              {/* <div
                className='my-2'
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}>
                <Pagination
                  count={pageCount}
                  page={currentPage}
                  onChange={goToPage}
                />
              </div> */}
            </div>
            {row?.status === 'COMPLETE' ? (
              <div className='show-more-order-buttons'>
                <button onClick={() => toggleExpanded(row.id)}>
                  {expandedOrders.includes(row.id)
                    ? 'Show less'
                    : `${row?.order_item?.length - 1} more to show`}
                </button>
              </div>
            ) : (
              <div className='show-more-order-buttons'>
                <button>Cancel my order</button>
                <button onClick={() => toggleExpanded(row.id)}>
                  {expandedOrders.includes(row.id) ? 'Show less' : 'Show more'}
                </button>
              </div>
            )}
          </div>
        </Card>
      ))}
    </>
  );
}

export default OrderProducts;
