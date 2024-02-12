import React from 'react'
import { Grid } from '@mui/material'
import CategoryVideo from './CategoryVideo'
import CategorySlider from './CategorySlider/CategorySlider'

const CategoryVideoAndSlider = () => {
  return (
    <Grid container>

      {/* CategoryVideo */}
      <Grid item xs={12} md={4} p={2}>
        <CategoryVideo />
      </Grid>

      {/* CategorySlider */}
      <Grid item xs={12} md={8} py={2}>
        <CategorySlider />
      </Grid>

    </Grid>
  )
}

export default CategoryVideoAndSlider