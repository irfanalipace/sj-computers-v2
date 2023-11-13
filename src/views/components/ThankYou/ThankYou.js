import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import { productDetailsApi } from "@api/products";
// import { Container, Row, Col, Table } from "react-bootstrap";

// import "./thankyou.css";
import circle from "../../../assets/images/green-circle.svg";
import tickImage from "../../../assets/images/tick1.svg";
import { useNavigate, useLocation } from "react-router-dom";

export default function ThankYou() {
    // const isMobile = window.innerWidth <= 768;
    function formatDate(dateString) {
        const options = { year: "numeric", month: "long", day: "numeric" };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
    }

    const navigate = useNavigate();
    const [thankOrderDetails, setThankOrderDetails] = useState({});
    const [thankOrderItems, setThankOrderItems] = useState([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const location = useLocation();
    const order = location.state?.order;
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    //   const handleButtonClick = () => {
    //     // Redirect to the specific path
    //     history.push("/specific-path");
    //   };

    useEffect(() => {
        const storedOrder = window.localStorage.getItem("thankyouOrderDetails");
        const order = location?.state?.order || JSON.parse(storedOrder);
        console.log("order", order);
        if (order) {
            const orderString = JSON.stringify(order);
            window.localStorage.setItem("thankyouOrderDetails", orderString);
            setThankOrderDetails(order);
            let Order = order?.Order;

            console.print(Order?.order?.order_item, "order");
            setThankOrderItems(Order?.order?.order_item);
            console.print(thankOrderItems, "order 3");
        }
    }, []);

    useEffect(() => {
        //    console.print(thankOrderItems, "2nd useeffect")
        //    console.print(thankOrderDetails, "2nd useeffect for order details")
    }, [thankOrderItems]);

    const handleWindowSizeChange = () => {
        setIsMobile(window.innerWidth <= 768);
    };

    useEffect(() => {
        const handleResize = () => {
            handleWindowSizeChange();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return (
        <div
            className="thank-you-page"
            style={{ marginLeft: "10%", marginRight: "10%" }}
        >
            <div className="row margintopBottom">
                <div className="col-12 my-10">
                    <div className="d-flex justify-content-center align-items-center">
                        {/* <img
          src={circle}
          alt="Circle Image"
          style={{ position: "", zIndex: 1 }}
        /> */}
                        <div
                            className="d-flex justify-content-center align-items-center"
                            style={{
                                width: "70px",
                                height: "70px",
                                borderRadius: "50%",
                                backgroundColor: "#318243",
                            }}
                        >
                            <img
                                src={tickImage}
                                alt="Tick Image"
                                style={{
                                    position: "",
                                    zIndex: 2,
                                    marginLeft: "-3.3%",
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-12 my-2">
                    <h1>Thanks for Applying</h1>
                </div>
                <div className="col-12 my-20">
                    <p>
                        Your order with tracking No{" "}
                        <span style={{ fontWeight: "900" }}>
                            {thankOrderDetails?.Order?.order?.id}
                        </span>{" "}
                        has been successfully confirmed. We’ll send you an email
                        notification once your order has shipped.
                    </p>
                </div>
            </div>
        </div>
    );
}
