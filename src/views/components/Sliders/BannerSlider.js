import { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Controller, Navigation } from "swiper";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ProgressiveImage from "react-progressive-image";
// import required modules
import Banner1 from "@images/Banner/homepage-banner-1.jpg";
import Banner2 from "@images/Banner/homepage-banner-2.jpg";
import Banner3 from "@images/Banner/homepage-banner-3.jpg";
import Bannerprograssive1 from "@images/Banner/SJBannerBannernePrograssive1.jpg";
import Bannerprograssive2 from "@images/Banner/SJBannerBannernePrograssive2.jpg";
import Bannerprograssive3 from "@images/Banner/SJBannerBannernePrograssive3.jpg";
import mobileBanner1 from "@images/Banner/mobile-banner-1.jpg";
import mobileBanner2 from "@images/Banner/SJbanner13MobileSizedRevised.png";
import mobileBanner3 from "@images/Banner/SJbanner23MobileSizedRevised.png";
import "swiper/css";
import "swiper/css/navigation";
import "./Slider.css";
import { useViewportWidth } from "@hooks/useViewportWidth";
const Slider = () => {
    const width = useViewportWidth();
    SwiperCore.use([Navigation, Controller]);
    const swiperRef = useRef(null);
    const banners = [
        {
            prograssive: Bannerprograssive1,
            desktop: Banner1,
            mobile: mobileBanner1,
        },
        {
            prograssive: Bannerprograssive2,
            desktop: Banner2,
            mobile: mobileBanner2,
        },
        {
            prograssive: Bannerprograssive3,
            desktop: Banner3,
            mobile: mobileBanner3,
        },
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
                                {/* <LazyLoadImage
                                    className="d-md-block d-none"
                                    src={banner.desktop}
                                    alt={"Banner"}
                                />
                                <LazyLoadImage
                                    className="d-md-none d-block"
                                    src={banner.mobile}
                                    alt={"Banner"}
                                /> */}

                                {width > 576 ? (
                                    <ProgressiveImage
                                        src={banner.desktop} // High-resolution image URL
                                        placeholder={banner.prograssive} // Low-resolution image URL
                                    >
                                        {(src, loading) => (
                                            <img
                                                className={`d-md-block d-none ${
                                                    loading ? "blur" : ""
                                                }`}
                                                src={src}
                                                alt={"Banner"}
                                        
                                                />
                                        )}
                                    </ProgressiveImage>
                                ) : (
                                    <LazyLoadImage
                                        className="d-md-none d-block"
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
