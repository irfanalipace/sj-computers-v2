import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProtectionPopup from "../ProtectionPlan/ProtectionPopup";
import { useNavigate } from "react-router-dom";
import { QuantityInput } from "@common/QuantityInput/QuantityInput";
import { useDispatch, useSelector } from "react-redux";
import { PLAN_ENUM } from "@utils/constants";
import { Drawer } from "@mui/material";
import ProtectionPlanDrawer from "../ProtectionPlan/ProtectionPlanDrawer";
import useAddToCart from "./useAddToCart";

function AddToCartAndWarranty({ product }) {
    const [protPlan, setProtPlan] = useState("");
    const [open, setOpen] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [plan, setPlan] = useState("");const [quantity, setQuantity] = useState(1);
    const productAddingToCard = useSelector(
        (state) => state.products.isLoading
    );
    const cartClickHandler = useAddToCart(product, quantity);

    function handleCheckboxClick(event, id) {
        const clickedCheckbox = event.target.checked;

        setProtPlan((prev) => {
            if (prev === id) return null;
            else return id;
        });

        setPlan(
            clickedCheckbox.id === "protectionPlanCheckbox"
                ? "3-Year"
                : clickedCheckbox.id === "protectionPlanCheckbox1"
                ? "4-Year"
                : "unlimited"
        );
    }
    const getPlanvalue = (id) => {
        const matchingEnum = Object.values(PLAN_ENUM).find(
            (enumEntry) => enumEntry.label === id
        );
        setPlan(matchingEnum.value);
    };

    return (
        <div>
            <div className="text-stock">
                <div className="instock-dev-card-product-section-with-color-card">
                    <div className="in-stock-area-lable">
                        {product?.quantity > 0 ? (
                            <small className="in-stock">In Stock</small>
                        ) : (
                            <small className="not-in-stock ">
                                Out of Stock
                            </small>
                        )}
                    </div>
                    <div>
                        <span className="color-text-cart-with-inStock">
                            {product?.quantity < 11 &&
                                product?.quantity > 0 && (
                                    <span>
                                        Only {product?.quantity} pieces left
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
                <button
                    // onClick={cartClickHandler}
                    onClick={() => {
                        protPlan ? cartClickHandler() : setOpen(true);
                    }}
                    isLoading={productAddingToCard}
                    className={"button1 button-text-button"}
                    // style={{ marginBottom: "10px" }}
                >
                    Add to Cart
                </button>
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

            <div className="details-container">
                <div className="col-xl-7 col-5">
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
                                    We work hard to protect your security and
                                    privacy. Our payment security system
                                    encrypts your information during
                                    transmission. We don’t share your credit
                                    card details with third-party sellers, and
                                    we don’t sell your information to others
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="details-container">
                <div className="col-xl-7 col-5">
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
                <div className="col-xl-7 col-5">
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
                                Eligible for Return, Refund or Replacement
                                within 30 days of receipt
                            </span>
                            <div style={{ marginTop: "12px" }}>
                                <p style={{ fontSize: "11px" }}>
                                    This item can be returned in its original
                                    condition for a full refund or replacement
                                    within 30 days of receipt. Read full return
                                    policy
                                </p>
                            </div>
                            <Link
                                to={"/return_refund_policy"}
                                style={{
                                    marginTop: "12px",
                                    fontSize: "11px",
                                    color: "#2c8a9a",
                                }}
                            >
                                Read full return policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Link
                        to={"/term_services"}
                        style={{
                            color: "#2c8a9a",
                            fontSize: "14px",
                            fontWeight: "400",
                            textDecoration: "none",
                        }}
                    >
                        Details
                    </Link> */}
            <hr></hr>
            <div className="protection-plan hidden-on-mobile">
                Add a Warranty Plan :
                <>
                    {Object.values(PLAN_ENUM).map((_plan) => (
                        <div className="check-box-container">
                            <input
                                type="checkbox"
                                className="protectionPlanCheckbox"
                                id={"warranty-" + _plan.value}
                                name={"warranty-" + _plan.value}
                                checked={protPlan === _plan.value}
                                onChange={(e) => {
                                    handleCheckboxClick(e, _plan.value);
                                    // setProtPlan(_plan.value);
                                }}
                            />
                            <label
                                // htmlFor="protectionPlanCheckbox"
                                onClick={() => {
                                    setOpen(true);
                                    setPlan(_plan.value);
                                }}
                            >
                                {_plan.label} for
                                <span style={{ color: "red" }}>
                                    &nbsp;${_plan.price}/Month
                                </span>
                            </label>
                        </div>
                    ))}
                </>
            </div>
            <ProtectionPopup
                open={open}
                handleClose={() => setOpen(false)}
                plan={plan}
                handleAddProtection={(e) => {
                    // handleAddProtection(e);
                    setOpenDrawer(true);
                    setOpen(false);
                }}
            />

            <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
                <ProtectionPlanDrawer
                    closeDrawer={() => setOpen(false)}
                    handleButton={() => {
                        setOpen(false);
                    }}
                    handleAddingProtec={() => {
                        if (plan.value) {
                            cartClickHandler();
                        }
                    }}
                    ProtectionPlanCallBack={getPlanvalue}
                />
            </Drawer>
        </div>
    );
}

export default AddToCartAndWarranty;
