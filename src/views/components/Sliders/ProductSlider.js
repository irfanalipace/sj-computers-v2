import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Product from "@components/ProductCard/ProductCard";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// Install Swiper navigation plugin
SwiperCore.use([Navigation]);

const ProductSlider = ({ products }) => {
    return (
        <Swiper slidesPerView={7} navigation>
            {products.map((product) => (
                <SwiperSlide key={product.id}>
                    <Product
                        imageSrc={product.imageSrc}
                        name={product.name}
                        rating={product.rating}
                        numReviews={product.numReviews}
                        offPercentage={product.offPercentage}
                        originalPrice={product.originalPrice}
                        newPrice={product.newPrice}
                        deliveryCharges={product.deliveryCharges}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default ProductSlider;
