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
import mobileBanner1 from "@images/Banner/mobile-banner-1.png";
import mobileBanner2 from "@images/Banner/mobile-banner-2.png";
import mobileBanner3 from "@images/Banner/mobile-banner-3.png";

const Slider = () => {
    const banners = [
        { desktop: Banner1, mobile: mobileBanner1 },
        { desktop: Banner2, mobile: mobileBanner2 },
        { desktop: Banner3, mobile: mobileBanner3 },
    ];
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
                            <>
                                {/* <ProgressiveImage
                                    className="d-md-block d-none"
                                    src={banner.desktop}
                                    placeholder={banner.desktop}
                                >
                                    {(src) => <img src={src} alt={"Banner"} />}
                                </ProgressiveImage>
                                <ProgressiveImage
                                    className="d-md-none d-block"
                                    src={banner.mobile}
                                    placeholder={banner.mobile}
                                >
                                    {(src) => <img src={src} alt={"Banner"} />}
                                </ProgressiveImage> */}
                                <img
                                    className="d-md-block d-none"
                                    src={banner.desktop}
                                    alt={"Banner"}
                                />
                                <img
                                    className="d-md-none d-block"
                                    src={banner.mobile}
                                    alt={"Banner"}
                                />
                            </>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
};
export default Slider;
