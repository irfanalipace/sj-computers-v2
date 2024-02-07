import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { Grid, Typography} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "./CategoriesHeader.css"
import { HtmlTooltip } from '../../HtmlTooltip/HtmlTooltip';

const CategoriesHeader = () => {

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
    <div 
      className='header-wrappar' >

        {categories.map((category, index) => (

          // <Link key={category.id} to={`/category/${category.slug}`} style={{textDecoration: "none"}}>
          //   <div className='item' > {category.name} </div>
          // </Link>
          <Grid item key={index} style={{textDecoration: "none"}}>
                  <div className='item' >
                    <HtmlTooltip title={
                        <>
                            <Link to={"/category/desktop"} className='sub-category-item' ><Typography variant='body2' p={.5} fontSize={"small"}>desktop</Typography></Link>
                            <Link to={"/category/monitors"} className='sub-category-item' ><Typography variant='body2' p={.5} fontSize={"small"}>monitors</Typography></Link>
                            <Link to={"/category/tower"} className='sub-category-item' ><Typography variant='body2' p={.5} fontSize={"small"}>tower</Typography></Link>
                            <Link to={"/category/laptops"} className='sub-category-item' ><Typography variant='body2' p={.5} fontSize={"small"}>laptops</Typography></Link>
                        </>
                    }>
                         {category.name}<ExpandMoreIcon fontSize='small' /> 
                    </HtmlTooltip>
                    </div>  
                </Grid>

        ))
        }
        
    </div>
  )
}

export default CategoriesHeader