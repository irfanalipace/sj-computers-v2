import React, { useEffect, useState } from 'react';
import CustomizedSteppers from '../../components/Stepper/indes';
import {
  Box,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
  IconButton,
} from '@mui/material';
import ShipmentInformation from '../../components/Stepper/ShipmentInformation';
import TrackingHistory from '../../components/Stepper/TrackingHistory';
import ItemsInShipment from '../../components/Stepper/ItemsInShipment';
import ExpectOnDeliveryDay from '../../components/Stepper/ExpectOnDeliveryDay';
import Recommendation from '../../components/Recommendation/Recommendation';
import { useSelector } from 'react-redux';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MobileRecommand from '../../components/MobileCategory/MobileRecommand/MobileRecommand';
import { useViewportWidth } from '@hooks/useViewportWidth';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './TrackOrder.css';
import getTrackingInfo from '../../../core/api/order';
import { getOrderDetailsSJ } from '../../../core/api/refund-order';
import { formatingDate } from '../../../core/utils/helpers';
// import { Params } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const TrackOrder = props => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const products = useSelector(state => state.products.products);
  const user = useSelector(state => state.auth.user);
  const screenWidth = useViewportWidth();

  const [trackingInfo, setTrackingInfo] = useState([]);
  const [shipmentData, setShipmentData] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id, trackingId } = useParams();
  // console.print(id, 'orderId', trackingId);

  // const fedexTrackingId = trackingId;

  // useEffect(() => {
  //   getTrackingInfo(trackingId)
  //     .then(data => {
  //       console.log('Tracking info:', data);
  //       setTrackingInfo(data[0]?.trackResults[0]);
  //       // Do something with the tracking info
  //     })
  //     .catch(error => {
  //       // Handle errors
  //       console.error('Error fetching tracking info:', error);
  //     });
  // }, [trackingId]);

  useEffect(() => {
    const param = {
      user_id: user?.id,
      order_id: [id],
    };

    setLoading(true);
    // Call the getOrderDetailsSJ function
    getOrderDetailsSJ(param)
      .then(response => {
        // Handle the response data
        console.log('Order details:', response);
        setShipmentData(response); // Assuming response is the order details
      })
      .catch(error => {
        // Handle errors
        console.error('Error fetching order details:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const anticipatedDelivery = trackingInfo?.dateAndTimes?.filter(
    obj => obj.type === 'ANTICIPATED_TENDER',
  );
  const formatedAnticipatedDeliveryValue =
    anticipatedDelivery && anticipatedDelivery.length > 0
      ? formatingDate(anticipatedDelivery[0]?.dateTime)
      : null;

  const fedexStatus =
    shipmentData?.data?.length > 0 ? shipmentData?.data[0]?.fedex_status : null;

  const trackingHistory =
    shipmentData?.data?.length > 0
      ? shipmentData?.data[0]?.order_tracking_histroy?.tracking_history
      : null;

  // console.log(trackingHistory, 'tracking history');

  let trackingEventData;
  try {
    trackingEventData = trackingHistory ? JSON.parse(trackingHistory) : null;
    console.log(trackingEventData, 'tracking eventData');
  } catch (error) {
    console.error('Error parsing tracking history:', error);
    // Handle the error gracefully, maybe set eventData to some default value
    trackingEventData = null;
  }

  // Iterate over each object and extract the date value
  // eventData?.length > 0 &&
  //   eventData.forEach(event => {
  //     console.log(event.date, 'tracking date');
  //   });

  // console.log(fedexStatus, 'fedex_status');

  return (
    <>
      <Container sx={{ my: 4 }}>
        <Box my={4}>
          <Typography variant='div' fontSize={'14px'}>
            {isAuthenticated ? (
              <>
                <Link to={'/account'} className='track-page-link'>
                  <span>Your Account</span>
                  <IconButton>
                    <NavigateNextIcon sx={{ fontSize: '14px' }} />
                  </IconButton>
                </Link>

                <Link to={'/account/orders'} className='track-page-link'>
                  <span>My Order</span>
                  <IconButton>
                    <NavigateNextIcon sx={{ fontSize: '14px' }} />
                  </IconButton>
                </Link>

                <Link to={''} className='track-page-link'>
                  <span style={{ color: '#E87E24' }}>Order Status</span>
                </Link>
              </>
            ) : (
              <Link to={''} className='track-page-link'>
                <IconButton sx={{ padding: '0px' }}>
                  <ArrowBackIosIcon sx={{ fontSize: '12px' }} />{' '}
                </IconButton>{' '}
                <span>Back to tracking page </span>
              </Link>
            )}
          </Typography>
        </Box>

        <Box mb={4}>
          <Typography
            fontWeight={400}
            fontSize={'28px'}
            fontFamily={'Inter'}
            lineHeight={'33px'}>
            Order Status
          </Typography>
          <Box mt={2}>
            <Stack direction={'row'} spacing={2}>
              <Typography
                fontWeight={500}
                fontSize={'14px'}
                fontFamily={'Inter'}
                lineHeight={'16px'}>
                Estimated Delivery:
              </Typography>
              <Typography
                fontWeight={400}
                fontSize={'14px'}
                fontFamily={'Inter'}
                lineHeight={'16px'}>
                {' '}
                {shipmentData?.data?.length > 0 &&
                  shipmentData?.data[0]?.shipment_days}
              </Typography>
            </Stack>
            <Typography
              fontWeight={400}
              fontSize={'14px'}
              fontFamily={'Inter'}
              lineHeight={'33px'}>
              Arrived at FedEx location
            </Typography>
          </Box>
        </Box>
        <CustomizedSteppers
          step={
            fedexStatus === 'Picked up'
              ? 1
              : fedexStatus === 'In transit'
                ? 2
                : fedexStatus === 'Delivered'
                  ? 3
                  : 0
          }
          shipmentData={shipmentData}
          trackingInfo={trackingInfo}
          trackingEventData={trackingEventData}
        />
        <Grid mt={7} container columnSpacing={0} px={4}>
          {/* 5.7 + 0.6 + 5.7 */}
          <Grid item xs={12} sm={5.7} sx={{ border: '1px solid #EEEEEE' }}>
            <ShipmentInformation
              trackingInfo={trackingInfo}
              shipmentData={shipmentData}
              user={user}
              trackingId={trackingId}
            />
          </Grid>
          {/* Empty Grid for Grid geometry  */}
          <Grid item xs={12} sm={0.6}></Grid>
          <Grid
            item
            xs={12}
            sm={5.7}
            mt={screenWidth < 575 && 6}
            sx={{ border: '1px solid #EEEEEE' }}>
            <ItemsInShipment
              user={user}
              shipmentData={shipmentData}
              trackingInfo={trackingInfo}
              loading={loading}
            />
          </Grid>
          <Grid
            item
            xs={12}
            // sm={6.3}
            mt={6}
            sx={{ border: '1px solid #EEEEEE' }}>
            <ExpectOnDeliveryDay />
          </Grid>
        </Grid>
      </Container>
      <Box px={2}>
        <div className='d-none d-sm-block'>
          <Recommendation products={products} />
        </div>
        <div className='d-block d-sm-none'>
          <MobileRecommand />
        </div>
      </Box>
    </>
  );
};

export default TrackOrder;
