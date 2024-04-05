import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { Grid, IconButton, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CloseIcon from '@mui/icons-material/Close';
import { useLocation } from 'react-router-dom';

import Loader from '@common/Spinner/Spinner';
import OverlayLoader from '@common/LoaderComponent/OverlayLoader';

import { getFilterListApi } from '@api/filters';
import { SET_FILTERS_ARRAY } from '@store/products/productsSlice';

import './FilterbarLayout2.css';
import './CategorySidebar.css';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const FilterBarlayout2 = ({
  inDrawer,
  isNewApi,
  DataInDrawerToggler,
  DataInDrawer,
  toggleDrawer,
  filtersInArray,
  filteChange,
  upateFilters,
  pathValue,
  setReviewOptions,
}) => {
  const location = useLocation();
  const { categorySlug } = useParams();
  const [filters, setFilters] = useState({});
  const [loadingFilters, setLoadingFilters] = useState(false);
  const [visibleCategories, setVisibleCategories] = useState(8);
  const [visibleEntries, setVisibleEntries] = useState({});
  const isLoading = useSelector(state => state.products.isFiltering);
  const filtersArray = useSelector(state => state.products.filtersArray);
  const [activePriceFiler, setActinePriceFilter] = useState('');
  const [customPriceError, setCustomPriceError] = useState('');
  const [firstRender, setFirstRender] = useState(true);

  const [customPrice, setCustomPrice] = useState({
    id: 10,
    priceMin: 0,
    priceMax: 0,
  });

  const [priceData, setPriceData] = useState({
    priceValueArray: [],
    priceInputArray: [
      { id: 10, name: 'priceMin', placeholder: 'Min' },
      { id: 11, name: 'priceMax', placeholder: 'Max' },
    ],
  });

  const [ramData, setRamData] = useState([{ gb: [], tb: 0 }]);
  const [hardDistData, setHardDiskData] = useState([{ gb: [], tb: 0 }]);

  const dispatch = useDispatch();
  const storeFilters = useSelector(state => state.products.filtersArray);
  const { categories } = useSelector(state => state.category);

  useEffect(() => {
    const priceMin =
      storeFilters[findIndexByKey([storeFilters], 'price')]?.value?.min;
    const priceMax =
      storeFilters[findIndexByKey([storeFilters], 'price')]?.value?.max;

    priceData.priceValueArray.forEach((price, index) => {
      if (price.priceMin === priceMin && price.priceMax === priceMax) {
        setActinePriceFilter(price.id);
        return;
      }
    });
  }, [priceData]);

  const handleShowMoreCategory = () => {
    setVisibleCategories(prevVisibleCategories => prevVisibleCategories + 8);
  };

  const handleShowMoreitems = category => {
    setVisibleEntries(prevVisibleCategories => {
      let tempVariable = { ...prevVisibleCategories };
      tempVariable[category].visibleEntries =
        prevVisibleCategories[category].visibleEntries + 8;
      return tempVariable;
    });
  };

  const getCatgeoryNameForFilterListApi = () => {
    const names = [
      'budget-friendly',
      'workstation',
      'professional-laptop',
      'touch-screen',
      'top-rated-product',
      'best-sellers',
      'new-arrival',
    ];

    if (names.includes(pathValue)) return pathValue;
    const dd = categories.find(categ => categ.slug === categorySlug);
    if (!dd) return 'all';

    return dd.id;
  };

  const handleClearFilter = category => {
    const storeFilterIndex = getIndexOfFilter(category);
    const storeFiltersCopy = JSON.parse(JSON.stringify(storeFilters));

    if (category !== 'price') {
      storeFiltersCopy[storeFilterIndex].value = [];
    }

    if (category === 'price') {
      storeFiltersCopy[storeFilterIndex].value = {
        min: 0,
        max: 0,
      };
    }

    if (['ram_memory', 'hard_disk'].includes(category)) {
      storeFiltersCopy[storeFilterIndex].unit = [];
    }

    if (typeof myProp === 'function' || isNewApi) {
      upateFilters(storeFiltersCopy);
      return;
    }

    dispatch(SET_FILTERS_ARRAY(storeFiltersCopy));

    if (category === 'price') {
      setActinePriceFilter('');
      document.getElementById(`customInput${10}`).value = '';
      document.getElementById(`customInput${11}`).value = '';
    }

    // clearFilter(category);

    // setFiltersInArray(prevArray => {
    //   // Filter out filters with the specified category
    //   const updatedArray = prevArray.filter(filter => filter.key !== category);
    //   return updatedArray;
    // });
  };

  function generateRealisticOptions(highestGb, lowestGb) {
    const realisticOptions = [];
    for (let i = lowestGb; i <= highestGb; i *= 2) {
      realisticOptions.push(i);
    }
    return realisticOptions;
  }

  useEffect(() => {
    fetchFilters();
  }, [location?.pathname, categories]);

  function getPriceRanges(min, max) {
    const ranges = [];

    if (min < 250 && categorySlug?.toLowerCase() !== 'bto') {
      ranges.push({
        id: 1,
        priceValue: 'Under $250',
        priceMin: min,
        priceMax: 250,
      });
    }
    if (min < 250 && categorySlug?.toLowerCase() === 'bto') {
      ranges.push({
        id: 1,
        priceValue: `$${parseInt(min)} - $${250}`,
        priceMin: min,
        priceMax: 250,
      });
    }
    if (pathValue !== 'budget-friendly') {
      if (max > 250) {
        ranges.push({
          id: 2,
          priceValue: '$250 - $1000',
          priceMin: 250,
          priceMax: 1000,
        });
      }

      if (max > 1000) {
        ranges.push({
          id: 3,
          priceValue: '$1000 - $2000',
          priceMin: 1000,
          priceMax: 2000,
        });
      }

      if (max > 2000) {
        ranges.push({
          id: 4,
          priceValue: '$2000 - $5000',
          priceMin: 2000,
          priceMax: 5000,
        });
      }

      if (max > 5000) {
        ranges.push({
          id: 5,
          priceValue: 'over $5000',
          priceMin: 5000,
          priceMax: 100000,
        });
      }
    }

    return ranges;
  }

  const handleValueFilters = (event, categ, currentItem) => {
    if (categ === 'price') return;
    const indexOfFilter = getIndexOfFilter(categ);
    const storeFiltersDuplicate = JSON.parse(JSON.stringify(storeFilters));

    const values = storeFiltersDuplicate[indexOfFilter].value;
    if (event.target.checked) values.push(currentItem);

    if (!event.target.checked) {
      const indexOfItemToBeRemoved = values.findIndex(
        val => val === currentItem,
      );

      values.splice(indexOfItemToBeRemoved, 1);
    }

    if (typeof myProp === 'function' || isNewApi) {
      upateFilters(storeFiltersDuplicate);
      return;
    }

    dispatch(SET_FILTERS_ARRAY(storeFiltersDuplicate));
  };

  const fetchFilters = async () => {
    try {
      setLoadingFilters(true);

      let response = await getFilterListApi(getCatgeoryNameForFilterListApi());

      let data = response?.data;
      setFilters(data ? data : {});

      const highestGb = data?.ram_memory?.highest_GB;
      const lowestGb = data?.ram_memory?.least_GB;
      const realisticOptions = generateRealisticOptions(highestGb, lowestGb);
      const ramOptions = realisticOptions.filter(option => option <= highestGb);
      setRamData([{ gb: ramOptions, tb: data?.ram_memory?.least_TB }]);
      if (data?.review?.min_rating && data?.review?.max_rating) {
        let newArray = [];
        const one = [1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9];
        const two = [2, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9];
        const three = [3, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9];
        const four = [4, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9];

        let min = parseFloat(data?.review?.min_rating).toFixed(1);
        let max = parseFloat(data?.review?.max_rating).toFixed(1);
        min = parseFloat(min);
        max = parseFloat(max);

        if (one.includes(min) || one.includes(max)) {
          newArray.push({
            id: 1,
            label: `${parseInt(1)}`,
            value: 1,
          });
        }
        if (
          two.includes(min) ||
          two.includes(max) ||
          one.includes(min) ||
          one.includes(max)
        ) {
          newArray.push({
            id: 2,
            label: `${parseInt(2)}`,
            value: 2,
          });
        }

        if (
          three.includes(min) ||
          three.includes(max) ||
          two.includes(min) ||
          two.includes(max) ||
          one.includes(min) ||
          one.includes(max)
        ) {
          newArray.push({
            id: 3,
            label: `${parseInt(3)}`,
            value: 3,
          });
        }

        if (
          four.includes(min) ||
          four.includes(max) ||
          three.includes(min) ||
          three.includes(max) ||
          two.includes(min) ||
          two.includes(max) ||
          one.includes(min) ||
          one.includes(max)
        ) {
          newArray.push({
            id: 4,
            label: `${parseInt(4)}`,
            value: 4,
          });
        }

        if (min === 5.0 || max === 5.0 || min === 5 || max === 5) {
          newArray.push({
            id: 5,
            label: `${parseInt(5)}`,
            value: 5,
          });
        }

        setReviewOptions(newArray?.sort((a, b) => b.value - a.value));
      }

      const highestHardDiskGb = data?.hard_disk?.highest_GB;
      // const lowestHardDiskGb = data.hard_disk.least_GB;
      const realisticOptionsHardDisk = generateRealisticOptions(
        highestHardDiskGb,
        64,
      );
      const hardDiskOptions = realisticOptionsHardDisk.filter(
        option => option <= highestGb,
      );
      setHardDiskData([{ gb: hardDiskOptions, tb: data?.hard_disk?.least_TB }]);

      const priceShapedArray = getPriceRanges(
        data?.price?.min_price,
        data?.price?.max_price,
      );

      setPriceData(prev => {
        return {
          ...prev,
          priceValueArray: priceShapedArray,
        };
      });

      const keys = Object.keys(data);
      const tempVariable = {};
      for (const key of keys) {
        tempVariable[key] = { visibleEntries: 8 };
      }
      setVisibleEntries(tempVariable);
    } catch (error) {}
    setLoadingFilters(false);
  };

  const showClear = (category, current) => {
    if (filtersInArray.length === 0) return;
    const check1 =
      storeFilters[findIndexByKey([storeFilters], category)]?.value?.max !==
      -Infinity;
    const check2 =
      storeFilters[findIndexByKey([storeFilters], category)]?.value?.max > 0;
    const check3 =
      storeFilters[findIndexByKey([storeFilters], category)]?.value?.length > 0;

    if (category.toLowerCase() === 'hard_disk') {
    }
    if ((check1 && check2) || check3) {
      return true;
    }

    return false;
  };

  let renderedItems = (options, category) => {
    console.log(visibleEntries, category);
    let optionArray = options.slice(
      0,
      visibleEntries?.[category]?.visibleEntries,
    );

    return (
      <>
        {optionArray.map((option, index) => (
          <li className='filter-value' key={`${option.backend_value}-${index}`}>
            <label
              className='radio-container'
              htmlFor={`${option.backend_value}-${index}`}>
              <input
                id={`${option.backend_value}-${index}`}
                type='checkbox'
                checked={storeFilters[
                  getIndexOfFilter(category)
                ].value.includes(option.backend_value)}
                name={category}
                value={option.backend_value}
                onChange={event =>
                  handleValueFilters(event, category, option.backend_value)
                }
              />
              <span className='radiomark '></span> {option.value}
            </label>
          </li>
        ))}

        {visibleEntries?.[category]?.visibleEntries <=
          filters[category].length && (
          <li className='filter-value'>
            <button onClick={() => handleShowMoreitems(category)}>
              <FontAwesomeIcon
                icon={faAngleDown}
                style={{ margin: ' 0px 5px', color: 'black' }}
              />
              <span
                className='me-2'
                style={{
                  color: '#52AC66',
                  fontWeight: 'unset',
                }}>
                Show More
              </span>
            </button>
          </li>
        )}
      </>
    );
  };

  useEffect(() => {
    if (customPrice.priceMin > customPrice.priceMax) {
      setCustomPriceError('Min Price must be less than');
    } else {
      setCustomPriceError('');
    }
  }, [customPrice]);

  // let renderedCategories = Object.entries(filters).map(
  //     ([category, options], index) => (
  //         <li className="filter-key" key={`${category}-${index}`}>
  //             <h4 className="filter-heading">{category}</h4>
  //             <ul className="filter-values-list">
  //                 {renderedItems(options, category)}
  //                 {console.log(renderedCategories,'jfdwejfwfhwhfwe ewhfewhefhwfhwef')}
  //             </ul>
  //         </li>
  //     )
  // );

  const handlePriceFilter = item => {
    setActinePriceFilter(item.id);
    filteChange(item);
  };

  const handleCustomPriceFilter = event => {
    const { name, value } = event.target;

    setCustomPrice(prev => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  useEffect(() => {
    setFirstRender(false);
  }, []);

  const pathV = [
    'touch-screen',
    'top-rated-product',
    'professional-laptop',
    'workstation',
    'budget-friendly',
  ];

  useEffect(() => {
    setTimeout(() => {
      if (firstRender) return;
      let top = 500;
      if (pathV.includes(pathValue)) {
        top = 300;
      }
      window.scrollTo({ top: top, behavior: 'smooth' });
    }, 300);
  }, [storeFilters]);

  let renderPrice = category => {
    return (
      <ul
        className='filter-values-list'
        style={{
          borderBottom: inDrawer ? '1px solid #DDDDDD' : '',
        }}>
        {/* handle price category */}
        {category === 'price' ? (
          <>
            <h3
              onClick={() => DataInDrawerToggler(20)}
              className={`filter-heading ${inDrawer ? 'alignment-container' : ''}`}
              style={{
                margin: inDrawer ? '0px' : '',
                padding: inDrawer ? '16px' : '',
                width: inDrawer ? '100vw' : '',
              }}>
              {category.replace(/_/g, ' ')}
              {showClear(category) && (
                <span
                  className='filter-clear-btn'
                  onClick={() => handleClearFilter(category)}>
                  <CloseIcon fontSize='14px' />
                  clear
                </span>
              )}
              {/* {inDrawer ? (
                <span className={`${inDrawer ? 'align-to-end' : ''}`}>
                  <IconButton>
                    {DataInDrawer[index + 3] ? (
                      <KeyboardArrowUpIcon sx={{ color: 'orange' }} />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}{' '}
                  </IconButton>
                </span>
              ) : (
                '' 
              
              )}*/}
              {inDrawer && (
                <span className={`${inDrawer ? 'align-to-end' : ''}`}>
                  <IconButton>
                    {DataInDrawer[20] ? (
                      <KeyboardArrowUpIcon sx={{ color: 'orange' }} />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}{' '}
                  </IconButton>
                </span>
              )}
            </h3>
            {(DataInDrawer[20] || !inDrawer) && (
              <ul style={{ padding: inDrawer ? '16px' : '' }}>
                {priceData.priceValueArray.map((item, index) => (
                  <li
                    key={item.id}
                    onClick={() => handlePriceFilter(item)}
                    style={{
                      padding: '2px 0px',
                      color: activePriceFiler === item.id ? '#f2a742' : '',
                    }}
                    className={'filter-value price-value'}>
                    {item.priceValue}
                  </li>
                ))}
                <Accordion elevation={0} className='palnaccord'>
                  <AccordionSummary
                    sx={{ p: 0, minHeight: '10px', m: 0, mb: 1 }}
                    aria-controls='panel1-content'
                    id='panel1-header'>
                    <KeyboardArrowDownIcon sx={{ marginLeft: '10px' }} />
                    <Typography
                      sx={{
                        m: 0,
                        fontSize: '14px',
                        color: '#52AC66',
                        cursor: 'pointer',
                      }}>
                      Custom Price
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ padding: 0 }}>
                    <li className='filter-value' style={{ padding: '2px 0px' }}>
                      {priceData.priceInputArray.map((item, index) => (
                        <input
                          id={`customInput${item.id}`}
                          style={{
                            border:
                              activePriceFiler === 10
                                ? '1px solid #f2a742'
                                : '1px solid gray',
                          }}
                          key={index}
                          type='text'
                          name={item.name}
                          // checked={showClear(category)}
                          placeholder={`$${item.placeholder}`}
                          className='price-input'
                          onChange={handleCustomPriceFilter}
                        />
                      ))}
                      <button
                        style={{
                          opacity:
                            customPriceError ||
                            !customPrice.priceMin ||
                            !customPrice.priceMax
                              ? 0.5
                              : 1,
                        }}
                        disabled={
                          customPriceError ||
                          !customPrice.priceMin ||
                          !customPrice.priceMax
                        }
                        onClick={() => handlePriceFilter(customPrice)}
                        className='price-go-btn'>
                        Go
                      </button>
                      <br></br>
                      <small className='text-danger'>{customPriceError}</small>
                    </li>
                  </AccordionDetails>
                </Accordion>
              </ul>
            )}
          </>
        ) : (
          <></>
        )}
      </ul>
    );
  };

  const getIndexOfFilter = category => {
    const indexOfFilter = storeFilters.findIndex(
      filter => filter.key.toLowerCase() === category.toLowerCase(),
    );
    return indexOfFilter;
  };

  let renderRangeSliders = category => {
    if (category === 'screen') return;

    function getUnits(sizes) {
      const units = [];

      for (let size of sizes) {
        if (size.includes('GB')) {
          if (units.includes('GB')) continue;
          units.push('GB');
        }
        if (size.includes('TB')) {
          if (units.includes('TB')) continue;
          units.push('TB');
        }
      }
      return units;
    }

    const handleUnitFilters = (event, categ, currentItem) => {
      if (categ === 'price') return;
      const indexOfFilter = getIndexOfFilter(categ);
      const storeFiltersDuplicate = JSON.parse(JSON.stringify(storeFilters));

      const values = storeFiltersDuplicate[indexOfFilter].value;
      if (event.target.checked) values.push(currentItem);

      if (!event.target.checked) {
        const indexOfItemToBeRemoved = values.findIndex(
          val => val === currentItem,
        );

        values.splice(indexOfItemToBeRemoved, 1);
      }

      storeFiltersDuplicate[indexOfFilter].unit = getUnits(values);

      if (typeof myProp === 'function' || isNewApi) {
        upateFilters(storeFiltersDuplicate);
        return;
      }

      dispatch(SET_FILTERS_ARRAY(storeFiltersDuplicate));
    };

    return (
      <ul className='filter-values-list'>
        {category === 'ram_memory' ? (
          <>
            {ramData[0].gb.map((item, index) => {
              return (
                <li key={`ram_memory${index}`} className='filter-value'>
                  <label
                    className='radio-container'
                    htmlFor={`ram${item}ram-memory`}>
                    <input
                      id={`ram${item}ram-memory`}
                      type='checkbox'
                      checked={storeFilters[
                        getIndexOfFilter('ram_memory')
                      ].value.includes(`${item} GB`)}
                      name={`ram${item}ram-memory`}
                      onChange={event => {
                        handleUnitFilters(event, category, `${item} GB`);
                      }}
                    />
                    <span className='radiomark '></span> {item + ' GB'}
                  </label>
                </li>
              );
            })}

            {ramData[0]?.tb > 0 && (
              <li className='filter-value'>
                <label className='radio-container' htmlFor={'tb'}>
                  <input
                    id={'tb'}
                    type='checkbox'
                    checked={storeFilters[
                      getIndexOfFilter('ram_memory')
                    ].value.includes(`${1} TB`)}
                    onChange={event => {
                      handleUnitFilters(event, category, `${1} TB`);
                    }}
                  />
                  <span className='radiomark '></span> {1 + ' TB & above'}
                </label>
              </li>
            )}
          </>
        ) : (
          <></>
        )}
        {/* { id: 1, label: '64 GB', value: 64, type: 'GB' }, */}

        {category === 'hard_disk' ? (
          <>
            {hardDistData.map(ram => {
              return ram.gb.map((item, index) => {
                return (
                  <li key={`${item}hdkey`} className='filter-value'>
                    <label className='radio-container' htmlFor={`${item}hd`}>
                      <input
                        id={`${item}hd`}
                        type='checkbox'
                        checked={storeFilters[
                          getIndexOfFilter('hard_disk')
                        ].value.includes(`${item} GB`)}
                        name={`${item}hdname`}
                        onChange={event => {
                          handleUnitFilters(event, category, `${item} GB`);
                        }}
                      />
                      <span className='radiomark '></span> {item + ' GB'}
                    </label>
                  </li>
                );
              });
            })}
            {hardDistData[0]?.tb > 0 && (
              <li className='filter-value'>
                <label className='radio-container' htmlFor={'tbhd'}>
                  <input
                    id={'tbhd'}
                    type='checkbox'
                    checked={storeFilters[
                      getIndexOfFilter('hard_disk')
                    ].value.includes(`${1} TB`)}
                    onChange={event => {
                      handleUnitFilters(event, category, `${1} TB`);
                    }}
                  />
                  <span className='radiomark '></span> {'1 TB & Above'}
                </label>
              </li>
            )}
          </>
        ) : (
          <></>
        )}
      </ul>
    );
  };

  const renderGpu = category => {
    return (
      <>
        {category?.data.map((data, index) => (
          <li key={`data + ${index}`} className='filter-value'>
            <label className='radio-container' htmlFor={data}>
              <input
                id={data}
                type='checkbox'
                checked={storeFilters[
                  getIndexOfFilter(category.name)
                ].value.includes(data)}
                name={'gpu'}
                onChange={event =>
                  handleValueFilters(event, category.name, data)
                }
              />
              <span className='radiomark '></span>
              {data}
            </label>
          </li>
        ))}
      </>
    );
  };

  const renderTrending = category => {
    return (
      <>
        {category?.data?.map((data, index) => (
          <Link
            to={data.url}
            style={{ textDecoration: 'none', color: 'black' }}>
            <li
              key={`data + ${index}`}
              className='filter-value'
              style={{ padding: '2px 0px' }}>
              {data.name}
            </li>
          </Link>
        ))}
      </>
    );
  };

  let GpuAndTrendingData = [
    {
      name: 'gpu',
      data: ['Nvidia', 'AMD', 'Intel HD Graphics'],
    },
    {
      name: 'Trending',
      data: [
        { name: 'Best Sellers', url: '/category/best-sellers' },
        // { name: 'New Arrivals', url: '' },  // comminted bcoz these pages are not maded yet
        // { name: 'Featured Products', url: '' },
      ],
    },
  ];

  function findIndexByKey(arr, keyToFind) {
    for (let i = 0; i < 9; i++) {
      if (arr?.[0]?.[i]?.key === keyToFind) {
        return i;
      }
    }
    return -1;
  }

  let renderedCategories = Object.entries(filters).map(
    ([category, options], index) => {
      if (category == 'review') return;

      return (
        <div key={category}>
          {(!!filters[category].length ||
            !Array.isArray(filters[category])) && (
            <li
              className='filter-key'
              style={{
                borderBottom: inDrawer ? '1px solid #DDDDDD' : '',
                display: category === 'price' ? 'none' : '',
              }}
              key={`${category}-${index}`}>
              <h3
                onClick={() => DataInDrawerToggler(index + 3)}
                className={`filter-heading ${inDrawer ? 'alignment-container' : ''}`}
                style={{
                  margin: inDrawer ? '0px' : '',
                  padding: inDrawer ? '16px' : '',
                  width: inDrawer ? '100vw' : '',
                }}>
                {/* {category.replace(/_/g, ' ')} */}
                {category === 'price' ? '' : category.replace(/_/g, ' ')}
                {/* {category == 'review' ? '' : category.replace(/_/g, ' ')} */}

                {inDrawer ? (
                  <span className={`${inDrawer ? 'align-to-end' : ''}`}>
                    <IconButton>
                      {DataInDrawer[index + 3] ? (
                        <KeyboardArrowUpIcon sx={{ color: 'orange' }} />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}{' '}
                    </IconButton>
                  </span>
                ) : (
                  ''
                )}
                {showClear(category) && category !== 'price' && (
                  <span
                    className='filter-clear-btn'
                    onClick={() => handleClearFilter(category)}>
                    <CloseIcon fontSize='14px' />
                    clear
                  </span>
                )}
              </h3>

              {(DataInDrawer[index + 3] || !inDrawer) && (
                <ul
                  className='filter-values-list'
                  style={{
                    padding: inDrawer ? '0px 20px' : '',
                    marginLeft: inDrawer ? '16px' : '',
                  }}>
                  {/* {category === 'screen' &&
                    renderedScreenItems(options, category)} */}
                  {Array.isArray(filters[category])
                    ? renderedItems(options, category)
                    : renderRangeSliders(category)}
                  {/* {Array.isArray(filters[category]) &&
                    renderedItems(options, category)} */}
                </ul>
              )}
            </li>
          )}
        </div>
      );
    },
  );

  const renderCategoriesGpuAndTrending = GpuAndTrendingData?.map(
    (category, index) => (
      <li
        key={index}
        className='filter-key'
        style={{
          borderBottom: inDrawer ? '1px solid #DDDDDD' : '',
        }}>
        <h3
          onClick={() => DataInDrawerToggler(index + 10)}
          className={`filter-heading ${inDrawer ? 'alignment-container' : ''}`}
          style={{
            margin: inDrawer ? '0px' : '',
            padding: inDrawer ? '16px' : '',
            width: inDrawer ? '100vw' : '',
          }}>
          {/* {category.replace(/_/g, ' ')}{' '} */}
          {category.name}
          {showClear(category.name) && (
            <span
              className='filter-clear-btn'
              onClick={() => handleClearFilter(category.name)}>
              <CloseIcon fontSize='14px' />
              clear
            </span>
          )}
          {inDrawer ? (
            <span className={`${inDrawer ? 'align-to-end' : ''}`}>
              <IconButton>
                {DataInDrawer[index + 10] ? (
                  <KeyboardArrowUpIcon sx={{ color: 'orange' }} />
                ) : (
                  <KeyboardArrowDownIcon />
                )}{' '}
              </IconButton>
            </span>
          ) : (
            ''
          )}
          {showClear(category.name) && (
            <span
              className='filter-clear-btn'
              onClick={() => handleClearFilter(category.name)}>
              <CloseIcon fontSize='14px' />
              clear
            </span>
          )}
        </h3>
        {(DataInDrawer[index + 10] || !inDrawer) && (
          <ul
            className='filter-values-list'
            style={{
              padding: inDrawer ? '0px 20px' : '',
              marginLeft: inDrawer ? '16px' : '',
            }}>
            {category.name === 'gpu'
              ? renderGpu(category)
              : renderTrending(category)}
          </ul>
        )}
      </li>
    ),
  );

  return (
    <div className='position-relative h-100'>
      <div>
        <OverlayLoader isLoading={isLoading || loadingFilters} />
      </div>
      <div className='filters-inner'>
        <ul
          className='filters-list'
          style={{
            padding: inDrawer ? '0px' : '',
            margin: inDrawer ? '0px' : '',
          }}>
          {/* {renderRangeSliders('price')} */}
          {renderPrice('price')}
          {renderedCategories}
          {/* Below Categories is for Gpu and trnding */}
          {categorySlug !== 'bto' && renderCategoriesGpuAndTrending}
          {/* <li className="filter-value">
          <button onClick={handleShowMoreCategory}>
          <span className="me-2">Show More</span>
                            <FontAwesomeIcon icon={faAngleDown} />
                        </button>
                    </li> */}
        </ul>
      </div>
    </div>
  );
};

export default FilterBarlayout2;
