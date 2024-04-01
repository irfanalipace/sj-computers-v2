import React, { useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  Box,
  IconButton,
  Stack,
  debounce,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import FilterBar from '../../FilterBar/FilterBar';
import { computerCategories, categoriesWithSubCategories } from '../DummyApi';
import FilterBarlayout2 from './FilterbarLayout2';
import { Link } from 'react-router-dom';
import './CategorySidebar.css';
import ReviewFilter from './ReviewFilter';
import { SET_FILTERS_ARRAY } from '../../../../core/store/products/productsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { offset } from '@popperjs/core';

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
  const products = useSelector(state => state.products.products);
  const storeFilters = useSelector(state => state.products.filtersArray);

  const [filtersInArray, setFiltersInArray] = useState([
    {
      key: 'processor',
      value: [],
    },
    {
      key: 'ram_memory',
      checked: [],
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
      checked: [],
      value: {
        unit: [],
        min: 0,
        max: 0,
      },
    },
    {
      key: 'screen',
      value: [],
    },
  ]);

  useEffect(() => {
    setFiltersInArray(JSON.parse(JSON.stringify(storeFilters)));
  }, []);

  const [reveiwFilterArray, setReveiwFilterArray] = useState([]);
  const [isSubCategoryVisible, setIsSubCategoryVisible] = useState(
    categoriesWithSubCategories.map(() => false),
  );
  const [visibleCategory, setVisibleCategory] = useState(2);

  const applyFilterByQueryParmas = filterName => {
    const updatedFilters = JSON.parse(JSON.stringify(storeFilters));

    const brandFilter = updatedFilters.find(
      filter => filter.key === filterName,
    );

    if (brand) {
      if (brandFilter) {
        brandFilter?.value?.push(brand);
      }
    }
    if (processor) {
      if (brandFilter) {
        brandFilter?.value?.push(processor);
      }
    }
    if (gpu) {
      if (brandFilter) {
        brandFilter?.value?.push(gpu);
      }
    }
    dispatch(SET_FILTERS_ARRAY(updatedFilters));
    // debugger;
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
    const filtersArrayCopy = JSON.parse(JSON.stringify(storeFilters));

    const minMaxArray = ['price', 'review', 'ram_memory', 'hard_disk'];
    const arrayFilter = [
      'processor',
      'brand',
      'operating_system',
      'gpu',
      'screen',
    ];

    if (minMaxArray.includes(categ)) {
      filtersArrayCopy[keyIndex].value.min = 0;
      filtersArrayCopy[keyIndex].value.max = 0;
      filtersArrayCopy[keyIndex].checked = [];
      filtersArrayCopy[keyIndex].value.unit = [];

      dispatch(SET_FILTERS_ARRAY(filtersArrayCopy));
      return;
    }

    if (arrayFilter.includes(categ)) {
      filtersArrayCopy[keyIndex].value = [];
      dispatch(SET_FILTERS_ARRAY(filtersArrayCopy));
      return;
    }
  };

  function findIndexByKey(arr, keyToFind) {
    for (let i = 0; i < 9; i++) {
      if (arr[0][i].key === keyToFind) {
        return i;
      }
    }
    return -1;
  }
  const [hardDiskFilter, setHardDiskFilter] = useState([]);
  const [ramFilter, setRamFilter] = useState([]);

  const handleFilterSelect = (
    event,
    category,
    option,
    checkedArray,
    thisData,
    ty,
  ) => {
    const arraysFilter = [
      'processor',
      'brand',
      'operating_system',
      'gpu',
      'screen',
    ];
    const keyIndex = findIndexByKey([filtersInArray], category);

    const filtersArrayCopy = JSON.parse(JSON.stringify(storeFilters));

    const unitFilterArray = ['hard_disk', 'ram_memory'];

    if (unitFilterArray.includes(category)) {
      const arrayOjbectIndex = arr => {
        const findIndex = arr.findIndex(item => item.id === option.id);
        return findIndex;
      };
      const arrayToFilter = () => {
        const keyIndex = findIndexByKey([filtersInArray], category);
        const filtersArrayCopy = JSON.parse(JSON.stringify(storeFilters));
        const dd = filtersArrayCopy[keyIndex].checked;

        const mapData = dd?.map((item, index) => {
          return {
            id: index + 1,
            value: item,
          };
        });

        if (category === 'hard_disk') {
          const shapedthisData = thisData.map((item, index) => {
            return {
              id: index + 1,
              label: `${item}  'GB'`,
              value: item,
              type: 'GB',
            };
          });
          shapedthisData.push({
            id: thisData.length + 2,
            label: `${1}  'TB'`,
            value: 1,
            type: 'TB',
          });
          let res = shapedthisData.filter(it => dd.includes(it.id));

          debugger;

          const arr = [...hardDiskFilter, ...res];
          const uniqueMap = {};
          const result = [];

          arr.forEach(item => {
            const value = item.value;

            if (!uniqueMap[value]) {
              uniqueMap[value] = true;
              result.push(item);
            }
          });

          return result;
        }
        if (category === 'ram_memory') {
          const shapedthisData = thisData.map((item, index) => {
            return {
              id: index + 1,
              label: `${item}  'GB'`,
              value: item,
              type: 'GB',
            };
          });
          shapedthisData.push({
            id: thisData.length + 2,
            label: `${1}  'TB'`,
            value: 1,
            type: 'TB',
          });
          let res = shapedthisData.filter(it => dd.includes(it.id));

          const arr = [...ramFilter, ...res];
          const uniqueMap = {};
          const result = [];

          arr.forEach(item => {
            const value = item.value;

            if (!uniqueMap[value]) {
              uniqueMap[value] = true;
              result.push(item);
            }
          });

          return result;
        }
      };
      const findIndex = arrayOjbectIndex(arrayToFilter());

      if (event.target.checked === false) {
        debugger;
        if (findIndex !== -1) {
          const arrayToFilterCopy = [...arrayToFilter()];
          debugger;

          arrayToFilterCopy.splice(findIndex, 1);
          debugger;

          if (category === 'hard_disk') {
            setHardDiskFilter(arrayToFilterCopy);
          }

          if (category === 'ram_memory') {
            setRamFilter(arrayToFilterCopy);
          }

          const { minValue, maxValue } = getMinMax(arrayToFilterCopy);

          const keyIndex = findIndexByKey([filtersInArray], category);
          const filtersArrayCopy = JSON.parse(JSON.stringify(storeFilters));

          filtersArrayCopy[keyIndex].value.min = minValue;
          filtersArrayCopy[keyIndex].value.max = maxValue;
          filtersArrayCopy[keyIndex].checked = checkedArray;
          filtersArrayCopy[keyIndex].value.unit = arrayToFilterCopy?.map(
            item => item.type,
          );
          filtersArrayCopy[keyIndex].value.unit = [
            ...new Set(filtersArrayCopy[keyIndex].value.unit),
          ];

          dispatch(SET_FILTERS_ARRAY(filtersArrayCopy));
          return;
        }
      }
      if (event.target.checked) {
        if (category === 'hard_disk') {
          const localUpdated = [...hardDiskFilter, option];
          setHardDiskFilter([...localUpdated]);

          const { minValue, maxValue } = getMinMax(localUpdated);
          const keyIndex = findIndexByKey([filtersInArray], 'hard_disk');
          const filtersArrayCopy = JSON.parse(JSON.stringify(storeFilters));

          filtersArrayCopy[keyIndex].value.min = minValue;
          filtersArrayCopy[keyIndex].value.max = maxValue;
          filtersArrayCopy[keyIndex].checked = checkedArray;
          filtersArrayCopy[keyIndex].value.unit = localUpdated?.map(
            item => item.type,
          );
          filtersArrayCopy[keyIndex].value.unit = [
            ...new Set(filtersArrayCopy[keyIndex].value.unit),
          ];

          dispatch(SET_FILTERS_ARRAY(filtersArrayCopy));

          return;
        }
        if (category === 'ram_memory') {
          const localUpdated = [...ramFilter, option];
          setRamFilter([...localUpdated]);

          const { minValue, maxValue } = getMinMax(localUpdated);

          const keyIndex = findIndexByKey([filtersInArray], 'ram_memory');
          const filtersArrayCopy = JSON.parse(JSON.stringify(storeFilters));

          filtersArrayCopy[keyIndex].value.min = minValue;
          filtersArrayCopy[keyIndex].value.max = maxValue;
          filtersArrayCopy[keyIndex].checked = checkedArray;
          filtersArrayCopy[keyIndex].value.unit = localUpdated?.map(
            item => item.type,
          );
          filtersArrayCopy[keyIndex].value.unit = [
            ...new Set(filtersArrayCopy[keyIndex].value.unit),
          ];
          dispatch(SET_FILTERS_ARRAY(filtersArrayCopy));
          return;
        }
      }
    }

    if (arraysFilter.includes(category)) {
      if (event.target.checked === false) {
        const findIndex = filtersArrayCopy[keyIndex].value.findIndex(
          item => item === option,
        );

        if (findIndex !== -1) {
          filtersArrayCopy[keyIndex].value.splice(findIndex, 1);
          dispatch(SET_FILTERS_ARRAY(filtersArrayCopy));
          return;
        }
      }

      filtersArrayCopy[keyIndex].value.push(option);
      dispatch(SET_FILTERS_ARRAY(filtersArrayCopy));

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

  const getMinMax = data => {
    let minValue = Infinity;
    let maxValue = -Infinity;
    if (data.length) {
      for (let obj of data) {
        if (obj.value < minValue) {
          minValue = obj.value;
        }
        if (obj.value > maxValue) {
          maxValue = obj.value;
        }
      }
    }
    return { minValue, maxValue };
  };

  const handleReviewFilter = (e, category, option) => {
    const keyIndex = findIndexByKey([filtersInArray], 'review');
    const filtersArrayCopy = JSON.parse(JSON.stringify(storeFilters));
    const reveiwFilterArrayCopy = [...reveiwFilterArray];

    if (!e.target.checked) {
      const finIndex = reveiwFilterArray.findIndex(
        item => item.id === option.id,
      );
      if (finIndex !== -1) {
        reveiwFilterArrayCopy.splice(finIndex, 1);
      }
    }
    if (e.target.checked) {
      reveiwFilterArrayCopy.push(option);
    }

    setReveiwFilterArray([...reveiwFilterArrayCopy]);

    const { minValue, maxValue } = getMinMax(reveiwFilterArrayCopy);

    filtersArrayCopy[keyIndex].value.min = minValue;
    filtersArrayCopy[keyIndex].value.max = maxValue;
    dispatch(SET_FILTERS_ARRAY(filtersArrayCopy));
  };

  const clearReview = () => {
    const keyIndex = findIndexByKey([filtersInArray], 'review');
    const filtersArrayCopy = JSON.parse(JSON.stringify(storeFilters));
    filtersArrayCopy[keyIndex].value.min = 0;
    filtersArrayCopy[keyIndex].value.max = 0;
    dispatch(SET_FILTERS_ARRAY(filtersArrayCopy));
    setReveiwFilterArray([]);
  };

  const handleFilterChange = item => {
    const keyIndex = findIndexByKey([filtersInArray], 'price');
    const filtersArrayCopy = JSON.parse(JSON.stringify(storeFilters));
    filtersArrayCopy[keyIndex].value.min = item.priceMin;
    filtersArrayCopy[keyIndex].value.max = item.priceMax;

    dispatch(SET_FILTERS_ARRAY(filtersArrayCopy));
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
      {products && products?.length > 0 && (
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
                        {category?.sub_categories.map(
                          (subCategory, subIndex) => (
                            <Link
                              key={subIndex}
                              to={subCategory.url}
                              className='sub-category-link'>
                              <Typography variant='body2' py={0.3}>
                                {subCategory.name}
                              </Typography>
                            </Link>
                          ),
                        )}
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
      )}

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
              storeReivew={storeFilters[2]}
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
