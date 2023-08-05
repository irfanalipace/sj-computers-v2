import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import OverlayLoader from "@common/LoaderComponent/OverlayLoader";

import {
    fetchProducts,
    // searchProducts,
    searchProducts,
} from "@store/products/productsThunks";
import ProductsGrid from "@components/ProductsGrid/ProductsGrid";
import "./ProductsBySearch.css";
import PageWrapper from "../../../PageWrapper";

const ProductsList = () => {
    const { searchString, products, isLoading, currentPage, apiError } =
        useSelector((state) => state.products);
    const dispatch = useDispatch();

    const handleClick = () => {
        if (searchString) {
            dispatch(searchProducts(searchString, currentPage));
        } else dispatch(fetchProducts(currentPage, true));
    };

    useEffect(() => {
        if (searchString) dispatch(searchProducts(searchString));
    }, [searchString]);

    return (
        <PageWrapper title='SJ | About'>
  <>
            <div className="search-results container-lg">
                {products.length > 0 ? (
                    <>
                        <div className="d-flex justify-content-space-between align-items-center heading">
                            <h3>Searched Products</h3>
                        </div>
                        <ProductsGrid
                            products={products || []}
                            handleClick={handleClick}
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
        </PageWrapper>
      
    );
};

export default ProductsList;
