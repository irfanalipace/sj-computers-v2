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

const TrackOrder = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const products = useSelector(state => state.products.products);
  const user = useSelector(state => state.auth.user);
  const screenWidth = useViewportWidth();

  const [trackingInfo, setTrackingInfo] = useState([]);

  const trackingId = 775486523899;

  useEffect(() => {
    getTrackingInfo(trackingId)
      .then(data => {
        console.log('Tracking info:', data);
        setTrackingInfo(data[0]?.trackResults[0]);
        // Do something with the tracking info
      })
      .catch(error => {
        // Handle errors
        console.error('Error fetching tracking info:', error);
      });
  }, [trackingId]);

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

                <Link to={''} className='track-page-link'>
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
                {trackingInfo?.estimatedDeliveryTimeWindow?.window.length > 0
                  ? trackingInfo?.estimatedDeliveryTimeWindow?.window[0]
                  : 'not confirm yet'}
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
        <CustomizedSteppers />
        <Grid mt={7} container columnSpacing={0} px={4}>
          {/* 5.7 + 0.6 + 5.7 */}
          <Grid item xs={12} sm={5.7} sx={{ border: '1px solid #EEEEEE' }}>
            <ShipmentInformation trackingInfo={trackingInfo} user={user} />
          </Grid>
          {/* Empty Grid for Grid geometry  */}
          <Grid item xs={12} sm={0.6}></Grid>
          <Grid
            item
            xs={12}
            sm={5.7}
            mt={screenWidth < 575 && 6}
            sx={{ border: '1px solid #EEEEEE' }}>
            <ItemsInShipment />
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
