import React, { useEffect, useState } from "react";
import Button from "@common/Button/Button";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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

    const [orderType, setOrderType] = useState();
    const [InvoicesList, setInvoicesList] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState();

    const setOrderTypeFunction = async () => {
        console.log("orderType: ", orderType);
    };

    useEffect(() => {
        setOrderTypeFunction();
    }, [orderType]);

    const handleListChange = (e, value) => {
        console.log("handleListChange value: ", value);
        let response = dummyList.find((order) => order.id === value) || {};
        setSelectedOrder(response);
    };

    return (
        <div className="refund-order-page">
            <div className="container">
                <div className="refund-header">
                    <h3>Refund/Return</h3>
                    <p>Choose the Button below to perform certain action.</p>
                    <div className="order-type-btns">
                        <div className="d-flex">
                            <Button
                                className={
                                    "btn-" + orderType ===
                                    ORDER_TYPE_ENUM.WEBSITE
                                        ? "success"
                                        : "outline-success" + "px-2 py-3"
                                }
                                onClick={() =>
                                    setOrderType(ORDER_TYPE_ENUM.WEBSITE)
                                }
                            >
                                Order through website
                            </Button>
                            <Button
                                className={
                                    "ms-3 btn-" + orderType ===
                                    ORDER_TYPE_ENUM.SALE_PERSON
                                        ? "success"
                                        : "outline-success" + "px-2 py-3"
                                }
                                onClick={() =>
                                    setOrderType(ORDER_TYPE_ENUM.SALE_PERSON)
                                }
                            >
                                Order through sales person
                            </Button>
                        </div>
                    </div>

                    {!!orderType && (
                        <>
                            <p>Select invoice for further proceeding.</p>
                            <div className="d-flex">
                                <FormControl fullWidth>
                                    <label id="order-refund-invoice-list">
                                        {orderType === ORDER_TYPE_ENUM.WEBSITE
                                            ? " Orders list"
                                            : " Invoices list"}
                                    </label>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={InvoicesList}
                                        label="InvoicesList"
                                        onChange={handleListChange}
                                    >
                                        {dummyList.map((item) => (
                                            <>
                                                <MenuItem value={item?.id}>
                                                    {item?.name}
                                                </MenuItem>
                                            </>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="ms-3">
                                <Button className="text-succes text-decoration-underline">
                                    Previous Refunds
                                </Button>
                            </div>
                        </>
                    )}
                    {selectedOrder?.id && (
                        <>
                            <div className="order-details-container border">
                                <h3>Order Details</h3>
                                <table className="order-details-table round-2">
                                    <thead>
                                        <tr>
                                            <th>
                                                <div>Order Placed</div>
                                                <div>
                                                    {selectedOrder?.order_date}
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
                                            <td className="order-item">
                                                <h4>Your Order</h4>
                                                <div>
                                                    <img />
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
