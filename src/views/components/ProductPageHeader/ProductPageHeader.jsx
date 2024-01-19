import { Grid, Typography } from '@mui/material'
import React from 'react'

const ProductPageHeader = () => {
    const itemStyle = {
        p: 2,
        minWidth: "11%",
        maxWidth: "14.2%",
        color: "#333333",
        textAlign: "center",
      }
      const itemTypographystyle = {
        // "@media (max-width: 800px)": {fontSize: "10px"},
      ":hover": {
          // backgroundColor: "whitesmoke",
          color: "#E87E24",
          cursor: "pointer",
          textDecoration: "underLine"
      }

    }    

  return (
    <Grid container columnGap={"auto"} borderBottom={"1px solid lightgray"} px={4} sx={{"@media (max-width: 800px)": {px: 0, display: "flex", overflow: "scroll" }}} >
        <Grid item sx={itemStyle}><Typography sx={itemTypographystyle} variant='body2'>Computers</Typography></Grid>
        <Grid item sx={itemStyle}><Typography sx={itemTypographystyle} variant='body2'>Laptops</Typography></Grid>
        <Grid item sx={itemStyle}><Typography sx={itemTypographystyle} variant='body2'>Desktops</Typography></Grid>
        <Grid item sx={itemStyle}><Typography sx={itemTypographystyle} variant='body2'>Monitors</Typography></Grid>
        <Grid item sx={itemStyle}><Typography sx={itemTypographystyle} variant='body2'>Computers Accessories</Typography></Grid>
        <Grid item sx={itemStyle}><Typography sx={itemTypographystyle} variant='body2'>PC Components</Typography></Grid>
        <Grid item sx={itemStyle}><Typography sx={itemTypographystyle} variant='body2'>PC Gaming</Typography></Grid>
    </Grid>
  )
}

export default ProductPageHeader