import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "@common/Spinner/Spinner";
import { deleteItem, deleteLocalItem } from "@store/cart/cartThunks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import "./CartOverlay.css";
import { CheckoutBox } from "../ShoppingCart/CheckOut/CheckoutBox";

const CartOverlay = ({ isOpen, toggleSidebar }) => {
    const cartItems = useSelector((state) => state.cart.cart);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const details = useSelector((state) => state.cart.details);
    const [updatingItem, setUpdatingItem] = useState(false);

    const dispatch = useDispatch();

    const deleteItemFunction = (item) => {
        let cartQuantity = details?.total_items - 1;
        let cartTotal = parseFloat(details?.total) - item?.price;
        let cartSubTotal = parseFloat(details?.sub_total) - item?.price;

        const cartDetails = {
            total_items: cartQuantity,
            sub_total: cartSubTotal.toFixed(2),
            total: cartTotal.toFixed(2),
        };

        isAuthenticated
            ? dispatch(deleteItem({ cartItem: item }))
            : dispatch(deleteLocalItem({ cartItem: item, cartDetails }));
    };

    const [showModal, setShowModal] = useState(false);
    const modalRef = useRef(null);

    const handleClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setShowModal(false);
            toggleSidebar(false);
        }
    };

    useEffect(() => {
        if (showModal) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showModal]);

    // useEffect(() => {
    //     if (showModal) {
    //         document.body.classList.add("modal-open");
    //     } else {
    //         document.body.classList.remove("modal-open");
    //     }

    //     return () => {
    //         document.body.classList.remove("modal-open");
    //     };
    // }, [showModal]);

    return (
        <div>
            {isOpen && (
                <div
                    className="sidebarOverlay"
                    onClick={toggleSidebar}
                    style={{ overflowY: "hidden" }}
                ></div>
            )}
            <div className={`sidebar-cart ${isOpen ? "open" : "closed"}`}>
                <button onClick={toggleSidebar} className="close-button">
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                {/* sidebar content */}

                {details?.total_items > 0 ? (
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
                                                className="cartItem-image"
                                            />
                                        </div>
                                        <div className="col-md-10">
                                            <div className="d-flex flex-column h-100 justify-content-between mx-0">
                                                <div className="items-card-data row">
                                                    <div className="col-md-10 item-detail-col">
                                                        <Link
                                                            to={
                                                                new URL(
                                                                    item
                                                                        ?.product
                                                                        ?.url ||
                                                                        location.href
                                                                ).pathname
                                                            }
                                                            className="text-decoration-none pb-2 d-block"
                                                        >
                                                            <strong className="item-details">
                                                                {
                                                                    item
                                                                        ?.product
                                                                        ?.name
                                                                }
                                                            </strong>
                                                        </Link>
                                                        <ul className="item-list">
                                                            <li>
                                                                <span className="item-stock">
                                                                    {item
                                                                        ?.product
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
                                                                $
                                                                {parseFloat(
                                                                    item?.price
                                                                ).toFixed(2)}
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
                                                                maxWidth:
                                                                    "700px",
                                                            }}
                                                        >
                                                            <button
                                                                onClick={() =>
                                                                    deleteItemFunction(
                                                                        item
                                                                    )
                                                                }
                                                                className="button-link ps-0"
                                                                disabled={
                                                                    updatingItem
                                                                }
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
                            <div className="col-9 px-0">
                                <div className="sub-title-add d-flex justify-content-end">
                                    <div>
                                        <span className="">Cart Subtotal</span>
                                        <span className="item1">
                                            ( {details?.total_items} items ):
                                        </span>
                                        ${details?.sub_total}
                                        {/* <div className="mt-2">
                                            <Link
                                                to="/cart"
                                                className="text-decoration-none cart-text-link"
                                                onClick={toggleSidebar}
                                            >
                                                <button className="cart-overlaybutton">
                                                    Cart
                                                </button>
                                            </Link>

                                            <Link
                                                to="/checkout"
                                                className="text-decoration-none processed-link"
                                                onClick={toggleSidebar}
                                            >
                                                <button className="processed-button">
                                                    Proceed to checkout (
                                                    {details?.total_items} item)
                                                </button>
                                            </Link>

                                         
                                        </div> */}
                                        {isAuthenticated ? (
                                            <div className="mt-2">
                                                <Link
                                                    to="/cart"
                                                    className="text-decoration-none cart-text-link"
                                                    onClick={toggleSidebar}
                                                >
                                                    <button className="cart-overlaybutton">
                                                        Cart
                                                    </button>
                                                </Link>

                                                <Link
                                                    to="/checkout"
                                                    className="text-decoration-none processed-link"
                                                    onClick={toggleSidebar}
                                                >
                                                    <button className="processed-button">
                                                        Proceed to checkout (
                                                        {details?.total_items}{" "}
                                                        item)
                                                    </button>
                                                </Link>
                                            </div>
                                        ) : (
                                            <div className="mt-2">
                                                <Link
                                                    to="/cart"
                                                    className="text-decoration-none cart-text-link"
                                                    onClick={toggleSidebar}
                                                >
                                                    <button className="cart-overlaybutton">
                                                        Cart
                                                    </button>
                                                </Link>

                                                <Link
                                                    className="text-decoration-none processed-link"
                                                    onClick={handleClick}
                                                    // onClick={toggleSidebar}
                                                    // to={"/checkout"}
                                                >
                                                    <button className="processed-button">
                                                        Proceed to checkout (
                                                        {details?.total_items}{" "}
                                                        item)
                                                    </button>
                                                </Link>
                                                {/* {showModal && ( */}
                                                {showModal && (
                                                    <div className="overlay-model-checkout-model-sidebar-checkout">
                                                        <div
                                                            className="overlay-modal-checkout-model-checkout-model-sidebar-checkout"
                                                            ref={modalRef}
                                                        >
                                                            <div className="modal-content-sidebar-checkout">
                                                                <form>
                                                                    <div className="dve-heading-data-login-checkout-sidebar-checkout">
                                                                        <h4 className="login-h3">
                                                                            Sign
                                                                            in
                                                                            to
                                                                            checkout
                                                                        </h4>
                                                                    </div>

                                                                    <div className="d-flex justify-content-center-sidebar-checkout w-100">
                                                                        <Link
                                                                            className="text-decoration-none"
                                                                            to={
                                                                                "/login"
                                                                            }
                                                                            onClick={
                                                                                toggleSidebar
                                                                            }
                                                                        >
                                                                            {" "}
                                                                            <button>
                                                                                Sign
                                                                                in
                                                                            </button>
                                                                        </Link>
                                                                    </div>
                                                                    <div>
                                                                        <p className="small-text-paragrap">
                                                                            <Link
                                                                                to="/login"
                                                                                className="text-decoration-none"
                                                                            >
                                                                                Don't
                                                                                have
                                                                                account?{" "}
                                                                                <span>
                                                                                    Sign
                                                                                    Up
                                                                                </span>
                                                                            </Link>
                                                                        </p>
                                                                    </div>
                                                                    <div className="or-dev-section-overlay-checkout-sidebar-checkout">
                                                                        <span
                                                                            style={{
                                                                                color: "black",
                                                                            }}
                                                                        >
                                                                            OR
                                                                        </span>
                                                                    </div>

                                                                    <div className="after-the-or-dev-sction-leve-model-checkout-sidebar-checkout">
                                                                        <Link
                                                                            onClick={
                                                                                toggleSidebar
                                                                            }
                                                                            className="text-decoration-none"
                                                                            to={
                                                                                "/checkout"
                                                                            }
                                                                        >
                                                                            <button>
                                                                                {" "}
                                                                                Continue
                                                                                as
                                                                                a
                                                                                Guest
                                                                            </button>
                                                                        </Link>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
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
                ) : (
                    <div className="buttonoverlay-condtions">
                        <div style={{ marginTop: "53px" }}>
                            <p className="nomore-item-text-p">No Added</p>
                        </div>
                        <div style={{ marginTop: "53px" }}>
                            <Link to="/" onClick={toggleSidebar}>
                                <button className="add-more-cart-overaybutton">
                                    Add To More Items
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartOverlay;
