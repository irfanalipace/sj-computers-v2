import { Row, Col } from "react-bootstrap";
import LoadMore from "@common/Button/LoadMore";
import Product from "@components/ProductCard/ProductCard";

import "./ProductsGrid.css";

export default function ProductsGrid({
    products,
    handleClick,
    isLoading,
    apiError,
    smallBtn = false,
}) {
    return (
        <div className="products-grid mb-3">
            <Row className="mx-0 justify-content-left">
                {products?.map((product) => (
                    <Col xs={6} md={4} lg={2} key={product.id}>
                        <Product product={product} inGrid={true} />
                    </Col>
                ))}
            </Row>
            <div className="d-flex justify-content-center">
                <LoadMore
                    handleClick={handleClick}
                    loading={isLoading}
                    error={apiError}
                    small={smallBtn}
                />
            </div>
        </div>
    );
}
