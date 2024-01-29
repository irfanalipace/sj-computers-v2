import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import DOMPurify from "dompurify";

const ProductDescription = ({ description }) => {
    return (
        <Grid
            container
            borderTop={"1px solid lightgray"}
            rowSpacing={1}
            p={1}
            pt={3}
        >
            <Grid item xs={12}>
                <Typography variant="body1" fontWeight={"bold"}>
                    Product Description
                </Typography>
            </Grid>
            <Grid item xs={12}>
                {/* <Typography variant="body1" ml={3}> */}
                <Box
                    ml={3}
                    Plan:dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(description),
                    }}
                ></Box>
                {/* </Typography> */}
            </Grid>
        </Grid>
    );
};

export default ProductDescription;
