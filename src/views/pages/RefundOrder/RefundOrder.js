import React, { useEffect, useState, useMemo } from "react";
import {
    FormControl,
    TextField,
    Select,
    InputLabel,
    MenuItem,
    InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";

import "./RefundOrder.css";
import PreviousRefundsModal from "@components/RefundOrder/PreviousRefundsModal";
import ApiService from "@services/apiService";
import { getOrderDetailsOTO } from "@api/refund-order";

export default function RefundOrder() {
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

    const USER_STATES = {
        EMAIL_SENT: false,
        EMAIL_VERIFIED: false,
    };

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

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const [orderType, setOrderType] = useState();
    const [InvoicesList, setInvoicesList] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState();
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [userState, setUserState] = useState(USER_STATES);
    const [note, setNote] = useState("");
    const [refundOption, setRefundOption] = useState("fully_refund");
    const [refundAmount, setRefundAmount] = useState();
    const [showRefundsModal, setShowRefundsModal] = useState(false);
    const [isUserVerfiedOnOTO, setIsUserVerfiedOnOTO] = useState(false);

    const closeModal = () => setShowRefundsModal(false);
    const setOrderTypeFunction = async (type) => {
        console.print("orderType: ", type);
        setOrderType(type);
    };

    const handleListChange = (e) => {
        const value = e?.target?.value;
        console.print("handleListChange value: ", value);
        let response = dummyList.find((order) => order?.id === value);
        setSelectedOrder(response);
    };

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        console.print("handleEmailSubmit");
        setUserState((userState) => {
            return { ...userState, EMAIL_SENT: true };
        });
    };

    const handleOTPSubmit = (e) => {
        e?.preventDefault();
        console.print("handleOTPSubmit");
        setUserState((userState) => {
            return { ...userState, EMAIL_VERIFIED: true };
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.print("handleFormSubmit");
    };

    const EmailVerificationCallback = useMemo(() => {
        const JSX = (
            <form onSubmit={handleEmailSubmit} className="w-100">
                <p className="my-3 fw-medium">
                    Enter an email to search all invoices list.
                </p>
                <div className="d-flex">
                    <FormControl fullWidth>
                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            type="email"
                            color="success"
                            // value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </FormControl>
                </div>
            </form>
        );
        if (orderType === ORDER_TYPE_ENUM.WEBSITE) {
            if (!userState.EMAIL_SENT && !isAuthenticated) return JSX;
        } else if (orderType === ORDER_TYPE_ENUM.SALE_PERSON) {
            if (!userState.EMAIL_SENT && !isUserVerfiedOnOTO) return JSX;
        } else if (isAuthenticated || isUserVerfiedOnOTO) {
            setUserState((userState) => {
                return { ...userState, EMAIL_VERIFIED: true };
            });
            return <></>;
        } else {
            return <></>;
        }
    }, [orderType, isAuthenticated, isUserVerfiedOnOTO, userState]);

    // useEffect(() => {}, []);

    useEffect(() => {
        // if (orderType === ORDER_TYPE_ENUM.WEBSITE)
        //     ApiService.setDefaultBaseUrl();
        // else if (orderType === ORDER_TYPE_ENUM.SALE_PERSON)
        //     ApiService.setOTOBaseUrl();
        resetStates();
    }, [orderType]);

    const resetStates = () => {
        setSelectedOrder(null);
        setInvoicesList([]);
        setRefundAmount(null);
        setRefundOption("fully_refund");
        setNote("");
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
                        <div className="d-flex">
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
                                className={`refund-btn ms-3 btn btn-${
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
                        {EmailVerificationCallback}
                        {userState?.EMAIL_SENT &&
                            !userState?.EMAIL_VERIFIED && (
                                <>
                                    <p className="my-3 fw-medium">
                                        We’ve sent a 4 digits code to {email},
                                        open your email and Enter the code
                                        below.
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
                                                    onChange={(e) => {
                                                        const { value } =
                                                            e.target;
                                                        const otpRegex =
                                                            /^[0-9]*$/;
                                                        if (
                                                            value === "" ||
                                                            otpRegex.test(value)
                                                        ) {
                                                            setOtp(
                                                                value.slice(
                                                                    0,
                                                                    4
                                                                )
                                                            );
                                                        }
                                                    }}
                                                />
                                            </FormControl>
                                        </form>
                                        <div className="align-items-center d-flex ms-3">
                                            <button
                                                className="refund-btn ms-3 btn btn-success verify-otp"
                                                onClick={() =>
                                                    handleOTPSubmit()
                                                }
                                            >
                                                Verify Me
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}

                        {userState?.EMAIL_VERIFIED && (
                            <>
                                <p className="my-3 fw-medium">
                                    Select invoice for further proceeding.
                                </p>
                                <div className="d-flex mb-4">
                                    <FormControl fullWidth>
                                        <InputLabel id="order-refund-invoice-list">
                                            {orderType ===
                                            ORDER_TYPE_ENUM.WEBSITE
                                                ? " Orders list"
                                                : " Invoices list"}
                                        </InputLabel>
                                        <Select
                                            labelId="list-select-label"
                                            id="list-select"
                                            value={selectedOrder?.name}
                                            label="InvoicesList"
                                            onChange={handleListChange}
                                            color="success"
                                        >
                                            {dummyList.map((item) => (
                                                <MenuItem
                                                    key={item?.id}
                                                    value={item?.id}
                                                >
                                                    {item?.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <div className="align-items-center d-flex ms-3">
                                        <button
                                            className="bg-white border-0 text-decoration-underline text-success"
                                            style={{ width: "200px" }}
                                            onClick={() =>
                                                setShowRefundsModal(true)
                                            }
                                        >
                                            Previous Refunds
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {selectedOrder?.id && (
                        <>
                            <div className="order-details-container">
                                <h3 className="my-3 px-3">Order Details</h3>
                                <table className="order-details-table round-2">
                                    <thead>
                                        <tr>
                                            <th>
                                                <div>Order Placed</div>
                                                <div>
                                                    {
                                                        selectedOrder?.order_placed
                                                    }
                                                </div>
                                            </th>
                                            <th>
                                                <div>Total</div>
                                                <div>
                                                    {selectedOrder?.total}
                                                </div>
                                            </th>
                                            <th>
                                                <div>Ship To</div>
                                                <div>
                                                    <span className="text-success">
                                                        {selectedOrder?.ship_to}
                                                    </span>
                                                </div>
                                            </th>
                                            <th>
                                                <div>Order #</div>
                                                <div>
                                                    {
                                                        selectedOrder?.order_number
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
                                                                    Your Order
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
                                            <td className="order-summary">
                                                <p className="my-3 fw-bold">
                                                    Order Summary
                                                </p>
                                                <table className="w-100">
                                                    <tbody>
                                                        <tr>
                                                            <td className="key">
                                                                Items Subtotal:
                                                            </td>
                                                            <td className="value">
                                                                $150
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="key">
                                                                Shipping &
                                                                Handling:
                                                            </td>
                                                            <td className="value">
                                                                --
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="key">
                                                                Total before
                                                                tax:
                                                            </td>
                                                            <td className="value">
                                                                $150
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className=" key">
                                                                Estimated tax to
                                                                be collected:
                                                            </td>
                                                            <td className="value">
                                                                $7
                                                            </td>
                                                        </tr>
                                                        <hr className="horizontal-line"></hr>{" "}
                                                        <tr className="grand-total-row">
                                                            <td className="key">
                                                                Grand Total:
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
                                            minRows={4}
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
                                    Select an option to refund your ammount
                                </p>
                                <div className="d-flex">
                                    <Select
                                        className="mb-3"
                                        labelId="select-refund-type-label"
                                        id="list-refund-type-select"
                                        value={refundOption}
                                        label="Select Refund Option"
                                        onChange={(e) =>
                                            setRefundOption(e.target.value)
                                        }
                                        color="success"
                                    >
                                        {REFUND_TYPES.map((type, index) => (
                                            <MenuItem
                                                key={index}
                                                value={type?.key}
                                            >
                                                {type?.label}
                                            </MenuItem>
                                        ))}
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
                                                setRefundAmount(e.target.value);
                                            }}
                                        />
                                    </FormControl>
                                </form>
                            )}
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
