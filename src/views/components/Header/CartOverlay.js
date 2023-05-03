import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "@common/Spinner/Spinner";
import { deleteItem, deleteLocalItem } from "@store/cart/cartThunks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const CartOverlay = ({ isOpen, toggleSidebar }) => {
    const cartItems = useSelector((state) => state.cart.cart);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const details = useSelector((state) => state.cart.details);
    const [updatingItem, setUpdatingItem] = useState(false);

    const dispatch = useDispatch();

    const deleteItemFunction = (item) => {
        let cartQuantity = details?.total_quantity - 1;
        let cartTotal = parseFloat(details?.total) - parseFloat(item?.price);

        const cartDetails = {
            total_quantity: cartQuantity,
            total: cartTotal.toFixed(2),
        };

        isAuthenticated
            ? dispatch(deleteItem({ cartItem: item, cartDetails }))
            : dispatch(deleteLocalItem({ cartItem: item, cartDetails }));
    };
    return (
        <div className={`sidebar-cart ${isOpen ? "open" : "closed"}`}>
            <button onClick={toggleSidebar} className="close-button">
                <FontAwesomeIcon icon={faTimes} />
            </button>
            {/* sidebar content */}
            <div className="bg-white py-5 px-4">
                {cartItems?.map((item) => (
                    <div key={item.id} id={item.id}>
                        <hr className="hrline"></hr>
                        <div className="items">
                            <div className="row">
                                <div className="col-md-2">
                                    <img
                                        src={item?.product?.image}
                                        alt=""
                                        className="ssd-image"
                                    />
                                </div>
                                <div className="col-md-10">
                                    <div className="d-flex flex-column h-100 justify-content-between mx-0">
                                        <div className="items-card-data">
                                            <div className="col-md-10">
                                                <p>
                                                    <strong className="item-details">
                                                        {item?.product?.name}
                                                    </strong>
                                                </p>
                                                <ul className="item-list">
                                                    <li>
                                                        <span className="item-stock">
                                                            {item?.product
                                                                ?.quantity
                                                                ? "In Stock"
                                                                : "Out of Stock"}
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-md-2 price-item">
                                                <p>
                                                    <strong className="">
                                                        ${item?.price}
                                                    </strong>
                                                </p>
                                            </div>
                                        </div>
                                        {item.loading ? (
                                            <Loader />
                                        ) : (
                                            <>
                                                <div
                                                    className="d-flex"
                                                    style={{
                                                        maxWidth: "700px",
                                                    }}
                                                >
                                                    <button
                                                        onClick={() =>
                                                            deleteItemFunction(
                                                                item
                                                            )
                                                        }
                                                        className="button-link ms-2"
                                                        disabled={updatingItem}
                                                    >
                                                        {updatingItem ? (
                                                            <Loader />
                                                        ) : (
                                                            "Delete"
                                                        )}
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="row mx-0">
                    <div className="col-3"></div>
                    <div className="col-9">
                        <div className="sub-title-add d-flex justify-content-end">
                            <div>
                                <span className="">Cart Subtotal</span>
                                <span className="item1">
                                    ( {details?.total_quantity} items ):
                                </span>
                                ${details?.total}
                                <div className="mt-2">
                                    <button className="cart-overlaybutton">
                                        <Link
                                            to="/cart"
                                            className="text-decoration-none cart-text-link"
                                            onClick={toggleSidebar}
                                        >
                                            Cart
                                        </Link>
                                    </button>
                                    <button className="processed-button">
                                        <Link
                                            to="/checkout"
                                            className="text-decoration-none processed-link"
                                            onClick={toggleSidebar}
                                        >
                                            Proceed to checkout (
                                            {details?.total_quantity} item)
                                        </Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="first-dev">
                        <div className="not-add">
                            <span>
                                <img src={vectorimg} /> Not Added
                            </span>
                        </div>
                    </div> */}
                </div>

                {/* <div className="img-dev">
                    <div className="img-sets">
                        <img src={reaxtimg} alt="" />
                    </div>
                    <div className="cart-overlay-mein">
                        <button className="cart-overlaybutton">
                            <Link
                                to="/cart"
                                className="text-decoration-none cart-text-link"
                            >
                                Cart
                            </Link>
                        </button>
                    </div>
                    <div className="procesed-dev">
                        <button className="processed-button">
                            <Link
                                to="/checkout"
                                className="text-decoration-none processed-link"
                            >
                                Proceed to checkout (item)
                            </Link>
                        </button>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default CartOverlay;
