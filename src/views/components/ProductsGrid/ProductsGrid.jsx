import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import LoadMore from "@common/Button/LoadMore";
import ProductCard from "@components/ProductCard/ProductCard";
import OverlayLoader from "@common/LoaderComponent/OverlayLoader";
import { Link } from "react-router-dom";
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
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
}) {
    const isShowMore = useSelector((state) => state.products.isShowMore);
    const [productView, setProductView] = useState("grid")

    const productViewGrid = () => {
        setProductView("grid")
    }

    const productViewList = () => {
        setProductView("list")
    }

    return (
        <div className="products-grid-wrapper">
            <div className="products-grid product-gride-card-componets-mobile-screen mb-3 ">
                <div className="product-grid-heading">Best Monitors for Desktops</div>
                <p className="product-grid-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem.</p>
                <div className="product-length-container">
                    1-12 of over 1,000 results for <span style={{color: "#52AC66", margin: "0px 5px"}}> Monitors </span>
                    <div className="buttons">
                        <span className="view-button" style={{backgroundColor: productView == "list" ? "#318243" : "", color: productView == "list" ? "white" : "#318243"}} onClick={productViewList}><FormatAlignLeftIcon fontSize="small" /> </span>
                        <span className="view-button" style={{backgroundColor: productView == "grid" ? "#318243" : "", color: productView == "grid" ? "white" : "#318243"}} onClick={productViewGrid}><ViewModuleIcon fontSize="small" /> </span>
                    </div>    
                </div>
                <Row className="justify-content-left" 
                    // style={{height: "137vh", overflowX: "auto"}}
                >
                    {products?.map((product, index) => (
                        <Col xs={productView == "list" ? 12 : 6} md={productView == "list" ? 12 : 4} lg={productView == "list" ? 12 : 3} key={"pi-" + index}>
                            {/* <Link to={`${new URL(product?.url || location.href).pathname}`}> */}
                            <ProductCard
                                product={product}
                                inGrid={true}
                                searchParams={searchParams}
                                productView={productView}
                            />

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
