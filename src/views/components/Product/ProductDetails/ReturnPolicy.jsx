import { Link, Stack, Typography } from "@mui/material";
import React from "react";

export default function ReturnPolicy() {
    return (
        <Stack spacing={1} sx={{ padding: "8px", width: "200px" }}>
            <Typography
                fontFamily={"Inter"}
                fontWeight={700}
                fontSize={"12px"}
                lineHeight={"14px"}
            >
                Return this item for free
            </Typography>
            <Typography
                fontFamily={"Inter"}
                fontWeight={400}
                fontSize={"11px"}
                lineHeight={"14px"}
            >
                This item can be returned in its orignal condition for a full
                refund or replacment within 30 days of receipt.
            </Typography>

            <Link href="#" underline="none">
                Read full return policy
            </Link>
        </Stack>
    );
}
