import React from "react";
import { Typography } from "@mui/material";
import { computerCategories } from "./DummyApi";

import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const ShopByCategory = () => {
    return (
        <div
            style={{ marginTop: "10px", marginLeft: "16px" }}
            className="shop-by-category"
        >
            <Typography
                variant="h4"
                py={2}
                fontWeight={"bolder"}
                sx={{ "@media (max-width: 575px)": { fontSize: "18px" } }}
            >
                Shop by Category
            </Typography>
            <Swiper
                className="ms-0 m-lg-4"
                slidesPerView={7.6}
                // spaceBetween={0}
                breakpoints={{
                    // when window width is >= 320px
                    220: {
                        slidesPerView: 2.4,
                    },
                    480: {
                        slidesPerView: 3.5,
                    },
                    640: {
                        slidesPerView: 3.5,
                    },

                    900: {
                        slidesPerView: 4.5,
                    },

                    1200: {
                        slidesPerView: 6.5,
                    },
                }}
                navigation={{
                    nextEl: ".shop-by-category .swiper-button-next",
                    prevEl: ".shop-by-category .swiper-button-prev",
                }}
            >
                {computerCategories.map((category, index) => (
                    <SwiperSlide
                        key={index}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                        }}
                    >
                        <Link to={"/category/monitors"}>
                            <div
                                style={{
                                    backgroundColor: "#F1F2F2",
                                    borderRadius: "100%",
                                    height: "135px",
                                    width: "135px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <img
                                    width={"100px"}
                                    src={category.image_url}
                                    alt={category.name}
                                />
                            </div>
                        </Link>
                        <Typography varient="body2" fontWeight={"bolder"} p={1}>
                            {category.category}
                        </Typography>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* SECOND SLIDER */}
            <Swiper
                slidesPerView={7.6}
                className="ms-0 m-lg-4"
                // spaceBetween={0}
                breakpoints={{
                    // when window width is >= 320px
                    320: {
                        slidesPerView: 2.4,
                    },
                    480: {
                        slidesPerView: 3.5,
                    },
                    640: {
                        slidesPerView: 3.5,
                    },

                    900: {
                        slidesPerView: 4.5,
                    },

                    1200: {
                        slidesPerView: 6.5,
                    },
                }}
                navigation={{
                    nextEl: ".shop-by-category .swiper-button-next",
                    prevEl: ".shop-by-category .swiper-button-prev",
                }}
            >
                {computerCategories.map((category, index) => (
                    <SwiperSlide
                        key={index}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                        }}
                    >
                        <Link to={"/category/monitors"}>
                            <div
                                style={{
                                    backgroundColor: "#F1F2F2",
                                    borderRadius: "100%",
                                    height: "135px",
                                    width: "135px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <img
                                    width={"100px"}
                                    src={category.image_url}
                                    alt={category.name}
                                />
                            </div>
                        </Link>
                        <Typography varient="body2" fontWeight={"bolder"} p={1}>
                            {category.category}
                        </Typography>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ShopByCategory;
