import React, {useState} from 'react'
import { Grid, Typography } from '@mui/material'
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { HtmlTooltip } from '../../HtmlTooltip/HtmlTooltip';
import "./AllCategoriesHeader.css"

const AllCategoriesHeader = () => {

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

    const [isHovered, setIsHovered] = useState(false);
    const [hoverIndex, setHoverIndex] = useState(null)

    const handleMouseEnter = (index) => {
        setIsHovered(true);
        setHoverIndex(index)
      };
    
      const handleMouseLeave = () => {
        setIsHovered(false);
      };
  return (
    <div style={{marginLeft: "16px"}}>
        <Typography variant='h4' fontWeight={"bolder"}>Categories</Typography>
        <div className='category-header-wrapper' >
            {categories?.map((category, index) => (

                <div className='category-item' key={category.id} style={{textDecoration: "none"}}>
                    <Typography variant='body1' fontSize={"small"} color={"#007185"} >
                    {index == 0 ? "" :<span style={{margin: "0px 5px", color: "black"}}>|</span> }
                    <HtmlTooltip title={
                        <>
                            <Link to={"/category/desktop"} className='sub-category-item' ><Typography variant='body2' p={.5} fontSize={"small"}>desktop</Typography></Link>
                            <Link to={"/category/monitors"} className='sub-category-item' ><Typography variant='body2' p={.5} fontSize={"small"}>monitors</Typography></Link>
                            <Link to={"/category/tower"} className='sub-category-item' ><Typography variant='body2' p={.5} fontSize={"small"}>tower</Typography></Link>
                            <Link to={"/category/laptops"} className='sub-category-item' ><Typography variant='body2' p={.5} fontSize={"small"}>laptops</Typography></Link>
                        </>
                    }>
                        <Link to={""} key={category.id} 
                            // onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave} 
                            className='topbar-item'>{category.name} {isHovered && hoverIndex == index ? <ExpandLessIcon fontSize='small' /> : 
                        <ExpandMoreIcon fontSize='small' />}
                        </Link>
                    </HtmlTooltip>   
                    </Typography>
                </div >
            
            ))}
        </div>
    </div>
  )
}

export default AllCategoriesHeader