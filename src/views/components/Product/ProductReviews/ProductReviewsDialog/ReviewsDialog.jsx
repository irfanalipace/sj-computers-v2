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
import useSpecificReview from "./useSpecificReview";
import ImageGallery from "./ImageGallery";

const ReviewsDialog = ({
    open,
    handleClose,
    reviewId = null,
    imgId,
    imgIndex,
    ReviewsData,
    reviews,
    inReviewCard = false,
}) => {
    const swiperRef = useRef(null);
    const [selectIndex, setSelectIndex] = useState(imgIndex);

    const [reviewCardId, setReviewCardId] = useState(reviewId);
    const [imgGallery, setImgGallery] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);
    const [activeSlide, setActiveSlide] = useState(imgId);
    const [initialSlide, setInitialSlide] = useState(imgId);

    const [reviewsData, setReviewsData] = useState({});
    const { data, loading, error } = useSpecificReview(reviewCardId, reviews);

    // the purpose of passing the reviews is to check the data if its already present in the props

    // USE-EFFECT for ReviewCard Data

    const getReviewById = (productReviewId, imgId, imgIndex) => {
        // console.log("clicked on image of product_review_id ", productReviewId);
        if (typeof productReviewId !== "number") {
            // console.log("reiewId empty open gallery");
            setImgGallery(true);
        } else {
            setReviewCardId(productReviewId);
            // setReviewsData(data)
            const review = ReviewsData?.data?.filter(
                (obj) => obj.id === productReviewId
            );
            //   console.log(review, "reviewData");
            setSelectedReview(review);
            setImgGallery(false);
            setSelectIndex(imgIndex);
            setActiveSlide(imgIndex);
            // console.log("returned data: ",data,  "loading:" ,loading ,"error",  error);
        }
    };

    useEffect(() => {
        getReviewById(reviewId, imgId, imgIndex);
    }, [reviewId, imgId, open]);

    // USEEFFECT FOR SELECTING INDEX
    useEffect(() => {
        if (swiperRef.current && swiperRef.current.swiper) {
            console.log("present");
            swiperRef.current.swiper.slideTo(selectIndex);
        } else {
            console.log("not present");
        }
    }, [swiperRef.current?.swiper, selectIndex]);

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
                    <ImageGallery
                        getReviewById={getReviewById}
                        ReviewsData={ReviewsData}
                    />
                ) : (
                    //  --- image-preview-section
                    <Grid container p={2} rowGap={1} width={"100%"}>
                        {inReviewCard == true ? (
                            ""
                        ) : (
                            <Grid item xs={12}>
                                <Typography
                                    variant="body2"
                                    // fontWeight={"bolder"}
                                    color={"black"}
                                    fontWeight={"bolder"}
                                    onClick={() => setImgGallery(true)}
                                    sx={{ cursor: "pointer" }}
                                >
                                    <IconButton sx={{ color: "black" }}>
                                        <AppsIcon />
                                    </IconButton>
                                    View Image Gallery{" "}
                                </Typography>
                            </Grid>
                        )}
                        <Grid
                            item
                            md={6}
                            xs={12}
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
                                // onActiveIndexChange={(e) => console.log(e)}
                                onSlideChange={handleSlideChange}
                                // initialSlide={initialSlide} // initial slide takes count from 0
                            >
                                {selectedReview?.[0]?.product_media?.map(
                                    (data, index) => (
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
                                    )
                                )}
                            </Swiper>
                        </Grid>

                        <Grid
                            item
                            xs={6}
                            pl={2}
                            container
                            height={"30rem"}
                            sx={{ overflowY: "auto" }}
                        >
                            <Grid item xs={12}>
                                {/* <div className="my-4 ms-3" > */}
                                <ReviewCard
                                    reviewData={data}
                                    isDialog={true}
                                    index={reviewId}
                                />
                                {/* </div> */}
                                {/* </Grid> */}
                                {/* <Grid className="ms-3" item xs={12} py={1}> */}
                                <Typography
                                    py={1}
                                    variant="body1"
                                    fontSize={"small"}
                                    mb={1}
                                >
                                    Images in this review
                                </Typography>
                                <div style={{ display: "flex" }}>
                                    {selectedReview?.[0]?.product_media?.map(
                                        (data, index) => (
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
                                                    backgroundPosition:
                                                        "center",
                                                }}
                                            ></Box>
                                        )
                                    )}
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
