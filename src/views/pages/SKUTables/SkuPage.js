import { Row, Col } from "react-bootstrap";
import { SkuTables } from "@components/SKU/SkuTables";
import { SkuProducts } from "@components/SKU/SkuProducts";

const SkuPage = () => {
    return (
        <div className="sku-page-container container-xxl">
            <Row>
                <Col sm={6}>
                    <SkuTables />
                </Col>
                <Col sm={6}>
                    <SkuProducts />
                </Col>
            </Row>
        </div>
    );
};

export default SkuPage;
