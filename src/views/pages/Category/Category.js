import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import FilterBar from "@components/FilterBar/FilterBar";
import Loader from "@common/LoaderComponent/OverlayLoader";

import ProductsByCategory from "./ProductsByCategory";

import "./Category.css";


function Category() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleFilter = () => {
        setIsOpen((state) => !state);
    };
    return (
       
 <div className="category-page">
            <div className="category-page-inner">
                <div>
                    <Loader isLoading={false} />
                </div>
                {isOpen && (
                    <div
                        onClick={toggleFilter}
                        className="sidebarOverlay"
                    ></div>
                )}

                <div>
                    <div className={`sticky-filter-bar ${isOpen && "active"}`}>
                        <div className="d-flex justify-content-between align-items-center heading">
                            <h3>Filters</h3>
                            <button
                                className="d-sm-none d-block bg-transparent border-0"
                                onClick={toggleFilter}
                            >
                                <FontAwesomeIcon size="lg" icon={faTimes} />
                            </button>
                        </div>
                        <FilterBar />
                    </div>

                    <ProductsByCategory toggleFilter={toggleFilter} />
                </div>
            </div>
        </div>

     
       
    );
}

export default Category;
