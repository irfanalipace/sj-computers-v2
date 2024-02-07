import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./ProductType.css";
import ProductItem1 from "@components/homeproduct/productcategory/ProductItem1";
import ProductItem4 from "@components/homeproduct/productcategory/ProductItem4";
import addDesktop from "@images/categories/wellcome.webp";
import categoryImg1 from "@images/categories/desktopweb.webp";
import categorybusinussweb from "@images/categories/businussweb.webp";
import btoimg from "@images/categories/btoweb.webp";
import laptopimg from "@images/categories/laptopweb.webp";
import { Rating } from "@mui/material";
import FontAwesome from "react-fontawesome";
// import monitorimg from "@images/categories/monitorweb.webp";
import { Stack, Typography } from "@mui/material";
import monitorimg from "@images/categories/desktopweb.webp";
import desktopimgweb from "@images/categories/desktopweb-page.webp";
import wellsjcomputer from "@images/categories/welcomesjcomputer.webp";
import image1 from "../../../assets/images/homepageImage/featureImages/image1.png";
import image2 from "../../../assets/images/homepageImage/featureImages/image2.png";
import image3 from "../../../assets/images/homepageImage/featureImages/image3.png";
import image4 from "../../../assets/images/homepageImage/featureImages/image4.png";
import linkrouter from "../../../assets/images/homepageImage/networkimags/d-link-router.png";
import modem from "../../../assets/images/homepageImage/networkimags/d-link-modem.png";
import img1 from "../../../assets/images/homepageImage/upgradecomputers/image1.png";
import img2 from "../../../assets/images/homepageImage/upgradecomputers/image2.png";
import img3 from "../../../assets/images/homepageImage/upgradecomputers/image3.png";
import rams from "../../../assets/images/homepageImage/RamMem/rams.png";
import sellingimg1 from "../../../assets/images/homepageImage/sellingproducts/image1.png";
import sellingimg2 from "../../../assets/images/homepageImage/sellingproducts/image2.png";
import sellingimg3 from "../../../assets/images/homepageImage/sellingproducts/image3.png";
import sellingimg4 from "../../../assets/images/homepageImage/sellingproducts/image4.png";
import sellingimg5 from "../../../assets/images/homepageImage/sellingproducts/image5.png";
import sellingimg6 from "../../../assets/images/homepageImage/sellingproducts/image6.png";
import sellingimg7 from "../../../assets/images/homepageImage/sellingproducts/image7.png";
import sellingimg8 from "../../../assets/images/homepageImage/sellingproducts/image8.png";
import SellingProducts from "../MobileCategory/SellingProducts/SellingProducts";
import Recommendation from "../Recommendation/Recommendation";
import { fetchProducts } from "../../../core/store/products/productsThunks";
import moment from "moment";

import { faStar } from "@fortawesome/free-solid-svg-icons";
import StarRatings from "react-star-ratings";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import ProductItem3 from "./productcategory/ProductItem3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gaminimg1 from "@images/product/item3/image1.png";
import gaminimg2 from "@images/product/item3/image2.png";
import gaminimg3 from "@images/product/item3/image3.png";
import gamingProducts1 from "../../../assets/images/gaming-images/gameimage3.png";
import gamingProducts2 from "../../../assets/images/gaming-images/gameimage1.png";
import gamingProducts3 from "../../../assets/images/gaming-images/gameimage2.png";
import scanimages from "../../../assets/images/gaming-images/scan-images.png";
import rectangle1 from "../../../assets/images/flashsaleimaes/rectangle1.png";
import rectangle2 from "../../../assets/images/flashsaleimaes/rectangle2.png";
import rectangle3 from "../../../assets/images/flashsaleimaes/rectangle3.png";
import rectangle4 from "../../../assets/images/flashsaleimaes/rectangle4.png";
import rectangle5 from "../../../assets/images/flashsaleimaes/rectangle5.png";
const categoryArray = [
    {
        name: "Shop by Category",
        link: "Shop Now",
    },
    {
        name: "Gaming Desktop",
        link: "Shop Now",
    },
    {
        name: "Business",
        link: "Shop Now",
    },
];

const gamingArray = [
    {
        name: "New Arrivals in Gaming Systems",
        link: "Shop Now",
    },
    {
        name: "Work Stations for Professionals",
        link: "Shop Now",
    },
    {
        name: "Latest Activity on Advance Laptops",
        link: "Shop Now",
    },
    {
        name: "Monitors",
        link: "Shop Now",
    },
];
const featured = [
    {
        name: "Featured Products",
        link: "Shop Now",
    },
    {
        name: "Networking",
        link: "Shop Now",
    },
    {
        name: "Upgrade Storage Space | S.J Computers",
        link: "Shop Now",
    },
    {
        name: "Rams",
        link: "Shop Now",
    },
];

const ProductType = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const products = useSelector((state) => state?.products.products);
    const currentDate = moment();
    const oneDayAgo = moment().subtract(1, 'days');
    const duration = moment.duration(currentDate.diff(oneDayAgo));
    const hours = duration.hours();
    const minutes = duration.minutes();

    console.log(products, "fdshfhshfhs");
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

    const categoryItems = [
        {
            image: btoimg,
            categoryLink: "/category/bto",
            categoryName: "BTO",
        },
        {
            image: laptopimg,
            categoryLink: "/category/laptops",
            categoryName: "Laptop",
        },
        {
            image: monitorimg,
            categoryLink: "/category/desktop",
            categoryName: "Desktop",
        },
        {
            image: desktopimgweb,
            categoryLink: "/category/gaming_desktops",
            categoryName: "Gaming Desktops",
        },
    ];
    const gamingItems = [
        {
            image: gaminimg3,
            categoryLink: "/category/bto",
            categoryName: "Product Name",
        },
        {
            image: scanimages,
            categoryLink: "/category/laptops",
            categoryName: "Lorem Ipsum | up to 30% off",
        },
        {
            image: gaminimg1,
            categoryLink: "/category/desktop",
            categoryName: "Product Name",
        },
    ];
    const featuredItems = [
        {
            image: image1,
            categoryLink: "/category/bto",
            categoryName: "Gaming Monitors | up to 50 % off",
        },
        {
            image: image2,
            categoryLink: "/category/laptops",
            categoryName: "Lorem Ipsum | up to 30% off",
        },
        {
            image: image4,
            categoryLink: "/category/desktop",
            categoryName: "Product Name",
        },
        {
            image: image3,
            categoryLink: "/category/gaming_desktops",
            categoryName: "Product Category",
        },
    ];

    const networkItems = [
        {
            image: linkrouter,
            categoryLink: "/category/bto",
            categoryName: "D-Link Router",
        },
        {
            image: modem,
            categoryLink: "/category/laptops",
            categoryName: "D-Link Modem",
        },
        {
            image: modem,
            categoryLink: "/category/desktop",
            categoryName: "D-Link Device",
        },
        {
            image: linkrouter,
            categoryLink: "/category/gaming_desktops",
            categoryName: "D-Link Router",
        },
    ];
    const upgradecomputers = [
        {
            image: img1,
            categoryLink: "/category/bto",
            categoryName: "D-Link Router",
        },
        {
            image: img2,
            categoryLink: "/category/laptops",
            categoryName: "D-Link Modem",
        },
        {
            image: img3,
            categoryLink: "/category/desktop",
            categoryName: "D-Link Device",
        },
        {
            image: img1,
            categoryLink: "/category/gaming_desktops",
            categoryName: "D-Link Router",
        },
    ];
    const Sellingimages = [
        sellingimg1,
        sellingimg2,
        sellingimg3,
        sellingimg4,
        sellingimg5,
        sellingimg6,
        sellingimg7,
        sellingimg8,
        sellingimg1,
        sellingimg2,
        sellingimg3,
        sellingimg4,
        sellingimg5,
        sellingimg6,
        sellingimg7,
        sellingimg8,
    ];
    const fleshimages = [
        rectangle1,
        rectangle2,
        rectangle3,
        rectangle4,
        rectangle5,
        rectangle1,
        rectangle2,
        rectangle3,
        rectangle4,
        rectangle5,
    ];

    return (
        <div className="product-type-container">
            <div className="row mx-0">
                {categoryArray.map((category, index) => (
                    <div key={index} className="col-12 col-sm-6 col-lg-3">
                        <Link to={"/category"} className="text-decoration-none">
                            <div className="product-type-section">
                                <h2 className="h4-heading category-name">
                                    {category.name}
                                </h2>
                                <div className="categories-container">
                                    {index === 0 ? (
                                        <ProductItem4 items={categoryItems} />
                                    ) : (
                                        <ProductItem1
                                            image={
                                                index === 1
                                                    ? categoryImg1
                                                    : categorybusinussweb
                                            }
                                        />
                                    )}
                                </div>
                                <p className="section-link" to={"/category"}>
                                    {category.link}
                                </p>
                            </div>
                        </Link>
                    </div>
                ))}
                <div className="col-12 col-sm-6 col-lg-3">
                    <div className="dev-sections-two-sctions">
                        {isAuthenticated ? (
                            <div className="advertisement-heading">
                                <img
                                    className={`advertisment-img`}
                                    src={wellsjcomputer}
                                    alt={"wellsjcomputer"}
                                />
                            </div>
                        ) : (
                            <div className="advertisement-heading">
                                <h2 className="h2-cart">
                                    Sign up to get the latest <br></br>update on
                                    sale
                                </h2>
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
                        <div className="product-type-section">
                            {products && products?.length > 0 && (
                                <>
                                 <div style={{textAlign:'center'}}>
                                 <img
                                        className={`advertisment-img-products-imges`}
                                        src={products[0].image}
                                        alt={"addDesktop"}
                                       
                                    />
                                    </div>

                                    <h5
                                        className=""
                                        style={{ fontSize: "16px" }}
                                    >
                                        {products[0].name.length > 30
                                            ? `${products[0].name.substring(
                                                  0,
                                                  30
                                              )}...`
                                            : products[0].name}
                                    </h5>
                                    <Stack
                                        mb={2}
                                        alignItems={"start"}
                                        spacing={1}
                                    >
                                        <Stack
                                            alignItems={"center"}
                                            justifyContent={"center"}
                                            spacing={1}
                                            direction={"row"}
                                        >
                                            <StarRatings
                                                rating={products[0].rating}
                                                starRatedColor="rgb(232, 126, 36)"
                                                numberOfStars={5}
                                                name="rating"
                                                isSelectable={false}
                                                starDimension={"20px"}
                                                starSpacing={"0"}
                                            />
                                            <Typography
                                                fontFamily={"Inter"}
                                                sx={{ pt: 0.3 }}
                                                fontWeight={500}
                                                fontSize={"12px"}
                                                lineHeight={"17px"}
                                                color={"#007185"}
                                            >
                                                {products[0].total_review}
                                            </Typography>
                                        </Stack>
                                        {/* {type === "recommended" && getRandomComponent()} */}
                                    </Stack>
                                    <div className="d-none d-sm-block product-prices">
                                        {products.originalPrice && (
                                            <div className="product-original-price">
                                                ${products.originalPrice}
                                            </div>
                                        )}
                                        <div className="product-rating-sections-featured-images">
                                            <div className="product-new-price-sections-rating">
                                                <span>$</span>
                                                {
                                                    products[0]?.price
                                                        .toString()
                                                        .split(".")[0]
                                                }
                                                <sup>
                                                    {
                                                        products[0]?.price
                                                            ?.toString()
                                                            .split(".")[1]
                                                    }
                                                </sup>
                                            </div>
                                            <div className="save-button-price-new-old">
                                                <p>
                                                    Save{" "}
                                                    {products[0]?.price
                                                        ? parseFloat(
                                                              products[0].price
                                                          ).toFixed(2)
                                                        : 0}
                                                </p>
                                            </div>
                                            <p className="dev-sactions-price-old-new-time">
                                                Ends in {hours}h:{minutes}m
                                            </p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
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
                                        <ProductItem1 image={rams} />
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
            <div className="row mx-0">
                <div className="col-12 col-sm-12 col-lg-12">
                    <Link to={""} className="text-decoration-none">
                        <div className="product-type-section-selleing-products">
                            <div>
                                <h4>Best Selling Products</h4>
                            </div>
                            <SellingProducts images={Sellingimages} />
                        </div>
                    </Link>
                </div>
            </div>

            <div className="row mx-0">
                {gamingArray.map((category, index) => (
                    <div key={index} className="col-12 col-sm-6 col-lg-3">
                        <Link
                            to={category.link}
                            className="text-decoration-none"
                        >
                            <div className="product-type-section">
                                <h2 className="h4-heading category-name">
                                    {category.name}
                                </h2>
                                <div className="categories-container">
                                    {index === 0 ? (
                                        <ProductItem3 items={gamingItems} />
                                    ) : (
                                        <ProductItem1
                                            image={
                                                index === 1
                                                    ? gamingProducts1
                                                    : index === 2
                                                    ? gamingProducts2
                                                    : index === 3
                                                    ? gamingProducts3
                                                    : gamingProducts3 // Replace 'defaultImage' with a fallback image or handle the case accordingly
                                            }
                                        />
                                    )}
                                </div>
                                <Link className="section-link" to="/category">
                                    {category.link}
                                </Link>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            <div className="row mx-0">
                <div className="col-12 col-sm-12 col-lg-12">
                    <Link to={""} className="text-decoration-none">
                        <div className="product-type-section-selleing-products">
                            <div>
                                <h4>Flash Sale on Items</h4>
                            </div>
                            <SellingProducts images={fleshimages} />
                        </div>
                    </Link>
                </div>
            </div>
            <div className="row mx-0">
                <div className="col-12 col-sm-12 col-lg-12">
                    <div className="product-type-section-selleing-products">
                        <Recommendation />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductType;
