import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import OverlayLoader from "@common/LoaderComponent/OverlayLoader";

import {
    fetchProducts,
    // searchProducts,
    searchProducts,
} from "@store/products/productsThunks";
import ProductsGrid from "@components/ProductsGrid/ProductsGrid";
import { SET_SEARCH_STRING } from "@store/products/productsSlice";

import "./ProductsBySearch.css";

const ProductsList = () => {
    const {
        searchString,
        selectedCategory,
        products,
        isLoading,
        currentPage,
        apiError,
    } = useSelector((state) => state.products);
    const dispatch = useDispatch();
    console.log("products: ", products);
    const handleSearch = () => {
        if (searchString) {
            dispatch(
                searchProducts({
                    name: searchString,
                    category_id: selectedCategory,
                    page: currentPage,
                    per_page: 12,
                })
            );
        } else dispatch(fetchProducts(currentPage, true));
    };

    useEffect(() => {
        if (searchString)
            dispatch(
                searchProducts({
                    name: searchString,
                    category_id: selectedCategory,
                    page: currentPage,
                    per_page: 12,
                })
            );
    }, [searchString]);

    useEffect(() => {
        return () => dispatch(SET_SEARCH_STRING(""));
    }, []);

    return (
        <>
            <div className="search-results container-lg">
                {products.length > 0 ? (
                    <>
                        <div className="d-flex justify-content-space-between align-items-center heading">
                            <h3>Searched Products</h3>
                        </div>
                        <ProductsGrid
                            products={products || []}
                            handleSearch={handleSearch}
                            isLoading={isLoading}
                            apiError={apiError}
                            smallBtn={true}
                        />
                    </>
                ) : (
                    <>
                        {!isLoading ? (
                            <h3 className="heading">No Products Found</h3>
                        ) : (
                            <OverlayLoader isLoading={isLoading} />
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default ProductsList;
