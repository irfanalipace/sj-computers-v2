import { Link } from "react-router-dom/dist";
import "./CartSidebar.css";
import { useSelector } from "react-redux";
import CartItem from "../CartItem/CartItem";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const CartSideBar = () => {
    const totalCart = useSelector((state) => state?.cart?.details?.total);
    const cartItems = useSelector((state) =>
        state?.cart?.cart?.slice().reverse()
    );
    const navigate = useNavigate();
    return (
        <div className="cart-side-bar-container">
            <div className="cart-side-bar-inner">
                <h2>
                    Subtotal{" "}
                    <span
                        className="hidden-on-desktop"
                        style={{ fontWeight: 600 }}
                    >
                        ${totalCart}
                    </span>{" "}
                </h2>
                <usd className="hidden-on-mobile hidden-on-tab">
                    ${totalCart}
                </usd>
                <p className="hidden-on-mobile hidden-on-tab">
                    <span style={{ color: "green" }}>
                        Your Order qualifies for FREE Shipping.
                    </span>{" "}
                    Choose this option at checkout. <br />
                    <Link>see details</Link>
                </p>
                <button
                    className="cart-side-btn hidden-on-mobile hidden-on-tab"
                    onClick={() => navigate("/cart")}
                >
                    Go to Cart
                </button>
                <button className="hidden-on-desktop proceed-cart-btn">
                    Proceed to checkout ({cartItems?.length} item){" "}
                </button>
            </div>
            {cartItems?.map((item) => (
                <div key={item?.id}>
                    <CartItem item={item} />
                </div>
            ))}
            <div
                className="hidden-on-desktop"
                style={{ padding: "30px", borderTop: "20px solid #EAEDED" }}
            >
                <button
                    style={{
                        border: "1px solid #000",
                        outline: "none",
                        width: "100%",
                        padding: "10px",
                        borderRadius: "15px",
                        fontWeight: 500,
                    }}
                    onClick={() => navigate("/")}
                >
                    Add More Items{" "}
                    <ArrowForwardIosIcon sx={{ fontSize: "12px" }} />
                </button>
            </div>
        </div>
    );
};

export default CartSideBar;
