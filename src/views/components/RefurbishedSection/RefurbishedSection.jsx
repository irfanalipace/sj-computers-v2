import React from 'react'
import { Grid, Typography } from '@mui/material'
import refurbishedIcon1 from "@images/SJ-refurbished-icon1.svg"
import refurbishedIcon2 from "@images/SJ-refurbished-icon2.svg"
import refurbishedIcon3 from "@images/SJ-refurbished-icon3.svg"
import refurbishedIcon4 from "@images/SJ-refurbished-icon4.svg"


function RefurbishedSection() {

    const innerBox = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    }

  return (
    <Grid container sx={{borderTop: "1px solid lightgray"}} textAlign={"center"} rowGap={3} py={3}>
        
        <Grid item lg={12} md={12} sm={12} xs={12} textAlign={"center"}><Typography variant='h5' fontWeight={"bolder"}> What is SJ Computers Refurbished? </Typography></Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}><Typography variant='body2'>SJ Computers Refurbished is your destination for your refurbished desktops, laptops and accessories. All our products are backed by SJ Computers Guarantee. </Typography></Grid>
                
            <Grid item lg={3} md={3} sm={6} xs={12} px={2} sx={innerBox} >
                <img style={{marginBottom: "10px"}} width={"60px"} src={refurbishedIcon1} alt="analysis.pic" />
                <Typography variant='p' fontWeight={"bolder"} mb={2}>Quality you can afford </Typography> 
                <Typography variant='body2'> All SJ Computers Products extend the lifetime of the product and reduce e-waste to a bare minimum. </Typography> 
            </Grid>
                
            <Grid item lg={3} md={3} sm={6} xs={12} px={2} sx={innerBox} >
                <img style={{marginBottom: "10px"}} width={"60px"} src={refurbishedIcon2} alt="analysis.pic" />
                <Typography variant='p' fontWeight={"bolder"} mb={2}>Product you can trust </Typography> 
                <Typography variant='body2'> Our Customer Support is always on hand to provide you with an objective resolustio to all your claims and queries. </Typography> 
            </Grid>

            <Grid item lg={3} md={3} sm={6} xs={12} px={2} sx={innerBox} >
                <img style={{marginBottom: "10px"}} width={"60px"} src={refurbishedIcon3} alt="analysis.pic" />
                <Typography variant='p' fontWeight={"bolder"} mb={2}>Purchase with impact </Typography> 
                <Typography variant='body2'>All Products that we have up fo sale are professionally tasted and inspected. Our products are fully functional and work as they are intended to do so. </Typography> 
            </Grid>
                
            <Grid item lg={3} md={3} sm={6} xs={12} px={2} sx={innerBox} >
                <img style={{marginBottom: "10px"}} width={"60px"} src={refurbishedIcon4} alt="analysis.pic" />
                <Typography variant='p' fontWeight={"bolder"} mb={2}>Trusted coverage </Typography> 
                <Typography variant='body2'> We are the best refurbishes in the market today. Our products tackle your tasks with the features you are paying top dollar for. </Typography> 
            </Grid>

        <Grid item lg={12} container rowGap={1}>        
            <Grid item lg={12} textAlign={"start"}><Typography variant='p' fontWeight={"bold"}>What Should I expect to recieve with my Amazon Renewed purchase? </Typography></Grid>
            <Grid item lg={12} textAlign={"start"}><Typography variant='body1' >SJ Computers Refurbished is your destination for refurbished desktops, laptops, and accessories. All our products are backed by SJ Computers Guarantee. </Typography></Grid>
        </Grid>

        <Grid item lg={12} container rowGap={1}>
            <Grid item lg={12} textAlign={"start"}><Typography variant='p' fontWeight={"bold"}>In what condition can I expect my Amazon Renewed product to be? </Typography></Grid>
            <Grid item lg={12} textAlign={"start"}><Typography variant='body1' >SJ Computers Refurbished is your destination for refurbished desktops, laptops, and accessories. All our products are backed by SJ Computers Guarantee. </Typography></Grid>
        </Grid>

    </Grid>
  )
}

export default RefurbishedSection