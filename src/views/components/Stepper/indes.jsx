import * as React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, {
  stepConnectorClasses,
} from '@mui/material/StepConnector';
import { stepLabelClasses } from '@mui/material';
import { Typography } from '@mui/material';
import { formatingDate } from '../../../core/utils/helpers';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 12,
    // left: -150,
    transform: 'translate(-10%, 0px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: '#E87E24',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: '#E87E24',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
    width: '120%',
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 25,
  height: 25,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundColor: '#E87E24',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundColor: '#E87E24',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    // 1: <SettingsIcon />,
    // 2: <GroupAddIcon />,
    // 3: <VideoLabelIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};
const steps = [
  { label: 'Ordered', description: 'April 11, 2023' },
  {
    label: 'In Transit',
    description: '',
  },
  { label: 'Out for Delivery', description: 'May 05, 2023' },
  { label: 'Delivered', description: 'May 07, 2023' },
];
export default function CustomizedSteppers({
  step = 2,
  trackingInfo,
  shipmentData,
}) {
  const orderedValue = shipmentData.data
    ? shipmentData?.data[0]?.created_at
    : '';
  const formatedOrderedValue = formatingDate(orderedValue);

  const inTransitValue = trackingInfo?.dateAndTimes?.filter(
    obj => obj.type === 'SHIP',
  );
  const formatedTranstValue =
    inTransitValue && inTransitValue.length > 0
      ? formatingDate(inTransitValue[0]?.dateTime)
      : null;
  const outForDelivery = trackingInfo?.dateAndTimes?.filter(
    obj => obj.type === 'ACTUAL_TENDER',
  );
  const formatedOutForDeliveryValue =
    outForDelivery && outForDelivery.length > 0
      ? formatingDate(outForDelivery[0]?.dateTime)
      : null;

  console.print('inTransitalue', inTransitValue);

  return (
    <Stack sx={{ width: '100%' }} spacing={4}>
      <Stepper
        alternativeLabel
        activeStep={step}
        // connector={<QontoConnector />}
        connector={<ColorlibConnector />}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>
              <Typography
                fontFamily={'Inter'}
                fontSize={'14px'}
                lineHeight={'16px'}
                fontWeight={500}>
                {label.label}
              </Typography>
              <Typography
                sx={{ mt: 1 }}
                fontFamily={'Inter'}
                fontSize={'14px'}
                lineHeight={'16px'}
                fontWeight={400}>
                {index === 0
                  ? formatedOrderedValue
                  : index === 1
                    ? formatedTranstValue
                    : index === 2
                      ? formatedOutForDeliveryValue
                      : label.description}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
}
