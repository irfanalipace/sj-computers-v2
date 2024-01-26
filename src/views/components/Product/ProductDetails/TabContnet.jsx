import React from "react";

export default function TabContent({ productDetails, product }) {
    return (
        <div className="col-md-12 list-style-margin">
            <ul className="product-specs mt-0 ">
                {productDetails?.map((item, index) => (
                    <div key={item.key}>
                        {item?.value && (
                            <li
                                key={`${item.key}-${index}`}
                                className="row mx-0 "
                            >
                                <div className="col-md-3 col-6 ps-1 ">
                                    <span className="item12  ">
                                        {item?.key}
                                    </span>
                                </div>
                                <div className="col-md-9 col-6">
                                    <span className="items  text-capitalize">
                                        {item?.value}
                                    </span>
                                </div>
                            </li>
                        )}
                    </div>
                ))}
                <li className="row mx-0">
                    <div className="col-md-3 col-6 ps-1">
                        <span className="item12 text-capitalize">ASIN</span>
                    </div>
                    <div className="col-md-9 col-6">
                        <span className="items text-capitalize">
                            {product?.asin}
                        </span>
                    </div>
                </li>
            </ul>
        </div>
    );
}
