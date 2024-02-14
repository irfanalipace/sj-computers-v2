import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

import Loader from "@common/Spinner/Spinner";
import OverlayLoader from "@common/LoaderComponent/OverlayLoader";

import { getFilterListApi } from "@api/filters";
import { SET_FILTERS_ARRAY } from "@store/products/productsSlice";

import "./FilterbarLayout2.css";
import { Slider, Typography } from "@mui/material";
// import Button from "../common/Button/Button";
// import FilterByRange from "./FilterByRange";
import Button from "../../common/Button/Button";

const FilterBarlayout2 = () => {
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

                    setSelectedUnit((prevState) => {
                        return {
                            ...prevState,
                            [key]: {
                                unit: "",
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
                <li className="filter-value">
                    <label
                        className="radio-container"
                        htmlFor={"all-" + category}
                    >
                        <input
                            id={"all-" + category}
                            type="radio"
                            name={category} // Add a name attribute to group the radio buttons by category
                            value={""} // Add a value attribute to specify the value of the selected radio button
                            onChange={(event) =>
                                handleFilterSelect(event, category, "")
                            }
                        />
                        <span className="radiomark "></span>{" "}
                        {/* Replace the checkmark with rad  iomark class */}
                        All
                    </label>
                </li>
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
                        key={`${option.backend_value}-${index}`}
                    >
                        <label
                            className="radio-container"
                            htmlFor={`${option.backend_value}-${index}`}
                        >
                            <input
                                id={`${option.backend_value}-${index}`}
                                type="radio"
                                name={category} // Add a name attribute to group the radio buttons by category
                                value={option.backend_value} // Add a value attribute to specify the value of the selected radio button
                                onChange={(event) =>
                                    handleFilterSelect(
                                        event,
                                        category,
                                        option.backend_value
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
                            <FontAwesomeIcon icon={faAngleDown} style={{margin: " 0px 5px", color: "black"}} />
                            <span className="me-2" style={{color: "#52AC66", fontWeight: "unset"}}>Show More</span>
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
        let value = {};
        if (unit) {
            value = {
                unit: unit,
                min:
                    selectedUnit[category]?.range?.min ||
                    rangeValues[category][unit]?.min,
                max:
                    selectedUnit[category]?.range?.max ||
                    rangeValues[category][unit]?.max,
            };
        }
        handleFilterSelect(e, category, value);
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
            <ul className="filter-values-list">
                <li className="my-2  filter-value">
                    <label
                        className="radio-container"
                        htmlFor={category + "All"}
                    >
                        <input
                            type="radio"
                            value="MB"
                            id={category + "All"}
                            className="me-1"
                            name={category}
                            checked={selectedUnit[category]?.unit === ""}
                            onChange={() => handleRangeUnit(category, "")}
                        />
                        <span className="radiomark "></span>
                        All
                    </label>
                </li>
                {filters[category]?.least_MB &&
                filters[category]?.highest_MB ? (
                    <li className="my-2  filter-value">
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
                            <span className="radiomark "></span>
                            MB
                        </label>
                    </li>
                ) : (
                    <></>
                )}

                {filters[category]?.least_GB &&
                filters[category]?.highest_GB ? (
                    <li className="my-2  filter-value">
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
                            <span className="radiomark "></span>
                            GB
                        </label>
                    </li>
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
                            <span className="radiomark "></span>
                            TB
                        </label>
                    </li>
                ) : (
                    <></>
                )}

                {selectedUnit[category]?.unit ? (
                    <div className="range-slider">
                        <p style={{ fontSize: "14px", marginBottom: "0" }}>
                            Select Range:
                        </p>
                        <Slider
                            style={{
                                color: "#52ac66",
                                width: "150px",
                                marginLeft: "10px",
                                paddingTop: "20px",
                                padddingBottom: "20px",
                            }}
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
                                rangeValues[category][
                                    selectedUnit[category]?.unit
                                ]?.min
                            }
                            max={
                                rangeValues[category][
                                    selectedUnit[category]?.unit
                                ]?.max
                            }
                            aria-labelledby="price-range-slider"
                        />
                    </div>
                ) : (
                    <></>
                )}
                {/* Hide Apply Button on All */}
                {selectedUnit[category]?.unit === "" ? "" : <div className="filter-button-category-page">
                    <Button
                        disabled={isLoading}
                        onClick={(e) => applyRange(e, category)}
                    >
                        Apply
                    </Button>
                </div>
                }
            </ul>
        );
    };

    let renderedCategories = Object.entries(filters).map(
        ([category, options], index) => (
            <div key={index}>
                {(!!filters[category].length ||
                    !Array.isArray(filters[category])) && (
                    <li className="filter-key" key={`${category}-${index}`}>
                        <h3 className="filter-heading">{category}</h3>
                        <ul className="filter-values-list">
                            {Array.isArray(filters[category])
                                ? renderedItems(options, category)
                                : renderRangeSliders(category)}
                        </ul>
                    </li>
                )}
            </div>
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

export default FilterBarlayout2;
