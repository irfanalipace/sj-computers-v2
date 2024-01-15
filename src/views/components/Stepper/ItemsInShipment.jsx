import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import ItemImage from "../../../assets/images/trackorder/item.png";

export default function ItemsInShipment() {
    return (
        <Box
            width={"375px"}
            height={"280px"}
            px={3}
            pt={4.5}
            border={"1px solid lightgray"}
            p={3}
        >
            <Typography
                fontFamily={"Inter"}
                fontWeight={500}
                fontSize={"16px"}
                lineHeight={"19px"}
            >
                Items in Shipment
            </Typography>

            <Stack direction={"row"} mt={3} spacing={2}>
                <img src={ItemImage} alt="item" />
                <Stack>
                    <Stack mt={2.5} spacing={0.5}>
                        <Typography
                            fontFamily={"Inter"}
                            fontWeight={400}
                            fontSize={"14px"}
                            lineHeight={"16px"}
                            color={"#007185"}
                        >
                            Lorem Ipsum Text Dot Ext not Isxh KMC
                        </Typography>
                        <Typography
                            fontFamily={"Inter"}
                            fontWeight={400}
                            fontSize={"12px"}
                            lineHeight={"17px"}
                        >
                            Lorem ipsum Lorem Ipsum is simply dummy.{" "}
                        </Typography>
                    </Stack>
                    <Typography
                        fontFamily={"Inter"}
                        fontWeight={500}
                        fontSize={"12px"}
                        lineHeight={"14px"}
                        sx={{ mt: 2 }}
                    >
                        Quantity: 1
                    </Typography>
                </Stack>
            </Stack>
        </Box>
    );
}
