import React from "react";
import { Grid, Typography } from "@mui/material";
import refurbishedIcon1 from "@images/SJ-refurbished-icon1.svg";
import refurbishedIcon2 from "@images/SJ-refurbished-icon2.svg";
import refurbishedIcon3 from "@images/SJ-refurbished-icon3.svg";
import refurbishedIcon4 from "@images/SJ-refurbished-icon4.svg";

function RefurbishedSection() {
    const innerBox = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    };

    return (
        <Grid
            container
            sx={{ borderTop: "1px solid lightgray" }}
            textAlign={"center"}
            rowGap={3}
            py={3}
        >
            <Grid item lg={12} md={12} sm={12} xs={12} textAlign={"center"}>
                <Typography variant="h5" fontWeight={"bolder"}>
                    {" "}
                    What is SJ Computers? {" "}
                </Typography>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <Typography variant="body2">
                SJ Computers is your destination for refurbished desktops, laptops and computer accessories. Since all our products are guaranteed under the SJ Computer’s Policy, Shop to your heart’s content. {" "}
                </Typography>
            </Grid>

            <Grid item lg={3} md={3} sm={6} xs={12} px={2} sx={innerBox}>
                <img
                    style={{ marginBottom: "10px" }}
                    width={"60px"}
                    src={refurbishedIcon1}
                    alt="analysis.pic"
                />
                <Typography variant="p" fontWeight={"bolder"} mb={2}>
                Affordable Devices {" "}
                </Typography>
                <Typography variant="body2">
                    {" "}
                    Since we use refurbished materials in our computers and accessories, We eliminate the need for mining. This in turn makes the products cheaper.{" "}
                </Typography>
            </Grid>

            <Grid item lg={3} md={3} sm={6} xs={12} px={2} sx={innerBox}>
                <img
                    style={{ marginBottom: "10px" }}
                    width={"60px"}
                    src={refurbishedIcon2}
                    alt="analysis.pic"
                />
                <Typography variant="p" fontWeight={"bolder"} mb={2}>
                Trustable Products{" "}
                </Typography>
                <Typography variant="body2">
                    {" "}
                    Over the years, we have garnered a solid reputation for refurbished computers across the USA. Though our prices may be affordable, the same is not true for quality and functionality based on your needs.{" "}
                </Typography>
            </Grid>

            <Grid item lg={3} md={3} sm={6} xs={12} px={2} sx={innerBox}>
                <img
                    style={{ marginBottom: "10px" }}
                    width={"60px"}
                    src={refurbishedIcon3}
                    alt="analysis.pic"
                />
                <Typography variant="p" fontWeight={"bolder"} mb={2}>
                Impactful Purchase {" "}
                </Typography>
                <Typography variant="body2">
                All our products are professionally tested top-of-the-line devices that adhere to the latest technology. The functionalities are highly sought after.{" "}
                </Typography>
            </Grid>

            <Grid item lg={3} md={3} sm={6} xs={12} px={2} sx={innerBox}>
                <img
                    style={{ marginBottom: "10px" }}
                    width={"60px"}
                    src={refurbishedIcon4}
                    alt="analysis.pic"
                />
                <Typography variant="p" fontWeight={"bolder"} mb={2}>
                    Warranty and Support{" "}
                </Typography>
                <Typography variant="body2">
                    {" "}
                    Our products speak for themselves. If you still feel the need for reassurance, SJ Computers gives a free one-year warranty and refund period for its users.{" "}
                </Typography>
            </Grid>

            <Grid item lg={12} container rowGap={1}>
                <Grid item lg={12} textAlign={"start"}>
                    <Typography variant="p" fontWeight={"bold"}>
                    What can I expect to receive with my Refurbished purchase online? {" "}
                    </Typography>
                </Grid>
                <Grid item lg={12} textAlign={"start"}>
                    <Typography variant="body1">
                    The completely refurbished product with its necessary accessories. {" "}
                    </Typography>
                </Grid>
            </Grid>

            <Grid item lg={12} container rowGap={1}>
                <Grid item lg={12} textAlign={"start"}>
                    <Typography variant="p" fontWeight={"bold"}>
                    In what condition can I expect my Refurbished product to be? {" "}
                    </Typography>
                </Grid>
                <Grid item lg={12} textAlign={"start"}>
                    <Typography variant="body1">
                    The refurbished product will be in complete working condition. {" "}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default RefurbishedSection;
