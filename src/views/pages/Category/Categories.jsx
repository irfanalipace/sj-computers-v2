import React from 'react'
import CategoriesHeader from '../../components/Header/CategoriesHeader/CategoriesHeader'
import CategoryVideo from '../../components/Catagory/CategoryVideo'
import { Grid } from '@mui/material'
import CategorySlider from '../../components/Catagory/CategorySlider/CategorySlider'

const Categories = () => {
  return (
    <Grid container>

      {/* Header */}
      <Grid item xs={12}>
        <CategoriesHeader />
      </Grid>

      {/* CategoryVideo */}
      <Grid item md={3.5} p={2}>
        <CategoryVideo />
      </Grid>

      {/* CategorySlider */}
      <Grid item md={8.5} py={2}>
        <CategorySlider />
      </Grid>

      

    </Grid>
  )
}

export default Categories