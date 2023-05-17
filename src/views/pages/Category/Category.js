import { useSelector } from "react-redux";

import FilterBar from "@components/FilterBar/FilterBar";
import Loader from "@common/LoaderComponent/OverlayLoader";

import ProductsByCategory from "./ProductsByCategory";

import "./Category.css";

function Category() {
    const isLoading = false;

    return (
        <div className="category-page">
            <div className="category-page-inner">
                {isLoading ? (
                    <div>
                        <Loader isLoading={isLoading} />
                    </div>
                ) : (
                    <div>
                        <div className="sticky-filter-bar">
                            <FilterBar />
                        </div>

                        <ProductsByCategory />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Category;
