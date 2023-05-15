import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./ProductType.css";
import ProductItem1 from "@components/homeproduct/productcategory/ProductItem1";
import ProductItem4 from "@components/homeproduct/productcategory/ProductItem4";

import addDesktop from "@images/advertisement/advertisement-desktop.png";
import addMobile from "@images/advertisement/advertisement-mobile.png";
import welcomeImage from "@images/advertisement/welcome-banner.png";

export const ProductType = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    return (
        <div className="product-type-container">
            <div className="row">
                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div className="product-type-section">
                        <h4 className="h4-heading">Shop by Category</h4>
                        <div className="categories-container">
                            <ProductItem4 />
                        </div>
                        <Link to="/" className="text-decoration-none">
                            <p className="section-link">Shop Now</p>
                        </Link>
                    </div>
                </div>

                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div className="product-type-section">
                        <h4 className="h4-heading">Laptops</h4>
                        <div className="categories-container">
                            <ProductItem1 />
                        </div>
                        <Link to="/" className="text-decoration-none">
                            <p className="section-link">Shop Now</p>
                        </Link>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div className="product-type-section">
                        <h4 className="h4-heading">Desktops</h4>
                        <div className="categories-container">
                            <ProductItem1 />
                        </div>
                        <Link to="/" className="text-decoration-none">
                            <p className="section-link">Shop Now</p>
                        </Link>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div className="advertisement-section">
                        {isAuthenticated ? (
                            <div className="advertisement-heading">
                                <img
                                    src={welcomeImage}
                                    className="advertisment-img"
                                />
                            </div>
                        ) : (
                            <div className="advertisement-heading">
                                <h4 className="h2-cart">
                                    Sign up to get latest <br></br>update on
                                    sale
                                </h4>
                                <Link to="/login">
                                    <button
                                        type="button"
                                        className="button-save"
                                    >
                                        Login Safely
                                    </button>
                                </Link>
                            </div>
                        )}
                        <div className="product-section-advertisment">
                            <img
                                src={addDesktop}
                                className="advertisment-img d-lg-block d-none"
                            />
                            <img
                                src={addMobile}
                                className="advertisment-img d-lg-none d-block"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
