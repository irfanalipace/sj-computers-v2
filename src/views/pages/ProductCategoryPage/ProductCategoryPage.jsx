import TopBanner from '@components/TopBanner';
import CategoriesHeader from '@components/Header/CategoriesHeader/CategoriesHeader';
import CategorySidebar from '@components/Catagory/CategorySidebar/CategorySidebar';
import { Box, Grid } from '@mui/material';
import ProductCategoryGrid from '@components/ProductCategorGrid';
import { useState } from 'react';
import CategoryFilterbarMobile from '../../components/Catagory/CategoryFiterbarMobile/CategoryFilterbarMobile';

const ProductCategoryPage = ({ color, heading, desc, pathValue }) => {
  const [filters, setFilters] = useState('');
  const upateFilters = fil => {
    setFilters(fil);
  };
  return (
    <>
      <CategoriesHeader />
      <div className='d-block d-sm-none'>
        <CategoryFilterbarMobile />{' '}
      </div>
      <TopBanner color={color} heading={heading} desc={desc} />
      <Box>
        <Grid container>
          <Grid
            item
            md={2}
            lg={2}
            mt={{ xs: 4, md: 10 }}
            className='d-none d-sm-block'>
            <CategorySidebar
              isNewApi={true}
              pathValue={pathValue}
              upateFilters={upateFilters}
              sidebarTitle='isBudFriendlyDesktops'
            />
          </Grid>
          <Grid item md={10} lg={10} p={2} mt={10}>
            <ProductCategoryGrid filters={filters} pathValue={pathValue} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ProductCategoryPage;
