import React from "react";
import { Link } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import StarRatings from "react-star-ratings";
import { generatePath } from "../../../../core/utils/helpers";

const CategorySliderCard = ({ product }) => {
    const twoLineTypography = {
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        textOverflow: "ellipsis",
        WebkitLineClamp: 2, // Limit the number of displayed lines
        lineHeight: "1.5em", // Adjust the line height as needed
    };

    return (
        <Link
            // to={`${new URL(product?.url).pathname}`}
            to={generatePath(product?.url)}
            style={{ textDecoration: "none" }}
        >
            <Grid
                container
                // className=" ms-3 ms-lg-0"
                // border={".5px solid gray"}
                borderRadius={"10px"}
                height={"285px"}
            >
                <Grid
                    item
                    xs={12}
                    m={"auto"}
                    height={"150px"}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <LazyLoadImage
                        // width={"90px"}
                        // height={"100%"}
                        // width={"100%"}
                        style={{ maxHeight: "145px", maxWidth: "100%" }}
                        src={product?.image}
                        alt={product?.name
                            ?.trim()
                            ?.split(" ")
                            ?.slice(0, 9)
                            ?.join(" ")}
                    />
                </Grid>
                <Grid item xs={12} m={"auto"} py={2} px={2} sx={{ color: "black" }}>
                    <Typography variant={"body2"} sx={twoLineTypography}>
                        {product?.name}
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                    m={"auto"}
                    py={4}
                    px={2}
                    sx={{ color: "black" }}
                    mt={-3}
                >
                    <Typography variant={"body2"}>
                        ${product?.price}{" "}
                        <span
                            style={{
                                marginLeft: "10px",
                                fontSize: "smaller",
                                textDecoration: "line-through",
                            }}
                        >
                            $
                            {parseFloat(
                                ((product?.price * 2) / 1.5).toFixed(2)
                            )}
                        </span>
                    </Typography>
                    {/* <Typography variant="body2">${parseFloat((product?.price*2/1.5).toFixed(2))}</Typography> */}
                </Grid>
            </Grid>
        </Link>
    );
};

export default CategorySliderCard;
