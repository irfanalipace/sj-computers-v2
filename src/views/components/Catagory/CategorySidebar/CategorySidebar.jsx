import React, { useEffect, useState } from 'react';
import { Grid, Typography, Box, IconButton, Stack } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import FilterBar from '../../FilterBar/FilterBar';
import { computerCategories, categoriesWithSubCategories } from '../DummyApi';
import FilterBarlayout2 from './FilterbarLayout2';
import { Link } from 'react-router-dom';

import './CategorySidebar.css';
import ReviewFilter from './ReviewFilter';
import { SET_FILTERS_ARRAY } from '../../../../core/store/products/productsSlice';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

const CategorySidebar = ({
  inDrawer,
  toggleDrawer,
  sidebarTitle,
  budgetedDesktops,
  isNewApi,
  pathValue,
  upateFilters,
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const brand = queryParams.get('brand');
  const processor = queryParams.get('processor');
  const gpu = queryParams.get('gpu');
  const [reviewOption, setReviewOptions] = useState([]);

  const [filtersInArray, setFiltersInArray] = useState([
    {
      key: 'processor',
      value: [],
    },
    {
      key: 'ram_memory',
      value: {
        unit: [],
        min: 0,
        max: 0,
      },
    },
    {
      key: 'review',
      value: {
        min: 0,
        max: 0,
      },
    },
    {
      key: 'price',
      value: {
        min: 0,
        max: 0,
      },
    },
    {
      key: 'brand',
      value: [],
    },
    {
      key: 'operating_system',
      value: [],
    },

    {
      key: 'gpu',
      value: [],
    },
    {
      key: 'hard_disk',
      value: {
        unit: [],
        min: 0,
        max: 0,
      },
    },
  ]);
  const [reveiwFilterArray, setReveiwFilterArray] = useState([]);
  const [isSubCategoryVisible, setIsSubCategoryVisible] = useState(
    categoriesWithSubCategories.map(() => false),
  );
  const [visibleCategory, setVisibleCategory] = useState(2);

  const applyFilterByQueryParmas = filterName => {
    const updatedFilters = [...filtersInArray];
    const brandFilter = updatedFilters.find(
      filter => filter.key === filterName,
    );

    if (brand) {
      if (brandFilter) {
        brandFilter.value.push(brand);
      }
    }
    if (processor) {
      if (brandFilter) {
        brandFilter.value.push(processor);
      }
    }
    if (gpu) {
      if (brandFilter) {
        brandFilter.value.push(gpu);
      }
    }
    setFiltersInArray(updatedFilters);
  };

  useEffect(() => {
    if (brand) applyFilterByQueryParmas('brand');
    if (processor) applyFilterByQueryParmas('processor');
    if (gpu) applyFilterByQueryParmas('gpu');
  }, []);

  const showMore = () => {
    setVisibleCategory(prevVisibleCategory => prevVisibleCategory + 2);
  };
  const showLess = () => {
    // setVisibleCategory((prevVisibleCategory) => prevVisibleCategory - computerCategories?.length);
    setVisibleCategory(2);
  };
  const handleClearFilter = categ => {
    const keyIndex = findIndexByKey([filtersInArray], categ);
    const filtersArrayCopy = JSON.parse(JSON.stringify(filtersInArray));

    const minMaxArray = ['price', 'review', 'ram_memory', 'hard_disk'];
    const arrayFilter = ['processor', 'brand', 'operating_system', 'gpu'];

    if (minMaxArray.includes(categ)) {
      filtersArrayCopy[keyIndex].value.min = 0;
      filtersArrayCopy[keyIndex].value.max = 0;
      filtersArrayCopy[keyIndex].value.unit = [];

      setFiltersInArray(filtersArrayCopy);
      return;
    }

    if (arrayFilter.includes(categ)) {
      filtersArrayCopy[keyIndex].value = [];
      setFiltersInArray(filtersArrayCopy);
      return;
    }
  };

  function findIndexByKey(arr, keyToFind) {
    for (let i = 0; i < 8; i++) {
      if (arr[0][i].key === keyToFind) {
        return i;
      }
    }
    return -1;
  }
  const [hardDiskFilter, setHardDiskFilter] = useState([]);
  const [ramFilter, setRamFilter] = useState([]);

  const handleFilterSelect = (event, category, option) => {
    const arraysFilter = ['processor', 'brand', 'operating_system', 'gpu'];
    const keyIndex = findIndexByKey([filtersInArray], category);
    const filtersArrayCopy = JSON.parse(JSON.stringify(filtersInArray));

    const unitFilterArray = ['hard_disk', 'ram_memory'];

    if (unitFilterArray.includes(category)) {
      const arrayOjbectIndex = arr => {
        const findIndex = arr.findIndex(item => item.value === option.value);
        return findIndex;
      };
      const arrayToFilter = () => {
        if (category === 'hard_disk') {
          return hardDiskFilter;
        }
        if (category === 'ram_memory') {
          return ramFilter;
        }
      };
      const findIndex = arrayOjbectIndex(arrayToFilter());

      if (event.target.checked === false) {
        if (findIndex !== -1) {
          const arrayToFilterCopy = [...arrayToFilter()];
          arrayToFilterCopy.splice(findIndex, 1);
          if (category === 'hard_disk') {
            setHardDiskFilter(arrayToFilterCopy);
            return;
          }
          if (category === 'ram_memory') {
            setRamFilter(arrayToFilterCopy);
            return;
          }
        }
      }
      if (category === 'hard_disk') {
        console.log(option);

        setHardDiskFilter([...hardDiskFilter, option]);
        return;
      }
      if (category === 'ram_memory') {
        setRamFilter([...ramFilter, option]);
        return;
      }
    }

    // if (toggleDrawer) {
    //   toggleDrawer();
    // }
    if (arraysFilter.includes(category)) {
      if (event.target.checked === false) {
        const findIndex = filtersArrayCopy[keyIndex].value.findIndex(
          item => item === option,
        );

        if (findIndex !== -1) {
          filtersArrayCopy[keyIndex].value.splice(findIndex, 1);
          setFiltersInArray(filtersArrayCopy);
          console.log(filtersArrayCopy);
          return;
        }
      }
      // const dd = filtersArrayCopy[keyIndex];

      filtersArrayCopy[keyIndex].value.push(option);
      console.log(filtersArrayCopy);
      setFiltersInArray(filtersArrayCopy);

      return;
    }
  };

  const viewItemDataLayer = (products, pathValue) => {
    console.print(
      'view_item_list data layer',
      pathValue,
      makeDataLayerItemObject(products),
    );
    if (!window.dataLayer) {
      window.dataLayer = window.dataLayer || [];
    }
    window.dataLayer.push({
      event: 'view_item_list',
      item_list_name: pathValue,
      items: makeDataLayerItemObject(products),
    });
  };

  useEffect(() => {
    dispatch(SET_FILTERS_ARRAY(filtersInArray));
    if (typeof myProp === 'function' || isNewApi) {
      upateFilters(filtersInArray);
    }
  }, [filtersInArray]);

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
  const budgetFilter = 'isBudFriendlyDesktops';

  const handleReviewFilter = (e, category, option) => {
    const finIndex = reveiwFilterArray.findIndex(item => item.id === option.id);
    if (finIndex !== -1) {
      const reveiwFilterArrayCopy = [...reveiwFilterArray];
      reveiwFilterArrayCopy.splice(finIndex, 1);
      setReveiwFilterArray([...reveiwFilterArrayCopy]);
      return;
    }
    setReveiwFilterArray([...reveiwFilterArray, option]);
  };

  const clearReview = () => {
    setReveiwFilterArray([]);
  };

  const handleFilterChange = item => {
    const keyIndex = findIndexByKey([filtersInArray], 'price');
    const filtersArrayCopy = JSON.parse(JSON.stringify(filtersInArray));
    filtersArrayCopy[keyIndex].value.min = item.priceMin;
    filtersArrayCopy[keyIndex].value.max = item.priceMax;
    setFiltersInArray(filtersArrayCopy);
  };

  useEffect(() => {
    let minValue = Infinity;
    let maxValue = -Infinity;
    if (reveiwFilterArray.length) {
      for (let obj of reveiwFilterArray) {
        if (obj.value < minValue) {
          minValue = obj.value;
        }
        if (obj.value > maxValue) {
          maxValue = obj.value;
        }
      }
    }
    console.log(reveiwFilterArray);
    console.log('minValue: ' + minValue + ' maxValue: ' + maxValue);
    const keyIndex = findIndexByKey([filtersInArray], 'review');
    const filtersArrayCopy = JSON.parse(JSON.stringify(filtersInArray));
    filtersArrayCopy[keyIndex].value.min = minValue;
    filtersArrayCopy[keyIndex].value.max = maxValue;
    setFiltersInArray(filtersArrayCopy);
  }, [reveiwFilterArray]);

  useEffect(() => {
    let minValue = Infinity;
    let maxValue = -Infinity;
    if (hardDiskFilter.length) {
      for (let obj of hardDiskFilter) {
        if (obj?.value < minValue) {
          minValue = obj?.value;
        }
        if (obj?.value > maxValue) {
          maxValue = obj?.value;
        }
      }
    }
    console.log(hardDiskFilter);

    console.log('minValue: ' + minValue + ' maxValue: ' + maxValue);
    const keyIndex = findIndexByKey([filtersInArray], 'hard_disk');
    const filtersArrayCopy = JSON.parse(JSON.stringify(filtersInArray));
    filtersArrayCopy[keyIndex].value.min = minValue;
    filtersArrayCopy[keyIndex].value.max = maxValue;
    filtersArrayCopy[keyIndex].value.unit = hardDiskFilter?.map(
      item => item.type,
    );
    filtersArrayCopy[keyIndex].value.unit = [
      ...new Set(filtersArrayCopy[keyIndex].value.unit),
    ];
    setFiltersInArray(filtersArrayCopy);
  }, [hardDiskFilter]);

  useEffect(() => {
    let minValue = Infinity;
    let maxValue = -Infinity;
    if (ramFilter.length) {
      for (let obj of ramFilter) {
        if (obj.value < minValue) {
          minValue = obj.value;
        }
        if (obj.value > maxValue) {
          maxValue = obj.value;
        }
      }
    }

    console.print('minValue: ' + minValue + ' maxValue: ' + maxValue);
    const keyIndex = findIndexByKey([filtersInArray], 'ram_memory');
    const filtersArrayCopy = JSON.parse(JSON.stringify(filtersInArray));
    filtersArrayCopy[keyIndex].value.min = minValue;
    filtersArrayCopy[keyIndex].value.max = maxValue;
    filtersArrayCopy[keyIndex].value.unit = ramFilter?.map(item => item.type);
    filtersArrayCopy[keyIndex].value.unit = [
      ...new Set(filtersArrayCopy[keyIndex].value.unit),
    ];
    setFiltersInArray(filtersArrayCopy);
  }, [ramFilter]);

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
                <div key={index}>
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
                </div>
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
        position={'relative'}
        item
        xs={12}
        ml={inDrawer ? 0 : 2.7}
        my={1}
        borderBottom={inDrawer ? '1px solid #DDDDDD' : ''}>
        {/* {sidebarTitle !== budgetFilter && ( */}
        <Typography
          onClick={() => DataInDrawerToggler(2)}
          p={inDrawer ? 2 : 0}
          variant='body2'
          className={`${inDrawer ? 'alignment-container' : ''}`}
          position={'relative'}
          fontWeight={'bolder'}>
          Customer Reviews
          {inDrawer ? (
            <span className={`${inDrawer ? 'align-to-end' : ''}`}>
              <IconButton>
                {DataInDrawer[2] ? (
                  <KeyboardArrowUpIcon sx={{ color: 'orange' }} />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </IconButton>
            </span>
          ) : (
            ''
          )}
        </Typography>
        {/* )} */}
        {(DataInDrawer[2] || !inDrawer) && (
          <Box ml={inDrawer ? 4 : 0} pb={2}>
            <ReviewFilter
              reviewOption={reviewOption}
              clearReview={clearReview}
              onChange={handleReviewFilter}
            />
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
          {/* {sidebarTitle !== budgetFilter && ( */}
          <FilterBarlayout2
            setReviewOptions={setReviewOptions}
            clearFilter={handleClearFilter}
            filteChange={handleFilterChange}
            handleFilterSelect={handleFilterSelect}
            filtersInArray={filtersInArray}
            inDrawer={inDrawer}
            DataInDrawer={DataInDrawer}
            DataInDrawerToggler={DataInDrawerToggler}
            toggleDrawer={toggleDrawer}
            pathValue={pathValue}
          />
          {/* )} */}
          {/* {sidebarTitle === budgetFilter && (
            <BudgetFriendlyFilters budgetedDesktops={budgetedDesktops} />
          )} */}
        </div>
      </Grid>
    </Grid>
  );
};

export default CategorySidebar;
