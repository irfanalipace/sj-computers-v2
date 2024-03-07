import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { IconButton } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CloseIcon from '@mui/icons-material/Close';

import Loader from '@common/Spinner/Spinner';
import OverlayLoader from '@common/LoaderComponent/OverlayLoader';

import { getFilterListApi } from '@api/filters';
import { SET_FILTERS_ARRAY } from '@store/products/productsSlice';

import './FilterbarLayout2.css';
import './CategorySidebar.css';
import { Slider, Typography } from '@mui/material';
// import Button from "../common/Button/Button";
// import FilterByRange from "./FilterByRange";
import Button from '../../common/Button/Button';

const FilterBarlayout2 = ({
  inDrawer,
  clearFilter,
  DataInDrawerToggler,
  DataInDrawer,
  toggleDrawer,
  handleFilterSelect,
  filtersInArray,
  filteChange,
}) => {
  const [filters, setFilters] = useState({});
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [loadingFilters, setLoadingFilters] = useState(false);
  const [visibleCategories, setVisibleCategories] = useState(8);
  const [visibleEntries, setVisibleEntries] = useState({});
  const isLoading = useSelector(state => state.products.isFiltering);
  const [selectedUnit, setSelectedUnit] = useState({});
  const [rangeValues, setRangeValues] = useState({});
  const [activePriceFiler, setActinePriceFilter] = useState('');
  const [customPrice, setCustomPrice] = useState({
    priceMin: 0,
    priceMax: 0,
  });

  const dispatch = useDispatch();

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

  const handleClearFilter = category => {
    // debugger;
    if (category === 'price') {
      setActinePriceFilter('');
    }
    clearFilter(category);

    // setFiltersInArray(prevArray => {
    //   // Filter out filters with the specified category
    //   const updatedArray = prevArray.filter(filter => filter.key !== category);
    //   return updatedArray;
    // });
  };

  useEffect(() => {
    fetchFilters();
  }, []);

  const fetchFilters = async () => {
    try {
      setLoadingFilters(true);
      let response = await getFilterListApi();
      let data = response?.data;
      setFilters(data ? data : {});
      if (data?.price?.max_price > 2000) {
        priceData.priceValueArray.push({
          priceValue: 'Over $2000',
          priceMin: 2000,
          priceMax: data?.price?.max_price,
          id: 4,
        });
      }
      Object.keys(data)?.forEach((key, index) => {
        let value = data[key];
        if (!Array.isArray(value)) {
          setSelectedUnit(prevState => {
            return {
              ...prevState,
              [key]: {
                unit: '',
              },
            };
          });
        }
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

  let renderedItems = (options, category) => {
    let optionArray = options.slice(0, visibleEntries[category].visibleEntries);
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
                // checked={filtersInArray?.some(
                //   item => item.value === option.backend_value,
                // )}
                name={category} // Add a name attribute to group the radio buttons by category
                value={option.backend_value} // Add a value attribute to specify the value of the selected radio button
                onChange={event =>
                  handleFilterSelect(event, category, option.backend_value)
                }
              />
              <span className='radiomark '></span> {option.value}
            </label>
          </li>
        ))}

        {visibleEntries[category].visibleEntries <=
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

  const priceData = {
    priceValueArray: [
      { id: 1, priceValue: 'Under $250', priceMin: 0, priceMax: 250 },
      { id: 2, priceValue: '$250 - $1000', priceMin: 250, priceMax: 1000 },
      { id: 3, priceValue: '$1000 - $2000', priceMin: 1000, priceMax: 2000 },
    ],
    priceInputArray: [
      { name: 'priceMin', placeholder: 'Min' },
      { name: 'priceMax', placeholder: 'Max' },
    ],
  };

  let renderRangeSliders = category => {
    return (
      <ul className='filter-values-list'>
        {category == 'ram_memory' ? (
          <>
            {[
              { label: '4 GB', value: 4, type: 'GB' },
              { label: '6 GB', value: 6, type: 'GB' },
              { label: '8 GB', value: 8, type: 'GB' },
            ].map((ram, index) => {
              return (
                <li key={index} className='filter-value'>
                  <label className='radio-container' htmlFor={ram.value}>
                    <input
                      id={`ram${ram.value}`}
                      type='checkbox'
                      // checked={filtersInArray[1].value}
                      name={category}
                      onChange={event =>
                        handleFilterSelect(event, category, ram)
                      }
                    />
                    <span className='radiomark '></span> {ram.label}
                  </label>
                </li>
              );
            })}
          </>
        ) : (
          <></>
        )}

        {/* handle price category */}
        {category == 'price' ? (
          <>
            {priceData.priceValueArray.map((item, index) => (
              <li
                key={index}
                onClick={() => handlePriceFilter(item)}
                style={{
                  padding: '2px 0px',
                  color: activePriceFiler === item.id ? '#f2a742' : '',
                }}
                className={'filter-value price-value'}>
                {item.priceValue}
              </li>
            ))}
            <li className='filter-value' style={{ padding: '2px 0px' }}>
              <FontAwesomeIcon
                icon={faAngleDown}
                style={{ margin: ' 0px 5px', color: 'black' }}
              />
              <span style={{ color: '#52AC66' }}>Custom Price</span>
            </li>

            <li className='filter-value' style={{ padding: '2px 0px' }}>
              {priceData.priceInputArray.map((item, index) => (
                <input
                  key={index}
                  type='text'
                  name={item.name}
                  placeholder={`$${item.placeholder}`}
                  className='price-input'
                  onChange={handleCustomPriceFilter}
                />
              ))}
              <button
                onClick={() => handlePriceFilter(customPrice)}
                className='price-go-btn'>
                Go
              </button>
            </li>
          </>
        ) : (
          <></>
        )}
        {category == 'hard_disk' ? (
          <>
            {[
              { label: '64 GB', value: 64, type: 'GB' },
              { label: '128 GB', value: 128, type: 'GB' },
              { label: '256 GB', value: 256, type: 'GB' },
              { label: '512 GB', value: 512, type: 'GB' },
              { label: '1 TB', value: 1, type: 'TB' },
            ].map(ram => {
              return (
                <li key={ram.value} className='filter-value'>
                  <label className='radio-container' htmlFor={ram.value}>
                    <input
                      id={ram.value}
                      type='checkbox'
                      checked={filtersInArray?.internal_memory?.internal_memory_value.includes(
                        ram.value,
                      )}
                      name={ram.value}
                      onChange={event => {
                        handleFilterSelect(event, category, ram);
                      }}
                    />
                    <span className='radiomark '></span> {ram.label}
                  </label>
                </li>
              );
            })}
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
                // checked={filtersInArray?.some(item => item.value === data)}
                name={'gpu'}
                onChange={event => handleFilterSelect('', category.name, data)}
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
          <li
            key={`data + ${index}`}
            className='filter-value'
            style={{ padding: '2px 0px' }}>
            {data}
          </li>
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
      data: ['Best Sellers', 'New Arrivals', 'Featured Products'],
    },
  ];

  function findIndexByKey(arr, keyToFind) {
    for (let i = 0; i < 8; i++) {
      if (arr[0][i].key === keyToFind) {
        return i;
      }
    }
    return -1;
  }

  let renderedCategories = Object.entries(filters).map(
    ([category, options], index) => {
      const dd =
        filtersInArray[findIndexByKey([filtersInArray], category)].value.min;
      const ff =
        filtersInArray[findIndexByKey([filtersInArray], category)].value
          ?.length;
      // debugger;
      return (
        <div key={index}>
          {(!!filters[category].length ||
            !Array.isArray(filters[category])) && (
            <li
              className='filter-key'
              style={{
                borderBottom: inDrawer ? '1px solid #DDDDDD' : '',
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
                {category.replace(/_/g, ' ')}{' '}
                {(filtersInArray?.length > 0 &&
                  filtersInArray[findIndexByKey([filtersInArray], category)]
                    .value.min) ||
                  (filtersInArray[findIndexByKey([filtersInArray], category)]
                    .value?.length > 0 && (
                    <span
                      className='filter-clear-btn'
                      onClick={() => handleClearFilter(category)}>
                      <CloseIcon fontSize='14px' />
                      clear d
                    </span>
                  ))}
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
              </h3>

              {(DataInDrawer[index + 3] || !inDrawer) && (
                <ul
                  className='filter-values-list'
                  style={{
                    padding: inDrawer ? '0px 20px' : '',
                    marginLeft: inDrawer ? '16px' : '',
                  }}>
                  {Array.isArray(filters[category])
                    ? renderedItems(options, category)
                    : renderRangeSliders(category)}
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
          {filtersInArray?.length > 0 &&
            filtersInArray?.some(filter => filter.key === category.name) && (
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
          {renderedCategories}

          {/* Below Categories is for Gpu and trnding */}
          {renderCategoriesGpuAndTrending}
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
