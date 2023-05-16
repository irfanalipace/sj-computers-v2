import { ProductType } from "@components/homeproduct/ProductType";
import BannerSlider from "@components/Sliders/BannerSlider";

const BannerCategory = () => {
    return (
        <div className="banner-category-section">
            <div className="banner-wrapper">
                <div className="banner-inner">
                    <BannerSlider />
                </div>
            </div>
            <div className="catergory-grid-wrapper">
                <div>
                    <ProductType />
                </div>
            </div>
        </div>
    );
};

export default BannerCategory;
