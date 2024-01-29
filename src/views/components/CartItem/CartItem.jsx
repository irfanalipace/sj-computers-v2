import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { QuantityInput } from "../common/QuantityInput/QuantityInput";
import { Grid, IconButton } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const CartItem = ({ item }) => {
    return (
        <div
            style={{
                borderBottom: "1px solid lightgray",
                padding: "10px",
                textAlign: "center",
            }}
        >
            <LazyLoadImage
                width={"100%"}
                height={"100%"}
                src={item?.product?.image}
                alt={item?.name?.trim()?.split(" ")?.slice(0, 9)?.join(" ")}
            />
            <usd style={{ color: "#000" }}>
                <br />
                <br />${item?.price}
            </usd>
            <Grid container justifyContent="space-between" mt={1}>
                <Grid item>
                    <div style={{ width: "70px" }}>
                        <QuantityInput
                            // onChange={handleQuantity}
                            minQuantity={1}
                            value={item?.quantity}
                            maxQuantity={item?.product?.quantity}
                        />
                    </div>
                </Grid>
                <Grid item sx={{ marginTop: "13px" }}>
                    <IconButton>
                        <DeleteOutlineOutlinedIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </div>
    );
};

export default CartItem;
