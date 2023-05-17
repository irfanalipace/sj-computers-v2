import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { filterProducts } from "@store/products/productsThunks";
import {
    CLEAR_ALL_PRODUCTS,
    SET_SEARCH_STRING,
} from "@store/products/productsSlice";
import Loader from "@common/LoaderComponent/LoaderComponent";
import ProductsGrid from "@components/ProductsGrid/ProductsGrid";

const FilteredProducts = ({ categoryId }) => {
    const { categorySlug } = useParams();
    const products = useSelector((state) => state.products.products);
    const isLoading = useSelector((state) => state.products.isLoading);
    const apiError = useSelector((state) => state.products.apiError);
    const searchString = useSelector((state) => state.products.searchString);
    const [mounted, setMounted] = useState(false);

    const [filter, setFilter] = useState();

    const [categoryList, setCategoryList] = useState([]);

    const dispatch = useDispatch();

    const handleClick = () => {
        console.log("show more clicked");
    };

    const filterObject = {
        page: 1,
        per_page: 12,
        categoryId,
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

    useEffect(() => {
        filterObject.name = searchString;
        dispatch(filterProducts(filterObject));
    }, [searchString]);

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="filter-results">
                    <ProductsGrid
                        products={products}
                        handleClick={handleClick}
                        isLoading={isLoading}
                        apiError={apiError}
                        heading={`Best ${categorySlug}`}
                    />
                </div>
            )}
        </>
    );
};

export default FilteredProducts;
