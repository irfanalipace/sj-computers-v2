import React, { Suspense } from "react";
// import { ProductType } from "@components/homeproduct/ProductType";
import BannerSlider from "@components/Sliders/BannerSlider";
import ProductType from "@components/homeproduct/ProductType";
import Loader from "@common/LoaderComponent/LoaderComponent";

// import BannerSlider from "@components/Sliders/BannerSlider";
// import MobileHomeCategory from "@components/MobileCategory/MobileHomeCategory";
import MobileHomeCategory from "@components/MobileCategory/MobileHomeCategory";
import { useViewportWidth } from "@hooks/useViewportWidth";
const BannerCategory = () => {
    const screenWidth = useViewportWidth();
    return (
        <Suspense>
            <div className="banner-category-section">
                <div className="banner-wrapper">
                    <div className="banner-inner">
                        <BannerSlider />
                    </div>
                </div>

                {screenWidth < 576 ? (
                    <div className="catergory-grid-wrapper">
                        <MobileHomeCategory />
                    </div>
                ) : (
                    <div className="catergory-grid-wrapper">
                        <div>
                            <ProductType />
                        </div>
                    </div>
                )}
            </div>
        </Suspense>
    );
};

export default BannerCategory;
