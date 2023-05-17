import { useSelector } from "react-redux";

import FilterBar from "@components/FilterBar/FilterBar";
import ProductsByCategory from "./ProductsByCategory";

import "./Category.css";

function Category() {
    return (
        <div className="category-page">
            <div className="category-page-inner">
                <div className="sticky-filter-bar">
                    <FilterBar />
                </div>

                <ProductsByCategory />
            </div>
        </div>
    );
}

export default Category;
