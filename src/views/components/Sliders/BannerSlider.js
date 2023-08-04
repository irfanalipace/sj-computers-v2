import { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Controller, Navigation } from "swiper";
import { LazyLoadImage } from "react-lazy-load-image-component";
// import required modules
import Banner1 from "@images/Banner/homepage-banner-1.webp";
import Banner2 from "@images/Banner/homepage-banner-2.webp";
import Banner3 from "@images/Banner/homepage-banner-3.jpg";
import Bannerprograssive1 from "@images/Banner/SJBannerBannernePrograssive1.jpg";
import Bannerprograssive2 from "@images/Banner/SJBannerBannernePrograssive2.jpg";
import Bannerprograssive3 from "@images/Banner/SJBannerBannernePrograssive3.jpg";
import mobileBanner1 from "@images/Banner/mobile-banner-1.webp";
import mobileBanner2 from "@images/Banner/mobile-banner-2.webp";
import mobileBanner3 from "@images/Banner/SJbanner23MobileSizedRevised.png";
import progmobile1 from "@images/Banner/mobileLoaderimage/prograssivemobile1.jpg";
import progmobile2 from "@images/Banner/mobileLoaderimage/prograssivemobile2.jpg";
import progmobile3 from "@images/Banner/mobileLoaderimage/prograssivemobile3.jpg";
import "swiper/css";
import "swiper/css/navigation";
import "./Slider.css";
import { useViewportWidth } from "@hooks/useViewportWidth";

// import "react-lazy-load-image-component/src/effects/blur.css";

const Slider = () => {
    const width = useViewportWidth();
    SwiperCore.use([Navigation, Controller]);
    const swiperRef = useRef(null);
    const banners = [
        {
            prograssive: Bannerprograssive1,
            desktop: Banner1,
            mobile: mobileBanner1,
            mobilePro: progmobile1,
        },
        {
            prograssive: Bannerprograssive2,
            desktop: Banner2,
            mobile: mobileBanner2,
            mobilePro: progmobile2,
        },
        {
            prograssive: Bannerprograssive3,
            desktop: Banner3,
            mobile: mobileBanner3,
            mobilePro: progmobile3,
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
                            {/* <>
                                {width > 576 ? (
                                    <ProgressiveImage
                                        src={banner.desktop} 
                                        placeholder={banner.prograssive} 
                                    >
                                        {(src, loading) => (
                                            <img
                                                className={`advertisement-img ${
                                                    loading ? "blur" : ""
                                                }`}
                                                src={src}
                                                alt={"Banner"}
                                                loading="lazy"
                                            />
                                        )}
                                    </ProgressiveImage>
                                ) : (
                                    <ProgressiveImage
                                    src={banner.mobile} 
                                    placeholder={banner.mobilePro} 
                                >
                                    {(src, loading) => (
                                        <img
                                            className={` className="d-md-none d-block" ${
                                                loading ? "blur" : ""
                                            }`}
                                            src={src}
                                            alt={"mobilePro"}
                                        />
                                    )}
                                </ProgressiveImage>

                                )}
                            </> */}

                            <>
                                {width > 576 ? (
                                    <LazyLoadImage
                                        className="advertisement-img"
                                        src={banner.desktop}
                                        alt="Banner"
                                    />
                                ) : (
                                    <LazyLoadImage
                                        className="d-md-none d-block"
                                        src={banner.mobile}
                                        alt="Banner"
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
