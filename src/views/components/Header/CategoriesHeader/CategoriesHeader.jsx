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
        sub_categories : [
            {
                name: "Desktops",
                url: "/category/desktop",
            },
            {
                name: "Laptops",
                url: "/category/laptops",
            },
            {
                name: "Monitors",
                url: "/category/monitors",
            },
            {
                name: "Desktops",
                url: "/category/desktop",
            },
        ],
    },
    {
        id: 2,
        name: "Chromebook",
        slug: "chromebook",
        sub_categories : [
            {
                name: "Desktops",
                url: "/category/desktop",
            },
            {
                name: "Laptops",
                url: "/category/laptops",
            },
            {
                name: "Monitors",
                url: "/category/monitors",
            },
            {
                name: "Desktops",
                url: "/category/desktop",
            },
        ],
    },
    {
        id: 3,
        name: "Gaming Desktops",
        slug: "gaming_desktops",
        sub_categories : [
            {
                name: "Desktops",
                url: "/category/desktop",
            },
            {
                name: "Laptops",
                url: "/category/laptops",
            },
            {
                name: "Monitors",
                url: "/category/monitors",
            },
            {
                name: "Desktops",
                url: "/category/desktop",
            },
        ],
    },
    {
        id: 4,
        name: "Monitors",
        slug: "monitor",
        sub_categories : [
            {
                name: "Desktops",
                url: "/category/desktop",
            },
            {
                name: "Laptops",
                url: "/category/laptops",
            },
            {
                name: "Monitors",
                url: "/category/monitors",
            },
            {
                name: "Desktops",
                url: "/category/desktop",
            },
        ],
    },
    {
        id: 5,
        name: "Window 11",
        slug: "window_11",
        sub_categories : [
            {
                name: "Desktops",
                url: "/category/desktop",
            },
            {
                name: "Laptops",
                url: "/category/laptops",
            },
            {
                name: "Monitors",
                url: "/category/monitors",
            },
            {
                name: "Desktops",
                url: "/category/desktop",
            },
        ],
    },
    {
        id: 6,
        name: "SFF",
        slug: "sff",
        sub_categories : [
            {
                name: "Desktops",
                url: "/category/desktop",
            },
            {
                name: "Laptops",
                url: "/category/laptops",
            },
            {
                name: "Monitors",
                url: "/category/monitors",
            },
            {
                name: "Desktops",
                url: "/category/desktop",
            },
        ],
    },
    {
        id: 7,
        name: "Mini",
        slug: "mini",
        sub_categories : [
            {
                name: "Desktops",
                url: "/category/desktop",
            },
            {
                name: "Laptops",
                url: "/category/laptops",
            },
            {
                name: "Monitors",
                url: "/category/monitors",
            },
            {
                name: "Desktops",
                url: "/category/desktop",
            },
        ],
    },
];

  return (
    <div 
      className='header-wrappar' >

        {categories.map((category, index) => (

          <Link key={category.id} to={`/category/${category.slug}`} style={{textDecoration: "none"}}>
            <div className='item' > {category.name} </div>
          </Link>
        //   <Grid item key={index} style={{textDecoration: "none"}}>
        //           <div className='item' >

        //                 <HtmlTooltip title={
        //                     <>
        //                     {category?.sub_categories?.map((subCategory, subIndex) => (
        //                         <Link key={subIndex}  to={subCategory.url} className='sub-category-item' ><Typography variant='body2' p={.5} fontSize={"small"}>{subCategory.name}</Typography></Link>
        //                     ))}
        //                 </>
        //             }>
        //                  {category.name}<ExpandMoreIcon fontSize='small' /> 
        //                 </HtmlTooltip>

        //             </div>  
        //         </Grid>

        ))
        }
        
    </div>
  )
}

export default CategoriesHeader