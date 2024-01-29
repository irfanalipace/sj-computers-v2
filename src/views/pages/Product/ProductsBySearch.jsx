import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import OverlayLoader from "@common/LoaderComponent/OverlayLoader";

import ProductsGrid from "@components/ProductsGrid/ProductsGrid";
import { SET_SEARCH_STRING } from "@store/products/productsSlice";
import { searchProductsApi } from "@api/products";

import "./ProductsBySearch.css";

const ProductsList = () => {
    const selectedCategory = useSelector(
        (state) => state.products.selectedCategory
    );
    const searchString = useSelector((state) => state.products.searchString);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [apiError, setApiError] = useState("");
    const [pagination, setPagination] = useState({ page: 1, per_page: 12 });
    const tempVariables = useRef({ searchString: searchString });
    const handleSearch = async () => {
        if (searchString) {
            // dispatchSearch();
            try {
                setIsLoading(true);
                const paginationProps = { ...pagination };
                console.log(
                    "1111 search string: ",
                    searchString,
                    tempVariables.current.searchString
                );
                if (searchString == tempVariables.current.searchString) {
                    paginationProps.page = 1;
                }
                const response = await searchProductsApi({
                    name: searchString,
                    category_id: selectedCategory,
                    ...pagination,
                });
                if (searchString == tempVariables.current.searchString) {
                    setProducts((prev) => [...prev, response.data.data]);
                } else setProducts(response.data.data);
                setPagination({
                    page: response.data.current_page + 1,
                    per_page: prev.per_page,
                });
                tempVariables.current.searchString = searchString;
            } catch (error) {
                setApiError(error?.data?.message);
                console.print("Something went wrong in products", error);
            }
            setIsLoading(false);
        }
    };

    useEffect(() => {
        handleSearch();
    }, [searchString, selectedCategory]);

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
                            handleClick={handleSearch}
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
