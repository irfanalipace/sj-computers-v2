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
  pathValue,
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
    if (category === 'price') {
      setActinePriceFilter('');
      document.getElementById(`customInput${10}`).value = '';
      document.getElementById(`customInput${11}`).value = '';
    }
    if (category === 'hard_disk') {
      setHardDiskCheckd([]);
    }
    if (category === 'ram_memory') {
      setRamDiskCheckd([]);
    }
    if (category === 'processor') {
      setProcessorCheckd([]);
    }
    if (category === 'operating_system') {
      setOsCheckd([]);
    }
    if (category === 'brand') {
      setBrandCheckd([]);
    }

    clearFilter(category);

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
  }, []);

  function getPriceRanges(min, max) {
    const ranges = [];

    if (min < 250) {
      ranges.push({
        id: 1,
        priceValue: 'under $250',
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

  const [ramData, setRamData] = useState([{ gb: [], tb: 0 }]);
  const [hardDistData, setHardDiskData] = useState([{ gb: [], tb: 0 }]);

  const fetchFilters = async () => {
    try {
      setLoadingFilters(true);
      let response = await getFilterListApi();
      let data = response?.data;
      setFilters(data ? data : {});

      const highestGb = data.ram_memory.highest_GB;
      const lowestGb = data.ram_memory.least_GB;
      const realisticOptions = generateRealisticOptions(highestGb, lowestGb);
      const ramOptions = realisticOptions.filter(option => option <= highestGb);
      setRamData([{ gb: ramOptions, tb: data.ram_memory.least_TB }]);

      const highestHardDiskGb = data.hard_disk.highest_GB;
      // const lowestHardDiskGb = data.hard_disk.least_GB;
      const realisticOptionsHardDisk = generateRealisticOptions(
        highestHardDiskGb,
        64,
      );
      const hardDiskOptions = realisticOptionsHardDisk.filter(
        option => option <= highestGb,
      );
      setHardDiskData([{ gb: hardDiskOptions, tb: data.hard_disk.least_TB }]);

      const priceShapedArray = getPriceRanges(
        data.price.min_price,
        data.price.max_price,
      );
      setPriceData(prev => {
        return {
          ...prev,
          priceValueArray: priceShapedArray,
        };
      });

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

  const showClear = (category, current) => {
    const check1 =
      filtersInArray[findIndexByKey([filtersInArray], category)]?.value?.max !==
      -Infinity;
    const check2 =
      filtersInArray[findIndexByKey([filtersInArray], category)]?.value?.max >
      0;
    const check3 =
      filtersInArray[findIndexByKey([filtersInArray], category)]?.value
        ?.length > 0;

    if ((check1 && check2) || check3) {
      return true;
    }
    return false;
  };

  const handleChecked = (catg, value) => {
    if (catg === 'processor') {
      return processorCheckd.includes(value);
    }
    if (catg === 'operating_system') {
      return osCheckd.includes(value);
    }
    if (catg === 'brand') {
      return brandCheckd.includes(value);
    }
  };

  const [hardDiskCheckd, setHardDiskCheckd] = useState([]);
  const [ramDiskCheckd, setRamDiskCheckd] = useState([]);
  const [processorCheckd, setProcessorCheckd] = useState([]);
  const [osCheckd, setOsCheckd] = useState([]);
  const [brandCheckd, setBrandCheckd] = useState([]);

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
                checked={handleChecked(category, option.backend_value)}
                // checked={filtersInArray?.some(
                //   item => item.value === option.backend_value,
                // )}
                name={category} // Add a name attribute to group the radio buttons by category
                value={option.backend_value} // Add a value attribute to specify the value of the selected radio button
                onChange={event => {
                  if (category === 'processor') {
                    const hardDiskCheckdCopy = [...processorCheckd];
                    if (event.target.checked) {
                      hardDiskCheckdCopy.push(option.backend_value);
                      setProcessorCheckd(hardDiskCheckdCopy);
                    }
                    if (!event.target.checked) {
                      const finIndex = processorCheckd.findIndex(
                        item => item === option.backend_value,
                      );
                      hardDiskCheckdCopy.splice(finIndex, 1);
                      setProcessorCheckd(hardDiskCheckdCopy);
                    }
                  }
                  if (category === 'operating_system') {
                    const hardDiskCheckdCopy = [...osCheckd];
                    if (event.target.checked) {
                      hardDiskCheckdCopy.push(option.backend_value);
                      setOsCheckd(hardDiskCheckdCopy);
                    }
                    if (!event.target.checked) {
                      const finIndex = osCheckd.findIndex(
                        item => item === option.backend_value,
                      );
                      hardDiskCheckdCopy.splice(finIndex, 1);
                      setOsCheckd(hardDiskCheckdCopy);
                    }
                  }
                  if (category === 'brand') {
                    const hardDiskCheckdCopy = [...brandCheckd];
                    if (event.target.checked) {
                      hardDiskCheckdCopy.push(option.backend_value);
                      setBrandCheckd(hardDiskCheckdCopy);
                    }
                    if (!event.target.checked) {
                      const finIndex = brandCheckd.findIndex(
                        item => item === option.backend_value,
                      );
                      hardDiskCheckdCopy.splice(finIndex, 1);
                      setBrandCheckd(hardDiskCheckdCopy);
                    }
                  }

                  handleFilterSelect(event, category, option.backend_value);
                }}
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
  console.log(activePriceFiler);
  let renderRangeSliders = category => {
    return (
      <ul className='filter-values-list'>
        {/* handle price category */}
        {category == 'price' ? (
          <>
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
                  checked={showClear(category)}
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
                      checked={ramDiskCheckd.includes(item)}
                      name={`ram${item}ram-memory`}
                      onChange={event => {
                        const ramCheckdCopy = [...ramDiskCheckd];
                        if (event.target.checked) {
                          ramCheckdCopy.push(item);
                          setRamDiskCheckd(ramCheckdCopy);
                        }
                        if (!event.target.checked) {
                          const finIndex = ramDiskCheckd.findIndex(
                            item1 => item1 === item,
                          );
                          ramCheckdCopy.splice(finIndex, 1);
                          setRamDiskCheckd(ramCheckdCopy);
                        }

                        handleFilterSelect(event, category, {
                          id: index + 1,
                          label: `${item}  'GB'`,
                          value: item,
                          type: 'GB',
                        });
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
                    checked={ramDiskCheckd.includes(ramData?.length + 2)}
                    // name={}
                    onChange={event => {
                      const ramCheckdCopy = [...ramDiskCheckd];
                      if (event.target.checked) {
                        ramCheckdCopy.push(ramData?.length + 2);
                        setRamDiskCheckd(ramCheckdCopy);
                      }
                      if (!event.target.checked) {
                        const finIndex = ramDiskCheckd.findIndex(
                          item => item === ramData?.length + 2,
                        );
                        ramCheckdCopy.splice(finIndex, 1);
                        setRamDiskCheckd(ramCheckdCopy);
                      }

                      handleFilterSelect(event, category, {
                        id: ramData?.length + 2,
                        label: `${1}  'TB'`,
                        value: 1,
                        type: 'TB',
                      });
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
            {hardDistData.map((ram, index) => {
              return ram.gb.map(item => {
                return (
                  <li key={`${item}hdkey`} className='filter-value'>
                    <label className='radio-container' htmlFor={`${item}hd`}>
                      <input
                        id={`${item}hd`}
                        type='checkbox'
                        checked={hardDiskCheckd.includes(item)}
                        name={`${item}hdname`}
                        onChange={event => {
                          const hardDiskCheckdCopy = [...hardDiskCheckd];
                          if (event.target.checked) {
                            hardDiskCheckdCopy.push(item);
                            setHardDiskCheckd(hardDiskCheckdCopy);
                          }
                          if (!event.target.checked) {
                            const finIndex = hardDiskCheckd.findIndex(
                              item1 => item1 === item,
                            );
                            hardDiskCheckdCopy.splice(finIndex, 1);
                            setHardDiskCheckd(hardDiskCheckdCopy);
                          }

                          console.log(category);

                          handleFilterSelect(event, category, {
                            id: index + 1,
                            label: `${item}  'GB'`,
                            value: item,
                            type: 'GB',
                          });
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
                    checked={hardDiskCheckd.includes(
                      hardDistData[0]?.gb?.length + 2,
                    )}
                    // name={ram.value}
                    onChange={event => {
                      const hardDiskCheckdCopy = [...hardDiskCheckd];
                      if (event.target.checked) {
                        hardDiskCheckdCopy.push(hardDistData[0]?.gb.length + 2);
                        setHardDiskCheckd(hardDiskCheckdCopy);
                      }
                      if (!event.target.checked) {
                        const finIndex = hardDiskCheckd.findIndex(
                          item => item === hardDistData[0]?.gb.length + 2,
                        );
                        hardDiskCheckdCopy.splice(finIndex, 1);
                        setHardDiskCheckd(hardDiskCheckdCopy);
                      }

                      handleFilterSelect(event, category, {
                        id: hardDistData[0]?.gb.length + 2,
                        label: `${1}  'TB'`,
                        value: 1,
                        type: 'TB',
                      });
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
                checked={filtersInArray[
                  findIndexByKey([filtersInArray], category.name)
                ]?.value?.includes(data)}
                name={'gpu'}
                onChange={event =>
                  handleFilterSelect(event, category.name, data)
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
        filtersInArray[findIndexByKey([filtersInArray], category)]?.value
          ?.max !== -Infinity;

      return (
        <div key={category}>
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
                {category.replace(/_/g, ' ')}
                {showClear(category) && (
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
