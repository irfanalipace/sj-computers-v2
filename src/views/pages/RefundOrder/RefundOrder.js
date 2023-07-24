import React, { useEffect, useState, useMemo, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
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
    getInvoiceDetailsOTO,
    getInvoicesList,
    verifyEmailOTOApi,
    verifyOTPOTOApi,
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
import { getUserId } from "@services/jwtService";
import { USER_TYPE_ENUM } from "./constants";
import RefundForms from "@components/RefundOrder/RefundForms";

import loginSVG from "@images/login-invitation.png";

export default function RefundOrder() {
    const [selectedUserType, setSelectedUserType] = useState(null);
    const [invoicesList, setInvoicesList] = useState([]);
    const [list, setSelectedList] = useState([]);
    const [selectedOrder, setSelectedOrders] = useState([]);
    const [showRefundsModal, setShowRefundsModal] = useState(false);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingList, setIsLoadingList] = useState(false);

    const [USERS_DATA, SET_USERS_DATA] = useState({
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

    const navigate = useNavigate();
    const location = useLocation();

    let remainingTime = 0;
    let clearTimer = useRef(null);

    // Simulated login function for customer and sales
    const loginCustomer = async () => {
        let userType = USER_TYPE_ENUM.CUSTOMER;
        if (USERS_DATA[userType]?.id) {
            loginUser(
                userType,
                USERS_DATA[userType]?.id,
                USERS_DATA[userType]?.email
            );
            welcomeUser(userType);
        }
    };

    const loginSales = () => {
        let userType = USER_TYPE_ENUM.SALE_PERSON;
        if (USERS_DATA[userType]?.id) {
            loginUser(
                userType,
                USERS_DATA[userType]?.id,
                USERS_DATA[userType]?.email
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
        SET_USERS_DATA({
            ...USERS_DATA,
            [userType]: {
                ...USERS_DATA[userType],
                [key]: value,
            },
        });
    };

    const fetchOrdersList = async (userType) => {
        switch (userType) {
            case USER_TYPE_ENUM.CUSTOMER:
                if (USERS_DATA[userType]?.isVerified || isAuthenticated)
                    try {
                        setIsLoadingList(true);
                        let response = await getOrdersList({
                            user_id: USERS_DATA[userType]?.id,
                        });
                        setInvoicesList(response?.data);
                    } catch (error) {
                        toast.error("Something went wrong");
                    }
                break;
            case USER_TYPE_ENUM.SALE_PERSON:
                if (USERS_DATA[userType]?.isVerified)
                    try {
                        setIsLoadingList(true);
                        let response = await getInvoicesList({
                            customer_id: USERS_DATA[userType]?.id,
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
                    user_id: USERS_DATA[selectedUserType]?.id,
                    order_id: values,
                });
                setSelectedList(response?.data);
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
                    customer_id: USERS_DATA[selectedUserType]?.id,
                    invoice_id: values,
                });
                setSelectedList(response?.data);
            } catch (error) {
                toast.error(error?.message);
            }
        setIsLoading(false);
    };

    const handleListChange = async (e) => {
        const values = e?.target?.value;
        setSelectedOrders(values);
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
                    email: USERS_DATA[selectedUserType]?.email,
                });
                SET_USERS_DATA({
                    ...USERS_DATA,
                    [selectedUserType]: {
                        ...USERS_DATA[selectedUserType],
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
                    email: USERS_DATA[selectedUserType]?.email,
                });
                SET_USERS_DATA({
                    ...USERS_DATA,
                    [selectedUserType]: {
                        ...USERS_DATA[selectedUserType],
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
                    otp_code: USERS_DATA[selectedUserType]?.otp,
                    email: USERS_DATA[selectedUserType]?.email,
                });
                setVerifiedUsers(selectedUserType, "isVerified", true);
                loginCustomer();
            } catch (error) {
                toast.error(error?.data?.errors?.otp[0]);
            }
        } else if (selectedUserType === USER_TYPE_ENUM.SALE_PERSON) {
            try {
                await verifyOTPOTOApi({
                    otp_code: USERS_DATA[selectedUserType]?.otp,
                    email: USERS_DATA[selectedUserType]?.email,
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
        SET_USERS_DATA({
            ...USERS_DATA,
            [selectedUserType]: {
                ...USERS_DATA[selectedUserType],
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
                SET_USERS_DATA({
                    ...USERS_DATA,
                    [CUSTOMER]: {
                        ...USERS_DATA[CUSTOMER],
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
                SET_USERS_DATA({
                    ...USERS_DATA,
                    [SALE_PERSON]: {
                        ...USERS_DATA[SALE_PERSON],
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
    }, [selectedUserType, USERS_DATA]);

    const resetStates = () => {
        setSelectedOrders([]);
        setInvoicesList([]);
        setSelectedList([]);
    };

    const resetLists = () => {
        setSelectedOrders([]);
        setSelectedList([]);
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
                            value={USERS_DATA[selectedUserType]?.email}
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
                !USERS_DATA[selectedUserType]?.isEmailSent &&
                !USERS_DATA[selectedUserType]?.isVerified &&
                !isAuthenticated
            ) {
                return JSX;
            }
            return <></>;
        } else if (selectedUserType === USER_TYPE_ENUM.SALE_PERSON) {
            if (
                !USERS_DATA[selectedUserType]?.isEmailSent &&
                !USERS_DATA[selectedUserType]?.isVerified
            ) {
                return JSX;
            }
            return <></>;
        }
        return <></>;
    }, [selectedUserType, USERS_DATA, isLoading]);

    const OTPVerficationJSX = useMemo(() => {
        const JSX = (
            <>
                <p className="my-3 fw-medium">
                    We’ve sent a 4 digits code to{" "}
                    {USERS_DATA[selectedUserType]?.email}, open your email and
                    Enter the code below.
                </p>
                <div className="d-flex">
                    <form onSubmit={handleOTPSubmit}>
                        <FormControl fullWidth>
                            <TextField
                                id="otp"
                                label="OTP"
                                variant="outlined"
                                color="success"
                                value={USERS_DATA[selectedUserType]?.otp}
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
                                USERS_DATA[selectedUserType]?.otp?.length < 4
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
            USERS_DATA[selectedUserType]?.isEmailSent &&
            !(USERS_DATA[selectedUserType]?.isVerified || isAuthenticated)
        ) {
            return JSX;
        } else if (
            USERS_DATA[selectedUserType]?.isEmailSent &&
            !USERS_DATA[selectedUserType]?.isVerified
        ) {
            return JSX;
        }
        return <></>;
    }, [selectedUserType, USERS_DATA, isLoading]);

    console.print("USERS_DATA: ", USERS_DATA);
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
            (USERS_DATA[selectedUserType]?.isVerified || isAuthenticated)
        ) {
            return JSX;
        } else if (
            selectedUserType === USER_TYPE_ENUM.SALE_PERSON &&
            USERS_DATA[selectedUserType]?.isVerified
        ) {
            return JSX;
        }
        return <></>;
    }, [selectedUserType, USERS_DATA, selectedOrder, invoicesList]);

    const handleSignInButton = () => {
        console.print("handleSignInButton");
        const redirectURL = location.pathname;
        window.localStorage.setItem("redirectURL", redirectURL);
        navigate("/login");
    };

    return (
        <div className="refund-order-page py-5">
            <div className="container">
                <div className="row flex-column-reverse flex-sm-row mx-0">
                    <div className="col-sm-9 col-12">
                        <div className="refund-header">
                            <h3 className="mb-4">Refund/Return</h3>
                            <p className="my-3 fw-medium">
                                Choose the Button below to perform certain
                                action.
                            </p>
                            <div className="order-type-btns mb-4">
                                <div className="d-flex flex-sm-row flex-column align-items-center">
                                    <button
                                        className={`refund-btn btn btn-${
                                            selectedUserType ===
                                            USER_TYPE_ENUM.CUSTOMER
                                                ? "success"
                                                : "outline-success"
                                        }`}
                                        onClick={() =>
                                            setSelectedUserType(
                                                USER_TYPE_ENUM.CUSTOMER
                                            )
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

                            {list?.length > 0 && (
                                <RefundForms
                                    selectedUserType={selectedUserType}
                                    list={list}
                                    resetLists={resetLists}
                                    userData={USERS_DATA[selectedUserType]}
                                />
                            )}
                        </div>
                    </div>
                    {selectedUserType === USER_TYPE_ENUM.CUSTOMER &&
                        !(
                            USERS_DATA[selectedUserType]?.isVerified ||
                            isAuthenticated
                        ) && (
                            <div className="col-sm-3 col-12 mb-sm-0 mb-3">
                                <div className="login-section">
                                    <div className="d-flex justify-content-center align-items-center">
                                        <img src={loginSVG} />
                                    </div>
                                    <p className="text-center">
                                        Sign in to get Hustle free tracking
                                    </p>
                                    <hr></hr>
                                    <div className="d-flex justify-content-center">
                                        <button
                                            className="refund-btn btn btn-success w-100"
                                            onClick={handleSignInButton}
                                        >
                                            Sign in
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                </div>
            </div>
            {showRefundsModal && (
                <PreviousRefundsModal
                    showModal={showRefundsModal}
                    handleClose={closeModal}
                    selectedUserType={selectedUserType}
                    userID={USERS_DATA[selectedUserType]?.id}
                />
            )}
        </div>
    );
}
