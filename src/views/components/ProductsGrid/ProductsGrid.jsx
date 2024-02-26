import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import LoadMore from "@common/Button/LoadMore";
import ProductCard from "@components/ProductCard/ProductCard";
import ProductCardLayout2 from "../ProductCard/ProductCardLayout2/ProductCardLayout2";
import ProductCardLayout3 from "../ProductCard/ProductCardLayout3/ProductCardLayout3";
import OverlayLoader from "@common/LoaderComponent/OverlayLoader";
import { Link } from "react-router-dom";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import "./ProductsGrid.css";

import Button from "@common/Button/Button";
import { useState } from "react";

export default function ProductsGrid({
    products,
    handleClick,
    isLoading,
    apiError,
    smallBtn = false,
    searchParams,
    productView,
    inFilterProducts,
}) {
    const isShowMore = useSelector((state) => state.products.isShowMore);

    return (
        <div className="products-grid-wrapper">
            <div className="products-grid product-gride-card-componets-mobile-screen mb-3 ">
                <Row
                    className="justify-content-left"
                    // style={{height: "137vh", overflowX: "auto"}}
                >
                    {products?.map((product, index) => (
                        <Col
                            xs={productView == "list" ? 12 : 6}
                            md={
                                inFilterProducts
                                    ? productView == "list"
                                        ? 12
                                        : 4
                                    : 3
                            }
                            lg={
                                inFilterProducts
                                    ? productView == "list"
                                        ? 12
                                        : 3
                                    : 2
                            }
                            key={"pi-" + index}
                        >
                            {/* <Link to={`${new URL(product?.url || location.href).pathname}`}> */}
                            {/* <ProductCard
                                product={product}
                                inGrid={true}
                                searchParams={searchParams}
                                productView={productView}
                            /> */}
                            <ProductCardLayout2
                                product={product}
                                inGrid={true}
                                searchParams={searchParams}
                                productView={productView}
                            />
                            {/* <ProductCardLayout3
                                product={product}
                                inGrid={true}
                                searchParams={searchParams}
                                productView={productView}
                            /> */}

                            {/* </Link> */}
                        </Col>
                    ))}
                </Row>

                {products.length > 11 && (
                    <div className="d-flex justify-content-center">
                        <LoadMore
                            handleClick={handleClick}
                            loading={isShowMore}
                            error={apiError}
                            small={smallBtn}
                        />
                    </div>
                )}
                <OverlayLoader isLoading={isLoading} />
            </div>
        </div>
    );
}
