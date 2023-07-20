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
import {
    getOrderDetailsSJ,
    verifyEmailSjApi,
    verifyOtpSjApi,
    getOrdersList,
    submitRefundRequestAPiSJ,
} from "@api/refund-order";

import {
    isSessionValid,
    logoutUser,
    getUserTypes,
    getUserID,
    getSignInTime,
    SESSION_TIMEOUT,
    loginUser,
} from "@utils/guestSessionHelper";
import { toast } from "react-toastify";
import Loader from "@common/Spinner/Spinner";
import { formatDate, prettifyError } from "@utils/helpers";
import { getUserId } from "@services/jwtService";

export default function RefundOrder() {
    // const classes = useStyles();
    const ORDER_TYPE_ENUM = {
        WEBSITE: "website",
        SALE_PERSON: "sale_person",
    };

    const REFUND_TYPES = [
        {
            label: "Partial Refund",
            key: "partial",
        },
        {
            label: "Fully Refund",
            key: "full",
        },
    ];

    const [orderType, setOrderType] = useState(null);
    const [invoicesList, setInvoicesList] = useState([]);
    const [list, setSelectedList] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState([]);
    const [customerEmail, setCustomerEmail] = useState("");
    const [salesEmail, setSalesEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [note, setNote] = useState("");
    const [refundOption, setRefundOption] = useState("partial");
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
    const [isLoading, setIsLoading] = useState(false);
    const [submitRequestList, setSubmitRequestList] = useState([]);
    const [isLoadingList, setIsLoadingList] = useState(false);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    // const [firstLoad, setFirstLoad] = useState(false);

    let remainingTime = 0;

    let clearInterval = () => {};

    // Simulated login function for customer and sales
    const loginCustomer = async (customerID) => {
        if (customerID) {
            let userType = "customer";
            loginUser(userType, customerID, customerEmail);
            setTimer(userType);
            fetchOrdersList(ORDER_TYPE_ENUM.WEBSITE);
        }
    };

    const loginSales = (salesID) => {
        if (salesID) {
            let userType = "sales";
            loginUser(userType, salesID, salesEmail);
            clearInterval = setTimer(userType);
        }
    };

    const closeModal = () => setShowRefundsModal(false);
    const setOrderTypeFunction = async (type) => {
        setOrderType(type);
    };

    const handleListChange = async (e) => {
        const values = e?.target?.value;
        setSelectedOrder(values);
        if (values.length > 0)
            try {
                setIsLoading(true);
                let response = await getOrderDetailsSJ({
                    user_id: customerID,
                    order_id: values,
                });
                setSelectedList(response?.data);
                setSubmitRequestList(
                    response?.data?.map((item) => {
                        return {
                            ...item,
                            order_id: item?.id,
                            refund_type: "partial",
                            amount: 0,
                        };
                    })
                );
            } catch (error) {
                toast.error(error?.message);
            }
        setIsLoading(false);
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        console.print("handleEmailSubmit");
        setIsLoading(true);
        if (orderType === ORDER_TYPE_ENUM.WEBSITE) {
            try {
                let response = await verifyEmailSjApi({ email: customerEmail });
                setCustomerIDState(response?.data?.id);
                setIsEmailSentForSJ(true);
                toast.success("OTP sent to email");
            } catch (error) {
                toast.error(error?.data?.errors?.error[0]);
            }
        } else if (orderType === ORDER_TYPE_ENUM.SALE_PERSON) {
            setIsEmailSentForOTO(true);
        }
        setIsLoading(false);
    };

    const handleOTPSubmit = async (e) => {
        e?.preventDefault();
        console.print("handleOTPSubmit");
        setIsLoading(true);
        if (orderType === ORDER_TYPE_ENUM.WEBSITE) {
            try {
                await verifyOtpSjApi({
                    otp_code: otp,
                    email: customerEmail,
                });
                setIsUserVerifiedOnSJ(true);
                loginCustomer(customerID);
            } catch (error) {
                toast.error(error?.data?.errors?.otp[0]);
            }
        } else if (orderType === ORDER_TYPE_ENUM.SALE_PERSON) {
            setIsUserVerifiedOnOTO(true);
            const salesID = prompt("Enter Sales ID:");
            loginSales(salesID);
        }
        setIsLoading(false);
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

    const fetchOrdersList = async (orderType) => {
        switch (orderType) {
            case ORDER_TYPE_ENUM.WEBSITE:
                try {
                    setIsLoadingList(true);
                    let response = await getOrdersList({
                        user_id: 1,
                    });
                    setInvoicesList(response?.data);
                } catch (error) {
                    toast.error("Something went wrong");
                }
                break;

            default:
                break;
        }
        setIsLoadingList(false);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        switch (orderType) {
            case ORDER_TYPE_ENUM.WEBSITE:
                try {
                    setIsLoading(true);
                    await submitRefundRequestAPiSJ({
                        user_id: customerID,
                        orders: submitRequestList,
                    });
                    toast.success("Refund Request Submitted Successfully");
                    resetFormStates();
                } catch (error) {
                    toast.error(
                        <div
                            dangerouslySetInnerHTML={{
                                __html: prettifyError(error?.data?.errors),
                            }}
                        />
                    );
                }
                break;

            default:
                break;
        }
        setIsLoading(false);
    };

    const getModuleText = () => {
        if (orderType === ORDER_TYPE_ENUM.WEBSITE) return "Order";
        return "Invoice";
    };

    const handleOrderListChange = (index, key, value) => {
        const updatedList = [...submitRequestList];
        updatedList[index] = { ...updatedList[index], [key]: value };
        let tempArray = updatedList.filter((item) => {
            return item?.reasons && item?.refund_type && item?.amount > 0;
        });
        console.log("tempArray", tempArray);
        if (tempArray.length > 0) setIsSubmitDisabled(true);
        else setIsSubmitDisabled(false);
        setSubmitRequestList(updatedList);
    };

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
        setOrderType(localStorage.getItem("orderType"));
        const userTypes = getUserTypes();

        if (isAuthenticated) {
            setCustomerIDState(getUserId());
            fetchOrdersList(ORDER_TYPE_ENUM.WEBSITE);
        } else if (userTypes?.includes("customer")) {
            const sessionValid = isSessionValid("customer");
            if (sessionValid) {
                setCustomerIDState(getUserID("customer"));
                // setSignInTime("customer");
                clearInterval = setTimer("customer");
                setIsUserVerifiedOnSJ(true);
                fetchOrdersList(ORDER_TYPE_ENUM.WEBSITE);
            } else {
                logoutUser("customer");
                setIsUserVerifiedOnSJ(false);
            }
        }
        if (userTypes?.includes("sales")) {
            const sessionValid = isSessionValid("sales");
            if (sessionValid) {
                setSalesIDState(getUserID("sales"));
                // setSignInTime("sales");
                clearInterval = setTimer("sales");
                setIsUserVerifiedOnOTO(true);
                fetchOrdersList(ORDER_TYPE_ENUM.SALE_PERSON);
            } else {
                logoutUser("sales");
                setIsUserVerifiedOnOTO(false);
            }
        }
        return () => {
            clearInterval();
        };
    }, []);

    useEffect(() => {
        resetStates();
        localStorage.setItem("orderType", orderType);

        switch (orderType) {
            case ORDER_TYPE_ENUM.WEBSITE:
                if (customerID) {
                    fetchOrdersList(ORDER_TYPE_ENUM.WEBSITE);
                }
                break;
            case ORDER_TYPE_ENUM.SALE_PERSON:
                if (salesID) {
                    console.log("fetch invoice list");
                }
            default:
                break;
        }
    }, [orderType]);

    const resetStates = () => {
        setSelectedOrder([]);
        setInvoicesList([]);
        setRefundAmount(null);
        setRefundOption("partial");
        setNote("");
        setOtp("");
        setSelectedList([]);
    };

    const resetFormStates = () => {
        setSelectedOrder([]);
        setInvoicesList([]);
        setRefundAmount(null);
        setRefundOption("partial");
        setNote("");
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
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader /> : " Send Email"}
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
        isLoading,
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
                            disabled={isLoading || otp.length < 4}
                        >
                            {isLoading ? <Loader /> : "Verify Me"}
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
        isLoading,
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
                    {isLoadingList ? (
                        <Loader />
                    ) : (
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
                                {invoicesList?.map((item) => (
                                    <MenuItem key={item?.id} value={item?.id}>
                                        Order # {item?.id}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}

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
    }, [
        orderType,
        isUserVerifiedOnSJ,
        isUserVerifiedOnOTO,
        selectedOrder,
        invoicesList,
    ]);

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

                    {!!list?.length && (
                        <>
                            {list?.map((order, index) => (
                                <div key={index}>
                                    <div className="order-details-container">
                                        <h3 className="my-3 px-3 fw-bold">
                                            {getModuleText()} # {order?.id}
                                        </h3>
                                        <table className="order-details-table round-2">
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <div>Order Placed</div>
                                                        <div>
                                                            {formatDate(
                                                                order?.created_at
                                                            )}
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div>Total</div>
                                                        <div>
                                                            $
                                                            {
                                                                order?.total_amount
                                                            }
                                                        </div>
                                                    </th>
                                                    {/* <th>
                                                        <div>Ship To</div>
                                                        <div>
                                                            <span className="text-success">
                                                                {order?.ship_to}
                                                            </span>
                                                        </div>
                                                    </th> */}
                                                    <th>
                                                        <div>Order #</div>
                                                        <div>{order?.id}</div>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td
                                                        className="order-item px-3"
                                                        colSpan={4}
                                                    >
                                                        <table className="w-100">
                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                        <p className="fw-medium my-3">
                                                                            {getModuleText()}
                                                                            {
                                                                                " Items"
                                                                            }
                                                                        </p>
                                                                        {order?.order_item?.map(
                                                                            (
                                                                                item
                                                                            ) => {
                                                                                return (
                                                                                    <div
                                                                                        className="d-flex"
                                                                                        key={
                                                                                            item?.id
                                                                                        }
                                                                                    >
                                                                                        <div className="img-wrapper">
                                                                                            <img
                                                                                                src={
                                                                                                    item
                                                                                                        ?.product
                                                                                                        ?.image
                                                                                                        ?.length >
                                                                                                    0
                                                                                                        ? item
                                                                                                              ?.product
                                                                                                              ?.image[0]
                                                                                                        : "https://dummyimage.com/150"
                                                                                                }
                                                                                            />
                                                                                        </div>
                                                                                        <div className="item-description">
                                                                                            <p className="py-0">
                                                                                                {
                                                                                                    item
                                                                                                        ?.product
                                                                                                        ?.name
                                                                                                }
                                                                                            </p>
                                                                                        </div>
                                                                                    </div>
                                                                                );
                                                                            }
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                                <hr className="horizontal-line"></hr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                    {/* <td className="order-summary d-sm-table-cell d-none px-1">
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
                                                                        $
                                                                        {
                                                                            order?.sub_total
                                                                        }
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="key">
                                                                        Shipping
                                                                        &
                                                                        Handling:
                                                                    </td>
                                                                    <td className="value">
                                                                        $
                                                                        {
                                                                            order?.shipment_price
                                                                        }
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="key">
                                                                        Total
                                                                        before
                                                                        tax:
                                                                    </td>
                                                                    <td className="value">
                                                                        $
                                                                        {
                                                                            order?.total_amount
                                                                        }
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
                                                                        $0
                                                                    </td>
                                                                </tr>
                                                                <hr className="horizontal-line"></hr>
                                                                <tr className="grand-total-row">
                                                                    <td className="key">
                                                                        Grand
                                                                        Total:
                                                                    </td>
                                                                    <td className="value">
                                                                        $
                                                                        {
                                                                            order?.total_amount
                                                                        }
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td> */}
                                                </tr>
                                                {/* <tr className="d-sm-none">
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
                                                </tr> */}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div>
                                        <p className="my-3 fw-medium">
                                            Note About Refund / Return{" "}
                                            <span className="text-danger">
                                                (Required)
                                            </span>
                                        </p>
                                        <div className="d-flex">
                                            <FormControl fullWidth>
                                                <textarea
                                                    id="note"
                                                    rows={4}
                                                    placeholder="Type note here..."
                                                    variant="outlined"
                                                    color="success"
                                                    value={
                                                        submitRequestList[index]
                                                            ?.reasons
                                                    }
                                                    onChange={(e) =>
                                                        handleOrderListChange(
                                                            index,
                                                            "reasons",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="form-control"
                                                />
                                            </FormControl>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="my-3 fw-medium">
                                            Select an option to refund your
                                            ammount{" "}
                                            <span className="text-danger">
                                                (Required)
                                            </span>
                                        </p>
                                        <div className="d-flex">
                                            <Select
                                                className="mb-3"
                                                labelId="select-refund-type-label"
                                                id="list-refund-type-select"
                                                value={
                                                    submitRequestList[index]
                                                        ?.refund_type
                                                }
                                                label="Select Refund Option"
                                                onChange={(e) =>
                                                    handleOrderListChange(
                                                        index,
                                                        "refund_type",
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
                                    {submitRequestList[index]?.refund_type ===
                                        "partial" && (
                                        <form onSubmit={handleFormSubmit}>
                                            <p className="my-3 fw-medium">
                                                Please Enter Your Refund Amount{" "}
                                                <span className="text-danger">
                                                    (Required)
                                                </span>
                                            </p>
                                            <FormControl>
                                                <TextField
                                                    className="mb-3"
                                                    id="refundAmount"
                                                    label="Refund Amount"
                                                    variant="outlined"
                                                    color="success"
                                                    type="number"
                                                    value={
                                                        submitRequestList[index]
                                                            ?.amount || 0
                                                    }
                                                    onChange={(e) => {
                                                        handleOrderListChange(
                                                            index,
                                                            "amount",
                                                            e.target.value > 0
                                                                ? e.target.value
                                                                : ""
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
                                disabled={isLoading || isSubmitDisabled}
                            >
                                {isLoading ? <Loader /> : "Submit"}
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
