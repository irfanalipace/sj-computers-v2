import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

import { filterProducts } from "@store/products/productsThunks";
import {
    CLEAR_ALL_PRODUCTS,
    SET_SEARCH_STRING,
} from "@store/products/productsSlice";
import ProductsGrid from "@components/ProductsGrid/ProductsGrid";

const FilteredProducts = ({ category, toggleFilter }) => {
    const products = useSelector((state) => state.products.products);
    const isLoading = useSelector((state) => state.products.isLoading);
    const apiError = useSelector((state) => state.products.apiError);
    const currentPage = useSelector((state) => state.products.currentPage);
    const searchString = useSelector((state) => state.products.searchString);
    const filtersArray = useSelector((state) => state.products.filtersArray);
    const [mounted, setMounted] = useState(false);

    const dispatch = useDispatch();

    const filterObject = {
        page: 1,
        per_page: 12,
        categoryId: category?.categoryId,
    };

    const init = () => {
        dispatch(SET_SEARCH_STRING(""));
        dispatch(CLEAR_ALL_PRODUCTS());
        dispatch(filterProducts(filterObject));
        setMounted(true);
    };

    useEffect(() => {
        init();
        return () => {
            dispatch(SET_SEARCH_STRING(""));
            dispatch(CLEAR_ALL_PRODUCTS());
        };
    }, []);

    const handleClick = () => {
        filterObject.page = currentPage;
        dispatch(filterProducts(filterObject, currentPage));
    };

    useEffect(() => {
        if (mounted) {
            filterObject.name = searchString;
            // const serializedArray = JSON.stringify(filtersArray);
            filterObject.filter = filtersArray;
            filterObject.page = 1;
            console.log("filterObject: ", filterObject);
            dispatch(filterProducts(filterObject));
        }
    }, [searchString, filtersArray]);

    return (
        <div className="filter-results">
            <div className="d-flex justify-content-space-between align-items-center heading">
                <h3>
                    Best
                    <span className="text-capitalize">
                        {category?.categoryName}
                    </span>
                </h3>
                <button
                    className="d-sm-none d-block bg-transparent border-0"
                    onClick={toggleFilter}
                >
                    <FontAwesomeIcon icon={faFilter} />
                </button>
            </div>

            <ProductsGrid
                products={products}
                handleClick={handleClick}
                isLoading={isLoading}
                apiError={apiError}
            />
        </div>
    );
};

export default FilteredProducts;
