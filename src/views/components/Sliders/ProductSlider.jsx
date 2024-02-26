import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Product from "@components/ProductCard/ProductCard";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "./Slider.css";

// Install Swiper navigation plugin
SwiperCore.use([Navigation]);

const ProductSlider = ({ type = "", products }) => {
    return (
        <div style={{ position: "relative" }} className="product-slider">
            <Swiper
                slidesPerView={7}
                breakpoints={{
                    // when window width is >= 320px
                    320: {
                        slidesPerView: 1,
                    },
                    // when window width is >= 480px
                    480: {
                        slidesPerView: 3,
                    },
                    // when window width is >= 640px
                    640: {
                        slidesPerView: 4,
                    },

                    768: {
                        slidesPerView: 4,
                    },

                    1200: {
                        slidesPerView: 6,
                    },
                }}
                navigation={{
                    nextEl: ".product-slider .swiper-button-next",
                    prevEl: ".product-slider .swiper-button-prev",
                }}
                className="recommendation-slider"
            >
                {products?.map((product) => (
                    <SwiperSlide key={"ps-" + product.id}>
                        <div className="px-1">
                            <Product type={type} product={product} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            {/* the css of these are defined in Slider.css */}
            <div
                className="swiper-button-next slider-button"
                style={{ position: "absolute", right: -40 }}
            ></div>
            <div
                className="swiper-button-prev slider-button"
                style={{ position: "absolute", left: -40 }}
            ></div>
        </div>
    );
};

export default ProductSlider;
