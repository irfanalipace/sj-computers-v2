import React, { useEffect, useState } from "react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
// import { LazyLoadImage } from "react-lazy-load-image-component";
import "swiper/css/navigation";
import ReviewsDialog from "./ProductReviewsDialog/ReviewsDialog";
import "./ReviewImagesSlider.css"


SwiperCore.use([Navigation, Pagination]);

function ReviewImagesSlider({ productId, reviews, ReviewsData }) {
    const [open, setOpen] = useState(false);
    const [reviewId, setReviewId] = useState({});
    const [imgId, setImgId] = useState("");
    const [imgIndex, setImgIndex] = useState(0);

    console.log(reviews, "reviews");

    const handleOpenDialog = (reviewId, imgId, index) => {
        setOpen(true);
        setReviewId(reviewId);
        setImgId(imgId);
        setImgIndex(index);
        // console.log(reviews, "reviews");
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [imagesArray, setImagesArray] = useState(false);

    function checkProductMediaLength(data) {
        if (data) {
            for (const item of data) {
                const mediaLength = item.product_media.length;
                if (mediaLength > 0) {
                    setImagesArray(true);
                } else {
                    setImagesArray(false);
                }
            }
        }
    }
    useEffect(() => {
        checkProductMediaLength(ReviewsData?.data);
    }, [ReviewsData]);

    // console.log(ReviewsData.reviews);

    return (
        <>
            {ReviewsData?.data?.length > 0 && imagesArray ? (
                <div
                    className="review-images-section review-images-slider"
                    style={{ position: "relative", padding: "0px 70px" }}
                >
                    {/* <button onClick={handleOpenDialog}>image Gallery</button> */}
                    <div className="d-flex justify-content-between mb-3">
                        <h3 className="product-section-heading">
                            Reviews with images
                        </h3>
                        <button
                            className="view-all-images-btn"
                            onClick={handleOpenDialog}
                        >
                            View all images
                        </button>
                    </div>
                    <Swiper
                        className=""
                        spaceBetween={3}
                        slidesPerView={1}
                        navigation={{
                            nextEl: ".review-images-slider .swiper-button-next",
                            prevEl: ".review-images-slider .swiper-button-prev",
                        }}
                        breakpoints={{
                            // For mobile screens

                            // For larger screens
                            700: {
                                slidesPerView: 3,
                            },
                            1200: {
                                slidesPerView: 4,
                                // spaceBetween: 50,
                            },
                        }}
                    >
                        {/* /// --- DIALOG --- /// */}
                        {open && (
                            <ReviewsDialog
                                open={open}
                                handleClose={handleClose}
                                reviewId={reviewId}
                                imgId={imgId}
                                imgIndex={imgIndex}
                                ReviewsData={ReviewsData}
                                reviews={reviews}
                            />
                        )}

                        {ReviewsData?.data?.map((data, i) => (
                            <React.Fragment key={data.id}>
                                {data?.product_media?.map((image, index) => (
                                    <SwiperSlide
                                        style={{
                                            paddingBottom: 0,
                                            height: "180px",
                                        }}
                                        key={image.id}
                                    >
                                        <div
                                            src={image?.file_path}
                                            style={{
                                                backgroundImage: `url(${image?.file_path})`,
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                                cursor: "pointer"
                                            }}
                                            onClick={() =>
                                                handleOpenDialog(
                                                    image?.product_review_id,
                                                    image?.id,
                                                    index
                                                )
                                            }
                                            alt="review-image"
                                            className="all-reviews-image"
                                        ></div>
                                    </SwiperSlide>
                                ))}
                            </React.Fragment>
                        ))}
                    </Swiper>
                    {/* SLIDER-BUTTONS */}
                    <div className="swiper-button-next slider-button" style={{position: "absolute", right: 0, top: "60%"}}></div>
                    <div className="swiper-button-prev slider-button" style={{position: "absolute",  left: 0, top: "60%"}}></div>
                </div>
            ) : (
                ""
            )}
        </>
    );
}

export default ReviewImagesSlider;
