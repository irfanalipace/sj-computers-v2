import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { addToCart, addToLocalCart } from "@store/cart/cartThunks";
import Button from "@common/Button/Button";
import imges1 from "@images/cart-product/location.png";
import LocationModal from "@components/Header/Location/LocationModal";
import { QuantityInput } from "@common/QuantityInput/QuantityInput";

import "./CheckOutCard.css";
import { Link } from "react-router-dom";
import AddCartComponents from "@components/ProductCard/AddCartComponents";
import { IS_CHRISTMAS_HOLIDAYS } from "../../../../core/utils/constants";
import ProtectionPopup from "./ProtectionPopup";
export const CheckOutCard = ({ product }) => {
    const currentState = useSelector((state) => state.states.currentState);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const cart = useSelector((state) => state.cart.cart);
    const details = useSelector((state) => state.cart.details);
    // const isLoading = useSelector((state) => state.cart.isLoading);
    const [quantity, setQuantity] = useState(1);
    const [show, setShow] = useState(false);
    const [open, setOpen] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [cartItem, setCartItem] = useState(null);
    const [plan, setPlan] = useState("");
    const handleShow = () => setShow(!show);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const orderEstimatedDelivery = useSelector(
        (state) => state.orders.orderEstimatedDelivery
    );

    const cartClickHandler = () => {
        let productPrice = product.price * quantity;
        let cartQuantity = details.total_items + 1;
        let cartTotal = parseFloat(details?.total) + productPrice;
        let cartSubTotal = parseFloat(details?.sub_total) + productPrice;
        const cartItem = {
            id: product.id,
            quantity: quantity,
            price: productPrice,
            product: { ...product },
        };

        const cartDetails = {
            total_items: cartQuantity,
            total: cartTotal.toFixed(2),
            sub_total: cartSubTotal.toFixed(2),
        };

        if (isAuthenticated)
            dispatch(addToCart({ cartItem }, () => navigate("/cart")));
        else
            dispatch(
                addToLocalCart({ cartItem, cartDetails }, () =>
                    navigate("/cart")
                )
            );
    };

    useEffect(() => {
        let item = cart.filter((ci) => ci.id === product.id);
        setCartItem(item);
    }, [cart]);

    function handleCheckboxClick(event) {
        const clickedCheckbox = event.target;
        const checkboxes = document.querySelectorAll(".protectionPlanCheckbox");

        checkboxes.forEach((checkbox) => {
            if (checkbox !== clickedCheckbox) {
                checkbox.checked = false;
            }
        });
        setPlan(
            clickedCheckbox.id === "protectionPlanCheckbox"
                ? "3 year "
                : clickedCheckbox.id === "protectionPlanCheckbox1"
                ? "4 year"
                : "Unlimited"
        );
    }

    return (
        <div>
            <div className="card-section-right">
                <div>
                    <h6 style={{ fontWeight: "700" }}>Excellent Condition</h6>
                    <h6 style={{ fontWeight: "700" }}>(Refurbished)</h6>
                </div>
                <div className="row card-price-section-card-product">
                    <div className="col-md-12 color-text-cart">
                        <sup>$</sup>
                        {product?.price?.toString().split(".")[0]}
                        <sup>{product?.price?.toString().split(".")[1]}</sup>
                    </div>
                </div>
                <div className="head">
                    <div className="">
                        <p className="cart-text">
                            {/* {product?.description} */}
                            {/* <button className="buttion-details">
                                Details
                                <img src={imges} />
                            </button> */}
                        </p>
                    </div>
                </div>
                {/* Below sections are rendered based on christmas holidays static boolean variable in constants, and it will be true or false based on management decision  */}
                {IS_CHRISTMAS_HOLIDAYS ? (
                    <div className="card-dev-section-paragrap-product">
                        <span className="dilvery-text-paragraph-card">
                            <button className="text-decoration-none text-danger">
                                Arrive after Christmas
                            </button>
                            <span style={{ fontWeight: "bold" }}>
                                {", "}
                                {
                                    orderEstimatedDelivery?.free_shipment_amount
                                        ?.estimate_day
                                }
                            </span>{" "}
                            (Tentative)
                            <br></br>
                            Shipped by SJ Computers
                        </span>
                    </div>
                ) : (
                    <>
                        <div className="card-dev-section-paragrap-product">
                            <div className="hover-box">
                                <Link
                                    href="#"
                                    className="text-decoration-none free-return"
                                    style={{ color: "#2c8a9a" }}
                                >
                                    FREE Returns
                                </Link>
                                <div className="hidden-box">
                                    <span
                                        style={{
                                            fontSize: "12px",
                                            fontWeight: "bold",
                                            marginBottom: "12px",
                                        }}
                                    >
                                        Return this item for free
                                    </span>
                                    <div style={{ marginTop: "12px" }}>
                                        <p style={{ fontSize: "11px" }}>
                                            This item can be returned in its
                                            original condition for a full refund
                                            or replacement within 30 days of
                                            receipt .
                                        </p>
                                        <p
                                            style={{
                                                fontSize: "11px",
                                                color: "#2c8a9a",
                                            }}
                                        >
                                            Read full return policy.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>{" "}
                        <div className="card-dev-section-paragrap-product">
                            <span className="dilvery-text-paragraph-card">
                                <button style={{ color: "#2c8a9a" }}>
                                    FREE Delivery
                                </button>{" "}
                                <span style={{ fontWeight: "bold" }}>
                                    {
                                        orderEstimatedDelivery
                                            ?.free_shipment_amount?.estimate_day
                                    }
                                </span>
                                <br></br>
                                Shipped by SJ Computers
                            </span>
                        </div>{" "}
                        <div className="card-dev-section-paragrap-product">
                            <span className="dilvery-text-paragraph-card">
                                Or fastest Delivery&nbsp;
                                <span style={{ fontWeight: "bold" }}>
                                    Thursday, January 4.&nbsp;
                                </span>
                                Order within{" "}
                                <span style={{ color: "green" }}>
                                    1 hr 28 min.
                                </span>
                            </span>
                        </div>{" "}
                        {/*
                        <div className="card-dev-section-paragrap-product">
                            <span className="dilvery-text-paragraph-card">
                                or{" "}
                                <button className="text-decoration-none">
                                    Fastest delivery
                                </button>{" "}
                                <span style={{ fontWeight: "bold" }}>
                                    {
                                        orderEstimatedDelivery[
                                            "1_day_shipment_amount"
                                        ]?.estimate_day
                                    }
                                </span>{" "}
                                (Tentative)
                            </span>
                        </div>
                           */}
                    </>
                )}

                <div className="color-card-dev">
                    <button
                        className="select-location-btn deliver-to mb-2"
                        onClick={handleShow}
                    >
                        <img
                            src={imges1}
                            style={{ width: "10.5px", height: "14px" }}
                        />
                        &ensp;Deliver to
                        {currentState?.name
                            ? " " + currentState?.name
                            : " Location"}
                    </button>
                    {show && (
                        <LocationModal
                            isOpen={show}
                            handleClose={() => setShow(false)}
                        />
                    )}
                    {cartItem?.length > 0 ? (
                        <p className="item-card-add-text-details">
                            Item Already in Cart
                        </p>
                    ) : (
                        <>
                            <div className="text-stock">
                                <div className="instock-dev-card-product-section-with-color-card">
                                    <div className="in-stock-area-lable">
                                        {product?.quantity > 0 ? (
                                            <small className="in-stock">
                                                {" "}
                                                In Stock
                                            </small>
                                        ) : (
                                            <small className="not-in-stock ">
                                                {" "}
                                                Out of Stock
                                            </small>
                                        )}
                                    </div>
                                    <div>
                                        <span className="color-text-cart-with-inStock">
                                            {product?.quantity < 11 &&
                                                product?.quantity > 0 && (
                                                    <span>
                                                        Only {product?.quantity}{" "}
                                                        pieces left
                                                    </span>
                                                )}
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <QuantityInput
                                        onChange={setQuantity}
                                        maxQuantity={product?.quantity}
                                    />
                                </div>
                            </div>
                            <div className="button-cart-sell">
                                {/* <Button
                                    className="button1 button-text-button"
                                    clickHandler={cartClickHandler}
                                    isLoading={product?.loading}
                                >
                                    Add to Cart
                                </Button> */}

                                <AddCartComponents
                                    open={openDrawer}
                                    setOpen={setOpenDrawer}
                                    product={product}
                                    quantity={quantity}
                                    className="button1 button-text-button"
                                    classNameforBuyNow="buy-now-button button-text-button"
                                    disabled={
                                        product?.quantity < 1 ? true : false
                                    }
                                />
                            </div>
                            {/* <div className="button-cart-sell">
                            <Button
                                className="button2 button-text-button"
                                clickHandler={cartClickHandler}
                                isLoading={isLoading}
                            >
                                Buy Now
                            </Button>
                        </div> */}
                        </>
                    )}

                    <div className="details-container">
                        <div className="col-xl-7 col-6">
                            <span
                                className="color-card-text-paragrap-payment"
                                style={{ color: "#5F5E5E" }}
                            >
                                Payment
                            </span>
                        </div>
                        <div className="col-xl-5 col-6">
                            <div className="hover-box secure-transection-display">
                                <Link
                                    href="#"
                                    className="text-decoration-none secure-payment-method"
                                    style={{ color: "#2c8a9a" }}
                                >
                                    Secure transaction
                                </Link>
                                <div className="hidden-box">
                                    <span
                                        style={{
                                            fontSize: "12px",
                                            fontWeight: "bold",
                                            marginBottom: "12px",
                                        }}
                                    >
                                        Your transaction is Secure
                                    </span>
                                    <div style={{ marginTop: "12px" }}>
                                        <p style={{ fontSize: "11px" }}>
                                            We work hard to protect your
                                            security and privacy. Our payment
                                            security system encrypts your
                                            information during transmission. We
                                            don’t share your credit card details
                                            with third-party sellers, and we
                                            don’t sell your information to
                                            others
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="details-container">
                        <div className="col-xl-7 col-6">
                            <span
                                className="color-card-text-paragrap-payment ships-form-span-tag"
                                style={{ color: "#5F5E5E" }}
                            >
                                Ships Form
                            </span>
                        </div>
                        <div className="col-xl-5 col-6">
                            <span className="color-card-text-paragrap-payment sjcomputer-tag-checkout-card">
                                Sj Computers
                            </span>
                        </div>
                    </div>
                    <div className="details-container">
                        <div className="col-xl-7 col-6">
                            <span
                                className="color-card-text-paragrap-payment return-from-span-tag-checkout"
                                style={{ color: "#5F5E5E" }}
                            >
                                Return
                            </span>
                        </div>

                        <div className="col-xl-5 col-6">
                            <div className="hover-box">
                                <Link
                                    className="text-decoration-none secure-payment-method "
                                    style={{ color: "#2c8a9a" }}
                                >
                                    Eligible for returns<br></br>
                                    refund or <br></br>
                                    replacement wi...
                                </Link>
                                <div className="hidden-box">
                                    <span
                                        style={{
                                            fontSize: "12px",
                                            fontWeight: "bold",
                                            marginBottom: "12px",
                                        }}
                                    >
                                        Eligible for Return, Refund or
                                        Replacement within 30 days of receipt
                                    </span>
                                    <div style={{ marginTop: "12px" }}>
                                        <p style={{ fontSize: "11px" }}>
                                            This item can be returned in its
                                            original condition for a full refund
                                            or replacement within 30 days of
                                            receipt. Read full return policy
                                        </p>
                                    </div>
                                    <Link
                                        to={"/return_refund_policy"}
                                        style={{
                                            marginTop: "12px",
                                            fontSize: "11px",
                                        }}
                                    >
                                        Read full return policy
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr></hr>
                <Link
                    to={"/term_services"}
                    style={{
                        color: "#2c8a9a",
                        fontSize: "14px",
                        fontWeight: "400",
                        textDecoration: "none",
                    }}
                >
                    Details
                </Link>
                <hr></hr>
                <div className="protection-plan">
                    Add a Protection Plan :
                    <div className="check-box-container">
                        <input
                            type="checkbox"
                            className="protectionPlanCheckbox"
                            id="protectionPlanCheckbox"
                            onClick={handleCheckboxClick}
                        />
                        <label
                            htmlFor="protectionPlanCheckbox"
                            onClick={() => setOpen(true)}
                        >
                            3-Year Protection for{" "}
                        </label>
                        <div className="dollar-label mt-1">&nbsp;$23.99</div>
                    </div>
                    <div className="check-box-container">
                        <input
                            type="checkbox"
                            className="protectionPlanCheckbox"
                            id="protectionPlanCheckbox1"
                            onClick={handleCheckboxClick}
                        />
                        <label
                            htmlFor="protectionPlanCheckbox1"
                            onClick={() => setOpen(true)}
                        >
                            4-Year Protection for
                        </label>
                        <div className="dollar-label mt-1">&nbsp;$32.99</div>
                    </div>
                    <div
                        className="check-box-container"
                        onClick={() => setOpen(true)}
                    >
                        <input
                            type="checkbox"
                            className="protectionPlanCheckbox"
                            id="protectionPlanCheckbox2"
                            onClick={handleCheckboxClick}
                        />
                        <label htmlFor="protectionPlanCheckbox2">
                            Tech Unlimited – Protect Eligible Past and Future
                            Purchases with 1 Plan (Renews Monthly Until
                            Cancelled) for
                            <div className="dollar-label mt-1">
                                &nbsp;$16.99/month
                            </div>
                        </label>
                    </div>
                </div>

                <ProtectionPopup
                    open={open}
                    handleClose={() => setOpen(false)}
                    plan={plan}
                    handleAddProtection={() => {
                        setOpen(false);
                        setOpenDrawer(true);
                    }}
                />
            </div>
        </div>
    );
};
