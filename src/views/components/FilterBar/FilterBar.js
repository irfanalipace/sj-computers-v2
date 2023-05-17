import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

import Loader from "@common/Spinner/Spinner";
import OverlayLoader from "@common/LoaderComponent/OverlayLoader";

import { getFilterListApi } from "@api/filters";
import { SET_FILTERS_ARRAY } from "@store/products/productsSlice";

import "./FilterBar.css";

const FilterBar = () => {
    const [filters, setFilters] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [filtersInArray, setFiltersInArray] = useState([]);
    const [loadingFilters, setLoadingFilters] = useState(false);
    const isLoading = useSelector((state) => state.products.isFiltering);

    const dispatch = useDispatch();

    console.log("filters", filtersInArray);

    const handleCheckboxChange = (event, category, option) => {
        const isChecked = event.target.checked;
        setFiltersInArray((prevSelectedFilters) => {
            let filter = {
                key: category,
                value: option,
            };
            const isChecked = event.target.checked;

            if (isChecked) {
                return [...prevSelectedFilters, filter];
            }
            let index = prevSelectedFilters.findIndex((filter) => {
                return filter.value === option;
            });

            let tempArray = [...prevSelectedFilters];

            if (index > -1) {
                tempArray.splice(index, 1);
            }
            return tempArray;
        });

        setSelectedFilters((prevSelectedFilters) => ({
            ...prevSelectedFilters,
            [category]: isChecked
                ? [...(prevSelectedFilters[category] || []), option]
                : prevSelectedFilters[category].filter(
                      (filter) => filter.value !== option
                  ),
        }));
    };

    useEffect(() => {
        dispatch(SET_FILTERS_ARRAY(filtersInArray));
    }, [filtersInArray]);

    useEffect(() => {
        fetchFilters();
    }, []);

    const fetchFilters = async () => {
        setLoadingFilters(true);
        let response = await getFilterListApi();
        setFilters(response.data);
        setLoadingFilters(false);
    };

    const handleShowMore = () => {
        console.log("showm ore");
    };

    return (
        <div className="position-relative h-100">
            <div>
                <OverlayLoader isLoading={isLoading} />
            </div>
            <div className="filters-inner">
                {loadingFilters ? (
                    <div className="d-flex justify-content-center align-items-center my-3">
                        <Loader />
                    </div>
                ) : (
                    <ul className="filters-list">
                        {Object.entries(filters).map(
                            ([category, options], index) => (
                                <li
                                    className="filter-key"
                                    key={`${category}-${index}`}
                                >
                                    <h4 className="filter-heading">
                                        {category}
                                    </h4>
                                    <ul className="filter-values-list">
                                        {options.map((option, index) => (
                                            <li
                                                className="filter-value"
                                                key={`${option.value}-${index}`}
                                            >
                                                <label
                                                    className="checkbox-container"
                                                    htmlFor={`${option.value}-${index}`}
                                                >
                                                    <input
                                                        id={`${option.value}-${index}`}
                                                        type="checkbox"
                                                        checked={
                                                            selectedFilters[
                                                                category
                                                            ] &&
                                                            selectedFilters[
                                                                category
                                                            ].includes(
                                                                option.value
                                                            )
                                                        }
                                                        onChange={(event) =>
                                                            handleCheckboxChange(
                                                                event,
                                                                category,
                                                                option.value
                                                            )
                                                        }
                                                    />
                                                    <span className="checkmark"></span>
                                                    {option.value}
                                                </label>
                                            </li>
                                        ))}
                                        <li className="filter-value">
                                            <button onClick={handleShowMore}>
                                                <span className="me-2">
                                                    Show More
                                                </span>
                                                <FontAwesomeIcon
                                                    icon={faAngleDown}
                                                />
                                            </button>
                                        </li>
                                    </ul>
                                </li>
                            )
                        )}
                        <li className="filter-value">
                            <button onClick={handleShowMore}>
                                <span className="me-2">Show More</span>
                                <FontAwesomeIcon icon={faAngleDown} />
                            </button>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );
};

export default FilterBar;
