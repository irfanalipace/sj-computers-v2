import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { QuantityInput } from "../common/QuantityInput/QuantityInput";
import { Grid, IconButton, Typography } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import "./CartItem.css";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteItem,
    deleteLocalItem,
    updateLocalQuantity,
    updateQuantity,
} from "@store/cart/cartThunks";

const CartItem = ({ item }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const details = useSelector((state) => state.cart.details);

    const dispatch = useDispatch();

    const deleteItemFunction = () => {
        let cartQuantity = details?.total_items - 1;
        let cartTotal =
            parseFloat(details?.total) -
            item?.price -
            parseFloat(item?.plan_price || 0);
        let cartSubTotal =
            parseFloat(details?.sub_total) -
            item?.price -
            parseFloat(item?.plan_price || 0);

        const cartDetails = {
            total_items: cartQuantity,
            sub_total: cartSubTotal.toFixed(2),
            total: cartTotal.toFixed(2),
        };

        isAuthenticated
            ? dispatch(deleteItem({ cartItem: item }))
            : dispatch(deleteLocalItem({ cartItem: item, cartDetails }));
    };

    const handleQuantity = (quantity) => {
        quantity = parseInt(quantity);
        let subTotal = 0.0;
        let difference = quantity - item?.quantity;
        const productPriceDifference =
            parseFloat(item?.product?.price) * difference;
        let productPriceWithQuantity =
            productPriceDifference + parseFloat(item?.price);
        const warrantyPriceDifference =
            parseFloat(item?.plan?.price || 0) * difference;
        let warrantyPriceWithQuantity =
            warrantyPriceDifference + parseFloat(item?.plan_price || 0);
        subTotal =
            parseFloat(details?.sub_total) +
            parseFloat(productPriceDifference) +
            parseFloat(warrantyPriceDifference);
        const cartTotal =
            parseFloat(details?.total) +
            parseFloat(productPriceDifference) +
            parseFloat(warrantyPriceDifference);
        const cartDetails = {
            total_items: details?.total_items,
            total: cartTotal.toFixed(2),
            sub_total: subTotal.toFixed(2),
        };
        const cartItem = {
            id: item.id,
            quantity,
            difference,
            price: parseFloat(productPriceWithQuantity).toFixed(2),
        };
        console.log(cartItem, "rrrr");
        if (item?.plan?.value) {
            cartItem.plan_price = parseFloat(warrantyPriceWithQuantity).toFixed(
                2
            );
        }

        if (!isAuthenticated) {
            let productQuantity = item?.product?.quantity + difference;
            let in_stock = productQuantity < 1 ? false : true;
            cartItem.in_stock = in_stock;
        }
        isAuthenticated
            ? dispatch(updateQuantity({ cartItem }))
            : dispatch(updateLocalQuantity({ cartItem, cartDetails }));
    };

    const price = parseFloat(item?.price) || 0;
    const planPrice = parseFloat(item?.plan_price) || 0;
    const totalPrice = price + planPrice;

    return (
        <div
            style={{
                borderBottom: "1px solid lightgray",
                padding: "10px",
                textAlign: "left",
            }}
        >
            <div className="cart-item-img">
                <div className="cart-img">
                    <LazyLoadImage
                        width={"100%"}
                        height={"100%"}
                        src={item?.product?.image}
                        alt={item?.name
                            ?.trim()
                            ?.split(" ")
                            ?.slice(0, 9)
                            ?.join(" ")}
                    />
                </div>
                <div className="hidden-on-desktop content-cart">
                    <Typography
                        style={{
                            fontSize: "12px",
                            fontWeight: 400,
                        }}
                        className="nameee"
                    >
                        {item?.name}
                    </Typography>
                    <Typography
                        fontWeight={700}
                        mt={1}
                        style={{ fontSize: "14px" }}
                    >
                        ${item?.price}
                    </Typography>
                    <Typography
                        style={{ fontSize: "14px", color: "#318243" }}
                        mt={1}
                    >
                        In Stock
                    </Typography>
                    <Typography style={{ fontSize: "11px", color: "#333" }}>
                        Ships and sold by sjcomputers.us
                    </Typography>
                </div>
            </div>
            <div
                style={{ color: "#000", textAlign: "center" }}
                className="hidden-on-mobile hidden-on-tab"
            >
                <br />
                <br />${totalPrice}
            </div>

            <Grid
                container
                justifyContent="space-around"
                style={{ width: "80%", margin: "0px auto" }}
                mt={1}
            >
                <Grid item>
                    <div style={{ width: "61px" }}>
                        <QuantityInput
                            onChange={handleQuantity}
                            minQuantity={1}
                            value={item?.quantity}
                            maxQuantity={item?.product?.quantity}
                        />
                    </div>
                </Grid>
                <Grid item sx={{ marginTop: "13px" }}>
                    <IconButton onClick={deleteItemFunction}>
                        <DeleteOutlineOutlinedIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </div>
    );
};

export default CartItem;
