import React from 'react';
import CategoriesHeader from '../../components/Header/CategoriesHeader/CategoriesHeader';
import CategoryVideo from '../../components/Catagory/CategoryVideo';
import { Box, Grid, Typography } from '@mui/material';
import CategorySlider from '../../components/Catagory/CategorySlider/CategorySlider';
import CategorySidebar from '../../components/Catagory/CategorySidebar/CategorySidebar';
import ProductsByCategory from './ProductsByCategory';
import './Category.css';
import AllCategoriesHeader from '../../components/Catagory/AllCategoriesHeader/AllCategoriesHeader';
import ShopByCategory from '../../components/Catagory/ShopByCategory';
import ShopByBrand from '../../components/Catagory/ShopByBrand';
import Recommendation from '../../components/Recommendation/Recommendation';
import MobileRecommand from '../../components/MobileCategory/MobileRecommand/MobileRecommand';

import './Category.css';
import CategoryVideoAndSlider from '../../components/Catagory/CategoryVideoAndSlider';
import CategoryFilterbarMobile from '../../components/Catagory/CategoryFiterbarMobile/CategoryFilterbarMobile';

const CategoryProducts = () => {
  return (
    <Grid container>
      {/* Header */}
      <Grid item xs={12}>
        <CategoriesHeader />
      </Grid>

      {/* Filterbar For Mobile only */}
      <Grid item xs={12} className='d-sm-none'>
        <CategoryFilterbarMobile />
      </Grid>

      {/* Video and Slider Combine */}
      <Grid item xs={12}>
        <CategoryVideoAndSlider />
      </Grid>

      {/* <Grid item sm={3} md={2} mt={2} py={2} className='d-none d-sm-block'>
        <CategorySidebar />
      </Grid> */}

      {/* <Grid item md={10}>
          <ProductsByCategory inCategoriesPage={true} />
      </Grid> */}
      {/* <Grid item xs={12} sm={9} md={10} lg={10} py={2}></Grid> */}
      <Grid xs={12} md={12} px={0} py={1}>
        <AllCategoriesHeader />
        <Typography
          variant='h3'
          mb={2}
          sx={{
            // ml: '16px',
            background:
              'linear-gradient(88.41deg, rgba(59, 108, 155, 0.85) 0.37%, #789FC5 98.64%)',
            '@media (max-width: 575px)': {
              p: 2,
              fontSize: '22px',
              ml: 0,
              marginLeft: '0px',
            },
          }}
          p={4}
          fontWeight={'bolder'}
          textAlign={'center'}>
          All Categories
        </Typography>
        <ShopByCategory />
        <ShopByBrand />
      </Grid>

      <Grid
        style={{ paddingLeft: '0px', paddingRight: '0px' }}
        item
        xs={12}
        md={12}
        px={10}
        py={2}
        borderTop={'1px solid gray'}
        className='d-none d-sm-block'>
        <Recommendation />
      </Grid>

      <Grid item xs={12} className='d-sm-none'>
        <MobileRecommand />
      </Grid>
    </Grid>
  );
};

export default CategoryProducts;
