import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { SkuTables } from "@components/SKU/SkuTables";
import { SkuProducts } from "@components/SKU/SkuProducts";
<<<<<<< HEAD

=======
>>>>>>> origin/test-merge-3

const SkuPage = () => {
    const [reRender, setRender] = useState(0);
    return (
<<<<<<< HEAD
 
 <div className="sku-page-container container-xxl">
=======
        <div className="sku-page-container container-xxl">
>>>>>>> origin/test-merge-3
            <Row>
                <Col sm={5}>
                    <SkuTables render={reRender} setRender={setRender} />
                </Col>
                <Col sm={7}>
                    <SkuProducts reRender={reRender} />
                </Col>
            </Row>
        </div>
<<<<<<< HEAD
      
       
=======
>>>>>>> origin/test-merge-3
    );
};

export default SkuPage;
