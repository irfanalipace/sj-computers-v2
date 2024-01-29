import React, { useEffect, useState } from "react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
// import { LazyLoadImage } from "react-lazy-load-image-component";
import "swiper/css/navigation";
import ReviewsDialog from "./ProductReviewsDialog/ReviewsDialog";
// import ReviewsData from "./DummyReviewsData";
import { allReviewImagesApi } from "../../../../core/api/product-review";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";

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

    const handleOpenDialog = (reviewId, imgId) => {
        setOpen(true);
        setReviewId(reviewId);
        setImgId(imgId);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // console.log(ReviewsData.reviews);

    return (
        <div
            className="review-images-section"
            style={{ position: "relative", padding: "0px 70px" }}
        >
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
                spaceBetween={3}
                slidesPerView={1}
                navigation={{
                    nextEl: ".swiper-btn-next",
                    prevEl: ".swiper-btn-prev",
                }}
                pagination={{ clickable: true }}
                breakpoints={{
                    // For mobile screens

                    // For larger screens
                    1024: {
                        slidesPerView: 4,
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
                            <SwiperSlide
                                style={{ paddingBottom: 0, height: "180px" }}
                            >
                                <div
                                    src={data?.file_path}
                                    style={{
                                        backgroundImage: `url(${data?.file_path})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                    }}
                                    onClick={() =>
                                        handleOpenDialog(
                                            data?.review_id,
                                            data?.id
                                        )
                                    }
                                    alt="review-image"
                                    className="all-reviews-image"
                                ></div>
                            </SwiperSlide>

                            {/* ))} */}
                        </button>
                    </div>
                ))}
            </Swiper>
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
                }}
                className="swiper-btn-prev swiper-video-button"
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
                }}
                className="swiper-btn-next swiper-video-button"
            />
        </div>
    );
}

export default ReviewImagesSlider;
