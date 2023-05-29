import { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Controller, Navigation } from "swiper";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useViewportWidth } from "@hooks/useViewportWidth";

// import required modules
import Banner1 from "@images/Banner/homepage-banner-1.jpg";
import Banner2 from "@images/Banner/homepage-banner-2.jpg";
import Banner3 from "@images/Banner/homepage-banner-3.jpg";
import mobileBanner1 from "@images/Banner/mobile-banner-1.jpg";
import mobileBanner2 from "@images/Banner/SJbanner13MobileSizedRevised.png";
import mobileBanner3 from "@images/Banner/SJbanner23MobileSizedRevised.png";
import "swiper/css";
import "swiper/css/navigation";
import "./Slider.css";

const Slider = () => {
    const width = useViewportWidth();
    SwiperCore.use([Navigation, Controller]);
    const swiperRef = useRef(null);
    const banners = [
        { desktop: Banner1, mobile: mobileBanner1 },
        { desktop: Banner2, mobile: mobileBanner2 },
        { desktop: Banner3, mobile: mobileBanner3 },
    ];

    const goToNextSlide = () => {
        if (swiperRef.current) {
            swiperRef.current.slideNext();
        }
    };

    const goToPreviousSlide = () => {
        if (swiperRef.current) {
            swiperRef.current.slidePrev();
        }
    };

    return (
        <>
            <div className="banner-slider-section">
                <Swiper
                    modules={[Navigation]}
                    className="mySwiper"
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    onSlideChange={() => false}
                >
                    {banners.map((banner, index) => (
                        <SwiperSlide key={index}>
                            <>
                                {width > 576 ? (
                                    <LazyLoadImage
                                        className="d-sm-block d-none"
                                        src={banner.desktop}
                                        alt={"Banner"}
                                    />
                                ) : (
                                    <LazyLoadImage
                                        className="d-sm-none d-block"
                                        src={banner.mobile}
                                        alt={"Banner"}
                                    />
                                )}
                            </>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div
                    className="swiper-button-prev"
                    onClick={goToPreviousSlide}
                ></div>
                <div
                    className="swiper-button-next"
                    onClick={goToNextSlide}
                ></div>
            </div>
        </>
    );
};
export default Slider;
