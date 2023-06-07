import React, { Suspense } from "react";
// import { ProductType } from "@components/homeproduct/ProductType";
const ProductType = React.lazy(() =>
    import("@components/homeproduct/ProductType")
);
import Loader from "@common/LoaderComponent/LoaderComponent";
const BannerSlider = React.lazy(() =>
    import("@components/Sliders/BannerSlider")
);
// import BannerSlider from "@components/Sliders/BannerSlider";
// import MobileHomeCategory from "@components/MobileCategory/MobileHomeCategory";
const MobileHomeCategory = React.lazy(() =>
    import("@components/MobileCategory/MobileHomeCategory")
);
import { useViewportWidth } from "@hooks/useViewportWidth";
const BannerCategory = () => {
    const screenWidth = useViewportWidth();
    return (
        <div className="banner-category-section">
            <div className="banner-wrapper">
                <div className="banner-inner">
                    <Suspense fallback={<Loader />}>
                        <BannerSlider />
                    </Suspense>
                </div>
            </div>

            {screenWidth < 576 ? (
                <div className="catergory-grid-wrapper">
                    <Suspense>
                        <MobileHomeCategory />
                    </Suspense>
                </div>
            ) : (
                <div className="catergory-grid-wrapper">
                    <div>
                        <Suspense>
                            <ProductType />
                        </Suspense>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BannerCategory;
