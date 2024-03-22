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
    label: 'Picked up',
    description: '',
  },
  { label: 'In transit', description: 'May 05, 2023' },
  { label: 'Delivered', description: 'May 07, 2023' },
];
export default function CustomizedSteppers({
  step,
  trackingInfo,
  shipmentData,
  trackingEventData,
}) {
  const orderedValue =
    shipmentData.data?.length > 0 ? shipmentData?.data[0]?.created_at : '';
  const formatedOrderedValue =
    orderedValue === '' ? null : formatingDate(orderedValue);

  const pickedupValue = trackingEventData?.filter(
    item => item.derivedStatus === 'Picked up',
  );

  const formatedPickedupValue =
    pickedupValue && pickedupValue.length > 0
      ? formatingDate(pickedupValue[0]?.date)
      : null;

  // console.log(pickedupValue[0]?.date, 'pickedupValue');

  const inTransitValue = trackingEventData?.filter(
    item => item.derivedStatus === 'In transit',
  );

  const formatedTranstValue =
    inTransitValue && inTransitValue.length > 0
      ? formatingDate(inTransitValue[0]?.date)
      : null;

  const deliverdValue = trackingEventData?.filter(
    item => item.derivedStatus === 'Delivered',
  );

  const formatedDeliveredValue =
    deliverdValue && deliverdValue.length > 0
      ? formatingDate(deliverdValue[0]?.date)
      : null;

  console.log('inTransitalue', pickedupValue);

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
                    ? formatedPickedupValue
                    : index === 2
                      ? formatedTranstValue
                      : index === 3
                        ? formatedDeliveredValue
                        : null}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
}
