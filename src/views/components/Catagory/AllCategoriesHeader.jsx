import React from 'react'
import { Grid, Typography } from '@mui/material'
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

const AllCategoriesHeader = () => {

    const HtmlTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} arrow classes={{ popper: className }} />
      ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
          backgroundColor: 'white',
          color: 'rgba(0, 0, 0, 0.87)',
          maxWidth: 220,
          fontSize: theme.typography.pxToRem(12),
          border: '1px solid #dadde9',

          '& .MuiTooltip-arrow': {
            color: 'lightgray',
          }
        },
      }));

    const categories = [
        {
            id: 1,
            name: "Business Computers",
            slug: "business_computers",
        },
        {
            id: 2,
            name: "Chromebook",
            slug: "chromebook",
        },
        {
            id: 3,
            name: "Gaming Desktops",
            slug: "gaming_desktops",
        },
        {
            id: 4,
            name: "Monitors",
            slug: "monitor",
        },
        {
            id: 5,
            name: "Window 11",
            slug: "window_11",
        },
        {
            id: 6,
            name: "SFF",
            slug: "sff",
        },
        {
            id: 7,
            name: "Mini",
            slug: "mini",
        },
    ];

  return (
    <div>
        <Typography variant='h4' fontWeight={"bolder"}>Categories</Typography>
        <Grid container mt={1} >
            {categories?.map((category, index) => (

                <Grid item key={category.id} style={{textDecoration: "none"}}>
                    <Typography variant='body1' fontSize={"small"} color={"#007185"} >
                    {index == 0 ? "" :<span style={{margin: "0px 5px", color: "black"}}>|</span> }
                    <HtmlTooltip title={
                        <>
                            <Link to={"/category/desktop"} style={{textDecoration: "none", color: "black"}}><Typography variant='body2' p={.5} fontSize={"small"}>desktop</Typography></Link>
                            <Link to={"/category/monitors"} style={{textDecoration: "none", color: "black"}}><Typography variant='body2' p={.5} fontSize={"small"}>monitors</Typography></Link>
                            <Link to={"/category/tower"} style={{textDecoration: "none", color: "black"}}><Typography variant='body2' p={.5} fontSize={"small"}>tower</Typography></Link>
                            <Link to={"/category/laptops"} style={{textDecoration: "none", color: "black"}}><Typography variant='body2' p={.5} fontSize={"small"}>laptops</Typography></Link>
                        </>
                    }>
                        <Link to={""} key={category.id} style={{textDecoration: "none", color: "#007185"}}>{category.name} <ExpandMoreIcon fontSize='small' /></Link>
                    </HtmlTooltip>   
                    </Typography>
                </Grid>
            
            ))}
        </Grid>
    </div>
  )
}

export default AllCategoriesHeader