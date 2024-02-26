import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Controller, Navigation } from "swiper";
import { LazyLoadImage } from "react-lazy-load-image-component";
// import required modules
import Banner1 from "@images/Banner/homepage-banner-1.webp";
import Banner2 from "@images/Banner/homepage-banner2.webp";
import Banner3 from "@images/Banner/homepage-banner-3.webp";
import Bannerprograssive1 from "@images/Banner/SJBannerBannernePrograssive1.jpg";
import Bannerprograssive2 from "@images/Banner/SJBannerBannernePrograssive2.jpg";
import Bannerprograssive3 from "@images/Banner/SJBannerBannernePrograssive3.jpg";
import mobileBanner1 from "@images/Banner/mobile-banner1.webp";
import mobileBanner2 from "@images/Banner/mobile-banner2.webp";
import mobileBanner3 from "@images/Banner/SJbanner23MobileSizedRevised.webp";
import progmobile1 from "@images/Banner/mobileLoaderimage/prograssivemobile1.jpg";
import progmobile2 from "@images/Banner/mobileLoaderimage/prograssivemobile2.jpg";
import progmobile3 from "@images/Banner/mobileLoaderimage/prograssivemobile3.jpg";
import "swiper/css";
import "swiper/css/navigation";
import "./Slider.css";
import "./BannerSlider.css";
import { useViewportWidth } from "@hooks/useViewportWidth";

// import "react-lazy-load-image-component/src/effects/blur.css";

const Slider = () => {
    const swiperRef = useRef(null);
    const buttonRef = useRef("");
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                // Clicked outside the button, so set the value to an empty string
                setBorder("");
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const [border, setBorder] = useState("");

    const width = useViewportWidth();
    SwiperCore.use([Navigation, Controller]);
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
        setBorder("next");
    };

    const goToPreviousSlide = () => {
        if (swiperRef.current) {
            swiperRef.current.slidePrev();
        }
        setBorder("prev");
    };

    return (
        <>
            <div className="banner-slider-section">
                <Swiper
                    loop
                    // modules={[Navigation]}
                    navigation={{
                        nextEl: ".banner-slider-section .swiper-button-next",
                        prevEl: ".banner-slider-section .swiper-button-prev",
                    }}
                    className="mySwiper"
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    onSlideChange={() => false}
                >
                    {banners.map((banner, index) => (
                        <SwiperSlide key={index}>
                            <>
                                {width > 576 ? (
                                    <LazyLoadImage
                                        className="advertisement-img"
                                        src={banner.desktop}
                                        alt="Buy ALL Brands Touch Screen Laptops, Gaming Desktop, Business Computer, Best BTO and more We looked at many companies, including Dell and Apple."
                                    />
                                ) : (
                                    <LazyLoadImage
                                        className="d-md-none d-block"
                                        src={banner.mobile}
                                        alt="Buy ALL Brands Touch Screen Laptops, Gaming Desktop, Business Computer, Best BTO and more We looked at many companies, including Dell and Apple."
                                    />
                                )}
                            </>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div
                    ref={buttonRef}
                    className={`swiper-button-prev swiper-button ${border == "prev" ? "swiper-button-border" : ""}`}
                    onClick={goToPreviousSlide}
                ></div>
                <div
                    ref={buttonRef}
                    className={`swiper-button-next swiper-button ${border == "next" ? "swiper-button-border" : ""}`}
                    onClick={goToNextSlide}
                ></div>
            </div>
        </>
    );
};
export default Slider;
