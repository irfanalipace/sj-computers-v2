import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Product from "@components/ProductCard/ProductCard";
import { fetchSimilarProducts } from "@store/products/productsThunks";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "./Slider.css";
import { useDispatch } from "react-redux";

// Install Swiper navigation plugin
SwiperCore.use([Navigation]);

const ProductSlider = ({ type = "", products }) => {
    const dispatch = useDispatch();
    const handleClick = async (pName) => {
        try {
            await dispatch(
                fetchSimilarProducts({
                    name: pName,
                })
            );
            console.log("something");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Swiper
            slidesPerView={7}
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
                    slidesPerView: 7,
                },
            }}
            navigation
            className="recommendation-slider"
        >
            {products?.map((product) => (
                <SwiperSlide key={"ps-" + product.id}>
                    <div
                        className="px-1"
                        onClick={() => handleClick(product.name)}
                    >
                        <Product type={type} product={product} />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default ProductSlider;
