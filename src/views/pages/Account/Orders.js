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
import { OrderSearchApi, OrderListhApi } from "../../../core/api/order";
import OrderCard from "../../components/OrderPage/OrderProducts";
import OrderInvoiceCard from "../../components/OrderPage/OrderInvoiceCard";

import userDefault from "@images/common/user-default-avatar.png";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import LoaderComponent from "@common/LoaderComponent/LoaderComponent";

// import { FaSearch } from "react-icons/fa";
import "./Account.css";
import { Select } from "@mantine/core";

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
    // {
    //     orderPlacedDate: "April 17,2024",
    //     TotalAmount: "$150",
    //     orderID: "123456-878901234",
    //     orderStatus: "Arriving",
    //     earlyDeliveryDate: "April 20",
    //     lateDeliveryDate: "May 8",
    //     productImageUrl:
    //         "https://images.philips.com/is/image/PhilipsConsumer/223V7QSB_00-RTP-global-001?$jpglarge$&wid=960",
    //     productDescription:
    //         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the .",
    // },
];
const searchOrderArray = [
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
    const [localLoading, setLocalLoading] = useState(false);
    const [orderSearch, setOrderSearch] = useState("");
    const [orderSearchData, setOrderSearchData] = useState([]);
    const [selectedValue, setSelectedValue] = useState("2 month");
    const [activeTab, setActiveTab] = useState(0);

    const user = useSelector((state) => state.auth.user);
    const apiError = useSelector((state) => state.auth.apiError);
    const isLoading = useSelector((state) => state.orders.isLoading);
    const cancelOrders = useSelector((state) => state.orders.cancelOrders);
    const successOrders = useSelector((state) => state.orders.successOrders);
    const ordergDetails = useSelector((state) => state.orders.ordergDetails);

    const handleDropdownChange = (value) => {
        setSelectedValue(value);
    };

    const dispatch = useDispatch();

    useEffect(() => {
        console.log(user, "user details");
        setName(user.name);
    }, [user]);

    useEffect(() => {
        return function () {
            dispatch(CLEAR_API_ERRORS());
        };
    }, []);
    useEffect(() => {
        dispatch(getOrderDetails());
        const orderlist = OrderListhApi();
        console.log(orderlist, "orderList");
    }, [dispatch]);

    const handleTabChange = (event, newValue) => {
        setOrderSearchData([]);
        setActiveTab(newValue);
    };
    const handleSearch = async () => {
        setActiveTab(2);
        // console.log(orderSearch, "input")
        setLocalLoading(true);
        const responseSearch = await OrderSearchApi(orderSearch);
        console.log(responseSearch, "response search");
        setOrderSearchData(responseSearch);
        setLocalLoading(false);
        setOrderSearch("");
        return;
    };

    const renderTabContent = () => {
        if (isLoading) {
            return <LoaderComponent />;
        }
        return activeTab === 0 ? (
            successOrders.length > 0 ? (
                <OrderCard data={successOrders} />
            ) : (
                // <div className="flex justify-center items-center">
                //     <p>No success orders</p>
                // </div>
                <>
                    {/* {Object.Keys(orderDetails).length === 0 ? "data have" : "no data"} */}

                    <div className="flex justify-center items-center">
                        <p>No success orders</p>
                    </div>
                </>
            )
        ) : activeTab === 1 ? (
            cancelOrders.length > 0 ? (
                // <div className="flex justify-center items-center">
                //     <p>No cancelled orders.</p>
                // </div>
                <OrderCard data={cancelOrders} />
            ) : (
                <div className="flex justify-center items-center">
                    <p>No cancelled orders</p>
                </div>
            )
        ) : activeTab === 2 ? (
            orderSearchData.length > 0 ? (
                !!localLoading === true ? (
                    <LoaderComponent />
                ) : (
                    <OrderCard data={orderSearchData} />
                )
            ) : (
                // <div className="flex justify-center items-center">
                //     <p>Orders Not found.</p>
                // </div>
                // <OrderCard data={orderSearchData} />
                <div className="flex justify-center items-center">
                    <p>Orders Not found.</p>
                </div>
            )
        ) : null;
    };
    return (
        <div className="account-page order-page">
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

                <div className="row mx-0 order-list-container">
                    <div className="col-sm-6 col-md-9 col-9 px-0">
                        <Box sx={{ flexGrow: 1 }}>
                            <CustomTabs
                                value={activeTab}
                                onChange={handleTabChange}
                                centered
                            >
                                <Tab label="Orders" />
                                <Tab label="Cancelled Orders" />
                                <Tab label="Search orders" />
                            </CustomTabs>
                            <div
                                style={{
                                    display: "flex",
                                    marginTop: 40,
                                    marginBottom: 40,
                                }}
                            >
                                {activeTab !== 2 && (
                                    <>
                                        <p className="orderType">
                                            {}{" "}
                                            {activeTab === 0
                                                ? `${successOrders.length} orders`
                                                : `${cancelOrders.length} cancelled order`}{" "}
                                            place in
                                        </p>
                                        <div style={{ display: "inline-flex" }}>
                                            <Select
                                                data={[
                                                    {
                                                        value: "1 month",
                                                        label: "1 month",
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
                                    </>
                                )}
                            </div>

                            {renderTabContent()}
                        </Box>
                    </div>
                    <div
                        style={{ marginTop: "15%", marginBottom: "5%" }}
                        className="col-sm-12 col-md-3 col-3"
                    >
                        <OrderInvoiceCard
                            activeTab={activeTab}
                            data={ordergDetails}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
