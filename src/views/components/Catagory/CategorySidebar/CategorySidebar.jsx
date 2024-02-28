import React, { useState } from 'react';
import { Grid, Typography, Box, IconButton } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import StarRatings from 'react-star-ratings';
import FilterBar from '../../FilterBar/FilterBar';
import { computerCategories, categoriesWithSubCategories } from '../DummyApi';
import FilterBarlayout2 from './FilterbarLayout2';
import { Link } from 'react-router-dom';

import './CategorySidebar.css';

const CategorySidebar = ({ inDrawer, toggleDrawer }) => {
  const [isSubCategoryVisible, setIsSubCategoryVisible] = useState(
    categoriesWithSubCategories.map(() => false),
  );
  const [visibleCategory, setVisibleCategory] = useState(2);

  const showMore = () => {
    setVisibleCategory(prevVisibleCategory => prevVisibleCategory + 2);
  };
  const showLess = () => {
    // setVisibleCategory((prevVisibleCategory) => prevVisibleCategory - computerCategories?.length);
    setVisibleCategory(2);
  };

  const toggleSubCategoryVisibility = index => {
    // Toggle the visibility state of the specific Box at the given index
    setIsSubCategoryVisible(prevVisibility => {
      // const newVisibility = [];
      const newVisibility = [...prevVisibility];
      newVisibility[index] = !newVisibility[index];
      return newVisibility;
    });
  };

  const [DataInDrawer, setDataInDrawer] = useState(inDrawer ? {} : true);
  const DataInDrawerToggler = categoryNumber => {
    // setDataInDrawer(!DataInDrawer)
    setDataInDrawer({
      // ...DataInDrawer,
      [categoryNumber]: !DataInDrawer[categoryNumber],
    });
  };

  const toggleFilter = () => {
    setIsOpen(state => !state);
  };

  return (
    <Grid
      container
      width={'100%'}
      sx={{
        overflowX: 'hidden',
        overflowY: 'none',
        borderRight: inDrawer == true ? '' : '0.5px solid #DDDDDD',
      }}>
      <Grid
        item
        xs={12}
        ml={inDrawer ? 0 : 2}
        borderBottom={inDrawer ? '1px solid #DDDDDD' : ''}>
        <Typography
          onClick={() => DataInDrawerToggler(1)}
          p={inDrawer ? 2 : 0}
          className={`${inDrawer ? 'alignment-container' : ''}`}
          variant='body2'
          fontWeight={'bolder'}
          ml>
          Categories
          {inDrawer ? (
            <span className={`${inDrawer ? 'align-to-end' : ''}`}>
              <IconButton onClick={() => DataInDrawerToggler(1)}>
                {' '}
                {DataInDrawer[1] ? (
                  <KeyboardArrowUpIcon sx={{ color: 'orange' }} />
                ) : (
                  <KeyboardArrowDownIcon />
                )}{' '}
              </IconButton>
            </span>
          ) : (
            ''
          )}
        </Typography>
        {(DataInDrawer[1] || !inDrawer) && (
          <>
            {categoriesWithSubCategories
              ?.slice(0, visibleCategory)
              ?.map((category, index) => (
                <>
                  <Typography
                    ml={inDrawer ? 4 : 2}
                    variant='body2'
                    sx={{ cursor: 'pointer' }}
                    onClick={() => toggleSubCategoryVisibility(index)}>
                    {category.category}
                    <IconButton size='small'>
                      {isSubCategoryVisible[index] ? (
                        <KeyboardArrowUpIcon sx={{ color: '#e87e24' }} />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </Typography>
                  {isSubCategoryVisible[index] && (
                    <Box ml={inDrawer ? 6 : 3}>
                      {category?.sub_categories.map((subCategory, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subCategory.url}
                          className='sub-category-link'>
                          <Typography variant='body2' py={0.3}>
                            {subCategory.name}
                          </Typography>
                        </Link>
                      ))}
                    </Box>
                  )}
                </>
              ))}
            {visibleCategory + 1 > categoriesWithSubCategories?.length ? (
              <Typography
                variant='body1'
                sx={{ cursor: 'pointer' }}
                onClick={showLess}
                color={'#e87e24'}>
                <IconButton size='small' onClick={showLess}>
                  <KeyboardArrowUpIcon />
                </IconButton>{' '}
                See Less Categories
              </Typography>
            ) : (
              <Typography
                variant='body1'
                sx={{ cursor: 'pointer' }}
                onClick={showMore}
                color={'#52AC66'}>
                <IconButton size='small'>
                  <KeyboardArrowDownIcon />
                </IconButton>{' '}
                See More Categories
              </Typography>
            )}
          </>
        )}
      </Grid>

      <Grid
        item
        xs={12}
        ml={inDrawer ? 0 : 2}
        my={1}
        borderBottom={inDrawer ? '1px solid #DDDDDD' : ''}>
        <Typography
          onClick={() => DataInDrawerToggler(2)}
          p={inDrawer ? 2 : 0}
          variant='body2'
          className={`${inDrawer ? 'alignment-container' : ''}`}
          fontWeight={'bolder'}>
          Customer Reviews{' '}
          {inDrawer ? (
            <span className={`${inDrawer ? 'align-to-end' : ''}`}>
              <IconButton>
                {DataInDrawer[2] ? (
                  <KeyboardArrowUpIcon sx={{ color: 'orange' }} />
                ) : (
                  <KeyboardArrowDownIcon />
                )}{' '}
              </IconButton>
            </span>
          ) : (
            ''
          )}
        </Typography>
        {(DataInDrawer[2] || !inDrawer) && (
          <Box ml={inDrawer ? 4 : 2} py={1}>
            <Typography
              mb={0.5}
              variant='body2'
              fontSize={'small'}
              className='review-lines'>
              <StarRatings
                starDimension='18px'
                starSpacing='0'
                rating={4}
                starRatedColor='orange'
              />
              & Up
            </Typography>
            <Typography
              mb={0.5}
              variant='body2'
              fontSize={'small'}
              className='review-lines'>
              <StarRatings
                starDimension='18px'
                starSpacing='0'
                rating={3}
                starRatedColor='orange'
              />
              & Up
            </Typography>
            <Typography
              mb={0.5}
              variant='body2'
              fontSize={'small'}
              className='review-lines'>
              <StarRatings
                starDimension='18px'
                starSpacing='0'
                rating={2}
                starRatedColor='orange'
              />
              & Up
            </Typography>
            <Typography
              mb={0.5}
              variant='body2'
              fontSize={'small'}
              className='review-lines'>
              <StarRatings
                starDimension='18px'
                starSpacing='0'
                rating={1}
                starRatedColor='orange'
              />
              & Up
            </Typography>
          </Box>
        )}
      </Grid>

      <Grid item my={0}>
        {/* <Typography variant='body1' fontWeight={"bolder"} ml={2}>Filters</Typography> */}
        <div
          className='layout2-filter-bar'
          style={{
            position: 'static',
            height: '',
            overflowY: 'hidden',
            border: 'none',
          }}>
          {/* <FilterBar /> */}
          <FilterBarlayout2
            inDrawer={inDrawer}
            DataInDrawer={DataInDrawer}
            DataInDrawerToggler={DataInDrawerToggler}
            toggleDrawer={toggleDrawer}
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default CategorySidebar;
