import { Grid } from "@mui/material";
import "./AddToCart.css";
import { useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { Link } from "react-router-dom";

const AddToCartCard = ({ product }) => {
    const totalCart = useSelector((state) => state?.cart?.details?.total);
    function splitStringAtPeriod(str) {
        const parts = str.split(".");
        if (parts.length > 1) {
            return {
                before: parts[0],
                after: parts[1],
            };
        } else {
            return {
                before: str,
                after: "",
            };
        }
    }

    const totalItems = useSelector((state) => state?.cart?.cart.length);
    const totalCartString = totalCart?.toString();
    const { before, after } = splitStringAtPeriod(totalCartString);
    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            // spacing={12}
            mt={5}
        >
            <Grid
                item
                lg={4}
                style={{ backgroundColor: "#fff", height: "180px" }}
                mr={5}
                mb={2}
            >
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item mt={3}>
                        <div className="image-containerer">
                            <LazyLoadImage
                                width={"100%"}
                                height={"100%"}
                                src={product?.image}
                                alt={product?.name
                                    ?.trim()
                                    ?.split(" ")
                                    ?.slice(0, 9)
                                    ?.join(" ")}
                            />
                        </div>
                    </Grid>
                    <Grid item fontSize={20} mr={4}></Grid>
                    <Grid item mr={4}>
                        {/* <div className="protection-wrapper">
                            SJ Computer
                            <br />
                            <span style={{ color: "#318243" }}>Protection</span>
                            <br />
                            <br />
                            <span style={{ color: "#318243" }}>3 Year</span>
                        </div> */}
                    </Grid>
                    <Grid item mr={1}></Grid>
                    <Grid item sx={{ fontSize: "16px", fontWeight: 600 }}>
                        <CheckCircleRoundedIcon sx={{ color: "#318243" }} />
                        &ensp;Added to Cart{" "}
                        <h4
                            style={{
                                marginTop: "8px",
                                marginLeft: "30px",
                                fontSize: "12px",
                                fontWeight: 600,
                            }}
                        >
                            Style:&nbsp;
                            <span>27 ‘’ FHD FreeSync 100HZ</span>
                        </h4>{" "}
                    </Grid>
                </Grid>
            </Grid>
            <Grid
                container
                direction="row"
                justifyContent="space-evenly"
                lg={4}
                style={{ backgroundColor: "#fff" }}
                pt={4}
                pb={4}
                mb={2}
            >
                <Grid item lg={6} mt={6}>
                    <p style={{ fontSize: "11px" }}>
                        <span style={{ color: "#318243", lineHeight: "16px" }}>
                            Your Order qualifies for FREE Shipping.
                        </span>
                        <br />
                        Choose this option at checkout.{" "}
                        <Link> see details</Link>
                    </p>
                </Grid>
                <Grid item lg={5}>
                    <p className="cart-total mb-4">
                        Cart Subtotal:&nbsp;
                        <sup style={{ fontSize: "10px" }}>$</sup>
                        <span style={{ fontSize: "20px" }}>{before}</span>
                        <sup style={{ fontSize: "10px" }}>{after}</sup>
                    </p>
                    <button className="proceed-to-checkout mb-2">
                        Proceed to checkout ({totalItems} item)
                    </button>
                    <button className="go-to-cart">Go to Cart</button>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default AddToCartCard;
