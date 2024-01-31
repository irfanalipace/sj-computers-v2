import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import OverlayLoader from "@common/LoaderComponent/OverlayLoader";

import ProductsGrid from "@components/ProductsGrid/ProductsGrid";
import { SET_SEARCH_STRING } from "@store/products/productsSlice";
import { searchProductsApi } from "@api/products";

import "./ProductsBySearch.css";
import { useSearchParams } from "react-router-dom";

const ProductsList = () => {
    const selectedCategory = useSelector(
        (state) => state.products.selectedCategory
    );
    const searchString = useSelector((state) => state.products.searchString);
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [apiError, setApiError] = useState("");
    const [pagination, setPagination] = useState({ page: 1, per_page: 12 });
    const tempVariables = useRef({ searchString: "", selectedCategory: "" });

    const _searchString = searchParams.get("s");
    if (_searchString !== searchString) {
        dispatch(SET_SEARCH_STRING(_searchString));
    }

    const isNewSearch = () => {
        return (
            searchString !== tempVariables.current.searchString ||
            selectedCategory !== tempVariables.current.selectedCategory
        );
    };

    const handleSearch = async () => {
        if (searchString) {
            try {
                setIsLoading(true);
                const paginationProps = { ...pagination };
                if (isNewSearch()) {
                    paginationProps.page = 1;
                }
                const response = await searchProductsApi({
                    name: searchString,
                    category_id: selectedCategory,
                    ...paginationProps,
                });
                if (!isNewSearch()) {
                    setProducts((prev) => [...prev, ...response.data.data]);
                } else setProducts([...response.data.data]);
                setPagination({
                    page: response.data.current_page + 1,
                    per_page: response.data.per_page,
                });
                tempVariables.current = { searchString, selectedCategory };
            } catch (error) {
                setApiError(error?.data?.message);
                console.print("Something went wrong in products", error);
            }
            setIsLoading(false);
        }
    };

    useEffect(() => {
        return () => dispatch(SET_SEARCH_STRING(""));
    }, []);

    useEffect(() => {
        handleSearch();
    }, [searchString, selectedCategory]);

    return (
        <>
            <div className="search-results container-lg">
                {products?.length > 0 ? (
                    <>
                        <div className="d-flex justify-content-space-between align-items-center heading">
                            <h3>Searched Products</h3>
                        </div>
                        <ProductsGrid
                            products={products || []}
                            handleClick={handleSearch}
                            isLoading={isLoading}
                            apiError={apiError}
                            smallBtn={true}
                            searchParams={{
                                redirectedFrom: "Search",
                                redirectedFromPath: `/products/search?s=${searchString}`,
                            }}
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
