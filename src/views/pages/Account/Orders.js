import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { updateProfile } from "@store/auth/authThunks";
import { CLEAR_API_ERRORS } from "@store/auth/authSlice";
import { getOrderDetails } from "@store/orders/ordersThunk";
import Button from "@common/Button/Button";
import Breadcrumb from "@common/Breadrumb/Breadcrumb";
import OrderCard from "../../components/OrderPage/OrderProducts";
import OrderInvoiceCard from "../../components/OrderPage/OrderInvoiceCard";

import userDefault from "@images/common/user-default-avatar.png";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { FaSearch } from "react-icons/fa";
import "./Account.css";
import { Select } from "@mantine/core";
// import "react-datepicker/dist/react-datepicker.css";
const dummyDataForOrders = [
    {
        orderPlacedDate: "April 17,2024",
        TotalAmount: "$150",
        orderID: "123456-878901234",
        orderStatus: "Arriving",
        earlyDeliveryDate: "April 20",
        lateDeliveryDate: "May 8",
        productImageUrl:
            "https://images.philips.com/is/image/PhilipsConsumer/223V7QSB_00-RTP-global-001?$jpglarge$&wid=960",
        productDescription:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the .",
    },
    {
        orderPlacedDate: "April 17,2024",
        TotalAmount: "$150",
        orderID: "123456-878901234",
        orderStatus: "Arriving",
        earlyDeliveryDate: "April 20",
        lateDeliveryDate: "May 8",
        productImageUrl:
            "https://images.philips.com/is/image/PhilipsConsumer/223V7QSB_00-RTP-global-001?$jpglarge$&wid=960",
        productDescription:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
];
const dummyDataForCancelledOrders = [
    {
        orderPlacedDate: "April 17,2024",
        TotalAmount: "$150",
        orderID: "123456-878901234",
        orderStatus: "Arriving",
        earlyDeliveryDate: "April 20",
        lateDeliveryDate: "May 8",
        productImageUrl:
            "https://images.philips.com/is/image/PhilipsConsumer/223V7QSB_00-RTP-global-001?$jpglarge$&wid=960",
        productDescription:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the .",
    },
];

const dummyInvoice = {
    productName: "Product Name",
    price: "$59.5",
    shipping: "--",
    beforeTax: "--",
    estTax: "--",
    orderTotal: "$59.5",
    description:
        " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s",
};

const CustomTabs = styled(Tabs)({
    "& .MuiTabs-indicator": {
        backgroundColor: "#E87E24",
    },

    "& .MuiTab-textColorPrimary": {
        color: "#318243",
        "&.Mui-selected": {
            color: "#E87E24",
        },
    },
});

const OrderPage = () => {
    const [name, setName] = useState("");
    const [orderSearch, setOrderSearch] = useState("");
    const [selectedValue, setSelectedValue] = useState("2 month");

    const handleDropdownChange = (value) => {
        setSelectedValue(value);
    };

    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.user);
    const apiError = useSelector((state) => state.auth.apiError);
    const isLoading = useSelector((state) => state.auth.isLoading);

    useEffect(() => {
        console.log(user, "user details");
        setName(user.name);
        //  setImageUrl(user.profile_pic);
    }, [user]);

    useEffect(() => {
        dispatch(getOrderDetails());

        return function () {
            dispatch(CLEAR_API_ERRORS());
        };
    }, []);

    // const handleDeleteImage = () => {
    //     setSelectedFile(null);
    //     setImageUrl(null);
    // };
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };
    const handleSearch = (event) => {
        console.log(event, "handle search");
        setOrderSearch("");
    };

    const renderTabContent = () => {
        if (activeTab === 0) {
            return <OrderCard data={dummyDataForOrders} />;
        } else if (activeTab === 1) {
            return <OrderCard data={dummyDataForCancelledOrders} />;
        }
    };
    return (
        <div className="account-page">
            <div className="container-xl">
                <Breadcrumb />
                <div className="row mx-0">
                    <div className="col-sm-6 col-md-8 col-8">
                        <h3 className="account-heading">Your Order</h3>
                    </div>
                    <div className="col-sm-6 col-md-4 col-4">
                        {/* <p className="account-heading">Enter tracking id to search</p> */}
                        <label
                            style={{ marginBottom: 5 }}
                            htmlFor="orderSearch"
                        >
                            Enter tracking id to search
                        </label>
                        <div style={{ display: "flex" }}>
                            <input
                                id="orderSearch"
                                name="orderSearch"
                                placeholder="Search all orders"
                                value={orderSearch}
                                onChange={(e) => setOrderSearch(e.target.value)}
                                className={
                                    orderSearch
                                        ? "search-input green"
                                        : "search-input"
                                }
                            />
                            {/* <FaSearch style={{ marginRight: '5px' }} /> */}
                            <button
                                type="button"
                                style={{
                                    backgroundColor: "#52AC66",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "8px",
                                    marginLeft: "10px",
                                    padding: "5px 10px",
                                    display: "flex",
                                    alignItems: "center",
                                }}
                                onClick={handleSearch}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>

                <div className="row order-list-container">
                    <div className="col-sm-6 col-md-8 col-8 px-0">
                        <Box sx={{ flexGrow: 1 }}>
                            <CustomTabs
                                value={activeTab}
                                onChange={handleTabChange}
                                centered
                            >
                                <Tab label="Orders" />
                                <Tab label="Cancelled Orders" />
                            </CustomTabs>
                            <div
                                style={{
                                    display: "flex",
                                    marginTop: 40,
                                    marginBottom: 40,
                                }}
                            >
                                <p className="orderType">
                                    {}{" "}
                                    {activeTab === 0
                                        ? `${dummyDataForOrders.length} orders`
                                        : `${dummyDataForCancelledOrders.length} cancelled order`}{" "}
                                    place in
                                </p>
                                <div style={{ display: "inline-flex" }}>
                                    <Select
                                        data={[
                                            {
                                                value: "2 month",
                                                label: "2 month",
                                            },
                                            // { value: 'option2', label: 'Option 2' },
                                            // { value: 'option3', label: 'Option 3' },
                                        ]}
                                        value={selectedValue}
                                        onChange={handleDropdownChange}
                                        placeholder="Select an option"
                                        style={{
                                            background: "#FFFFFF",
                                            border: "1px solid #DDDDDD",
                                            boxShadow:
                                                "0px 1px 4px rgba(0, 0, 0, 0.25)",
                                            borderRadius: "8px",
                                            fontFamily: "Inter",
                                            fontStyle: "normal",
                                            fontWeight: "400",
                                            fontSize: "12px",
                                            lineHeight: "164%",
                                            color: "#000000",
                                        }}
                                    />
                                    {/* <select
                        value={1}
                        //   onChange={}
                        style={{ marginLeft: '5px' }}
                        >
                        <option value="1 Month">Select</option>
                        <option value="Option 1">1 Month</option>
                        <option value="Option 2">Option 2</option>
                        <option value="Option 3">Option 3</option>
                        </select> */}
                                </div>
                            </div>

                            {renderTabContent()}
                        </Box>
                    </div>
                    <div
                        style={{ marginTop: "15%" }}
                        className="col-sm-6 col-md-4 col-4"
                    >
                        <OrderInvoiceCard data={dummyInvoice} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
