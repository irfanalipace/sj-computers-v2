import React from 'react';
import TopBanner from '@components/TopBanner';
import CategoriesHeader from '@components/Header/CategoriesHeader/CategoriesHeader';
import CategorySidebar from '@components/Catagory/CategorySidebar/CategorySidebar';
import { Box, Grid } from '@mui/material';
import ProductCategoryGrid from '../../components/ProductCategorGrid';

// import Desktops from './components/Desktops';

const TouchScreenPC = () => {
  return (
    <>
      <CategoriesHeader />
      <TopBanner
        color={'linear-gradient(87.71deg, #1799B0 0%, #007185 99.77%)'}
        heading={'Touch Screen Laptop'}
        desc={'Our most popular products based on sales. Updated frequently.'}
      />
      <Box>
        <Grid container>
          <Grid item md={2} lg={2} mt={10}>
            <CategorySidebar sidebarTitle='isBudFriendlyDesktops' />
          </Grid>
          <Grid item md={10} lg={10} p={2} mt={10}>
            <ProductCategoryGrid pathValue={'touch-screen'} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default TouchScreenPC;
