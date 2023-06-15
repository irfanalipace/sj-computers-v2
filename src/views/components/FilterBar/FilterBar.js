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
    const [filters, setFilters] = useState({});
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [filtersInArray, setFiltersInArray] = useState([]);
    const [loadingFilters, setLoadingFilters] = useState(false);
    const [visibleCategories, setVisibleCategories] = useState(8);
    const [visibleEntries, setVisibleEntries] = useState({});
    const isLoading = useSelector((state) => state.products.isFiltering);

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
        try {
            setLoadingFilters(true);
            let response = await getFilterListApi();
            setFilters(response.data ? response.data : {});
            const keys = Object.keys(response.data);
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
                    <li className="filter-value" key={`${option.value}-${index}`}>
  <label className="radio-container" htmlFor={`${option.value}-${index}`}>
    <input
      id={`${option.value}-${index}`}
      type="radio"
      name={category} // Add a name attribute to group the radio buttons by category
      value={option.value} // Add a value attribute to specify the value of the selected radio button
  
      onChange={(event) =>
                         handleCheckboxChange(
                             event,
                             category,
                             option.value
                         )
                    }
    />
    <span className="radiomark " ></span> {/* Replace the checkmark with radiomark class */}
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

    let renderedCategories = Object.entries(filters).map(
        ([category, options], index) => (
            <li className="filter-key" key={`${category}-${index}`}>
                <h4 className="filter-heading">{category}</h4>
                <ul className="filter-values-list">
                    {renderedItems(options, category)}
                </ul>
            </li>
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
