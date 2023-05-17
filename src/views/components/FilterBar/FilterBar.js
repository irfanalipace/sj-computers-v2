import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

import { getFilterListApi } from "@api/filters";

const FilterBar = () => {
    const [filters, setFilters] = useState([]);

    useEffect(() => {
        fetchFilters();
    }, []);

    const fetchFilters = async () => {
        let response = await getFilterListApi();
        console.log("response: ", response);
    };

    const handleShowMore = () => {
        console.log("showm ore");
    };

    return (
        <div className="filters-inner">
            <ul className="filters-list">
                <li className="filter-key">
                    <h4 className="filter-heading">Category</h4>
                    <ul className="filter-values-list">
                        <li className="filter-value">Monitors</li>
                        <li>Laptops</li>
                        <li>
                            <button onClick={handleShowMore}>
                                <span className="me-2">Show More</span>
                                <FontAwesomeIcon icon={faAngleDown} />
                            </button>
                        </li>
                    </ul>
                </li>
                <li>
                    <button onClick={handleShowMore}>
                        <span className="me-2">Show More</span>
                        <FontAwesomeIcon icon={faAngleDown} />
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default FilterBar;
