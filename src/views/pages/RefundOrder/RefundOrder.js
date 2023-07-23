import React, { useEffect, useState, useMemo, useRef } from "react";
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
    getInvoiceDetailsOTO,
    getInvoicesList,
    verifyEmailOTOApi,
    verifyOTPOTOApi,
    submitRefundRequestAPiOTO,
} from "@api/refund-order";

import {
    isSessionValid,
    logoutUser,
    getUserTypes,
    getLoggedInUserID,
    getSignInTime,
    SESSION_TIMEOUT,
    loginUser,
    getUserEmail,
} from "@utils/guestSessionHelper";
import { toast } from "react-toastify";
import Loader from "@common/Spinner/Spinner";
import { formatDate, prettifyError } from "@utils/helpers";
import { getUserId } from "@services/jwtService";
import {
    USER_TYPE_ENUM,
    REFUND_TYPES,
    ORDER_DETAILS_KEYS_ENUMS,
} from "./constants";

export default function RefundOrder() {
    const [selectedUserType, setSelectedUserType] = useState(null);
    const [invoicesList, setInvoicesList] = useState([]);
    const [list, setSelectedList] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState([]);
    const [showRefundsModal, setShowRefundsModal] = useState(false);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const [isLoading, setIsLoading] = useState(false);
    const [submitRequestOrderList, setSubmitRequestOrderList] = useState([]);
    const [isLoadingList, setIsLoadingList] = useState(false);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    const [VERIFIED_USERS, SET_VERIFIED_USERS] = useState({
        [USER_TYPE_ENUM.CUSTOMER]: {
            isVerified: false,
            isEmailSent: false,
            email: "",
            otp: "",
            id: "",
        },
        [USER_TYPE_ENUM.SALE_PERSON]: {
            isVerified: false,
            isEmailSent: false,
            email: "",
            otp: "",
            id: "",
        },
    });

    let listItemsKey = useRef("");
    let remainingTime = 0;
    let clearTimer = useRef(null);

    // Simulated login function for customer and sales
    const loginCustomer = async () => {
        let userType = USER_TYPE_ENUM.CUSTOMER;
        if (VERIFIED_USERS[userType]?.id) {
            loginUser(
                userType,
                VERIFIED_USERS[userType]?.id,
                VERIFIED_USERS[userType]?.email
            );
            welcomeUser(userType);
        }
    };

    const loginSales = () => {
        let userType = USER_TYPE_ENUM.SALE_PERSON;
        if (VERIFIED_USERS[userType]?.id) {
            loginUser(
                userType,
                VERIFIED_USERS[userType]?.id,
                VERIFIED_USERS[userType]?.email
            );
            welcomeUser(userType);
        }
    };

    const welcomeUser = (userType) => {
        clearTimer.current = setTimer(userType);
        fetchOrdersList(userType);
    };

    const closeModal = () => setShowRefundsModal(false);

    const setVerifiedUsers = (userType, key, value) => {
        SET_VERIFIED_USERS({
            ...VERIFIED_USERS,
            [userType]: {
                ...VERIFIED_USERS[userType],
                [key]: value,
            },
        });
    };

    const fetchOrdersList = async (userType) => {
        switch (userType) {
            case USER_TYPE_ENUM.CUSTOMER:
                if (VERIFIED_USERS[userType]?.isVerified || isAuthenticated)
                    try {
                        setIsLoadingList(true);
                        let response = await getOrdersList({
                            user_id: VERIFIED_USERS[userType]?.id,
                        });
                        setInvoicesList(response?.data);
                    } catch (error) {
                        toast.error("Something went wrong");
                    }
                break;
            case USER_TYPE_ENUM.SALE_PERSON:
                if (VERIFIED_USERS[userType]?.isVerified)
                    try {
                        setIsLoadingList(true);
                        let response = await getInvoicesList({
                            customer_id: VERIFIED_USERS[userType]?.id,
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

    const fetchOrdersDetails = async (values) => {
        if (values.length > 0)
            try {
                setIsLoading(true);
                let response = await getOrderDetailsSJ({
                    user_id: VERIFIED_USERS[selectedUserType]?.id,
                    order_id: values,
                });
                setSelectedList(response?.data);
                setSubmitRequestOrderList(
                    response?.data?.map((item) => {
                        return {
                            order_id: item?.id,
                            refund_type: "partial",
                            amount: 0,
                            reasons: "",
                        };
                    })
                );
            } catch (error) {
                toast.error(error?.message);
            }
        setIsLoading(false);
    };

    const fetchInvoiceDetails = async (values) => {
        if (values.length > 0)
            try {
                setIsLoading(true);
                let response = await getInvoiceDetailsOTO({
                    customer_id: VERIFIED_USERS[userType]?.id,
                    invoice_id: values,
                });
                setSelectedList(response?.data);
                setSubmitRequestOrderList(
                    response?.data?.map((item) => {
                        return {
                            invoice_id: item?.id,
                            refund_type: "partial",
                            amount: 0,
                            reasons: "",
                        };
                    })
                );
            } catch (error) {
                toast.error(error?.message);
            }
        setIsLoading(false);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        switch (selectedUserType) {
            case USER_TYPE_ENUM.CUSTOMER:
                try {
                    setIsLoading(true);
                    await submitRefundRequestAPiSJ({
                        user_id: VERIFIED_USERS[selectedUserType]?.id,
                        orders: submitRequestOrderList,
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
            case USER_TYPE_ENUM.SALE_PERSON:
                try {
                    setIsLoading(true);
                    await submitRefundRequestAPiOTO({
                        customer_id: VERIFIED_USERS[selectedUserType]?.id,
                        invoices: submitRequestOrderList,
                    });
                    toast.success("Refund Request Submitted Successfully");
                    resetFormStates();
                } catch (error) {
                    // toast.error(
                    //     <div
                    //         dangerouslySetInnerHTML={{
                    //             __html: prettifyError(
                    //                 error?.data?.errors ||
                    //                     error?.data?.message[1]
                    //             ),
                    //         }}
                    //     />
                    // );
                    toast.error(error?.data?.errors || error?.data?.message[1]);
                }
                break;

            default:
                break;
        }
        setIsLoading(false);
    };

    const handleListChange = async (e) => {
        const values = e?.target?.value;
        setSelectedOrder(values);
        switch (selectedUserType) {
            case USER_TYPE_ENUM.CUSTOMER:
                fetchOrdersDetails(values);

                break;
            case USER_TYPE_ENUM.SALE_PERSON:
                fetchInvoiceDetails(values);
                break;
            default:
                break;
        }
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (selectedUserType === USER_TYPE_ENUM.CUSTOMER) {
            try {
                let response = await verifyEmailSjApi({
                    email: VERIFIED_USERS[selectedUserType]?.email,
                });
                SET_VERIFIED_USERS({
                    ...VERIFIED_USERS,
                    [selectedUserType]: {
                        ...VERIFIED_USERS[selectedUserType],
                        id: response?.data?.id,
                        isEmailSent: true,
                    },
                });
                toast.success("OTP sent to email");
            } catch (error) {
                toast.error(error?.data?.errors?.error[0]);
            }
        } else if (selectedUserType === USER_TYPE_ENUM.SALE_PERSON) {
            try {
                let response = await verifyEmailOTOApi({
                    email: VERIFIED_USERS[selectedUserType]?.email,
                });
                SET_VERIFIED_USERS({
                    ...VERIFIED_USERS,
                    [selectedUserType]: {
                        ...VERIFIED_USERS[selectedUserType],
                        id: response?.data?.id,
                        isEmailSent: true,
                    },
                });
                toast.success("OTP sent to email");
            } catch (error) {
                toast.error(error?.data?.errors?.error[0]);
            }
        }
        setIsLoading(false);
    };

    const handleOTPSubmit = async (e) => {
        e?.preventDefault();
        setIsLoading(true);
        if (selectedUserType === USER_TYPE_ENUM.CUSTOMER) {
            try {
                await verifyOtpSjApi({
                    otp_code: VERIFIED_USERS[selectedUserType]?.otp,
                    email: VERIFIED_USERS[selectedUserType]?.email,
                });
                setVerifiedUsers(selectedUserType, "isVerified", true);
                loginCustomer();
            } catch (error) {
                toast.error(error?.data?.errors?.otp[0]);
            }
        } else if (selectedUserType === USER_TYPE_ENUM.SALE_PERSON) {
            try {
                await verifyOTPOTOApi({
                    otp_code: VERIFIED_USERS[selectedUserType]?.otp,
                    email: VERIFIED_USERS[selectedUserType]?.email,
                });
                setVerifiedUsers(selectedUserType, "isVerified", true);
                loginSales();
            } catch (error) {
                toast.error(error?.data?.errors?.otp[0]);
            }
        }
        setIsLoading(false);
    };

    const handleChangeEmail = () => {
        SET_VERIFIED_USERS({
            ...VERIFIED_USERS,
            [selectedUserType]: {
                ...VERIFIED_USERS[selectedUserType],
                isVerified: false,
                isEmailSent: false,
                otp: "",
            },
        });
        logoutUser(selectedUserType);
        if (typeof clearTimer === "function") clearTimer();
    };

    const getModuleText = () => {
        if (selectedUserType === USER_TYPE_ENUM.CUSTOMER) return "Order";
        return "Invoice";
    };

    const handleRequestOrderListChange = (index, key, value) => {
        const updatedList = [...submitRequestOrderList];
        updatedList[index] = { ...updatedList[index], [key]: value };
        // if (key === "refund_type" && value === "full")
        //     delete updatedList[index]?.amount;
        setIsSubmitDisabled(isAnyPropertyInvalid(updatedList));
        setSubmitRequestOrderList(updatedList);
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
                console.print("remainingTime: " + remainingTime);
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
        setSelectedUserType(localStorage.getItem("selectedUserType"));
        const userTypes = getUserTypes();
        let { CUSTOMER, SALE_PERSON } = USER_TYPE_ENUM;
        if (isAuthenticated) {
            setVerifiedUsers(CUSTOMER, "id", getUserId());
        } else if (userTypes?.includes(CUSTOMER)) {
            const sessionValid = isSessionValid(CUSTOMER);
            if (sessionValid) {
                console.log("CUSTOMER:", CUSTOMER);
                SET_VERIFIED_USERS({
                    ...VERIFIED_USERS,
                    [CUSTOMER]: {
                        ...VERIFIED_USERS[CUSTOMER],
                        id: getLoggedInUserID(CUSTOMER),
                        isVerified: true,
                        email: getUserEmail(CUSTOMER),
                    },
                });
                clearTimer.current = setTimer(CUSTOMER);
            } else {
                logoutUser(CUSTOMER);
                setVerifiedUsers(CUSTOMER, "isVerified", false);
            }
        }
        if (userTypes?.includes(SALE_PERSON)) {
            const sessionValid = isSessionValid(SALE_PERSON);
            if (sessionValid) {
                SET_VERIFIED_USERS({
                    ...VERIFIED_USERS,
                    [SALE_PERSON]: {
                        ...VERIFIED_USERS[SALE_PERSON],
                        id: getLoggedInUserID(SALE_PERSON),
                        isVerified: true,
                        email: getUserEmail(SALE_PERSON),
                    },
                });
                clearTimer.current = setTimer(SALE_PERSON);
            } else {
                logoutUser(SALE_PERSON);
                setVerifiedUsers(SALE_PERSON, "isVerified", false);
            }
        }
        return () => {
            if (typeof clearTimer.current === "function") clearTimer.current();
        };
    }, []);

    useEffect(() => {
        resetStates();
        localStorage.setItem("selectedUserType", selectedUserType);

        switch (selectedUserType) {
            case USER_TYPE_ENUM.CUSTOMER:
                listItemsKey.current = ORDER_DETAILS_KEYS_ENUMS.WEBSITE.items;
                break;

            case USER_TYPE_ENUM.SALE_PERSON:
                listItemsKey.current =
                    ORDER_DETAILS_KEYS_ENUMS.SALE_PERSON.items;
                break;

            default:
                break;
        }
    }, [selectedUserType]);

    useEffect(() => {
        switch (selectedUserType) {
            case USER_TYPE_ENUM.CUSTOMER:
                fetchOrdersList(USER_TYPE_ENUM.CUSTOMER);
                break;
            case USER_TYPE_ENUM.SALE_PERSON:
                fetchOrdersList(USER_TYPE_ENUM.SALE_PERSON);
            default:
                break;
        }
    }, [selectedUserType, VERIFIED_USERS]);

    const resetStates = () => {
        setSelectedOrder([]);
        setInvoicesList([]);
        setSelectedList([]);
        setSubmitRequestOrderList([]);
    };

    const resetFormStates = () => {
        setSelectedOrder([]);
        setSelectedList([]);
        setSubmitRequestOrderList([]);
    };

    const isAnyPropertyInvalid = (arrayOfObjects) =>
        arrayOfObjects.some((obj) => {
            if (obj.refund_type === "partial") {
                return (
                    !obj.reasons ||
                    !obj.refund_type ||
                    !obj.amount ||
                    obj.amount <= 0
                );
            } else {
                return !obj.reasons || !obj.refund_type;
            }
        });

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
                            value={VERIFIED_USERS[selectedUserType]?.email}
                            onChange={(e) => {
                                setVerifiedUsers(
                                    selectedUserType,
                                    "email",
                                    e?.target?.value
                                );
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
        if (selectedUserType === USER_TYPE_ENUM.CUSTOMER) {
            if (
                !VERIFIED_USERS[selectedUserType]?.isEmailSent &&
                !VERIFIED_USERS[selectedUserType]?.isVerified &&
                !isAuthenticated
            ) {
                return JSX;
            }
            return <></>;
        } else if (selectedUserType === USER_TYPE_ENUM.SALE_PERSON) {
            if (
                !VERIFIED_USERS[selectedUserType]?.isEmailSent &&
                !VERIFIED_USERS[selectedUserType]?.isVerified
            ) {
                return JSX;
            }
            return <></>;
        }
        return <></>;
    }, [selectedUserType, VERIFIED_USERS, isLoading]);

    const OTPVerficationJSX = useMemo(() => {
        const JSX = (
            <>
                <p className="my-3 fw-medium">
                    We’ve sent a 4 digits code to{" "}
                    {VERIFIED_USERS[selectedUserType]?.email}, open your email
                    and Enter the code below.
                </p>
                <div className="d-flex">
                    <form onSubmit={handleOTPSubmit}>
                        <FormControl fullWidth>
                            <TextField
                                id="otp"
                                label="OTP"
                                variant="outlined"
                                color="success"
                                value={VERIFIED_USERS[selectedUserType]?.otp}
                                autoFocus
                                onChange={(e) => {
                                    const { value } = e.target;
                                    const otpRegex = /^[0-9]*$/;
                                    if (value === "" || otpRegex.test(value)) {
                                        setVerifiedUsers(
                                            selectedUserType,
                                            "otp",
                                            value.slice(0, 4)
                                        );
                                    }
                                }}
                            />
                        </FormControl>
                    </form>
                    <div className="align-items-center d-flex ms-2">
                        <button
                            className="refund-btn ms-3 btn btn-success verify-otp"
                            onClick={handleOTPSubmit}
                            disabled={
                                isLoading ||
                                VERIFIED_USERS[selectedUserType]?.otp?.length <
                                    4
                            }
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
            VERIFIED_USERS[selectedUserType]?.isEmailSent &&
            !(VERIFIED_USERS[selectedUserType]?.isVerified || isAuthenticated)
        ) {
            return JSX;
        } else if (
            VERIFIED_USERS[selectedUserType]?.isEmailSent &&
            !VERIFIED_USERS[selectedUserType]?.isVerified
        ) {
            return JSX;
        }
        return <></>;
    }, [selectedUserType, VERIFIED_USERS, isLoading]);

    console.log("VERIFIED_USERS: ", VERIFIED_USERS);

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
                                        {getModuleText()}# {item?.id}
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
            selectedUserType === USER_TYPE_ENUM.CUSTOMER &&
            (VERIFIED_USERS[selectedUserType]?.isVerified || isAuthenticated)
        ) {
            return JSX;
        } else if (
            selectedUserType === USER_TYPE_ENUM.SALE_PERSON &&
            VERIFIED_USERS[selectedUserType]?.isVerified
        ) {
            return JSX;
        }
        return <></>;
    }, [selectedUserType, VERIFIED_USERS, selectedOrder, invoicesList]);

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
                                    selectedUserType === USER_TYPE_ENUM.CUSTOMER
                                        ? "success"
                                        : "outline-success"
                                }`}
                                onClick={() =>
                                    setSelectedUserType(USER_TYPE_ENUM.CUSTOMER)
                                }
                            >
                                Order through website
                            </button>
                            <button
                                className={`refund-btn ms-sm-3 mt-sm-0 mt-2 btn btn-${
                                    selectedUserType ===
                                    USER_TYPE_ENUM.SALE_PERSON
                                        ? "success"
                                        : "outline-success"
                                }`}
                                onClick={() =>
                                    setSelectedUserType(
                                        USER_TYPE_ENUM.SALE_PERSON
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
                                                            ) ||
                                                                order?.invoice_date}
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div>Total</div>
                                                        <div>
                                                            $
                                                            {order?.total_amount ||
                                                                order?.total}
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
                                                        <div>
                                                            {selectedUserType ===
                                                            USER_TYPE_ENUM.CUSTOMER
                                                                ? order?.id
                                                                : order?.order_number}
                                                        </div>
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
                                                                        {order[
                                                                            listItemsKey
                                                                                .current
                                                                        ]?.map(
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
                                                                                                {item
                                                                                                    ?.product
                                                                                                    ?.name ||
                                                                                                    item?.item_name}
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
                                                        submitRequestOrderList[
                                                            index
                                                        ]?.reasons
                                                    }
                                                    onChange={(e) =>
                                                        handleRequestOrderListChange(
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
                                                    submitRequestOrderList[
                                                        index
                                                    ]?.refund_type
                                                }
                                                label="Select Refund Option"
                                                onChange={(e) =>
                                                    handleRequestOrderListChange(
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
                                    {submitRequestOrderList[index]
                                        ?.refund_type === "partial" && (
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
                                                        submitRequestOrderList[
                                                            index
                                                        ]?.amount
                                                    }
                                                    onChange={(e) => {
                                                        handleRequestOrderListChange(
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
                            {isSubmitDisabled && (
                                <p className="fs-6 text-danger mt-2">
                                    *Please fill all the required fields to
                                    submit refund request.
                                </p>
                            )}
                        </>
                    )}
                </div>
            </div>
            {showRefundsModal && (
                <PreviousRefundsModal
                    showModal={showRefundsModal}
                    handleClose={closeModal}
                    selectedUserType={selectedUserType}
                    userID={VERIFIED_USERS[selectedUserType]?.id}
                />
            )}
        </div>
    );
}
