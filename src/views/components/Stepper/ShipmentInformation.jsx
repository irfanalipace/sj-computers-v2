import { Box, Stack, Typography } from "@mui/material";
import React from "react";

export default function ShipmentInformation() {
    return (
        <Box
            width={"375px"}
            height={"280px"}
            px={3}
            pt={4.5}
            border={"1px solid lightgray"}
        >
            <Typography
                fontFamily={"Inter"}
                fontWeight={500}
                fontSize={"16px"}
                lineHeight={"19px"}
            >
                Shipment Information
            </Typography>
            <Stack spacing={2} mt={2}>
                <Row label="Deliver Method:" value="FedEx Home delivery" />
                <Row label="Courier:" value="Lorem Ipsum Text" />
                <Row label="Tracking ID#:" value="Lorem Ipsum Text" />
                <Row
                    label="Shipping To:"
                    value="John Nick New York, NY street 10001, USA Phone number:+1-123423214"
                />
                <Row label="Tracking ID#:" value="123456789" />
            </Stack>
        </Box>
    );
}

const Row = ({ label, value }) => {
    return (
        <Stack direction={"row"} spacing={1}>
            <Typography
                minWidth={"140px"}
                fontFamily={"Inter"}
                fontWeight={500}
                fontSize={"12px"}
                lineHeight={"14px"}
            >
                {label}
            </Typography>
            <Typography
                fontFamily={"Inter"}
                fontWeight={400}
                fontSize={"12px"}
                lineHeight={"14px"}
            >
                {value}
            </Typography>
        </Stack>
    );
};
