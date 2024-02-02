import { Typography } from "@mui/material";
import React from "react";

export default function PriceWithLabel({
    price,
    label = "$",
    color = "#B12704",
    sx,
}) {
    return (
        <Typography
            sx={sx}
            fontWeight={400}
            color={color}
            fontSize={"28px"}
            lineHeight={"33px"}
        >
            <sup
                style={{
                    fontWeight: 400,
                    fontSize: "18px",
                    lineHeight: "15px",
                }}
            >
                {label}
            </sup>
            {price?.toString().split(".")[0]}
            <sup
                style={{
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "15px",
                }}
            >
                {price?.toString().split(".")[1]}
            </sup>
        </Typography>
    );
}
