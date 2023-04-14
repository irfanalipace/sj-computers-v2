import { Link } from "react-router-dom";
import "./ProductType.css";
import ProductItem1 from "@components/homeproduct/productcategory/ProductItem1";
import ProductItem4 from "@components/homeproduct/productcategory/ProductItem4";

import imgcard from "@images/product/side-img.png";
export const ProductType = () => {
    return (
        <div className="product-type-container">
            <div className="row">
                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div className="product-section">
                        <h4 className="h4-heading">Shop by Category</h4>
                        <ProductItem4 />
                        <Link to="/" className="text-decoration-none">
                            <p className="section-link">Shop Now</p>
                        </Link>
                    </div>
                </div>

                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div className="product-section">
                        <h4 className="h4-heading">Laptops</h4>
                        <ProductItem1 />
                        <Link to="/" className="text-decoration-none">
                            <p className="section-link">Shop Now</p>
                        </Link>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div className="product-section">
                        <h4 className="h4-heading">Laptops</h4>
                        <ProductItem1 />
                        <Link to="/" className="text-decoration-none">
                            <p className="section-link">Shop Now</p>
                        </Link>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div className="advertisement-section">
                        <div className="advertisement-heading">
                            <h4 className="h2-cart">
                                Sign up to get latest <br></br>update on sale
                            </h4>
                            <button type="button" className="button-save">
                                Login Safely
                            </button>
                        </div>

                        <div className="product-section-advertisment">
                            <img src={imgcard} className="advertisment-img" />
                        </div>
                    </div>
                </div>
                {/* <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div className="product-section">
                        <h4>Shop by Category</h4>
                        <ProductItem4 />
                        <Link to="/" className="text-decoration-none">
                            <p>Start here</p>
                        </Link>
                    </div>
                </div> */}

                {/* <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div className="product-section">
                        <h4>Shop by Category</h4>
                        <ProductItem4 />
                        <Link to="/" className="text-decoration-none">
                            <p>Start here</p>
                        </Link>
                    </div>
                </div> */}
                {/* <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div className="product-section">
                        <h4>Shop by Category</h4>
                        <ProductItem4 />
                        <Link to="/" className="text-decoration-none">
                            <p>Start here</p>
                        </Link>
                    </div>
                </div> */}
                {/* <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div className="product-section">
                        <h4>Laptops</h4>
                        <ProductItem1 />
                        <Link to="/" className="text-decoration-none">
                            <p>Start here</p>
                        </Link>
                    </div>
                </div> */}
            </div>
        </div>
    );
};
