import { Swiper, SwiperSlide } from "swiper/react";
import ProgressiveImage from "react-progressive-graceful-image";

import "swiper/css";
import "swiper/css/navigation";

import "./Slider.css";

// import required modules
import { Navigation } from "swiper";
import Banner1 from "@images/Banner/homepage-banner-1.png";
import Banner2 from "@images/Banner/homepage-banner-2.png";
import Banner3 from "@images/Banner/homepage-banner-3.png";
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
                            <ProgressiveImage src={banner} placeholder={banner}>
                                {(src) => <img src={src} alt={"Banner"} />}
                            </ProgressiveImage>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
};
export default Slider;
