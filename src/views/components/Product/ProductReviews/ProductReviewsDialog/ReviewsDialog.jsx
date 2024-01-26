import React, { useEffect, useState, useRef } from "react";
import {
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    IconButton,
    Box,
    Typography,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import AppsIcon from "@mui/icons-material/Apps";

import ReviewCard from "../ReviewCard";
import "./ReviewDialog.css";

// Slider Imports
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
// import { LazyLoadImage } from "react-lazy-load-image-component";
import "swiper/css/navigation";

const ReviewsDialog = ({
    open,
    handleDialogOpen,
    handleClose,
    reviewId = null,
    imgIndex,
    ReviewsData,
    reviews,
}) => {
    const swiperRef = useRef(null);

    const [reviewCardId, setReviewCardId] = useState(reviewId)
    const [imgGallery, setImgGallery] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);
    const [activeSlide, setActiveSlide] = useState(imgIndex);
    const [initialSlide, setInitialSlide] = useState(imgIndex);
    // const [selectedIndex, setSelectedIndex] = useState(null)
    // console.log(selectedReview?.images.map((image) => {  console.log("image" ,image.imageUrl) }), "images.image");

    const getReviewById = async (productReviewId, imgIndex) => {
        console.log("clicked on image ", productReviewId);
        if (typeof productReviewId !== "number") {
            console.log("reiewId empty open gallery");
            setImgGallery(true);
        } else {
            // setInitialSlide(imgIndex)
            // // const review = ReviewsData?.data?.find((r) => r.product_review_id === productReviewId);
            // const review = ReviewsData?.data?.filter(obj => obj.review_id === productReviewId)
            // setSelectedReview(review)
            // console.log(review, "review", productReviewId, "reviewId");
            // setImgGallery(false)
            setReviewCardId(productReviewId)
            setInitialSlide(imgIndex)
            const review = ReviewsData?.data?.filter(
                (obj) => obj.review_id === productReviewId
            );
            setSelectedReview(review);
            setImgGallery(false);
            const review2 = selectedReview?.map((data, index) => data.id) ?? [];
            const indexof = review2.indexOf(imgIndex + 1);
            const positiveIndex = Math.abs(indexof);
            setTimeout(() => {
                if (swiperRef.current && swiperRef.current.swiper) {
                    console.log("present");
                    swiperRef.current.swiper.slideTo(positiveIndex);
                } else {
                    console.log("not present");
                }
            }, 500);
        }
    };

    useEffect(() => {
        getReviewById(reviewId, imgIndex);
    }, [reviewId, imgIndex]);

    const handleSwitchImage = (index) => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideTo(index);
            // setActiveSlide(swiperRef.current.swiper.activeIndex) // 0-based index
            console.log(
                "Slider index : ",
                swiperRef.current.swiper.activeIndex,
                "active slide :",
                activeSlide,
                "index :",
                index
            );
        }
    };

    const handleSlideChange = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            setActiveSlide(swiperRef.current.swiper.activeIndex); // 0-based index
        }
    };

    const handleSelectImageGallery = async (productReviewId, index, id ) => {
        setReviewCardId(productReviewId)
        setImgGallery(false);
        const review = ReviewsData?.data?.filter(
            (obj) => obj.review_id === productReviewId
        );
        setSelectedReview(review);
        const review2 = selectedReview?.map((data, index) => data.id) ?? [];
        const indexof = review2.indexOf(index + 1);
        const positiveIndex = Math.abs(indexof);
        setTimeout(() => {
            if (swiperRef.current && swiperRef.current.swiper) {
                console.log("present");
                swiperRef.current.swiper.slideTo(positiveIndex);
            } else {
                console.log("not present");
            }
        }, 100);
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth={"lg"}>
            <DialogContent sx={{ minWidth: "75vw", width: "100%", p: 0 }}>
                <Box
                    sx={{
                        width: "100%",
                        backgroundColor: "whitesmoke",
                        textAlign: "end",
                        position: "sticky",
                        top: 0,
                        left: 0,
                    }}
                >
                    <DialogActions>
                        <IconButton onClick={handleClose}>
                            <CloseOutlinedIcon />
                        </IconButton>
                    </DialogActions>
                </Box>

                {imgGallery == true ? (
                    // ---- image Gallery ---
                    <div style={{ minHeight: "30rem" }}>
                        <div className="gallery-container">
                            {ReviewsData?.data?.map((data, index) => (
                                <div
                                    key={data?.id}
                                    className="images-container"
                                >
                                    <div
                                        onClick={() =>
                                            handleSelectImageGallery(
                                                data?.product_review_id,
                                                index, 
                                                data?.id
                                            )
                                        }
                                        className="image-item"
                                        style={{
                                            backgroundImage: `url(${data?.file_path})`,
                                        }}
                                    ></div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <Grid container p={2} rowGap={1} width={"100%"}>
                        <Grid item xs={12}>
                            <Typography
                                variant="body2"
                                onClick={() => setImgGallery(true)}
                                sx={{ cursor: "pointer" }}
                            >
                                <IconButton>
                                    <AppsIcon />
                                </IconButton>
                                View image gallery{" "}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            md={6}
                            height={"30rem"}
                            sx={{ backgroundColor: "black" }}
                            display={"flex"}
                            alignItems={"center"}
                        >
                            <Swiper
                                ref={swiperRef}
                                style={{ width: "100%", height: "100%" }}
                                spaceBetween={1}
                                slidesPerView={1}
                                navigation
                                // loop
                                // onSwiper={(swiper) => console.log(swiper)}
                                onActiveIndexChange={(e) => console.log(e)}
                                // centeredSlides
                                onSlideChange={handleSlideChange}
                                initialSlide={initialSlide} // initial slide takes count from 0
                            >
                                {selectedReview?.map((data, index) => (
                                    <SwiperSlide
                                        key={data.id}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <img
                                            src={data?.file_path}
                                            style={{
                                                maxHeight: "100%",
                                                maxWidth: "100%",
                                            }}
                                            alt="review image"
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </Grid>

                        <Grid item xs={6} pl={2} container>
                            <Grid item xs={12}>
                                {reviews?.product_detail?.data
                                    ?.filter((review) => review.id === reviewCardId)
                                    .map((filteredReview, index) => (
                                        <div className="my-4 ms-3" key={index}>
                                            <ReviewCard reviewData={filteredReview} isDialog={true} />
                                        </div>
                                    ))}
                            </Grid>
                            <Grid className="ms-3" item xs={12} py={1}>
                                <Typography
                                    py={1}
                                    variant="body1"
                                    fontSize={"small"}
                                    mb={1}
                                >
                                    Images in this review
                                </Typography>
                                <div style={{ display: "flex" }}>
                                    {selectedReview?.map((data, index) => (
                                        <Box
                                            key={data.id}
                                            onClick={() =>
                                                handleSwitchImage(index)
                                            }
                                            width={"59px"}
                                            height={"59px"}
                                            border={
                                                activeSlide == index
                                                    ? "2px solid orange"
                                                    : ""
                                            }
                                            sx={{
                                                mr: "10px",
                                                backgroundImage: `url(${data?.file_path})`,
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                            }}
                                        ></Box>
                                    ))}
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ReviewsDialog;

// const handleSelectImageGallery = async(productReviewId, id) => {
//   const review = await ReviewsData?.data?.filter(obj => obj.review_id === productReviewId)
//   const review2 = await selectedReview?.map((data, index) => data.id) ?? []
//   const indexof = await review2.indexOf(id)
//   const positiveIndex = await Math.abs(indexof);
//   console.log("index",indexof,"positive index", positiveIndex, " id", id);
//   // console.log(review2[0]., "review2");
//   await setInitialSlide(positiveIndex)
//   setSelectedReview(review)
//   console.log("id : ", id , "initialSlide : ", initialSlide , );
//   setImgGallery(false)
//  }
