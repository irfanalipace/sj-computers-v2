import React, { useEffect } from "react";
import "./MobileRecommand.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../../../core/store/products/productsThunks";
import { Link } from "react-router-dom";

const MobileRecommand = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state?.products?.products);

    useEffect(() => {
        getProduct();
    }, [products]);

    const getProduct = async () => {
        if (!products?.length) {
            try {
                await dispatch(fetchProducts());
            } catch (error) {}
        }
    };

    return (
        <div className="dev-recommand">
            <div className="reommand-products-heading">
                <p style={{ fontSize: "18px" }}>Recommended Products</p>
            </div>
            {products &&
                products.length > 0 &&
                products.slice(1, 4).map((product, index) => (
                    <div key={index} className="row">
                        <Link
                            to={`${product.url}`}
                            className="recommended-product-link-mobile-home-page"
                        >
                            <div className="col-4">
                                <div className="recommanditions-products-home-pages">
                                    <img
                                        src={product?.image}
                                        alt={`Product ${index + 2}`}
                                    />
                                </div>
                            </div>
                            <div className="col-8">
                                <div>
                                    <h6>
                                        {" "}
                                        {product?.name?.length > 60
                                            ? `${product?.name.substring(
                                                  0,
                                                  60,
                                              )}...`
                                            : product?.name}
                                    </h6>
                                </div>
                                <p>${product?.price}</p>
                            </div>
                        </Link>
                    </div>
                ))}
        </div>
    );
};

export default MobileRecommand;
