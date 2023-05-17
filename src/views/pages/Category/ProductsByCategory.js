import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { filterProducts } from "@store/products/productsThunks";
import {
    CLEAR_ALL_PRODUCTS,
    SET_SEARCH_STRING,
} from "@store/products/productsSlice";
import ProductsGrid from "@components/ProductsGrid/ProductsGrid";

const ProductsHomePage = () => {
    const { categorySlug } = useParams();
    const products = useSelector((state) => state.products.products);
    const isLoading = useSelector((state) => state.products.isLoading);
    const apiError = useSelector((state) => state.products.apiError);
    const searchString = useSelector((state) => state.products.searchString);
    const categories = useSelector((state) => state.category.categories);
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
    };

    // console.log("11 categories: ", categories);
    // useEffect(() => {
    //     console.log("11 useEffect runninbg: ", categories);

    // }, []);

    const init = () => {
        const categoryId = categories.find((c) => c.slug === categorySlug)?.id;
        filterObject.categoryId = categoryId;

        dispatch(SET_SEARCH_STRING(""));
        dispatch(CLEAR_ALL_PRODUCTS());
        console.log("filter: ", filterObject);
        // dispatch(filterProducts(filterObject));
        setMounted(true);
    };

    useEffect(() => {
        console.log("11 useEffect runninbg: ", categories);
        init();
        return () => {
            dispatch(SET_SEARCH_STRING(""));
            dispatch(CLEAR_ALL_PRODUCTS());
        };
    }, [categories]);

    // useEffect(() => {
    //     if (mounted) {
    //         filterObject.name = searchString;
    //         dispatch(filterProducts(filterObject));
    //     }
    // }, [searchString]);

    return (
        <ProductsGrid
            products={products}
            handleClick={handleClick}
            isLoading={isLoading}
            apiError={apiError}
        />
    );
};

export default ProductsHomePage;
