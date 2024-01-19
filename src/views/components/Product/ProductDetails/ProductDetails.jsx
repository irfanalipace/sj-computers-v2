import { useState, useEffect } from "react";

import { snakeCaseToPrettyText } from "@utils/helpers";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import "./ProductDetail.css";
import Tooltip from "../../Tooltip";
import { Stack, Typography } from "@mui/material";
import { Tab, Tabs } from "react-bootstrap";
import CustomTab from "./CustomTab";
import TabContent from "./TabContnet";
import ReturnPolicy from "./ReturnPolicy";
import ReviewSection from "./ReviewSection";
import PriceWithLabel from "../../common/PriceWithLabel";

let acceptedKeys = [
    "brand",
    "cpu_model",
    "hard_disk",
    "operating_system",
    "ram_memory",
];

const ProductDetails = ({ product }) => {
    const [description, setDescription] = useState([]);
    const [productDetails, setProductDetails] = useState([]);
    const [key, setKey] = useState("home");

    useEffect(() => {
        const parseProductDetailsArray = () => {
            if (!product?.description) return;

            const productDescriptionArray = Object.entries(product.description)
                .map(([key, value]) => {
                    if (key === "bullet_point") {
                        setDescription(value);
                        return null;
                    }

                    let _value = "";
                    if (Array.isArray(value)) {
                        const firstValue = value[0];
                        if (firstValue?.value) {
                            let unit = firstValue.unit || "";
                            _value = `${firstValue.value} ${unit}`;
                        } else if (
                            firstValue?.installed_size &&
                            Array.isArray(firstValue.installed_size)
                        ) {
                            let unit = firstValue.installed_size[0]?.unit || "";
                            _value = `${firstValue.installed_size[0]?.value} ${unit}`;
                        } else if (
                            firstValue?.family &&
                            Array.isArray(firstValue.family)
                        ) {
                            _value = firstValue.family[0]?.value || "";
                        } else if (
                            firstValue?.size &&
                            Array.isArray(firstValue.size)
                        ) {
                            let unit = firstValue.size[0]?.unit || "";
                            _value = `${firstValue.size[0]?.value} ${unit}`;
                        }
                    }

                    if (acceptedKeys.includes(key)) {
                        return {
                            key: snakeCaseToPrettyText(key),
                            value: _value,
                        };
                    }

                    return null;
                })
                .filter(Boolean);

            setProductDetails(productDescriptionArray);
        };
        parseProductDetailsArray();
    }, [product?.description]);

    return (
        <div className="container">
            <div>
                <p className="item-title">{product?.name}</p>
            </div>
            {/* <div className="instock-detail ">
                <p className="most-demandind">
                    {product?.in_stock > 0 ? (
                        <span className="text-green">In Stock</span>
                    ) : (
                        <span className="text-danger">Out of stock</span>
                    )}
                </p>
            </div> */}
            <Typography
                color={"#007185"}
                fontWeight={400}
                fontSize={"14px"}
                lineHeight={"16px"}
            >
                Most demanding
            </Typography>
            <div className="row px-0 res deatisl-data-set-image-view-data-details">
                <div className="col-12 justify-content-center justify-content-md-start  d-flex align-items-center  product-review">
                    <ReviewSection product={product} />
                </div>
                {/* <div className="col-12 justify-content-center justify-content-md-start d-flex"> */}
                {/* <button className="selling-button">
                        Top <span className="selling-color">Selling</span>
                    </button> */}
                {/* <Stack className="ms-4">
                        <div className="details-dev ">
                            <span className="size-text-details">
                                Items Available
                            </span>
                        </div>

                        <div className="items-list-data-mobile-stayle">
                            <button
                                className="product-info border-0"
                                style={{ backgroundColor: "white" }}
                            >
                                {product?.quantity > 0
                                    ? product?.quantity + " items"
                                    : "Out of stock"}
                            </button>
                        </div>
                    </Stack> */}
                {/* </div> */}
            </div>

            <div className="divsection">
                <hr className="hr-card-details"></hr>
                <div className="cart-details-text">
                    <div className="row">
                        <div className="col-md-12 color-text">
                            <span className="$-color">$</span>
                            {product?.price?.toString().split(".")[0]}
                            <sup>
                                {product?.price?.toString().split(".")[1]}
                            </sup>
                        </div>
                    </div>
                </div>
            </div>
            <div className="content">
                <div className="row">
                    <div className="col-md-12 shipping-button">
                        {/* <p className="shipping-text">
                            Shipping fee to Los Angeles $10 only
                         
                        </p> */}
                    </div>
                </div>
            </div>
            {/* 
            <hr className="hr-card-details"></hr>

            <p className="more-styles">More Styles:</p>

            <div className="text-box-details">
                <div className="row">
                    <div className="button-detail-item">
                        <Link
                            to="#"
                            className="text-decoration-none"
                            style={{ color: "#333333" }}
                        >
                            <h6 className="card-title1">24” Full HD IPS</h6>
                            <p className="card-text1">US$ 159.97</p>
                        </Link>
                    </div>
                    <div className="button-detail-item">
                        <Link
                            to="#"
                            className="text-decoration-none"
                            style={{ color: "#333333" }}
                        >
                            <h6 className="card-title1">27” Full HD IPS</h6>
                            <p className="card-text1">US$ 149.97</p>
                        </Link>
                    </div>
                </div>
            </div> */}

            <hr className="hr-card-details"></hr>
            <PriceWithLabel price={product?.price} />
            <Tooltip content={<ReturnPolicy />}>
                <Typography
                    fontWeight={400}
                    color={"#007185"}
                    fontSize={"14px"}
                    lineHeight={"14px"}
                >
                    Free Return
                    <ExpandMoreIcon
                        sx={{
                            width: "15px",
                            height: "15px",
                            color: "#B12704",
                            mb: 0.5,
                        }}
                    />
                </Typography>
            </Tooltip>
            <Typography
                sx={{ mt: 1.8 }}
                fontWeight={400}
                fontSize={"13px"}
                lineHeight={"15px"}
            >
                Variations:
            </Typography>
            <Tabs
                style={{ border: "none" }}
                id="controlled-tab"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3 "
            >
                <Tab
                    eventKey="home"
                    title={<CustomTab currentTab={key} eventKey="home" />}
                >
                    <TabContent
                        productDetails={productDetails}
                        product={product}
                    />
                </Tab>
                <Tab
                    eventKey="profile"
                    title={<CustomTab currentTab={key} eventKey="profile" />}
                >
                    <TabContent
                        productDetails={productDetails}
                        product={product}
                    />
                </Tab>
            </Tabs>

            <hr className="hr-card-details"></hr>

            <div className="col-md-12 items-details-description">
                <h3 className="items-text-style">About this item</h3>

                <ul type="1">
                    {description?.map((item, index) => (
                        <li key={index}>{item.value}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProductDetails;
