import React, {useState} from 'react'
import { Grid, Typography, Box, IconButton } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import StarRatings from 'react-star-ratings';
import FilterBar from "../../FilterBar/FilterBar"
import { computerCategories } from '../DummyApi';
import FilterBarlayout2 from './FilterbarLayout2';

const CategorySidebar = () => {

  const [isSubCategoryVisible, setIsSubCategoryVisible] = useState(computerCategories.map(() => false));
  const [visibleCategory, setVisibleCategory] = useState(2);

  const showMore = () => {
    setVisibleCategory((prevVisibleCategory) => prevVisibleCategory + 2);
  };
  const showLess = () => {
    // setVisibleCategory((prevVisibleCategory) => prevVisibleCategory - computerCategories?.length);
    setVisibleCategory(2)
  };

  const toggleSubCategoryVisibility = (index) => {
    // Toggle the visibility state of the specific Box at the given index
    setIsSubCategoryVisible((prevVisibility) => {
      const newVisibility = [...prevVisibility];
      newVisibility[index] = !newVisibility[index];
      return newVisibility;
    });
  };

    const toggleFilter = () => {
        setIsOpen((state) => !state);
    };

  return (
    <Grid container height={"95%"} sx={{borderRight: "0.5px solid gray"}} >

        <Grid item ml={2}>
            <Typography variant='body1' fontWeight={"bolder"}>Catagories</Typography>    
          {computerCategories?.slice(0, visibleCategory)?.map((category, index) => (
            <>
            <Typography variant='body1'>{category.category}<IconButton size='small' onClick={() => toggleSubCategoryVisibility(index)}><KeyboardArrowDownIcon /></IconButton></Typography>
            {isSubCategoryVisible[index] && <Box ml={3}>
                <Typography variant='body1'>Basic Monitors</Typography>
                <Typography variant='body1'>4K visual monitors</Typography>
            </Box>}
            </>
            ))}
            {(visibleCategory + 1) > computerCategories.length ? (
              <Typography variant='body1' color={"green"}><IconButton size='small' onClick={showLess}><KeyboardArrowUpIcon  /></IconButton> See less categories</Typography>
            ) : ( 
                <Typography variant='body1' color={"green"}><IconButton size='small' onClick={showMore}><KeyboardArrowDownIcon  /></IconButton> See More categories</Typography>
            )
            }
            </Grid>
            
            <Grid item ml={2}>
            <Typography variant='body1' fontWeight={"bolder"}>Customer Review</Typography>
            <Box ml={3}>
            <StarRatings starDimension='20px' starSpacing='0' rating={3} starRatedColor='orange' />
            </Box>
        </Grid>

        <Grid item my={3}>
        <Typography variant='body1' fontWeight={"bolder"} ml={2}>Filters</Typography>
        <div className='sticky-filter-bar' style={{position: "static", height: "100vh", border: "none"}}> 
          {/* <FilterBar /> */}
          <FilterBarlayout2 />
        </div>
        </Grid>

    </Grid>
  )
}

export default CategorySidebar