import TopBanner from '@components/TopBanner';
import CategoriesHeader from '@components/Header/CategoriesHeader/CategoriesHeader';
import CategorySidebar from '@components/Catagory/CategorySidebar/CategorySidebar';
import { Box, Grid } from '@mui/material';
import ProductCategoryGrid from '@components/ProductCategorGrid';

const ProductCategoryPage = ({ color, heading, desc, pathValue }) => {
  // debugger;
  return (
    <>
      <CategoriesHeader />
      <TopBanner color={color} heading={heading} desc={desc} />
      <Box>
        <Grid container>
          <Grid item md={2} lg={2} mt={10}>
            <CategorySidebar
              isNewApi={true}
              sidebarTitle='isBudFriendlyDesktops'
            />
          </Grid>
          <Grid item md={10} lg={10} p={2} mt={10}>
            <ProductCategoryGrid pathValue={pathValue} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ProductCategoryPage;
