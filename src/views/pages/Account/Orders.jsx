import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getOrderDetails } from '@store/orders/ordersThunk';
import Breadcrumb from '@common/Breadrumb/Breadcrumb';
import { OrderSearchApi, OrderListhApi } from '../../../core/api/order';
import OrderCard from '@components/OrderPage/OrderProducts';

import { Tabs, Tab, useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import LoaderComponent from '@common/LoaderComponent/LoaderComponent';
import SearchIcon from '@mui/icons-material/Search';

import './Account.css';
import DeliveryOrderCard from './DeliverOrderCard';
import Recommendation from '../../components/Recommendation/Recommendation';

const CustomTabs = styled(Tabs)`
  & .MuiTabs-indicator {
    backgroundcolor: #e87e24;
  }

  & .MuiTab-textColorPrimary {
    color: #318243;
    margin-right: 120px;

    &.Mui-selected {
      color: #e87e24;
    }
  }

  @media (max-width: 480px) {
    & .MuiTab-textColorPrimary {
      margin-right: 20px;
    }
  }
`;

const OrderPage = () => {
  const [localLoading, setLocalLoading] = useState(false);
  const [orderSearch, setOrderSearch] = useState('');
  const [orderSearchData, setOrderSearchData] = useState([]);
  const [selectedValue, setSelectedValue] = useState('2 month');
  const [activeTab, setActiveTab] = useState(0);

  const isLoading = useSelector(state => state.orders.isLoading);
  const cancelOrders = useSelector(state => state.orders.cancelOrders);
  const successOrders = useSelector(state => state.orders.successOrders);
  const orderDetails = useSelector(state => state.orders.orderDetails);
  const products = useSelector(state => state?.products?.products);
  // console.print(orderDetails.total, 'total')

  const handleDropdownChange = value => {
    setSelectedValue(value);
  };

  const dispatch = useDispatch();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    dispatch(getOrderDetails());
    const orderlist = OrderListhApi();
    console.print(orderlist, 'orderList');
  }, [dispatch]);

  useEffect(() => {
    updatePage(1);
  }, [activeTab]);

  const handleTabChange = (event, newValue) => {
    setOrderSearchData([]);
    setActiveTab(newValue);
    setOrderSearch('');
  };
  const handleSearch = async () => {
    setActiveTab(2);
    // console.print(orderSearch, "input")
    setLocalLoading(true);
    const responseSearch = await OrderSearchApi(orderSearch);
    setOrderSearchData(responseSearch);
    setLocalLoading(false);
    // setOrderSearch("");
    return;
  };

  const updatePage = data => {
    dispatch(getOrderDetails(data));
  };

  const renderTabContent = () => {
    if (isLoading) {
      return <LoaderComponent />;
    }
    return activeTab === 0 ? (
      successOrders.length > 0 ? (
        <OrderCard
          data={successOrders}
          totalItems={orderDetails}
          sendToPage={updatePage}
        />
      ) : (
        <>
          <div className='flex justify-center items-center'>
            <p>No success orders</p>
          </div>
        </>
      )
    ) : activeTab === 1 ? (
      <DeliveryOrderCard data={successOrders} />
    ) : activeTab === 2 ? (
      <DeliveryOrderCard data={successOrders} cancelled={true} />
    ) : null;
  };
  return (
    <div className='account-page order-page'>
      <div className='container-xl'>
        <Breadcrumb />
        <div className='row mx-0'>
          <div className='col-sm-4 col-md-8 col-8'>
            <h3 className='account-heading your-order-page'>My Orders</h3>
          </div>
          <div className='col-sm-8 col-md-4 col-4 search-product-order-tables'>
            <label style={{ marginBottom: 5 }} htmlFor='orderSearch'>
              Enter tracking id to search
            </label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    position: 'absolute',
                    left: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#318243',
                  }}>
                  <SearchIcon />
                </div>
                <input
                  id='orderSearch'
                  name='orderSearch'
                  placeholder='Search all orders'
                  value={orderSearch}
                  onChange={e => setOrderSearch(e.target.value)}
                  className={
                    orderSearch
                      ? 'form-control form-control-sm my-lg-0 search-input green'
                      : 'form-control form-control-sm my-lg-0 search-input'
                  }
                  style={{ paddingLeft: '40px', border: '1px solid #318243' }}
                />
              </div>

              <button
                className='searchOrderBtn btn btn-sm'
                type='button'
                style={{
                  backgroundColor: '#52AC66',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  marginLeft: '10px',
                  padding: '5px 10px',
                  display: 'flex',
                  alignItems: 'center',
                }}
                onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
        </div>

        <div className='row  mx-0 order-list-container mt-2 orderTabsSection'>
          <div className='col-12 px-0'>
            <CustomTabs
              value={activeTab}
              onChange={handleTabChange}
              sx={{
                borderBottom: '1px solid #ddd',
                width: isSmallScreen ? '100%' : '30%',
              }}>
              <Tab
                label='Orders'
                sx={{
                  fontSize: {
                    xs: '12px',
                    md: '14px',
                    lg: '14px',
                  },
                  textTransform: 'none',
                  fontFamily: 'Inter',
                }}
              />
              <Tab
                label='Delivered'
                sx={{
                  fontSize: {
                    xs: '12px',
                    md: '14px',
                    lg: '14px',
                  },
                  textTransform: 'none',
                  fontFamily: 'Inter',
                }}
              />
              {/* <Tab
                label='Cancelled Orders'
                sx={{
                  fontSize: {
                    xs: '12px',
                    md: '14px',
                    lg: '14px',
                  },
                  textTransform: 'none',
                  fontFamily: 'Inter',
                }}
              /> */}
            </CustomTabs>

            <div
              style={{
                display: 'flex',
                marginTop: activeTab === 0 && isSmallScreen ? 0 : 40,
                marginBottom: isSmallScreen ? 0 : 40,
              }}>
              {activeTab !== 2 && (
                <>
                  <p className='orderType'>
                    {activeTab === 0 ? (
                      <>
                        {orderDetails?.success_orders?.data.length >= 0 ? (
                          `${orderDetails?.success_orders?.data.length} orders`
                        ) : (
                          <LoaderComponent />
                        )}
                        <span style={{ marginRight: '12px' }}> placed in </span>
                        <select
                          onChange={handleDropdownChange}
                          className='order-select'
                          placeholder='Select an option'>
                          <option value=''>All</option>
                          <option value='1 month'>1 month</option>
                        </select>
                      </>
                    ) : (
                      <>
                        {/* {`${orderDetails?.cancel_orders?.total} cancelled order`} */}
                      </>
                    )}
                  </p>
                </>
              )}
            </div>

            {renderTabContent()}
          </div>
        </div>
      </div>
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
    </div>
  );
};

export default OrderPage;
