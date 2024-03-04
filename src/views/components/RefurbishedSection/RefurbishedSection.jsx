import React from 'react';
import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import refurbishedIcon1 from '@images/SJ-refurbished-icon1.svg';
import refurbishedIcon2 from '@images/SJ-refurbished-icon2.svg';
import refurbishedIcon3 from '@images/SJ-refurbished-icon3.svg';
import refurbishedIcon4 from '@images/SJ-refurbished-icon4.svg';

function RefurbishedSection() {
  const innerBox = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };
  const theme = useTheme();

  const isUpSmall = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <Grid
      container
      sx={{ borderTop: '1px solid lightgray' }}
      textAlign={'center'}
      rowGap={'15px'}
      py={3}>
      <Grid item lg={12} md={12} sm={12} xs={12} textAlign={'center'}>
        <Typography
          variant='h5'
          fontSize={!isUpSmall && '16px'}
          fontWeight={'bolder'}>
          {' '}
          About SJ Computers{' '}
        </Typography>
      </Grid>
      <Grid
        item
        lg={12}
        md={12}
        sm={12}
        mb={'10px'}
        xs={12}
        mt={!isUpSmall && -2}>
        <Typography variant='body2' fontSize={!isUpSmall && '12px'}>
          SJ Computers stands as your premier source for reconditioned desktops,
          laptops, and computers, all backed by the comprehensive SJ Computers'
          Policy for your peace of mind.
        </Typography>
      </Grid>

      <Grid item lg={3} md={3} sm={6} xs={12} px={2} sx={innerBox}>
        <img
          style={{ marginBottom: '15px' }}
          width={'60px'}
          src={refurbishedIcon1}
          alt='analysis.pic'
        />
        <Typography
          variant='p'
          fontWeight={'bolder'}
          mb={1}
          fontSize={!isUpSmall && '14px'}>
          Affordability Redefined{' '}
        </Typography>
        <Typography variant='body2' fontSize={!isUpSmall && '12px'}>
          {' '}
          Our commitment to utilizing refurbished materials in the production of
          computers and accessories not only offers you cost-effective solutions
          but also contributes to reducing the environmental impact associated
          with mining.
        </Typography>
      </Grid>

      <Grid item lg={3} md={3} sm={6} xs={12} px={2} sx={innerBox}>
        <img
          style={{ marginBottom: '15px' }}
          width={'60px'}
          src={refurbishedIcon2}
          alt='analysis.pic'
        />
        <Typography
          variant='p'
          fontWeight={'bolder'}
          mb={1}
          fontSize={!isUpSmall && '14px'}>
          Dependable Quality{' '}
        </Typography>
        <Typography variant='body2' fontSize={!isUpSmall && '12px'}>
          {' '}
          Every product from SJ Computers undergoes meticulous refurbishment,
          adhering to stringent protocols and regulations. This guarantees that
          you receive optimal value for your investment with products of the
          highest quality.
        </Typography>
      </Grid>

      <Grid item lg={3} md={3} sm={6} xs={12} px={2} sx={innerBox}>
        <img
          style={{ marginBottom: '15px' }}
          width={'60px'}
          src={refurbishedIcon3}
          alt='analysis.pic'
        />
        <Typography
          variant='p'
          fontWeight={'bolder'}
          mb={1}
          fontSize={!isUpSmall && '14px'}>
          Significant Investment{' '}
        </Typography>
        <Typography variant='body2' fontSize={!isUpSmall && '12px'}>
          Discover a range of professionally tested innovative devices at SJ
          Computers. Our commitment to incorporating the latest technology
          ensures that each product delivers sought-after functionalities,
          making your purchase impactful and rewarding.
        </Typography>
      </Grid>

      <Grid
        item
        lg={3}
        md={3}
        sm={6}
        xs={12}
        px={2}
        sx={innerBox}
        pb={!isUpSmall && 2}
        style={{ borderBottom: !isUpSmall && '2px solid #CDCDCD' }}>
        <img
          style={{ marginBottom: '15px' }}
          width={'60px'}
          src={refurbishedIcon4}
          alt='analysis.pic'
        />
        <Typography
          variant='p'
          fontWeight={'bolder'}
          mb={1}
          fontSize={!isUpSmall && '14px'}>
          Reputable Assurance{' '}
        </Typography>
        <Typography variant='body2' fontSize={!isUpSmall && '12px'}>
          {' '}
          Our products speak volumes about our commitment to quality. For added
          assurance, SJ Computers provides a warranty and refund period,
          offering users credible coverage and further reinforcing our
          dedication to customer satisfaction.
        </Typography>
      </Grid>

      <Grid item lg={12} container rowGap={1}>
        <Grid item lg={12} textAlign={'start'}>
          <Typography
            variant='p'
            fontWeight={'bold'}
            fontSize={!isUpSmall && '14px'}>
            What can I expect to receive with my Refurbished purchase online?
          </Typography>
        </Grid>
        <Grid item lg={12} textAlign={'start'}>
          <Typography
            variant='body1'
            fontSize={!isUpSmall && '12px'}
            lineHeight={!isUpSmall && '15px'}>
            The completely refurbished product with its necessary accessories.
          </Typography>
        </Grid>
      </Grid>

      <Grid item lg={12} container rowGap={1}>
        <Grid item lg={12} textAlign={'start'}>
          <Typography
            variant='p'
            fontWeight={'bold'}
            fontSize={!isUpSmall && '14px'}>
            In what condition can I expect my refurbished product to be?
          </Typography>
        </Grid>
        <Grid item lg={12} textAlign={'start'}>
          <Typography
            variant='body1'
            fontSize={!isUpSmall && '12px'}
            lineHeight={!isUpSmall && '15px'}>
            The refurbished product will be in complete working condition.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default RefurbishedSection;
