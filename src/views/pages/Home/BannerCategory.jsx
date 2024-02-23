import React, { Suspense } from "react";
// import { ProductType } from "@components/homeproduct/ProductType";
import BannerSlider from "@components/Sliders/BannerSlider";
const ProductType = React.lazy(() =>
    import("@components/homeproduct/ProductType")
);
import Loader from "@common/LoaderComponent/LoaderComponent";
import "./BannerCategory.css";
// import BannerSlider from "@components/Sliders/BannerSlider";
import MobileHomeCategory from "@components/MobileCategory/MobileHomeCategory";
// const MobileHomeCategory = React.lazy(() =>
//     import("@components/MobileCategory/MobileHomeCategory")
// );

import gamingProducts1 from "../../../assets/images/gaming-images/gameimage3.png";
import gamingProducts2 from "../../../assets/images/gaming-images/gameimage1.png";
import gamingProducts3 from "../../../assets/images/gaming-images/gameimage2.png";
import scanimages from "../../../assets/images/gaming-images/scan-images.png";
import { useViewportWidth } from "@hooks/useViewportWidth";
import sellingimg1 from "../../../assets/images/homepageImage/sellingproducts/image1.png";
import sellingimg2 from "../../../assets/images/homepageImage/sellingproducts/image2.png";
import sellingimg3 from "../../../assets/images/homepageImage/sellingproducts/image3.png";
import sellingimg4 from "../../../assets/images/homepageImage/sellingproducts/image4.png";
import sellingimg5 from "../../../assets/images/homepageImage/sellingproducts/image5.png";
import sellingimg6 from "../../../assets/images/homepageImage/sellingproducts/image6.png";
import sellingimg7 from "../../../assets/images/homepageImage/sellingproducts/image7.png";
import sellingimg8 from "../../../assets/images/homepageImage/sellingproducts/image8.png";
const FeaturedProducts = React.lazy(() =>
    import(
        "@components/homeproduct/productcategory/ProductsItemsList/FeaturedProducts"
    )
);
import image1 from "../../../assets/images/homepageImage/featureImages/image1.png";
import image2 from "../../../assets/images/homepageImage/featureImages/image2.png";
import image3 from "../../../assets/images/homepageImage/featureImages/image3.png";
import image4 from "../../../assets/images/homepageImage/featureImages/image4.png";
import linkrouter from "../../../assets/images/homepageImage/networkimags/d-link-router.png";
import img1 from "../../../assets/images/homepageImage/upgradecomputers/image1.png";
import img2 from "../../../assets/images/homepageImage/upgradecomputers/image2.png";
import gaminimg1 from "@images/product/item3/image1.png";
import gaminimg2 from "@images/product/item3/image2.png";
import gaminimg3 from "@images/product/item3/image3.png";
import rams from "../../../assets/images/homepageImage/RamMem/rams.png";
import TouchScreenLaptop from "../../../assets/images/categories/TouchScreenLaptop.png";
// import NvidiaImg from "../../../assets/images/categories/Nvidia.png";
import NvidiaImg from "../../../assets/images/categories/Nvidia.png";
import NvidiaImg2 from "../../../assets/images/categories/Nvidia2.png";
import img3 from "../../../assets/images/homepageImage/upgradecomputers/image3.png";
import categoryImg1 from "@images/categories/desktopweb.webp";
import categorybusinussweb from "../../../assets/images/categories/businussweb.webp";
import btoimg from "../../../assets/images/categories/btoweb.webp";
import laptopimg from "../../../assets/images/categories/laptopweb.webp";
import monitorimg from "../../../assets/images/categories/desktopweb.webp";
import desktopimgweb from "../../../assets/images/categories/desktopweb-page.webp";
import modem from "../../../assets/images/homepageImage/networkimags/d-link-modem.png";
const SellingPro = React.lazy(() =>
    import(
        "@components/homeproduct/productcategory/ProductsItemsList/SellingPro"
    )
);
const GamingProductsSections = React.lazy(() =>
    import(
        "@components/homeproduct/productcategory/ProductsItemsList/GamingProductsSections"
    )
);
import rectangle1 from "../../../assets/images/flashsaleimaes/rectangle1.png";
import rectangle2 from "../../../assets/images/flashsaleimaes/rectangle2.png";
import rectangle3 from "../../../assets/images/flashsaleimaes/rectangle3.png";
import rectangle4 from "../../../assets/images/flashsaleimaes/rectangle4.png";
import rectangle5 from "../../../assets/images/flashsaleimaes/rectangle5.png";

const FlashProducts = React.lazy(() =>
    import(
        "@components/homeproduct/productcategory/ProductsItemsList/FlashProducts"
    )
);
const RecommandSectionsProducts = React.lazy(() =>
    import(
        "@components/homeproduct/productcategory/ProductsItemsList/RecommandSectionsProducts"
    )
);
const BannerCategory = () => {
    const screenWidth = useViewportWidth();
    const featuredItems = [
        {
            image: image1,
            categoryLink: "/category/bto",
            categoryName: "Dell",
        },
        {
            image: image2,
            categoryLink: "/category/laptops",
            categoryName: "HP",
        },
        {
            image: image4,
            categoryLink: "/category/desktop",
            categoryName: "Lenovo",
        },
        {
            image: image3,
            categoryLink: "/category/gaming_desktops",
            categoryName: "2 in 1s Laptops",
        },
    ];
    const featured = [
        {
            name: "Shop by Brands",
            link: "See more",
        },
        {
            name: "Shop by Form Factor",
            link: "See more",
        },
        {
            name: "Budget Friendly Desktops",
            link: "See more",
            extra: "Under $250",
        },
        {
            name: "Touch Screen Laptops",
            link: "Shop Now",
        },
    ];
    const networkItems = [
        {
            image: linkrouter,
            categoryLink: "/category/sff",
            categoryName: "SFF",
        },
        {
            image: modem,
            categoryLink: "/category/mini",
            categoryName: "Mini",
        },
        {
            image: modem,
            categoryLink: "/category/tower",
            categoryName: "Tower",
        },
        {
            image: linkrouter,
            categoryLink: "/category/usff",
            categoryName: "USFF",
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
    const gamingArray = [
        {
            name: "Shop by Processor",
            link: "See more",
        },
        {
            name: "Work Stations for Professionals",
            link: "Shop Now",
        },
        {
            name: "Professional Laptops",
            link: "Shop Now",
        },
        {
            name: "Shop by GPU",
            link: "Shop Now",
        },
    ];
    const gamingItems = [
        {
            image: gaminimg3,
            categoryLink: "/category/bto",
            categoryName: "Core i3",
        },
        {
            image: scanimages,
            categoryLink: "/category/laptops",
            categoryName: "Core i5",
        },
        {
            image: gaminimg1,
            categoryLink: "/category/desktop",
            categoryName: "Core i7",
        },
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
    const gpuItems = [
        {
            image: gaminimg3,
            categoryLink: "/category/bto",
            categoryName: "AMD",
        },
        {
            image: NvidiaImg,
            categoryLink: "/category/laptops",
            categoryName: "Nvidia",
        },
        {
            image: NvidiaImg2,
            categoryLink: "/category/desktop",
            categoryName: "Nvidia",
        },
    ];
    return (
        <div className="banner-category-section">
            <div className="banner-wrapper">
                <div className="banner-inner">
                    <BannerSlider />
                </div>
            </div>

            {screenWidth < 576 ? (
                <div className="catergory-grid-wrapper">
                    {/* <Suspense> */}
                    <MobileHomeCategory />
                    {/* </Suspense> */}
                </div>
            ) : (
                <div className="catergory-grid-wrapper">
                    <div className="">
                        <div className="home-page-data">
                            <Suspense>
                                <ProductType />
                                <FeaturedProducts
                                    featuredItems={featuredItems}
                                    featured={featured}
                                    networkItems={networkItems}
                                    upgradecomputers={upgradecomputers}
                                    // rams={rams}
                                    TouchScreenLaptop={TouchScreenLaptop}
                                />
                                {/* <SellingProducts images={Sellingimages}/> */}
                                <SellingPro images={Sellingimages} />
                                <GamingProductsSections
                                    gamingArray={gamingArray}
                                    items={gamingItems}
                                    gpuItems={gpuItems}
                                    gamingProducts1={gamingProducts1}
                                    gamingProducts2={gamingProducts2}
                                    gamingProducts3={gamingProducts3}
                                />
                                <FlashProducts images={fleshimages} />
                                <RecommandSectionsProducts />
                            </Suspense>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BannerCategory;
