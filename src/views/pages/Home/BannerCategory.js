import { useEffect, useState, useRef } from "react";
import { ProductType } from "@components/homeproduct/ProductType";
import BannerSlider from "@components/Sliders/BannerSlider";

const BannerCategory = () => {
    const bannerSection = useRef(null);

    const [height, setHeight] = useState("490px");

    const changeHeight = () => {
        setHeight(bannerSection.current.scrollHeight + "px");
    };

    useEffect(() => {
        // setHeight(bannerSection.current.scrollHeight + "px");
        window.addEventListener("resize", () => {
            // changeHeight();
        });
    }, [bannerSection.current]);

    return (
        <div
            className="banner-category-section"
            style={{
                minHeight: height,
            }}
            ref={bannerSection}
        >
            <div className="banner-wrapper">
                <BannerSlider />
            </div>
            <div className="catergory-grid-wrapper">
                <ProductType />
            </div>
        </div>
    );
};

export default BannerCategory;
