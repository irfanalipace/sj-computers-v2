import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { SkuTables } from "@components/SKU/SkuTables";
import { SkuProducts } from "@components/SKU/SkuProducts";

const SkuPage = () => {
const [reRender, setRender] = useState(0)
    return (
        <div className="sku-page-container container-xxl">
            <Row>
                <Col sm={5}>
                    <SkuTables render={reRender} setRender={setRender} />
                </Col>
                <Col sm={7}>
                    <SkuProducts reRender={reRender} />
                </Col>
            </Row>
        </div>
    );
};

export default SkuPage;
