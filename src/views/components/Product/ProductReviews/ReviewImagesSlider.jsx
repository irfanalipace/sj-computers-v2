import React, { useState } from "react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
// import { LazyLoadImage } from "react-lazy-load-image-component";
import "swiper/css/navigation";
import ReviewsDialog from "./ProductReviewsDialog/ReviewsDialog";
import ReviewsData from "./DummyReviewsData";

SwiperCore.use([Navigation, Pagination]);

function ReviewImagesSlider({ reviews }) {

    const[open, setOpen] = useState(false)
    const [reviewId, setReviewId] = useState({})
    const [imgIndex, setImgIndex] = useState("")

    const handleOpenDialog = (revId, index) => {
        setOpen(true)
        setReviewId(revId)
        setImgIndex(index)
        // console.log(reviews, "reviews");
    }

    const handleClose = () => {
        setOpen(false)
    }

    // console.log(ReviewsData.reviews);

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
                <ReviewsDialog open={open} handleOpenDialog={handleOpenDialog} handleClose={handleClose} reviewId={reviewId} imgIndex={imgIndex} ReviewsData={ReviewsData} />
                {ReviewsData?.reviews.map((rev) => (
                    <div key={rev?.reviewId}>
                            <button 
                            // onClick={() => handleOpenDialog(rev)}
                            className="btn btn-light p-1 d-flex align-items-center">
                                {rev?.images?.map((image, index) => (
                                    <SwiperSlide >
                                    <img key={index}
                                        onClick={() => handleOpenDialog(rev?.reviewId, index)}
                                        src={image}
                                        alt="review-image"
                                        className="all-reviews-image"
                                        />
                                        </SwiperSlide>

                                ))}
                            </button>
                        </div>
                ))}
            </Swiper>
        </div>
    );
}

export default ReviewImagesSlider;
