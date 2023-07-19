import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import {
    FormControl,
    TextField,
    Select,
    InputLabel,
    MenuItem,
    InputAdornment,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import "./RefundOrder.css";
import PreviousRefundsModal from "@components/RefundOrder/PreviousRefundsModal";
import { getOrderDetailsOTO } from "@api/refund-order";

import {
    isSessionValid,
    logoutUser,
    setSignInTime,
    getUserTypes,
    setIsVerified,
    getUserID,
    getSalesID,
    setSalesID,
    getSignInTime,
    SESSION_TIMEOUT,
    loginUser,
} from "@utils/guestSessionHelper";

export default function RefundOrder() {
    // const classes = useStyles();
    const ORDER_TYPE_ENUM = {
        WEBSITE: "website",
        SALE_PERSON: "sale_person",
    };

    const dummyList = [
        {
            id: "1",
            name: "List Item 1",
            order_placed: "April 17, 2023",
            total: "$150.5",
            ship_to: "John Wick",
            order_number: "12345-32234",
        },
        {
            id: "2",
            name: "List Item 2",
            order_placed: "April 18, 2023",
            total: "$140.5",
            ship_to: "John Nick",
            order_number: "12345-32234",
        },
        {
            id: "3",
            name: "List Item 3",
            order_placed: "April 19, 2023",
            total: "$130.5",
            ship_to: "John Nick",
            order_number: "12345-32234",
        },
        {
            id: "4",
            name: "List Item 4",
            order_placed: "April 1228, 2023",
            total: "$1540.5",
            ship_to: "fdsafsa Nick",
            order_number: "12345-32234",
        },
        {
            id: "5",
            name: "List Item 5",
            order_placed: "April 11, 2023",
            total: "$140.5",
            ship_to: "John Nick",
            order_number: "12345-32234",
        },
    ];

    const REFUND_TYPES = [
        {
            label: "Partial Refund",
            key: "partial_refund",
        },
        {
            label: "Fully Refund",
            key: "fully_refund",
        },
    ];

    const [orderType, setOrderType] = useState();
    const [InvoicesList, setInvoicesList] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState([]);
    const [customerEmail, setCustomerEmail] = useState("");
    const [salesEmail, setSalesEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [note, setNote] = useState("");
    const [refundOption, setRefundOption] = useState("fully_refund");
    const [refundAmount, setRefundAmount] = useState();
    const [showRefundsModal, setShowRefundsModal] = useState(false);
    const [isEmailSentForSJ, setIsEmailSentForSJ] = useState(false);
    const [isEmailSentForOTO, setIsEmailSentForOTO] = useState(false);
    const [isUserVerifiedOnOTO, setIsUserVerifiedOnOTO] = useState(false);
    const [isUserVerifiedOnSJ, setIsUserVerifiedOnSJ] = useState(false);
    const [selected, setSelected] = useState([]);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const [customerID, setCustomerIDState] = useState(null);
    const [salesID, setSalesIDState] = useState(null);

    let remainingTime = 0;

    // Simulated login function for customer and sales
    const loginCustomer = (customerID) => {
        if (customerID) {
            loginUser("customer", customerID, customerEmail);
            setTimer("customer");
        }
    };

    const loginSales = (salesID) => {
        if (salesID) {
            loginUser("sales", salesID, salesEmail);
            setTimer("sales");
        }
    };

    const closeModal = () => setShowRefundsModal(false);
    const setOrderTypeFunction = async (type) => {
        console.print("orderType: ", type);
        setOrderType(type);
    };

    const handleListChange = (e) => {
        const value = e?.target?.value;
        console.print("handleListChange value: ", value);
        // let response = dummyList.find((order) => order?.id === value);
        setSelectedOrder(value);
    };

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        console.print("handleEmailSubmit");
        if (orderType === ORDER_TYPE_ENUM.WEBSITE) setIsEmailSentForSJ(true);
        else if (orderType === ORDER_TYPE_ENUM.SALE_PERSON)
            setIsEmailSentForOTO(true);
    };

    const handleOTPSubmit = (e) => {
        e?.preventDefault();
        console.print("handleOTPSubmit");
        if (orderType === ORDER_TYPE_ENUM.WEBSITE) {
            setIsUserVerifiedOnSJ(true);
            const customerID = prompt("Enter Customer ID:");
            loginCustomer(customerID);
        } else if (orderType === ORDER_TYPE_ENUM.SALE_PERSON) {
            setIsUserVerifiedOnOTO(true);
            const salesID = prompt("Enter Sales ID:");
            loginSales(salesID);
        }
    };

    const handleChangeEmail = (userVerified) => {
        if (userVerified) {
            if (orderType === ORDER_TYPE_ENUM.WEBSITE) {
                setIsUserVerifiedOnSJ(false);
                setIsEmailSentForSJ(false);
                logoutUser("customer");
            } else if (orderType === ORDER_TYPE_ENUM.SALE_PERSON) {
                setIsUserVerifiedOnOTO(false);
                setIsEmailSentForOTO(false);
                logoutUser("sales");
            }
        } else {
            if (orderType === ORDER_TYPE_ENUM.WEBSITE) {
                setIsEmailSentForSJ(false);
                logoutUser("customer");
            } else if (orderType === ORDER_TYPE_ENUM.SALE_PERSON) {
                setIsEmailSentForOTO(false);
                logoutUser("sales");
            }
        }
        setOtp("");
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.print("handleFormSubmit");
    };

    const getModuleText = () => {
        if (orderType === ORDER_TYPE_ENUM.WEBSITE) return "Order";
        return "Invoice";
    };

    const EmailVerificationJSX = useMemo(() => {
        const JSX = (
            <form onSubmit={handleEmailSubmit} className="w-100">
                <p className="my-3 fw-medium">
                    Enter an email to search all {getModuleText()}s list.
                </p>
                <div className="d-flex">
                    <FormControl fullWidth>
                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            type="email"
                            color="success"
                            autoFocus
                            value={
                                orderType === ORDER_TYPE_ENUM.WEBSITE
                                    ? customerEmail
                                    : salesEmail
                            }
                            onChange={(e) => {
                                orderType === ORDER_TYPE_ENUM.WEBSITE
                                    ? setCustomerEmail(e.target.value)
                                    : setSalesEmail(e.target.value);
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </FormControl>
                    <div className="align-items-center d-flex ms-3">
                        <button
                            className="refund-btn ms-3 btn btn-success verify-otp"
                            onClick={handleEmailSubmit}
                        >
                            Send Email
                        </button>
                    </div>
                </div>
            </form>
        );
        if (orderType === ORDER_TYPE_ENUM.WEBSITE) {
            if (!isEmailSentForSJ && !isUserVerifiedOnSJ && !isAuthenticated) {
                return JSX;
            }
            return <></>;
        } else if (orderType === ORDER_TYPE_ENUM.SALE_PERSON) {
            if (!isEmailSentForOTO && !isUserVerifiedOnOTO) {
                return JSX;
            }
            return <></>;
        }
        return <></>;
    }, [
        orderType,
        isUserVerifiedOnSJ,
        isUserVerifiedOnOTO,
        customerEmail,
        salesEmail,
        isEmailSentForSJ,
        isEmailSentForOTO,
    ]);

    const OTPVerficationJSX = useMemo(() => {
        const JSX = (
            <>
                <p className="my-3 fw-medium">
                    We’ve sent a 4 digits code to{" "}
                    {orderType === ORDER_TYPE_ENUM.WEBSITE
                        ? customerEmail
                        : salesEmail}
                    , open your email and Enter the code below.
                </p>
                <div className="d-flex">
                    <form onSubmit={handleOTPSubmit}>
                        <FormControl fullWidth>
                            <TextField
                                id="otp"
                                label="OTP"
                                variant="outlined"
                                color="success"
                                value={otp}
                                autoFocus
                                onChange={(e) => {
                                    const { value } = e.target;
                                    const otpRegex = /^[0-9]*$/;
                                    if (value === "" || otpRegex.test(value)) {
                                        setOtp(value.slice(0, 4));
                                    }
                                }}
                            />
                        </FormControl>
                    </form>
                    <div className="align-items-center d-flex ms-2">
                        <button
                            className="refund-btn ms-3 btn btn-success verify-otp"
                            onClick={handleOTPSubmit}
                        >
                            Verify Me
                        </button>
                    </div>
                    <div className="align-items-center d-flex ms-2">
                        <button
                            className="bg-white border-0 text-decoration-underline text-success"
                            style={{ width: "150px" }}
                            onClick={() => handleChangeEmail(true)}
                        >
                            Change Email
                        </button>
                    </div>
                </div>
            </>
        );
        if (
            isEmailSentForSJ &&
            orderType === ORDER_TYPE_ENUM.WEBSITE &&
            !(isUserVerifiedOnSJ || isAuthenticated)
        ) {
            return JSX;
        } else if (
            isEmailSentForOTO &&
            orderType === ORDER_TYPE_ENUM.SALE_PERSON &&
            !isUserVerifiedOnOTO
        ) {
            return JSX;
        }
        return <></>;
    }, [
        orderType,
        isUserVerifiedOnSJ,
        isUserVerifiedOnOTO,
        otp,
        isEmailSentForOTO,
        isEmailSentForSJ,
    ]);

    const ShowListSelectJSX = useMemo(() => {
        const JSX = (
            <>
                <div className="d-flex">
                    <p className="my-3 fw-medium">
                        Select {getModuleText()} for further proceeding.
                    </p>
                    <div className="align-items-center d-flex ms-2">
                        <button
                            className="bg-white border-0 text-decoration-underline text-success text-start"
                            style={{ width: "150px", fontSize: "12px" }}
                            onClick={() => handleChangeEmail(true)}
                        >
                            Change Email
                        </button>
                    </div>
                </div>

                <div className="d-flex mb-4">
                    <FormControl fullWidth>
                        <InputLabel id="order-refund-invoice-list">
                            {getModuleText()}s list
                        </InputLabel>
                        <Select
                            labelId="list-select-label"
                            id="list-select"
                            multiple
                            value={selectedOrder}
                            label={`${getModuleText()}sList`}
                            onChange={handleListChange}
                            color="success"
                        >
                            {dummyList.map((item, index) => (
                                <MenuItem key={index} value={item?.id}>
                                    {item?.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <div className="align-items-center d-flex ms-2">
                        <button
                            className="bg-white border-0 text-decoration-underline text-success"
                            style={{ width: "200px" }}
                            onClick={() => setShowRefundsModal(true)}
                        >
                            Previous Refunds
                        </button>
                    </div>
                </div>
            </>
        );
        if (
            orderType === ORDER_TYPE_ENUM.WEBSITE &&
            (isUserVerifiedOnSJ || isAuthenticated)
        ) {
            return JSX;
        } else if (
            orderType === ORDER_TYPE_ENUM.SALE_PERSON &&
            isUserVerifiedOnOTO
        ) {
            return JSX;
        }
        return <></>;
    }, [orderType, isUserVerifiedOnSJ, isUserVerifiedOnOTO, selectedOrder]);

    const setTimer = (userType) => {
        let timer = setInterval(() => {
            const sessionValid = isSessionValid(userType);
            if (!sessionValid) {
                logoutUser(userType);
                window.location.reload();
            } else {
                const signInTime = getSignInTime(userType);
                const currentTime = new Date().getTime();
                const timeElapsed = currentTime - signInTime;
                remainingTime = SESSION_TIMEOUT - timeElapsed;
                console.log("remainingTime: " + remainingTime);
                if (remainingTime === 0) {
                    logoutUser(userType);
                    window.location.reload();
                }
            }
        }, 1000); // Check every second to update the remaining time

        return () => {
            clearInterval(timer);
        };
    };

    useEffect(() => {
        const userTypes = getUserTypes();
        let timerClear = () => {};
        console.log("userTypes", userTypes);
        if (userTypes?.includes("customer")) {
            console.log("1");
            const sessionValid = isSessionValid("customer");
            if (sessionValid) {
                console.log("jlkjlkjl 2");
                setCustomerIDState(getUserID("customer"));
                // setSignInTime("customer");
                timerClear = setTimer("customer");
                setIsUserVerifiedOnSJ(true);
            } else {
                console.log("jlkjlkjl else 3");
                logoutUser("customer");
                setIsUserVerifiedOnSJ(false);
            }
        } else if (userTypes?.includes("sales")) {
            const sessionValid = isSessionValid("sales");
            if (sessionValid) {
                setSalesIDState(getSalesID());
                // setSignInTime("sales");
                timerClear = setTimer("sales");
                setIsUserVerifiedOnOTO(true);
            } else {
                logoutUser("sales");
                setIsUserVerifiedOnOTO(false);
            }
        }
        return () => {
            timerClear();
        };
    }, []);

    useEffect(() => {
        // if (orderType === ORDER_TYPE_ENUM.WEBSITE)
        //     ApiService.setDefaultBaseUrl();
        // else if (orderType === ORDER_TYPE_ENUM.SALE_PERSON)
        //     ApiService.setOTOBaseUrl();
        resetStates();
    }, [orderType]);

    const resetStates = () => {
        setSelectedOrder([]);
        setInvoicesList([]);
        setRefundAmount(null);
        setRefundOption("fully_refund");
        setNote("");
        setOtp("");
    };

    return (
        <div className="refund-order-page py-5">
            <div className="container">
                <div className="refund-header">
                    <h3 className="mb-4">Refund/Return</h3>
                    <p className="my-3 fw-medium">
                        Choose the Button below to perform certain action.
                    </p>
                    <div className="order-type-btns mb-4">
                        <div className="d-flex flex-sm-row flex-column align-items-center">
                            <button
                                className={`refund-btn btn btn-${
                                    orderType === ORDER_TYPE_ENUM.WEBSITE
                                        ? "success"
                                        : "outline-success"
                                }`}
                                onClick={() =>
                                    setOrderTypeFunction(
                                        ORDER_TYPE_ENUM.WEBSITE
                                    )
                                }
                            >
                                Order through website
                            </button>
                            <button
                                className={`refund-btn ms-sm-3 mt-sm-0 mt-2 btn btn-${
                                    orderType === ORDER_TYPE_ENUM.SALE_PERSON
                                        ? "success"
                                        : "outline-success"
                                }`}
                                onClick={() =>
                                    setOrderTypeFunction(
                                        ORDER_TYPE_ENUM.SALE_PERSON
                                    )
                                }
                            >
                                Order through sales person
                            </button>
                        </div>
                    </div>
                    <div className="refund-forms">
                        {EmailVerificationJSX}
                        {OTPVerficationJSX}
                        {ShowListSelectJSX}
                    </div>

                    {!!selectedOrder?.length && (
                        <>
                            {selectedOrder?.map((order, index) => (
                                <div key={index}>
                                    <div className="order-details-container">
                                        <h3 className="my-3 px-3">
                                            {getModuleText()} Details
                                        </h3>
                                        <table className="order-details-table round-2">
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <div>Order Placed</div>
                                                        <div>
                                                            {
                                                                order?.order_placed
                                                            }
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div>Total</div>
                                                        <div>
                                                            {order?.total}
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div>Ship To</div>
                                                        <div>
                                                            <span className="text-success">
                                                                {order?.ship_to}
                                                            </span>
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div>Order #</div>
                                                        <div>
                                                            {
                                                                order?.order_number
                                                            }
                                                        </div>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td
                                                        className="order-item px-3"
                                                        colSpan={3}
                                                    >
                                                        <table className="w-100">
                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                        <p className="fw-medium my-3">
                                                                            Your
                                                                            {getModuleText()}
                                                                        </p>
                                                                        <div className="d-flex">
                                                                            <div className="img-wrapper">
                                                                                <img src="https://dummyimage.com/500" />
                                                                            </div>
                                                                            <div className="item-description">
                                                                                <p className="py-0">
                                                                                    Lorem
                                                                                    Ipsum
                                                                                    Text
                                                                                    Dot
                                                                                    Ext
                                                                                    not
                                                                                    Isxh
                                                                                    sdbd
                                                                                    sjhk
                                                                                    skjdg
                                                                                    KMC
                                                                                    Lorem
                                                                                    Ipsum,
                                                                                    Text
                                                                                    Dot
                                                                                    Ext.
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <hr className="horizontal-line"></hr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                    <td className="order-summary d-sm-table-cell d-none px-1">
                                                        <p className="my-3 fw-bold">
                                                            {getModuleText()}{" "}
                                                            Summary
                                                        </p>
                                                        <table className="w-100">
                                                            <tbody>
                                                                <tr>
                                                                    <td className="key">
                                                                        Items
                                                                        Subtotal:
                                                                    </td>
                                                                    <td className="value">
                                                                        $150
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="key">
                                                                        Shipping
                                                                        &
                                                                        Handling:
                                                                    </td>
                                                                    <td className="value">
                                                                        --
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="key">
                                                                        Total
                                                                        before
                                                                        tax:
                                                                    </td>
                                                                    <td className="value">
                                                                        $150
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className=" key">
                                                                        Estimated
                                                                        tax to
                                                                        be
                                                                        collected:
                                                                    </td>
                                                                    <td className="value">
                                                                        $7
                                                                    </td>
                                                                </tr>
                                                                <hr className="horizontal-line"></hr>
                                                                <tr className="grand-total-row">
                                                                    <td className="key">
                                                                        Grand
                                                                        Total:
                                                                    </td>
                                                                    <td className="value">
                                                                        $150
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr className="d-sm-none">
                                                    <td
                                                        className="order-summary w-100 px-2"
                                                        colSpan={4}
                                                    >
                                                        <p className="my-3 fw-bold">
                                                            {getModuleText()}{" "}
                                                            Summary
                                                        </p>
                                                        <table className="w-100">
                                                            <tbody>
                                                                <tr>
                                                                    <td className="key">
                                                                        Items
                                                                        Subtotal:
                                                                    </td>
                                                                    <td className="value">
                                                                        $150
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="key">
                                                                        Shipping
                                                                        &
                                                                        Handling:
                                                                    </td>
                                                                    <td className="value">
                                                                        --
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="key">
                                                                        Total
                                                                        before
                                                                        tax:
                                                                    </td>
                                                                    <td className="value">
                                                                        $150
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className=" key">
                                                                        Estimated
                                                                        tax to
                                                                        be
                                                                        collected:
                                                                    </td>
                                                                    <td className="value">
                                                                        $7
                                                                    </td>
                                                                </tr>
                                                                <hr className="horizontal-line"></hr>{" "}
                                                                <tr className="grand-total-row">
                                                                    <td className="key">
                                                                        Grand
                                                                        Total:
                                                                    </td>
                                                                    <td className="value">
                                                                        $150
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div>
                                        <p className="my-3 fw-medium">
                                            Note About Refund / Return
                                        </p>
                                        <div className="d-flex">
                                            <FormControl fullWidth>
                                                <textarea
                                                    id="note"
                                                    rows={4}
                                                    placeholder="Type note here..."
                                                    variant="outlined"
                                                    color="success"
                                                    value={note}
                                                    onChange={(e) =>
                                                        setNote(e.target.value)
                                                    }
                                                    className="form-control"
                                                />
                                            </FormControl>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="my-3 fw-medium">
                                            Select an option to refund your
                                            ammount
                                        </p>
                                        <div className="d-flex">
                                            <Select
                                                className="mb-3"
                                                labelId="select-refund-type-label"
                                                id="list-refund-type-select"
                                                value={refundOption}
                                                label="Select Refund Option"
                                                onChange={(e) =>
                                                    setRefundOption(
                                                        e.target.value
                                                    )
                                                }
                                                color="success"
                                            >
                                                {REFUND_TYPES?.map(
                                                    (type, index) => (
                                                        <MenuItem
                                                            key={index}
                                                            value={type?.key}
                                                        >
                                                            {type?.label}
                                                        </MenuItem>
                                                    )
                                                )}
                                            </Select>
                                        </div>
                                    </div>
                                    {refundOption === "partial_refund" && (
                                        <form onSubmit={handleFormSubmit}>
                                            <p className="my-3 fw-medium">
                                                Please Enter Your Refund Amount
                                            </p>
                                            <FormControl>
                                                <TextField
                                                    className="mb-3"
                                                    id="refundAmount"
                                                    label="Refund Amount"
                                                    variant="outlined"
                                                    color="success"
                                                    type="number"
                                                    value={refundAmount}
                                                    onChange={(e) => {
                                                        setRefundAmount(
                                                            e.target.value
                                                        );
                                                    }}
                                                />
                                            </FormControl>
                                        </form>
                                    )}
                                </div>
                            ))}
                            <button
                                className="refund-btn btn btn-success"
                                onClick={handleFormSubmit}
                            >
                                Submit
                            </button>
                        </>
                    )}
                </div>
            </div>
            {showRefundsModal && (
                <PreviousRefundsModal
                    showModal={showRefundsModal}
                    handleClose={closeModal}
                />
            )}
        </div>
    );
}
