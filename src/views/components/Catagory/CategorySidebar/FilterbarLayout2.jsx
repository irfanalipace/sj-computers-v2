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
  DataInDrawerToggler,
  DataInDrawer,
  toggleDrawer,
}) => {
  const [filters, setFilters] = useState({});
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filtersInArray, setFiltersInArray] = useState({
    review: {
      min: 0,
      max: 0,
    },
    price: {
      min: 0,
      max: 0,
    },
    brand: {
      brand_name: [],
    },
    operating_system: {
      os_name: [],
    },
    internal_memory: {
      internal_memory_value: [],
    },
    ram: {
      ram_value: [],
    },
  });
  const [loadingFilters, setLoadingFilters] = useState(false);
  const [visibleCategories, setVisibleCategories] = useState(8);
  const [visibleEntries, setVisibleEntries] = useState({});
  const isLoading = useSelector(state => state.products.isFiltering);
  const [selectedUnit, setSelectedUnit] = useState({});
  const [rangeValues, setRangeValues] = useState({});

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

  const handleFilterSelect = (event, category, option) => {
    const arraysFilter = [
      'ram_memory',
      'hard_disk',
      'brand',
      'operating_system',
    ];
    if (toggleDrawer) {
      toggleDrawer();
    }
    if (arraysFilter.includes(category)) {
      let objectName = '';
      let arrayName = '';
      switch (category) {
        case 'brand':
          objectName = 'brand';
          arrayName = 'brand_name';
          break;
        case 'hard_disk':
          objectName = 'internal_memory';
          arrayName = 'internal_memory_value';
          break;
        case 'ram_memory':
          objectName = 'ram';
          arrayName = 'ram_value';
          break;
        case 'operating_system':
          objectName = 'operating_system';
          arrayName = 'os_name';
          break;
      }
      const findIndex = filtersInArray[objectName][arrayName].findIndex(
        item => item === option,
      );

      if (findIndex !== -1) {
        const dd = filtersInArray[objectName][arrayName];
        debugger;

        const filtersArrayCopy = [...filtersInArray[objectName][arrayName]];
        filtersArrayCopy.splice(findIndex, 1);

        setFiltersInArray(prev => {
          return {
            ...filtersInArray,
            [objectName]: {
              [arrayName]: [...filtersArrayCopy],
            },
          };
        });
        return;
      }
      setFiltersInArray(prev => {
        return {
          ...filtersInArray,
          [objectName]: {
            [arrayName]: [...filtersInArray[objectName][arrayName], option],
          },
        };
      });
      return;
    }
  };

  const handleFilterSelectRangeSlider = (event, category, option) => {
    debugger;
    if (toggleDrawer) {
      toggleDrawer();
    }
    setFiltersInArray(prevSelectedFilters => {
      let tempArray = [...prevSelectedFilters];
      let index = prevSelectedFilters.findIndex(filter => {
        return filter.value.unit === option.unit && filter.key === category;
      });
      let filter = {
        key: category,
        value: option,
      };
      if (index !== -1) {
        const removedArray = prevSelectedFilters.filter(
          f => !(f.key === category && f.value.unit === option.unit),
        );
        const removerrayUpdate = [...removedArray, filter];
        console.print(removerrayUpdate, 'newArray removed Array');
        return removerrayUpdate;
      } else {
        const newArray = [...tempArray, filter];
        console.print(newArray, 'newArray else');
        return newArray;
      }
    });
  };

  const handleClearFilter = category => {
    setFiltersInArray(prevArray => {
      // Filter out filters with the specified category
      const updatedArray = prevArray.filter(filter => filter.key !== category);
      return updatedArray;
    });
  };

  useEffect(() => {
    dispatch(SET_FILTERS_ARRAY(filtersInArray));
  }, [filtersInArray]);

  useEffect(() => {
    fetchFilters();
  }, []);

  console.print(filtersInArray, 'filtersInArray');

  const fetchFilters = async () => {
    try {
      setLoadingFilters(true);
      let response = await getFilterListApi();
      let data = response?.data;
      setFilters(data ? data : {});
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
              <span className='radiomark '></span>{' '}
              {/* Replace the checkmark with radiomark class */}
              {option.value}
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

  // let renderRangeSliders = (options, category) => {

  //     return data.map((item, index) => (
  //       <div>
  //          <ul>

  //          <li className="filter-value">
  //             <label className="radio-container">
  //                 <input type="radio" />
  //                 <span className="radiomark">{item}</span>
  //             </label>

  //         </li>

  //        </ul>

  //       </div>
  //     ));

  // };

  const handleRangeUnit = (category, unit) => {
    setSelectedUnit(prevState => {
      return {
        ...prevState,
        [category]: {
          unit,
        },
      };
    });
  };

  const handleRange = (event, category, unit, newValue) => {
    setSelectedUnit(prev => {
      return {
        ...prev,
        [category]: {
          ...prev[category],
          range: {
            min: newValue[0],
            max: newValue[1],
          },
        },
      };
    });
  };

  let renderRangeSliders = category => {
    return (
      <ul className='filter-values-list'>
        {category == 'ram_memory' ? (
          <>
            {[
              { label: '4 GB', value: '4GB' },
              { label: '6 GB', value: '6GB' },
              { label: '8 GB', value: '8GB' },
            ].map(ram => {
              return (
                <li className='filter-value'>
                  <label className='radio-container' htmlFor={ram.value}>
                    <input
                      id={ram.value}
                      type='checkbox'
                      checked={filtersInArray?.ram?.ram_value.includes(
                        ram.value,
                      )}
                      name={category}
                      onChange={event =>
                        handleFilterSelect(event, category, ram.value)
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
        {category === 'hard_disk' ? (
          <>
            {[
              { label: '64 GB', value: '64GB' },
              { label: '128 GB', value: '128GB' },
              { label: '256 GB', value: '256GB' },
              { label: '512 GB', value: '512GB' },
              { label: '1 TB', value: '1TB' },
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
                        handleFilterSelect(event, category, ram.value);
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
      name: 'GPU',
      data: ['Nvidia', 'AMD'],
    },
    {
      name: 'Trending',
      data: ['Best Sellers', 'New Arrivals', 'Featured Products'],
    },
  ];

  let renderedCategories = Object.entries(filters).map(
    ([category, options], index) => (
      <div key={index}>
        {(!!filters[category].length || !Array.isArray(filters[category])) && (
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
              {filtersInArray?.length > 0 &&
                filtersInArray?.some(filter => filter.key === category) && (
                  <span
                    className='filter-clear-btn'
                    onClick={() => handleClearFilter(category)}>
                    <CloseIcon fontSize='14px' />
                    clear
                  </span>
                )}
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
    ),
  );

  const renderCategoriesGpuAndTrending = GpuAndTrendingData?.map(
    (category, index) => (
      <li
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
            {category.name === 'GPU'
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
