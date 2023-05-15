import { useEffect, useState, useRef } from "react";
import { ProductType } from "@components/homeproduct/ProductType";
import BannerSlider from "@components/Sliders/BannerSlider";

const BannerCategory = () => {
    const bannerSection = useRef(null);
    const categorySection = useRef(null);
    const productType = useRef(null);
    const bannerInner = useRef(null);

    const [height, setHeight] = useState();
    const [top, setTop] = useState("0");
    const [categoryStyles, setCategoryStyles] = useState(null);
    const [bannerHeight, setBannerHeight] = useState("0px");

    const changeHeight = () => {
        setHeight(
            bannerSection.current.scrollHeight / 2 +
                categorySection.current.scrollHeight +
                "px"
        );
    };

    useEffect(() => {
        let screenWidth = window.innerWidth;
        if (screenWidth > 768) {
            setHeight(
                bannerSection.current.scrollHeight +
                    categorySection.current.scrollHeight -
                    200 +
                    "px"
            );
            setCategoryStyles({
                height: productType.current.scrollHeight + "px",
                top: "50%",
            });
        } else {
            setHeight(
                bannerSection.current.scrollHeight +
                    categorySection.current.scrollHeight -
                    70 +
                    "px"
            );
            setCategoryStyles({
                height: productType.current.scrollHeight + "px",
                bottom: "0",
                top: "unset",
            });
        }

        setTop(bannerSection.current.scrollHeight / 1.5 + "px");
        // setCategoryHeight(productType.current.scrollHeight + "px");
        setBannerHeight(bannerInner.current.scrollHeight + "px");
        window.addEventListener("resize", () => {
            // changeHeight();
        });
    }, [bannerSection.current, categorySection.current, bannerInner.current]);

    return (
        <div
            className="banner-category-section"
            style={{
                height,
            }}
        >
            <div
                className="banner-wrapper"
                ref={bannerSection}
                // style={{ height: bannerHeight }}
            >
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
