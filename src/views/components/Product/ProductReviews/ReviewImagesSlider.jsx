import React, { useEffect, useState } from "react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
// import { LazyLoadImage } from "react-lazy-load-image-component";
import "swiper/css/navigation";
import ReviewsDialog from "./ProductReviewsDialog/ReviewsDialog";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";

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
                    className="review-images-section"
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
                            nextEl: ".swiper-btn-next",
                            prevEl: ".swiper-btn-prev",
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
                    <ArrowBackIosNewOutlinedIcon
                        sx={{
                            position: "absolute",
                            top: "50%",
                            transform: "translate(-0%, 0%)",
                            left: 0,
                            ml: 2,
                            border: "1px solid black",
                            borderRadius: "5px",
                            height: "35px",
                            width: "35px",
                            color: "black",
                            p: 1,
                            cursor: "pointer",
                            ":hover": {
                                backgroundColor: "whitesmoke",
                            }
                        }}
                        className="swiper-btn-prev"
                    />
                    <ArrowForwardIosOutlinedIcon
                        sx={{
                            position: "absolute",
                            top: "50%",
                            transform: "translate(-0%, 0%)",
                            right: 0,
                            mr: 2,
                            border: "1px solid black",
                            borderRadius: "5px",
                            height: "35px",
                            width: "35px",
                            color: "black",
                            p: 1,
                            cursor: "pointer",
                            ":hover": {
                                backgroundColor: "whitesmoke",
                            }
                        }}

                        className="swiper-btn-next"
                    />
                </div>
            ) : (
                ""
            )}
        </>
    );
}

export default ReviewImagesSlider;
