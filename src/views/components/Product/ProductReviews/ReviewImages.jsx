import React from "react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
// import { LazyLoadImage } from "react-lazy-load-image-component";
import "swiper/css/navigation";
SwiperCore.use([Navigation, Pagination]);

function ReviewImages({ reviews }) {
    return (
        <div className="review-images-section">
            <Swiper
                className="my-swiper-mobile-category"
                spaceBetween={1}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                    // For mobile screens

                    // For larger screens
                    1024: {
                        slidesPerView: 5,
                        // spaceBetween: 50,
                    },
                }}
            >
                {reviews.map((rev) => (
                    <SwiperSlide>
                        <div>
                            <button className="btn btn-light p-1 d-flex align-items-center">
                                <img
                                    src={rev.image[0]}
                                    alt="review-image"
                                    className="all-reviews-image"
                                />
                            </button>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default ReviewImages;
