import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import HomeImage from "../../../assets/images/trackorder/home.png";

export default function ExpectOnDeliveryDay() {
    return (
        <Box px={3} pt={4.5} border={"1px solid lightgray"} p={3}>
            <Typography
                fontFamily={"Inter"}
                fontWeight={500}
                fontSize={"16px"}
                lineHeight={"19px"}
            >
                What to Expect on Delivery Day
            </Typography>

            <Stack direction={"row"} mt={3} spacing={1}>
                <img src={HomeImage} alt="item" />

                <Typography
                    fontFamily={"Inter"}
                    fontWeight={400}
                    fontSize={"12px"}
                    lineHeight={"17px"}
                >
                    Lorem ipsum Lorem Ipsum is simply dummy text text ever since
                    the 1500s, when an unknown dknfd.
                </Typography>
            </Stack>
        </Box>
    );
}
