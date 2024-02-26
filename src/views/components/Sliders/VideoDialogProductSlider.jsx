import React, { useState } from "react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "./Slider.css";
import VideoDialogProductCard from "../Product/ProductVideo/VideoDialogProductCard/VideoDialogProductCard";
import { Grid } from "@mui/material";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";

// Install Swiper navigation plugin
// SwiperCore.use([Navigation]);

function VideoDialogProductSlider({ products }) {
    const [btnOpacity, setBtnOpacity] = useState(0);

    const handleMouseOver = () => {
        setBtnOpacity(1);
    };

    const handleMouseOut = () => {
        setBtnOpacity(0);
    };

    return (
        <Grid
            container
            position={"relative"}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
        >
            <Swiper
                slidesPerView={2}
                breakpoints={{
                    200: {
                        slidesPerView: 1,
                    },
                    500: {
                        slidesPerView: 2,
                    },
                }}
                spaceBetween={15}
                style={{ padding: " 10px 30px" }}
                navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                }}
                className="recommendation-slider"
            >
                {products?.map((product) => (
                    <SwiperSlide key={"ps-" + product.id}>
                        <div>
                            <VideoDialogProductCard product={product} />
                        </div>
                    </SwiperSlide>
                ))}
                <ArrowBackIosNewOutlinedIcon
                    className="swiper-button-prev"
                    sx={{
                        position: "absolute",
                        top: "50%",
                        transform: "translate(-0%, -50%)",
                        left: 0,
                        backgroundColor: "whitesmoke",
                        color: "black",
                        height: "75%",
                        m: "auto",
                        border: ".5px solid lightgray",
                        borderRadius: "0px 10px 10px 0px",
                        opacity: btnOpacity,
                        width: "25px",
                        p: 0,
                    }}
                />
                <ArrowForwardIosOutlinedIcon
                    className="swiper-button-next"
                    sx={{
                        position: "absolute",
                        top: "50%",
                        transform: "translate(-0%, -50%)",
                        right: 0,
                        backgroundColor: "whitesmoke",
                        color: "black",
                        height: "75%",
                        m: "auto",
                        border: ".5px solid lightgray",
                        borderRadius: "10px 0px 0px 10px",
                        opacity: btnOpacity,
                        width: "25px",
                        p: 0,
                    }}
                />
            </Swiper>
        </Grid>
    );
}

export default VideoDialogProductSlider;
