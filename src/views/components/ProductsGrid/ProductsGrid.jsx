import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import LoadMore from "@common/Button/LoadMore";
import ProductCard from "@components/ProductCard/ProductCard";
import OverlayLoader from "@common/LoaderComponent/OverlayLoader";
import { Link } from "react-router-dom";
import "./ProductsGrid.css";

import Button from "@common/Button/Button";

export default function ProductsGrid({
    products,
    handleClick,
    isLoading,
    apiError,
    smallBtn = false,
}) {
    const isShowMore = useSelector((state) => state.products.isShowMore);

    return (
        <div className="products-grid-wrapper">
            <div className="products-grid product-gride-card-componets-mobile-screen mb-3 ">
                <Row className="mx-0 justify-content-left">
                    {products?.map((product) => (
                        <Col xs={6} md={4} lg={2} key={product.id}>
                            {/* <Link to={`${new URL(product?.url || location.href).pathname}`}> */}
                            <ProductCard product={product} inGrid={true} />

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
