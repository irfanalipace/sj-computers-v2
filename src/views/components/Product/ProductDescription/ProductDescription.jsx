import React from 'react'
import { Grid, Typography } from '@mui/material'

const ProductDescription = () => {

  return (
        <Grid container borderTop={"1px solid lightgray"} rowSpacing={1} py={1} pt={4}>
            <Grid item lg={12}><Typography variant='body1' fontWeight={"bold"}>Product Description</Typography></Grid>
            <Grid item lg={12}><Typography variant='body1' ml={3}>LG 24ML600M-B 24" Full HD IPS con 3 lados vitualmente sin bordes monitorcon doble HDMI - Negro</Typography></Grid>
        </Grid>
  )
}

export default ProductDescription