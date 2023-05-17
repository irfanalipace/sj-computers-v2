import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

import Loader from "@common/Spinner/Spinner";
import { getFilterListApi } from "@api/filters";

import "./FilterBar.css";

const FilterBar = () => {
    const [filters, setFilters] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState({});
    const [loadingFilters, setLoadingFilters] = useState(false);

    const handleCheckboxChange = (event, category, option) => {
        const isChecked = event.target.checked;

        setSelectedFilters((prevSelectedFilters) => ({
            ...prevSelectedFilters,
            [category]: isChecked
                ? [...(prevSelectedFilters[category] || []), option]
                : prevSelectedFilters[category].filter(
                      (filter) => filter !== option
                  ),
        }));
    };

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
        <div className="filters-inner">
            {loadingFilters ? (
                <Loader />
            ) : (
                <ul className="filters-list">
                    {Object.entries(filters).map(
                        ([category, options], index) => (
                            <li
                                className="filter-key"
                                key={`${category}-${index}`}
                            >
                                <h4 className="filter-heading">{category}</h4>
                                <ul className="filter-values-list">
                                    {options.map((option, index) => (
                                        <li
                                            className="filter-value"
                                            key={`${option}-${index}`}
                                        >
                                            <label
                                                className="checkbox-container"
                                                htmlFor={`${option}-${index}`}
                                            >
                                                <input
                                                    id={`${option}-${index}`}
                                                    type="checkbox"
                                                    checked={
                                                        selectedFilters[
                                                            category
                                                        ] &&
                                                        selectedFilters[
                                                            category
                                                        ].includes(option)
                                                    }
                                                    onChange={(event) =>
                                                        handleCheckboxChange(
                                                            event,
                                                            category,
                                                            option
                                                        )
                                                    }
                                                />
                                                <span className="checkmark"></span>
                                                {option.value}
                                            </label>
                                        </li>
                                    ))}
                                    <li>
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
                    <li>
                        <button onClick={handleShowMore}>
                            <span className="me-2">Show More</span>
                            <FontAwesomeIcon icon={faAngleDown} />
                        </button>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default FilterBar;
