import React from 'react'
import { Grid, Typography } from '@mui/material'

const ProductDescription = ({ product }) => {

  return (
        <Grid container borderTop={"1px solid lightgray"} rowSpacing={1} p={1} pt={3}>
            <Grid item xs={12}><Typography variant='body1' fontWeight={"bold"}>Product Description</Typography></Grid>
            <Grid item xs={12}><Typography variant='body1' ml={3}>{product?.name}</Typography></Grid>
        </Grid>
  )
}

export default ProductDescription