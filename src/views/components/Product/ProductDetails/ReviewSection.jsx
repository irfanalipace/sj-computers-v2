import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import Tooltip from "../../Tooltip";
import HoverColorChange from "../../HoverColorChange";
import StarRatings from "react-star-ratings";
import RatingDetails from "./RatingDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function ReviewSection({ product }) {
    return (
        <Stack
            direction={{
                xs: "column",
                lg: "row",
            }}
            my={[4, 1, 0.5]}
            alignItems={["center", "center", "start"]}
            gap={2}
        >
            <Tooltip content={<RatingDetails product={product} />}>
                <Stack direction={"row"}>
                    <Typography
                        fontSize={"14px"}
                        fontWeight={400}
                        fontFamily={"Inter"}
                        sx={{ mr: 1, mt: 0.4 }}
                    >
                        {product?.rating}
                    </Typography>
                    <Box>
                        <StarRatings
                            style={{ PointerEvent: null }}
                            rating={product?.rating}
                            starRatedColor="rgb(232, 126, 36)"
                            numberOfStars={5}
                            name="rating"
                            isSelectable={false}
                            starDimension={"20px"}
                            starSpacing={"0"}
                        />
                        <ExpandMoreIcon
                            sx={{
                                width: "15px",
                                height: "15px",
                            }}
                        />
                    </Box>
                </Stack>
            </Tooltip>
            <Stack direction={"row"} spacing={1}>
                <HoverColorChange hoverColor="#FFA41C" defaultColor="#007185">
                    <a href="#rating" className="review-text">
                        66 Ratings
                    </a>
                </HoverColorChange>
                <Divider
                    orientation="vertical"
                    variant="middle"
                    sx={{
                        borderLeftWidth: "1px",
                        background: "#0F1111",
                    }}
                    flexItem
                />
                <HoverColorChange hoverColor="#FFA41C" defaultColor="#007185">
                    <a href="questions" className="review-text">
                        11 answered questions
                    </a>
                </HoverColorChange>
            </Stack>
        </Stack>
    );
}
