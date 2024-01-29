import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCardSimilarItems from "@components/ProductCard/ProductCardSimilarItems";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "./Slider.css";

// Install Swiper navigation plugin
SwiperCore.use([Navigation]);

const SimilarItemsSlider = ({ type = "", similarProducts }) => {
    return (
        <Swiper
            slidesPerView={4.8}
            breakpoints={{
                // when window width is >= 320px
                320: {
                    slidesPerView: 2,
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
                    slidesPerView: 5,
                },

                1200: {
                    slidesPerView: 4.8,
                },
            }}
            navigation
        >
            {similarProducts?.length > 0 ? (
                similarProducts?.map((product) => (
                    <SwiperSlide key={"ps-" + product?.id}>
                        <div
                        // className="px-1"
                        >
                            <ProductCardSimilarItems
                                type={type}
                                product={product}
                            />
                        </div>{" "}
                    </SwiperSlide>
                ))
            ) : (
                <>There are no similar items to this product.</>
            )}
        </Swiper>
    );
};

export default SimilarItemsSlider;
