import { useState } from "react";
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
                <div>
                    <div className={`sticky-filter-bar ${isOpen && "active"}`}>
                        <FilterBar />
                    </div>

                    <ProductsByCategory toggleFilter={toggleFilter} />
                </div>
            </div>
        </div>
    );
}

export default Category;
