import { Grid, Typography } from '@mui/material'
import React from 'react'

const ProductPageHeader = () => {
    const itemStyle = {
        p: 2,
        minWidth: "11%",
        color: "#333333",
        textAlign: "center",
        ":hover": {
            backgroundColor: "whitesmoke",
            cursor: "pointer",
        }
    }

  return (
    <Grid container columnGap={1} borderBottom={"1px solid lightgray"} px={4} >
        <Grid item sx={itemStyle}><Typography variant='body2'>Computers</Typography></Grid>
        <Grid item sx={itemStyle}><Typography variant='body2'>Laptops</Typography></Grid>
        <Grid item sx={itemStyle}><Typography variant='body2'>Desktops</Typography></Grid>
        <Grid item sx={itemStyle}><Typography variant='body2'>Monitors</Typography></Grid>
        <Grid item sx={itemStyle}><Typography variant='body2'>Computers Accessories</Typography></Grid>
        <Grid item sx={itemStyle}><Typography variant='body2'>PC Components</Typography></Grid>
        <Grid item sx={itemStyle}><Typography variant='body2'>PC Gaming</Typography></Grid>
    </Grid>
  )
}

export default ProductPageHeader