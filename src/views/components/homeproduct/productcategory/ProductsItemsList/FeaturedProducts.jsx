import React from "react";
import ProductItem4 from "../ProductItem4";
import ProductItem1 from "../ProductItem1";

import { Link } from "react-router-dom";
const FeaturedProducts = ({
    featuredItems,
    networkItems,
    upgradecomputers,
    featured,
    rams,
    TouchScreenLaptop,
}) => {
    return (
        <div>
            <div className="row mx-0">
                {featured.map((category, index) => (
                    <div key={index} className="col-12 col-sm-6 col-lg-3">
                        <Link
                            to={category.link}
                            className="text-decoration-none"
                        >
                            <div className="product-type-section">
                                <h2 className="h4-heading category-name">
                                    {category.name}
                                </h2>
                                <div
                                    style={{
                                        height: "25px",
                                        color: "#B12704",
                                        fontSize: "13px",
                                        fontWeight: "600",
                                    }}
                                >
                                    {category.extra}
                                </div>
                                <div className="categories-container">
                                    {index === 0 ? (
                                        <ProductItem4
                                            items={[
                                                featuredItems[0],
                                                featuredItems[1],
                                                featuredItems[2],
                                                featuredItems[3],
                                            ]}
                                        />
                                    ) : index === 1 ? (
                                        <ProductItem4
                                            items={[
                                                networkItems[0],
                                                networkItems[1],
                                                networkItems[2],
                                                networkItems[3],
                                            ]}
                                        />
                                    ) : index === 2 ? (
                                        // Customize for the third column
                                        <ProductItem4
                                            items={[
                                                upgradecomputers[0],
                                                upgradecomputers[1],
                                                upgradecomputers[2],
                                                upgradecomputers[3],
                                            ]}
                                        />
                                    ) : (
                                        // Customize for the fourth column
                                        <ProductItem1
                                            image={TouchScreenLaptop}
                                        />
                                    )}
                                </div>
                                <Link className="section-link" to={"/category"}>
                                    {category.link}
                                </Link>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedProducts;
