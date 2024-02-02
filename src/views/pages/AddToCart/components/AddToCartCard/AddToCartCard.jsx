import { Grid } from "@mui/material";
import "./AddToCart.css";
import { useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

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

    const totalItems = useSelector((state) => state?.cart?.cart);
    const totalCartString = totalCart?.toString();
    const { before, after } = splitStringAtPeriod(totalCartString);
    const navigate = useNavigate();
    const { productId } = useParams();
    const gettingProtectionPlan = totalItems?.find(
        (item) => item?.product?.asin == productId
    );
    console.log("DFSDF", gettingProtectionPlan);
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
                lg={gettingProtectionPlan?.plan?.durationInYears ? 6 : 5}
                style={{ backgroundColor: "#fff", height: "180px" }}
                mr={5}
                mb={2}
            >
                <Grid
                    container
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                >
                    <Grid item mt={3} lg={4} pl={5}>
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
                    {gettingProtectionPlan?.plan?.durationInYears ? (
                        <>
                            <Grid item>+</Grid>
                            <Grid item lg={2}>
                                <div className="protection-wrapper">
                                    SJ Computer
                                    <br />
                                    <span style={{ color: "#318243" }}>
                                        Protection
                                    </span>
                                    <br />
                                    <br />
                                    <span style={{ color: "#318243" }}>
                                        {
                                            gettingProtectionPlan?.plan
                                                ?.durationInYears
                                        }
                                        &nbsp;Years
                                    </span>
                                </div>
                            </Grid>
                        </>
                    ) : (
                        <></>
                    )}
                    <Grid
                        item
                        lg={
                            gettingProtectionPlan?.plan?.durationInYears ? 4 : 6
                        }
                    >
                        <CheckCircleRoundedIcon sx={{ color: "#318243" }} />
                        &ensp;<b style={{ fontWeight: 600 }}>Added to Cart</b>
                        <h4
                            style={{
                                marginTop: "8px",
                                // marginLeft: "30px",
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
                lg={gettingProtectionPlan?.plan?.durationInYears ? 3 : 5}
                style={{ backgroundColor: "#fff" }}
                pt={4}
                pb={4}
                mb={2}
            >
                {!gettingProtectionPlan?.plan?.durationInYears && (
                    <Grid item lg={6} mt={6}>
                        <p style={{ fontSize: "11px" }}>
                            <span
                                style={{ color: "#318243", lineHeight: "16px" }}
                            >
                                Your Order qualifies for FREE Shipping.
                            </span>
                            <br />
                            Choose this option at checkout.{" "}
                            <Link> see details</Link>
                        </p>
                    </Grid>
                )}
                <Grid
                    item
                    lg={!gettingProtectionPlan?.plan?.durationInYears ? 5 : 10}
                >
                    <p className="cart-total mb-4">
                        Cart Subtotal:&nbsp;
                        <sup style={{ fontSize: "10px" }}>$</sup>
                        <span style={{ fontSize: "20px" }}>{before}</span>
                        <sup style={{ fontSize: "10px" }}>{after}</sup>
                    </p>
                    <button
                        className="proceed-to-checkout mb-2"
                        onClick={() => navigate("/checkout")}
                    >
                        Proceed to checkout ({totalItems?.length} item)
                    </button>
                    <button
                        className="go-to-cart"
                        onClick={() => navigate("/cart")}
                    >
                        Go to Cart
                    </button>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default AddToCartCard;
