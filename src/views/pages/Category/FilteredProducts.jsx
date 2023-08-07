import { useEffect, useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

import { filterProducts } from "@store/products/productsThunks";
import {
    CLEAR_ALL_PRODUCTS,
    SET_SEARCH_STRING,
    SET_SELECTED_CATEGORY,
} from "@store/products/productsSlice";
import ProductsGrid from "@components/ProductsGrid/ProductsGrid";

const FilteredProducts = memo(({ category, toggleFilter }) => {
    const {
        products,
        isLoading,
        apiError,
        currentPage,
        searchString,
        filtersArray,
    } = useSelector((state) => state.products);

    const prod = useSelector((state) => state.products);
    console.print("@loader", prod);

    const [mounted, setMounted] = useState(false);

    const dispatch = useDispatch();

    let filterObject = {
        page: 1,
        per_page: 12,
        name: "",
        category_id: category?.id,
    };

    const init = () => {
        // dispatch(SET_SEARCH_STRING(""));
        dispatch(SET_SELECTED_CATEGORY(null));
        dispatch(CLEAR_ALL_PRODUCTS());
        // dispatch(filterProducts(filterObject));
        setMounted(true);
    };

    useEffect(() => {
        init();
        return () => {
            // dispatch(SET_SEARCH_STRING(""));
            dispatch(CLEAR_ALL_PRODUCTS());
        };
    }, []);

    const handleClick = () => {
        filterObject = {
            ...filterObject,
            page: currentPage,
            name: "",
            filter: filtersArray,
        };
        dispatch(filterProducts(filterObject, true));
    };

    useEffect(() => {
        if (mounted) {
            filterObject = {
                ...filterObject,
                page: 1,
                name: "",
                category_id: category?.id,
                filter: filtersArray,
            };
            if (filtersArray.length > 0 || searchString || category?.id) {
                dispatch(filterProducts(filterObject));
            }
        }
        // }, [searchString, filtersArray]);
    }, [filtersArray]);

    useEffect(() => {
        filterObject = {
            ...filterObject,
            page: 1,
            name: "",
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
                    {isLoading || !category ? (
                        <h3 className="heading">Fetching Products</h3>
                    ) : (
                        <div className="d-flex justify-content-space-between align-items-center heading">
                            <h3>No Products Found</h3>
                            <button
                                className="d-sm-none d-block bg-transparent border-0"
                                onClick={toggleFilter}
                            >
                                <FontAwesomeIcon icon={faFilter} />
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
});

export default FilteredProducts;
