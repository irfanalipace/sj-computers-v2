import { Container, Row, Col } from "react-bootstrap";
import { SkuTables } from "@components/SKU/SkuTables";
import { SkuProducts } from "@components/SKU/SkuProducts";

const SkuPage = () => {
    return (
        <Container>
            <Row>
                <Col sm={6}>
                    <SkuTables />
                </Col>
                <Col sm={6}>
                    <SkuProducts />
                </Col>
            </Row>
        </Container>
    );
};

export default SkuPage;
