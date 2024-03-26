import React from 'react';
import { Grid, Typography } from '@mui/material';
import CategoryVideo from './CategoryVideo';
import CategorySlider from './CategorySlider/CategorySlider';

const CategoryVideoAndSlider = () => {
  return (
    <Grid container>
      {/* Heading */}
      <Grid item xs={12} p={3} pb={1}>
        <Typography variant='p' fontSize={'24px'} fontWeight={'600'}>
          Latest Addition
        </Typography>
      </Grid>

      <Grid item container xs={12} mb={1}>
        {/* CategoryVideo */}
        <Grid item xs={12} sm={6} md={4} p={2}>
          <CategoryVideo />
        </Grid>

        {/* CategorySlider */}
        <Grid item xs={12} sm={6} md={8} py={0}>
          <CategorySlider />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CategoryVideoAndSlider;
