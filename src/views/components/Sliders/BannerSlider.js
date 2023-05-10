import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import "./Slider.css";

// import required modules
import { Navigation } from "swiper";
import Banner1 from "@images/Banner/homepage-banner-1.jpeg";
import Banner2 from "@images/Banner/homepage-banner-2.jpeg";
import Banner3 from "@images/Banner/homepage-banner-3.jpeg";
const Slider = () => {
    const banners = [Banner1, Banner2, Banner3];
    return (
        <>
            <div className="banner-slider-section">
                <Swiper
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                >
                    {banners.map((banner, index) => (
                        <SwiperSlide key={index}>
                            <img src={banner} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
};
export default Slider;
