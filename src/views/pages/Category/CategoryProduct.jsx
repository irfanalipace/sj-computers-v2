import React from 'react'
import CategoriesHeader from '../../components/Header/CategoriesHeader/CategoriesHeader'
import CategoryVideo from '../../components/Catagory/CategoryVideo'
import { Grid, Typography } from '@mui/material'
import CategorySlider from '../../components/Catagory/CategorySlider/CategorySlider'
import CategorySidebar from '../../components/Catagory/CategorySidebar/CategorySidebar'
import ProductsByCategory from './ProductsByCategory'
import "./Category.css"
import AllCategoriesHeader from '../../components/Catagory/AllCategoriesHeader/AllCategoriesHeader'
import ShopByCategory from '../../components/Catagory/ShopByCategory'
import ShopByBrand from '../../components/Catagory/ShopByBrand'
import Recommendation from "../../components/Recommendation/Recommendation"

import "./Category.css"

const CategoryProducts = () => {
  return (
    <Grid container>

      {/* Header */}
      <Grid item xs={12}>
        <CategoriesHeader />
      </Grid>

      {/* CategoryVideo */}
      <Grid item md={4} p={2}>
        <CategoryVideo />
      </Grid>

      {/* CategorySlider */}
      <Grid item md={8} py={2}>
        <CategorySlider />
      </Grid>

      <Grid item md={2} mt={2} >
        <CategorySidebar />
      </Grid>
      
      {/* <Grid item md={10}>
          <ProductsByCategory inCategoriesPage={true} />
      </Grid> */}

      <Grid item md={10} py={2} pl={2}>
        <AllCategoriesHeader />
        <Typography variant='h3' my={2} sx={{background: "linear-gradient(88.41deg, rgba(59, 108, 155, 0.85) 0.37%, #789FC5 98.64%)"}} p={4} fontWeight={"bolder"} textAlign={"center"}>All Categories</Typography>
        <ShopByCategory />
        <ShopByBrand />
      </Grid>

      <Grid item md={12} px={10} py={2} borderTop={"1px solid gray"}>
          <Recommendation />
      </Grid>

    </Grid>
  )
}

export default CategoryProducts