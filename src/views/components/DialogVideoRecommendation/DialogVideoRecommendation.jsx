import { Grid, Typography } from '@mui/material'
import React from 'react'
import DialogVideoSlider from '../Sliders/DialogVideoSlider'

function DialogVideoRecommendation({products}) {
  return (
    <Grid container>
        <Grid item xs={12}> 
            <Typography variant='body1' fontWeight={"bolder"} px={2}>
            Recommendation
            </Typography>
        </Grid>
        <Grid item xs={12}>
            <DialogVideoSlider products={products} />
        </Grid>
    </Grid>
  )
}

export default DialogVideoRecommendation