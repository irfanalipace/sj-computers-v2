import { useEffect, useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

import { filterProducts } from "@store/products/productsThunks";
import {
    CLEAR_ALL_PRODUCTS,
    SET_SEARCH_STRING,
} from "@store/products/productsSlice";
import ProductsGrid from "@components/ProductsGrid/ProductsGrid";

const FilteredProducts = memo(({ category, toggleFilter }) => {
    const products = useSelector((state) => state.products.products);
    const isLoading = useSelector((state) => state.products.isLoading);
    const apiError = useSelector((state) => state.products.apiError);
    const currentPage = useSelector((state) => state.products.currentPage);
    const searchString = useSelector((state) => state.products.searchString);
    const filtersArray = useSelector((state) => state.products.filtersArray);
    const [mounted, setMounted] = useState(false);

    const dispatch = useDispatch();

    let filterObject = {
        page: 1,
        per_page: 12,
        category_id: category?.id,
    };

    const init = () => {
        dispatch(SET_SEARCH_STRING(""));
        dispatch(CLEAR_ALL_PRODUCTS());
        // dispatch(filterProducts(filterObject));
        // setMounted(true);
    };

    useEffect(() => {
        init();
        return () => {
            dispatch(SET_SEARCH_STRING(""));
            dispatch(CLEAR_ALL_PRODUCTS());
        };
    }, []);

    const handleClick = () => {
        filterObject = {
            ...filterObject,
            page: currentPage,
            name: searchString,
            filter: filtersArray,
        };
        dispatch(filterProducts(filterObject, true));
    };

    useEffect(() => {
        if (mounted) {
            filterObject = {
                ...filterObject,
                page: 1,
                name: searchString,
                category_id: category?.id,
                filter: filtersArray,
            };
            if (filtersArray.length > 0 || searchString || category?.id) {
                dispatch(filterProducts(filterObject));
            }
        }
    }, [searchString, filtersArray]);

    useEffect(() => {
        filterObject = {
            ...filterObject,
            page: 1,
            name: searchString,
            category_id: category?.id,
            filter: filtersArray,
        };
        if (category?.id) {
            dispatch(filterProducts(filterObject));
        }
    }, [category]);

    return (
        <div className="filter-results">
            {products.length > 0 ? (
                <>
                    {category?.name && (
                        <div className="d-flex justify-content-space-between align-items-center heading">
                            <h3>
                                Best{" "}
                                <span className="text-capitalize">
                                    {category?.name}
                                </span>
                            </h3>
                            <button
                                className="d-sm-none d-block bg-transparent border-0"
                                onClick={toggleFilter}
                            >
                                <FontAwesomeIcon icon={faFilter} />
                            </button>
                        </div>
                    )}

                    <ProductsGrid
                        products={products}
                        handleClick={handleClick}
                        isLoading={isLoading}
                        apiError={apiError}
                    />
                </>
            ) : (
                <>
                    {!isLoading && (
                        <h3 className="heading">No products found</h3>
                    )}
                </>
            )}
        </div>
    );
});

export default FilteredProducts;
