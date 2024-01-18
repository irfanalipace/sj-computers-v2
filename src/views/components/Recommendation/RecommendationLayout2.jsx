import { Grid, Typography } from '@mui/material'
import React from 'react'
import VideoDialogProductSlider from '../Sliders/VideoDialogProductSlider'

function RecommendationLayout2({products}) {
  return (
    <Grid container>
        <Grid item xs={12}> 
            <Typography variant='body1' fontWeight={"bolder"} px={2}>
            Recommendation
            </Typography>
        </Grid>
        <Grid item xs={12}>
            <VideoDialogProductSlider products={products} />
        </Grid>
    </Grid>
  )
}

export default RecommendationLayout2