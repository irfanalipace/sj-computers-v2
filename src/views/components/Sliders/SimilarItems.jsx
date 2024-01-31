import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCardSimilarItems from "@components/ProductCard/ProductCardSimilarItems";
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "./Slider.css";

// Install Swiper navigation plugin
SwiperCore.use([Navigation]);

const SimilarItemsSlider = ({ type = "", similarProducts }) => {
    return (
        <div style={{position: "relative"}}>
        <Swiper
            slidesPerView={4.8}
            navigation={{
                nextEl: '.swiper-similer-btn-next',
                prevEl: '.swiper-similer-btn-prev',
              }}
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
            // navigation
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
        {/* <div className="swiper-similer-btn-next"></div> */}
        {/* <div className="swiper-similer-btn-prev"></div> */}
        <ArrowBackIosNewOutlinedIcon sx={{position: "absolute", top: "50%", left: -40,  height: "35px", width: "35px", color: "black", p: 1}} className='swiper-similer-btn-prev '  />
        <ArrowForwardIosOutlinedIcon sx={{position: "absolute", top: "50%", right: -40,  height: "35px", width: "35px", color: "black", p: 1}} className='swiper-similer-btn-next '  />
        </div>
    );
};

export default SimilarItemsSlider;
