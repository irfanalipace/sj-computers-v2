import React, { useState } from "react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
// import { LazyLoadImage } from "react-lazy-load-image-component";
import "swiper/css/navigation";
import ReviewsDialog from "./ProductReviewsDialog/ReviewsDialog";
SwiperCore.use([Navigation, Pagination]);

function ReviewImagesSlider({ reviews }) {

    const[open, setOpen] = useState(false)

    const handleOpenDialog = () => {
        setOpen(true)
        console.log(reviews, "reviews");
    }

    const handleClose = () => {
        setOpen(false)
    }

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
                {/* /// --- DIALOG --- /// */}
                <ReviewsDialog open={open} handleOpenDialog={handleOpenDialog} handleClose={handleClose} />
                {reviews.map((rev) => (
                    <SwiperSlide key={rev?.id}>
                        <div>
                            <button 
                            onClick={handleOpenDialog}
                            className="btn btn-light p-1 d-flex align-items-center">
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

export default ReviewImagesSlider;
