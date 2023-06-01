import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./ProductType.css";
import ProductItem1 from "@components/homeproduct/productcategory/ProductItem1";
import ProductItem4 from "@components/homeproduct/productcategory/ProductItem4";
import ProgressiveImage from "react-progressive-image";
import addDesktop from "@images/categories/wellcome.webp";
import prograssivewellcom from "@images/categories/wellcomeprograssive.webp";
import prograssivewellcom2 from "@images/categories/welcomesprograssiveimg2.webp";
import categoryImg1 from "@images/categories/desktopweb.webp";
import categorybusinussweb from "@images/categories/businussweb.webp";
import wellsjcomputer from "@images/categories/welcomesjcomputer.webp";
import { LazyLoadImage } from "react-lazy-load-image-component";

export const ProductType = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    return (
        <div className="product-type-container">
            <div className="row mx-0">
                <div className="col-12 col-sm-5 col-md-5  col-lg-3">
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

                <div className="col-12 col-sm-5 col-md-5  col-lg-3">
                    <div className="product-type-section">
                        <h4 className="h4-heading">Gaming Desktop</h4>
                        <div className="categories-container">
                            <ProductItem1 image={categoryImg1} />
                        </div>
                        <Link
                            to="/category/gaming_desktops"
                            className="text-decoration-none"
                        >
                            <p className="section-link">Shop Now</p>
                        </Link>
                    </div>
                </div>
                <div className="col-12 col-sm-5 col-md-5  col-lg-3 ">
                    <div className="product-type-section">
                        <h4 className="h4-heading">Business Computer</h4>
                        <div className="categories-container">
                            <ProductItem1 image={categorybusinussweb} />
                        </div>
                        <Link
                            to="/category/business_computers"
                            className="text-decoration-none"
                        >
                            <p className="section-link">Shop Now</p>
                        </Link>
                    </div>
                </div>
                {/* <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div className="product-type-section">
                        <h4 className="h4-heading">Monitors</h4>
                        <div className="categories-container">
                            <ProductItem1 image={categoryImg2} />
                        </div>
                        <Link to="/" className="text-decoration-none">
                            <p className="section-link">Shop Now</p>
                        </Link>
                    </div>
                </div> */}
                <div className="col-12 col-sm-5 col-md-5  col-lg-3">
                    <div className="advertisement-section">
                        {isAuthenticated ? (
                            <div className="advertisement-heading">
                                {/* <img
                                    src={wellsjcomputer}
                                    className="advertisment-img"
                                /> */}

                                <ProgressiveImage
                                 
                                    src={wellsjcomputer}
                                  
                                    // High-resolution image URL
                                    placeholder={prograssivewellcom2} // Low-resolution image URL
                                   
                                >
                                    {(src, loading) => (
                                        <img
                                            className={`advertisment-img ${
                                                loading ? "blur" : ""
                                            }`}
                                            src={src}
                                            alt={"wellsjcomputer"}
                                        />
                                    )}
                                </ProgressiveImage>
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
                            {/* <img
                                src={addDesktop}
                                className="advertisment-img"
                            /> */}
                            {/* <img
                                src={addDesktop}
                                className="advertisment-img d-none d-lg-none"
                            /> */}

                            <ProgressiveImage
                                src={addDesktop} // High-resolution image URL
                                placeholder={prograssivewellcom} // Low-resolution image URL
                               
                            >
                                {(src, loading) => (
                                    <img
                                        className={`advertisment-img ${loading ? "blur" : ""}`}
                                        src={src}
                                        alt={"addDesktop"}
                                    />
                                )}
                            </ProgressiveImage>
                        </div>
                    </div>
                </div>
                {/* <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div className="product-type-section">
                        <h4 className="h4-heading">Gaming</h4>
                        <div className="categories-container">
                            <ProductItem1 image={categoryImg4} />
                        </div>
                        <Link to="/" className="text-decoration-none">
                            <p className="section-link">Shop Now</p>
                        </Link>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div className="product-type-section">
                        <h4 className="h4-heading">Business</h4>
                        <div className="categories-container">
                            <ProductItem1 image={categoryImg5} />
                        </div>
                        <Link to="/" className="text-decoration-none">
                            <p className="section-link">Shop Now</p>
                        </Link>
                    </div>
                </div> */}
            </div>
        </div>
    );
};
