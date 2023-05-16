import { useEffect, useState, useRef } from "react";
import { ProductType } from "@components/homeproduct/ProductType";
import BannerSlider from "@components/Sliders/BannerSlider";

const BannerCategory = () => {
    const bannerSection = useRef(null);
    const categorySection = useRef(null);
    const productType = useRef(null);
    const bannerInner = useRef(null);

    const [height, setHeight] = useState();
    const [categoryStyles, setCategoryStyles] = useState(null);

    const changeHeight = () => {
        let screenWidth = window.innerWidth;
        if (screenWidth >= 1025) {
            setHeight(
                bannerSection.current.scrollHeight +
                    productType.current.scrollHeight -
                    200 +
                    "px"
            );
            setCategoryStyles({
                height: productType.current.scrollHeight + "px",
                top: "50%",
            });
        } else if (screenWidth > 768 && screenWidth < 1025) {
            setHeight(
                bannerSection.current.scrollHeight +
                    productType.current.scrollHeight -
                    300 +
                    "px"
            );
            setCategoryStyles({
                height: productType.current.scrollHeight + "px",
                top: "40%",
            });
        } else {
            setHeight(
                bannerSection.current.scrollHeight +
                    productType.current.scrollHeight -
                    220 +
                    "px"
            );
            setCategoryStyles({
                height: productType.current.scrollHeight + "px",
                bottom: "0",
                top: "unset",
            });
        }
    };

    useEffect(() => {
        changeHeight();
        window.addEventListener("resize", () => {
            changeHeight();
        });
    }, [bannerSection.current, categorySection.current, bannerInner.current]);

    return (
        <div
            className="banner-category-section"
            style={{
                height,
            }}
        >
            <div className="banner-wrapper" ref={bannerSection}>
                <div ref={bannerInner} className="banner-inner">
                    <BannerSlider />
                </div>
            </div>
            <div
                className="catergory-grid-wrapper"
                ref={categorySection}
                style={categoryStyles}
            >
                <div ref={productType}>
                    <ProductType />
                </div>
            </div>
        </div>
    );
};

export default BannerCategory;
