import React, { useEffect, useState } from "react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
// import { LazyLoadImage } from "react-lazy-load-image-component";
import "swiper/css/navigation";
import ReviewsDialog from "./ProductReviewsDialog/ReviewsDialog";
// import ReviewsData from "./DummyReviewsData";
import { allReviewImagesApi } from "../../../../core/api/product-review";

SwiperCore.use([Navigation, Pagination]);

function ReviewImagesSlider({ productId, reviews }) {
    const [open, setOpen] = useState(false);
    const [reviewId, setReviewId] = useState({});
    const [imgId, setImgId] = useState("");
    const [ReviewsData, setReviewsData] = useState([]);

    const fetchData = async (productId) => {
        try {
            const response = await allReviewImagesApi(productId);
            console.log(response, "responseAllImage");
            setReviewsData(response);
        } catch (error) {
            console.log("error");
        }
    };

    useEffect(() => {
        fetchData(productId);
    }, [allReviewImagesApi]);

    console.log(reviews, "reviews");

    const handleOpenDialog = (reviewId, imgId) => {
        setOpen(true);
        setReviewId(reviewId);
        setImgId(imgId);
        // console.log(reviews, "reviews");
    };

    const handleClose = () => {
        setOpen(false);
    };

    // console.log(ReviewsData.reviews);

    return (
        <div className="review-images-section">
            {/* <button onClick={handleOpenDialog}>image Gallery</button> */}
            {!!ReviewsData?.data?.length && (
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
            )}
            <Swiper
                className=""
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
                <ReviewsDialog
                    open={open}
                    handleOpenDialog={handleOpenDialog}
                    handleClose={handleClose}
                    reviewId={reviewId}
                    imgId={imgId}
                    ReviewsData={ReviewsData}
                    reviews={reviews}
                />

                {ReviewsData?.data?.map((data, index) => (
                    <div key={data.id}>
                        <button
                            // onClick={() => handleOpenDialog(rev)}
                            className="btn btn-light p-1 d-flex align-items-center"
                        >
                            {/* {rev?.images?.map((image, index) => ( */}
                            <SwiperSlide style={{backgroundColor: 'black', paddingBottom: 0, height: "180px"}}>
                                <img
                                    src={data?.file_path}
                                    onClick={() =>
                                        handleOpenDialog(data?.review_id, data?.id)
                                    }
                                    alt="review-image"
                                    className="all-reviews-image"
                                />
                            </SwiperSlide>

                            {/* ))} */}
                        </button>
                    </div>
                ))}
            </Swiper>
        </div>
    );
}

export default ReviewImagesSlider;
