import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCardSimilarItems from "@components/ProductCard/ProductCardSimilarItems";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "./Slider.css";
import { fetchSimilarProducts } from "@store/products/productsThunks";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

// Install Swiper navigation plugin
SwiperCore.use([Navigation]);

const SimilarItemsSlider = ({ type = "", products }) => {
    return (
        <Swiper
            slidesPerView={5}
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
                    slidesPerView: 5,
                },
            }}
            navigation
        >
            {products?.length > 0 ? (
                products?.map((product) => (
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
