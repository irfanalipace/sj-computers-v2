import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

import Loader from "@common/Spinner/Spinner";
import OverlayLoader from "@common/LoaderComponent/OverlayLoader";

import { getFilterListApi } from "@api/filters";
import { SET_FILTERS_ARRAY } from "@store/products/productsSlice";

import "./FilterBar.css";
import { Slider, Typography } from "@mui/material";
import Button from "../common/Button/Button";
const FilterBar = () => {
    const [filters, setFilters] = useState({});
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [filtersInArray, setFiltersInArray] = useState([]);
    const [loadingFilters, setLoadingFilters] = useState(false);
    const [visibleCategories, setVisibleCategories] = useState(8);
    const [visibleEntries, setVisibleEntries] = useState({});
    const isLoading = useSelector((state) => state.products.isFiltering);
    const [selectedUnit, setSelectedUnit] = useState({});
    const [rangeValues, setRangeValues] = useState({});

    const dispatch = useDispatch();

    const handleShowMoreCategory = () => {
        setVisibleCategories(
            (prevVisibleCategories) => prevVisibleCategories + 8
        );
    };

    const handleShowMoreitems = (category) => {
        setVisibleEntries((prevVisibleCategories) => {
            let tempVariable = { ...prevVisibleCategories };
            tempVariable[category].visibleEntries =
                prevVisibleCategories[category].visibleEntries + 8;
            return tempVariable;
        });
    };

    // const handleCheckboxChange = (event, category, option) => {
    //     const isChecked = event.target.checked;
    //     setFiltersInArray((prevSelectedFilters) => {
    //         let filter = {
    //             key: category,
    //             value: option,
    //         };
    //         const isChecked = event.target.checked;

    //         if (isChecked) {
    //             return [...prevSelectedFilters, filter];
    //         }
    //         let index = prevSelectedFilters.findIndex((filter) => {
    //             return filter.value === option;
    //         });

    //         let tempArray = [...prevSelectedFilters];

    //         if (index > -1) {
    //             tempArray.splice(index, 1);
    //         }
    //         return tempArray;
    //     });

    //     setSelectedFilters((prevSelectedFilters) => ({
    //         ...prevSelectedFilters,
    //         [category]: isChecked
    //             ? [...(prevSelectedFilters[category] || []), option]
    //             : prevSelectedFilters[category].filter(
    //                   (filter) => filter.value !== option
    //               ),
    //     }));
    // };
    const handleFilterSelect = (event, category, option) => {
        setFiltersInArray((prevSelectedFilters) => {
            let filter = {
                key: category,
                value: option,
            };

            // const isChecked = event.target.checked;

            // if (isChecked) {
            //     return [...prevSelectedFilters, filter];
            // }
            let index = prevSelectedFilters.findIndex((filter) => {
                return filter.key === category;
            });
            let tempArray = [...prevSelectedFilters];

            if (index > -1) {
                tempArray[index] = filter;

                return tempArray;
            }
            return [...tempArray, filter];
        });
    };

    useEffect(() => {
        dispatch(SET_FILTERS_ARRAY(filtersInArray));
    }, [filtersInArray]);

    useEffect(() => {
        fetchFilters();
    }, []);

    const fetchFilters = async () => {
        try {
            setLoadingFilters(true);
            let response = await getFilterListApi();
            let data = response?.data;
            setFilters(data ? data : {});
            Object.keys(data)?.forEach((key, index) => {
                let value = data[key];
                if (!Array.isArray(value)) {
                    let options = {
                        MB: {
                            min: value.least_MB,
                            max: value.highest_MB,
                        },
                        GB: {
                            min: value.least_GB,
                            max: value.highest_GB,
                        },
                        TB: {
                            min: value.least_TB,
                            max: value.highest_TB,
                        },
                    };
                    setRangeValues((prev) => {
                        return {
                            ...prev,
                            [key]: { ...options },
                        };
                    });
                    let selectedUnit =
                        value.least_MB && value.highest_MB
                            ? "MB"
                            : value.least_GB && value.highest_GB
                            ? "GB"
                            : value.least_TB && value.highest_TB
                            ? "TB"
                            : "";
                    setSelectedUnit((prevState) => {
                        return {
                            ...prevState,
                            [key]: {
                                unit: selectedUnit,
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
        let optionArray = options.slice(
            0,
            visibleEntries[category].visibleEntries
        );
        return (
            <>
                {optionArray.map((option, index) => (
                    // <li
                    //     className="filter-value"
                    //     key={`${option.value}-${index}`}
                    // >
                    //     <label
                    //         className="checkbox-container"
                    //         htmlFor={`${option.value}-${index}`}
                    //     >
                    //         <input
                    //             id={`${option.value}-${index}`}
                    //             type="checkbox"
                    //             onChange={(event) =>
                    //                 handleCheckboxChange(
                    //                     event,
                    //                     category,
                    //                     option.value
                    //                 )
                    //             }
                    //         />
                    //         <span className="checkmark"></span>
                    //         {option.value}
                    //     </label>
                    // </li>
                    <li
                        className="filter-value"
                        key={`${option.value}-${index}`}
                    >
                        <label
                            className="radio-container"
                            htmlFor={`${option.value}-${index}`}
                        >
                            <input
                                id={`${option.value}-${index}`}
                                type="radio"
                                name={category} // Add a name attribute to group the radio buttons by category
                                value={option.value} // Add a value attribute to specify the value of the selected radio button
                                onChange={(event) =>
                                    handleFilterSelect(
                                        event,
                                        category,
                                        option.value
                                    )
                                }
                            />
                            <span className="radiomark "></span>{" "}
                            {/* Replace the checkmark with radiomark class */}
                            {option.value}
                        </label>
                    </li>
                ))}
                {visibleEntries[category].visibleEntries <=
                    filters[category].length && (
                    <li className="filter-value">
                        <button onClick={() => handleShowMoreitems(category)}>
                            <span className="me-2">Show More</span>
                            <FontAwesomeIcon icon={faAngleDown} />
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
        setSelectedUnit((prevState) => {
            return {
                ...prevState,
                [category]: {
                    unit,
                },
            };
        });
    };

    const applyRange = (e, category) => {
        let unit = selectedUnit[category]?.unit;
        console.log("11111 categories", category);
        console.log("11111 selectedUnit", selectedUnit);
        let options = {
            unit: unit,
            min:
                selectedUnit[category]?.min || rangeValues[category][unit]?.min,
            max:
                selectedUnit[category]?.max || rangeValues[category][unit]?.max,
        };
        console.log("11111 options: ", options);

        handleFilterSelect(e, category, options);
    };

    const handleRange = (event, category, unit, newValue) => {
        setSelectedUnit((prev) => {
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

    let renderRangeSliders = (category) => {
        return (
            <div>
                {filters[category]?.least_MB &&
                filters[category]?.highest_MB ? (
                    <div className="my-2  filter-value">
                        <label
                            className="radio-container"
                            htmlFor={category + "MB"}
                        >
                            <input
                                type="radio"
                                value="MB"
                                id={category + "MB"}
                                className="me-1"
                                name={category}
                                checked={selectedUnit[category]?.unit === "MB"}
                                onChange={() => handleRangeUnit(category, "MB")}
                            />
                            MB
                        </label>
                    </div>
                ) : (
                    <></>
                )}

                {filters[category]?.least_GB &&
                filters[category]?.highest_GB ? (
                    <div className="my-2  filter-value">
                        <label
                            className="radio-container"
                            htmlFor={category + "GB"}
                        >
                            <input
                                type="radio"
                                value="GB"
                                id={category + "GB"}
                                className="me-1"
                                name={category}
                                checked={selectedUnit[category]?.unit === "GB"}
                                onChange={(e) =>
                                    handleRangeUnit(category, "GB")
                                }
                            />
                            GB
                        </label>
                    </div>
                ) : (
                    <></>
                )}

                {filters[category]?.least_TB &&
                filters[category]?.highest_TB ? (
                    <li className="my-2 filter-value">
                        <label
                            className="radio-container"
                            htmlFor={category + "TB"}
                        >
                            <input
                                type="radio"
                                value="TB"
                                id={category + "TB"}
                                className="me-1"
                                name={category}
                                checked={selectedUnit[category]?.unit === "TB"}
                                onChange={(e, values) =>
                                    handleRangeUnit(category, "TB")
                                }
                            />
                            TB
                        </label>
                    </li>
                ) : (
                    <></>
                )}
                <div>
                    <Slider
                        style={{ color: "#52ac66" }}
                        value={[
                            selectedUnit[category].range?.min ||
                                rangeValues[category][
                                    selectedUnit[category]?.unit
                                ]?.min,
                            selectedUnit[category].range?.max ||
                                rangeValues[category][
                                    selectedUnit[category]?.unit
                                ]?.max,
                        ]}
                        onChange={(e, values) =>
                            handleRange(
                                e,
                                category,
                                selectedUnit[category]?.unit,
                                values
                            )
                        }
                        valueLabelDisplay="auto"
                        min={
                            rangeValues[category][selectedUnit[category]?.unit]
                                ?.min
                        }
                        max={
                            rangeValues[category][selectedUnit[category]?.unit]
                                ?.max
                        }
                        aria-labelledby="price-range-slider"
                    />
                </div>
                <div className="filter-button-category-page">
                    <Button
                        isLoading={isLoading}
                        onClick={(e) => applyRange(e, category)}
                    >
                        Apply
                    </Button>
                </div>
            </div>
        );
    };

    let renderedCategories = Object.entries(filters).map(
        ([category, options], index) => (
            <>
                {(!!filters[category].length ||
                    !Array.isArray(filters[category])) && (
                    <li className="filter-key" key={`${category}-${index}`}>
                        <h4 className="filter-heading">{category}</h4>
                        <ul className="filter-values-list">
                            {Array.isArray(filters[category])
                                ? renderedItems(options, category)
                                : renderRangeSliders(category)}
                        </ul>
                    </li>
                )}
            </>
        )
    );

    return (
        <div className="position-relative h-100">
            <div>
                <OverlayLoader isLoading={isLoading || loadingFilters} />
            </div>
            <div className="filters-inner">
                <ul className="filters-list">
                    {renderedCategories}
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

export default FilterBar;
