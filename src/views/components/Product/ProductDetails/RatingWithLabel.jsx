import * as React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ minWidth: 45 }}>
                <Typography
                    fontWeight={400}
                    fontSize={"14px"}
                    lineHeight={"20px"}
                >{`${props.label}`}</Typography>
            </Box>
            <Box sx={{ width: "100%", mr: 1 }}>
                <LinearProgress
                    sx={{
                        width: "191px",
                        backgroundColor: "#F0F2F2",
                        border: "2px solid #BBBFBF",
                        height: "20px",
                        borderRadius: "4px",
                    }}
                    variant="determinate"
                    {...props}
                />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography
                    fontWeight={400}
                    fontSize={"14px"}
                    lineHeight={"20px"}
                >{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
    );
}

export default function RatingWithLabel({ value = 0, label = "" }) {
    return (
        <Box sx={{ width: "100%" }}>
            <LinearProgressWithLabel label={label} value={value} />
        </Box>
    );
}
