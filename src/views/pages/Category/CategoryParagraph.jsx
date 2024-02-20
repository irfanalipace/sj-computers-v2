import { Grid, Typography } from "@mui/material";
import React from "react";

const CategoryParagraph = () => {
    return (
        <Grid container px={[2, 6]} py={[0, 6]} rowGap={1}>
            <Grid item xs={12}>
                <Typography
                    variant="body1"
                    fontWeight={"bolder"}
                    color={"#E87E24"}
                >
                    About SJ Computers
                </Typography>
            </Grid>
            <Grid item xs={12}>
                {/* Welcome to the Office Products & Office Supplies Store at Sjcomputers.com */}
                <Typography variant="body2">
                    {/* Shoping for{" "} */}
                    <span style={{ fontWeight: "500" }}>
                        Established in 2012, SJ Computers is born of a deep-rooted passion for technology and a commitment to sustainable practices. We are a team of dedicated professionals united by the belief that powerful computing solutions should be accessible to all.  
                    </span>
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body2">
                    Our core mission is to give new life to used or pre-owned computers, primarily from popular brands such as Dell, HP, and Lenovo. Through a careful multi-stage refurbishment process, all laptops, desktops and accessories go thorough inspection, cleaning, and software upgrades.  
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body2">
                    Our professionals ensure optimal performance and functionality at each step of the way. By choosing SJ Computers, you gain access to all the features of the leading brands, but at a significantly reduced cost.  
                </Typography>
            </Grid>
        </Grid>
    );
};

export default CategoryParagraph;
