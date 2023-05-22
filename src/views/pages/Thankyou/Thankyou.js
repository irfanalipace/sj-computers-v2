import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import { productDetailsApi } from "@api/products";
// import { Container, Row, Col, Table } from "react-bootstrap";

import "./thankyou.css"; // Import the CSS file for the component
import circle from "../../../assets/images/green-circle.svg"
import tickImage from "../../../assets/images/tick1.svg"
import { useNavigate, useLocation   } from "react-router-dom";




export default function ThankYou() {
    const navigate  = useNavigate ();
    const location = useLocation();
    const order = location.state?.order;

//   const handleButtonClick = () => {
//     // Redirect to the specific path
//     history.push("/specific-path");
//   };

    useEffect(() => {
        console.log(order, "order details")
    }, []);

    const tableData = [
        {
          productName: "Product 1",
          quantity: 2,
          orderNo: "123456",
          orderDate: "2023-05-21",
          deliveryDetails: "Delivery Details 1",
          paymentType: "Payment Type 1",
          subTotal: "$100",
          productImage: "https://m.media-amazon.com/images/I/51c4fed1l1L.jpg",
        },
        {
          productName: "Product 2",
          quantity: 1,
          orderNo: "789012",
          orderDate: "2023-05-22",
          deliveryDetails: "Delivery Details 2",
          paymentType: "Payment Type 2",
          subTotal: "$50",
          productImage: "",
        },
        // Add more data objects as needed
      ];

  return (
    <div className="thank-you-page" style={{marginLeft: '10%', marginRight: '10%'}}>
         <div className="row margintopBottom">
         <div className="col-12 my-10">
      <div style={{ position: "relative" }}>
        <img
          src={circle}
          alt="Circle Image"
          style={{ position: "", zIndex: 1 }}
        />
        <img
          src={tickImage}
          alt="Tick Image"
          style={{ position: "", zIndex: 2 }}
        />
      </div>
    </div>
                <div className="col-12">
                    <h1>Thanks for Order</h1>
                </div>
                <div className="col-12 my-20">
                    <p>Your order with tracking No <span style={{fontWeight: '900'}}>#124548</span> has been successfully confirmed. We’ll send you an email notification once your order has shipped.</p>
                </div>
             </div>
        <div >
        </div>
        <table className="thank-you-table">
      <thead>
        <tr>
          <th className="product-name">
            {/* <div className="product-thumbnail">
              <img src={productImage} alt="Product" />
            </div> */}
            <div className="product-title">Product Name</div>
          </th>
          <th>Quantity</th>
          <th>Order No</th>
          <th>Order Date</th>
          <th className="delivery-details">Delivery Details</th>
          <th>Payment Type</th>
          <th>Sub Total</th>
        </tr>
      </thead>
      <tbody>
        {/* Map through the tableData array and render table rows */}
        {tableData.map((data, index) => (
          <tr key={index}>
            <td>
              <div style={{ display: "flex" }}>
                {data.productImage && (
                  <div className="product-thumbnail">
                    <img src={data.productImage} alt="Product" />
                    {data.productName}
                  </div>
                )}
                {/* <div className="product-title">{data.productName}</div> */}
              </div>
            </td>
            <td>{data.quantity}</td>
            <td>{data.orderNo}</td>
            <td>{data.orderDate}</td>
            <td>{data.deliveryDetails}</td>
            <td>{data.paymentType}</td>
            <td>{data.subTotal}</td>
          </tr>
        ))}
      </tbody>
    </table>
      <div className="row total-tax-row mx-0">
        <div className="col-12 d-flex justify-content-end">
          {/* <p >Tax ${120.6}</p> */}
        </div>
        <div className="col-12 d-flex justify-content-end">
        <p style={{marginRight: '1%', marginTop: '2%'}}>Tax ${120.6}</p>
        </div>
        <div className="col-6 d-flex justify-content-start">
        <p className="bold-total">Total</p>
        </div>
        <div className="col-6 d-flex justify-content-end">
        <p className="bold-total">${120.6}</p>
        </div>
     </div>
      <div className="row mx-0">
        <div className="col-6 d-flex justify-content-start">
            <button className="track-order-btn" onClick={() =>  navigate ("/")}>Track your order</button>
        </div>
        <div className="col-6 d-flex justify-content-end">
            <button className="shop-more-btn" onClick={() =>  navigate ("/")} >Shop more</button>
        </div>
     </div>
    </div>
  );
}


