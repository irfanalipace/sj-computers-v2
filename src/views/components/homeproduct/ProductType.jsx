import React from "react";
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
// import monitorimg from "@images/categories/monitorweb.webp";
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
import SellingProducts from "../MobileCategory/SellingProducts/SellingProducts";
import Recommendation from "../Recommendation/Recommendation";
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
    return (
        <div className="product-type-container">
            <div className="row mx-0">
                {categoryArray.map((category, index) => (
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
                                <p className="section-link">{category.link}</p>
                            </div>
                        </Link>
                    </div>
                ))}
                <div className="col-12 col-sm-6 col-lg-3">
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
                                <button type="button" className="button-save">
                                    Login Safely
                                </button>
                            </Link>
                        </div>
                    )}
                    <div className="product-section-advertisment">
                        <img
                            className={`advertisment-img`}
                            src={addDesktop}
                            alt={"addDesktop"}
                        />
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
                                        <ProductItem1
                                            image={
                                               
                                                     rams
                                            }
                                        />
                                    )}
                                </div>
                                <p className="section-link">{category.link}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            <div className="row mx-0">
        
                    <div  className="col-12 col-sm-12 col-lg-12">
                        
                        <Link
                            to={""}
                            className="text-decoration-none"
                        >
                            
                            <div className="product-type-section-selleing-products">
                                <div>
                                    <h4>Best Selling Products</h4>
                                </div>
                             <SellingProducts />
                            
                            </div>
                        </Link>
                    </div>
               
            </div>
            <div className="row mx-0">
        
        <div  className="col-12 col-sm-12 col-lg-12">
            
         
                
                <div className="product-type-section-selleing-products">
                <Recommendation />
                
                </div>
          
        </div>
   
</div>
        </div>
    );
};

export default ProductType;
