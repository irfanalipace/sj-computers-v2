import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { updateProfile } from '@store/auth/authThunks';
import { CLEAR_API_ERRORS } from '@store/auth/authSlice';
import { getOrderDetails } from '@store/orders/ordersThunk';
import Button from '@common/Button/Button';
import Breadcrumb from '@common/Breadrumb/Breadcrumb';
import { OrderSearchApi, OrderListhApi } from '../../../core/api/order';
import OrderCard from '@components/OrderPage/OrderProducts';
import OrderInvoiceCard from '@components/OrderPage/OrderInvoiceCard';
import userDefault from '@images/common/user-default-avatar.png';

import {
  Tabs,
  Tab,
  Box,
  Typography,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LoaderComponent from '@common/LoaderComponent/LoaderComponent';
import SearchIcon from '@mui/icons-material/Search';

// import { FaSearch } from "react-icons/fa";
import './Account.css';
import { Select } from '@mantine/core';
import { Stack } from 'react-bootstrap';
import DeliveryOrderCard from './DeliverOrderCard';

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
  const [name, setName] = useState('');
  const [localLoading, setLocalLoading] = useState(false);
  const [orderSearch, setOrderSearch] = useState('');
  const [orderSearchData, setOrderSearchData] = useState([]);
  const [selectedValue, setSelectedValue] = useState('2 month');
  const [activeTab, setActiveTab] = useState(0);

  const user = useSelector(state => state.auth.user);
  const apiError = useSelector(state => state.auth.apiError);
  const isLoading = useSelector(state => state.orders.isLoading);
  const cancelOrders = useSelector(state => state.orders.cancelOrders);
  const successOrders = useSelector(state => state.orders.successOrders);
  const orderDetails = useSelector(state => state.orders.orderDetails);

  // console.print(orderDetails.total, 'total')

  const handleDropdownChange = value => {
    setSelectedValue(value);
  };

  const dispatch = useDispatch();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // useEffect(() => {
  //     console.print(user, "user details");
  //     setName(user.name);
  // }, [user]);

  // useEffect(() => {
  //     return function () {
  //         dispatch(CLEAR_API_ERRORS());
  //     };
  // }, []);
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
        // <div className="flex justify-center items-center">
        //     <p>No success orders</p>
        // </div>
        <>
          {/* {Object.Keys(orderDetails).length === 0 ? "data have" : "no data"} */}

          <div className='flex justify-center items-center'>
            <p>No success orders</p>
          </div>
        </>
      )
    ) : activeTab === 1 ? (
      // cancelOrders.length > 0 ? (
      // <div className="flex justify-center items-center">
      //     <p>No cancelled orders.</p>
      // </div>
      // <OrderCard data={cancelOrders} />
      <DeliveryOrderCard data={successOrders} />
    ) : // ) : (
    //   <div className='flex justify-center items-center'>
    //     <p>No cancelled orders</p>
    //   </div>
    // )
    activeTab === 2 ? (
      orderSearchData.length > 0 ? (
        localLoading === true ? (
          <LoaderComponent />
        ) : (
          <OrderCard data={orderSearchData} />
        )
      ) : (
        // <div className="flex justify-center items-center">
        //     <p>Orders Not found.</p>
        // </div>
        // <OrderCard data={orderSearchData} />
        <div className='flex justify-center items-center'>
          <p>Orders Not found.</p>
        </div>
      )
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
              Enter order id to search
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
                width: isSmallScreen ? '100%' : '45%',
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
              <Tab
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
              />
            </CustomTabs>

            <div
              style={{
                display: 'flex',
                marginTop: activeTab === 0 && 40,
                marginBottom: 40,
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
                  <div style={{ display: 'inline-flex' }}>
                    {/* <Select
                      data={[
                        {
                          value: '',
                          label: 'All',
                        },
                        {
                          value: '1 month',
                          label: '1 month',
                        },
                      ]}
                      value={selectedValue}
                      onChange={handleDropdownChange}
                      placeholder='Select an option'
                      style={{
                        background: '#FFFFFF',
                        border: '1px solid #DDDDDD',
                        boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)',
                        borderRadius: '8px',
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: '400',
                        fontSize: '12px',
                        marginTop: '-8px',
                        lineHeight: '164%',
                        color: '#000000',
                      }}
                    /> */}
                  </div>
                </>
              )}
            </div>

            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
