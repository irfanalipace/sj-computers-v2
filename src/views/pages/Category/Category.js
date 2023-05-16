import { useSelector } from "react-redux";

import FilterBar from "@components/FilterBar/FilterBar";
import Loader from "@common/LoaderComponent/LoaderComponent";
import ProductsByCategory from "./ProductsByCategory";

import "./Category.css";

function Category() {
    const isLoadingProducts = useSelector((state) => state.products.isLoading);

    return (
        <div className="category-page">
            <div className="category-page-inner">
                <div className="sticky-filter-bar">
                    <FilterBar />
                </div>
                {isLoadingProducts ? (
                    <Loader />
                ) : (
                    <div className="filter-results">
                        <ProductsByCategory />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Category;
