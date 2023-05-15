import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";

import LoadMore from "@common/Button/LoadMore";
import Product from "@components/ProductCard/ProductCard";
import { fetchProducts, searchProducts } from "@store/products/productsThunks";
import { CLEAR_PRODUCTS } from "@store/products/productsSlice";

import "./ProductsGrid.css";

export default function ProductsGrid() {
    const products = useSelector((state) => state.products.products);
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
        return () => {
            dispatch(CLEAR_PRODUCTS());
        };
    }, [searchString]);

    return (
        <div className="products-grid mb-3">
            <h3>Products</h3>
            <Row className="mx-0 justify-content-left">
                {products.map((product) => (
                    <Col xs={12} sm={6} md={4} lg={2} key={product.id}>
                        <Product product={product} inGrid={true} />
                    </Col>
                ))}
            </Row>
            <div className="d-flex justify-content-center">
                <LoadMore
                    handleClick={handleClick}
                    loading={isLoading}
                    error={apiError}
                    small={true}
                />
            </div>
        </div>
    );
}
