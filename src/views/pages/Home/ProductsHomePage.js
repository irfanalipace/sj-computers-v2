import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchProducts, searchProducts } from "@store/products/productsThunks";
import { CLEAR_PRODUCTS } from "@store/products/productsSlice";
import ProductsGrid from "@components/ProductsGrid/ProductsGrid";

const ProductsHomePage = () => {
    const products = useSelector((state) => state.products.products) || [];
    const isLoading = useSelector((state) => state.products.isLoading);
    const currentPage = useSelector((state) => state.products.currentPage);
    const apiError = useSelector((state) => state.products.apiError);
    const searchString = useSelector((state) => state.products.searchString);
    const dispatch = useDispatch();

    const handleClick = () => {
        searchString
            ? dispatch(searchProducts(searchString, currentPage))
            : dispatch(fetchProducts(currentPage));
    };

    useEffect(() => {
        if (!searchString && products.length === 0) dispatch(fetchProducts());
        else dispatch(searchProducts(searchString, 1));
        return () => {
            dispatch(CLEAR_PRODUCTS());
        };
    }, [searchString]);
    return (
        <ProductsGrid
            products={products || []}
            handleClick={handleClick}
            isLoading={isLoading}
            apiError={apiError}
            smallBtn={true}
            heading={"products"}
        />
    );
};

export default ProductsHomePage;
