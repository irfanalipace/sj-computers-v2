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
            image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Dell_logo.png",
            categoryLink: "/category/bto",
            categoryName: "Dell",
        },
        {
            // image: image2,
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/HP_logo_2012.svg/1024px-HP_logo_2012.svg.png",
            categoryLink: "/category/laptops",
            categoryName: "HP",
        },
        {
            // image: image4,
            image: "https://1000logos.net/wp-content/uploads/2017/03/Lenovo-Logo-2003.png",
            categoryLink: "/category/desktop",
            categoryName: "Lenovo",
        },
        {
            // image: image3,
            image: "https://bto.us/cdn/shop/files/BTO-logo.webp?v=1704702209&width=110",
            categoryLink: "/category/gaming_desktops",
            categoryName: "BTO",
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
            // image: linkrouter,
            image: "https://files.refurbed.com/ii/dell-optiplex-7050-sff-1673339333.jpg",
            categoryLink: "/category/sff",
            categoryName: "SFF",
        },
        {
            // image: modem,
            image: "https://www.mbcommunication.com.pk/4802-large_default/intel-nt12.jpg",
            categoryLink: "/category/mini",
            categoryName: "Mini",
        },
        {
            // image: modem,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNwOXf3PYGYs7LceVZxSEPVUEI1Pp8gpQaJukhqYONUw&s",
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
            // image: img1,
            image: "https://5.imimg.com/data5/HI/PC/MY-12891264/computer-500x500.jpg",
            categoryLink: "/category/bto",
            categoryName: "Full Size",
        },
        {
            // image: img2,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFLacq8lq418sCgcdCPAg98-8cZC7CEF03Ug&s",
            categoryLink: "/category/laptops",
            categoryName: "Compact",
        },
        {
            // image: img3,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu3npkk2sLCcFmZfTFKP8XKz62_DwfLLqGeIPcMzlQ2A&s",
            categoryLink: "/category/desktop",
            categoryName: "Work Station",
        },
        {
            // image: img1,
            image: "https://mms.businesswire.com/media/20151020006538/en/492013/5/Dell-OptiPlex-family.jpg",
            categoryLink: "/category/gaming_desktops",
            categoryName: "Full Size",
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
            hidden: true,
        },
        {
            image: NvidiaImg2,
            categoryLink: "/category/desktop",
            categoryName: "Nvidia",
        },
    ]
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
