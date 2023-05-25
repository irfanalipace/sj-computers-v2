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
    // const isMobile = window.innerWidth <= 768;

    function formatDate(dateString) {
        const options = { year: "numeric", month: "long", day: "numeric" };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
      }

    const navigate  = useNavigate ();
    const [thankOrderDetails , setThankOrderDetails] = useState({});
    const [thankOrderItems , setThankOrderItems] = useState([]);
    const [isMobile , setIsMobile] = useState(false);
    const location = useLocation();
    const order = location.state?.order;
    console.log( location, "haris details")
//   const handleButtonClick = () => {
//     // Redirect to the specific path
//     history.push("/specific-path");
//   };

useEffect(() => {
    
    const storedOrder = window.localStorage.getItem('thankyouOrderDetails');
  const order = location?.state?.order || JSON.parse(storedOrder);

  if (order) {
    const orderString = JSON.stringify(order);
    window.localStorage.setItem('thankyouOrderDetails', orderString);
      setThankOrderDetails(order);
      let Order = order?.Order;
      
      console.log(Order?.order?.order_item, "order");
      setThankOrderItems(Order?.order?.order_item);
      console.log(thankOrderItems, "order 3");
    }
  }, []);


    useEffect(() => {
        
    //    console.log(thankOrderItems, "2nd useeffect")
    //    console.log(thankOrderDetails, "2nd useeffect for order details")
        console.log(isMobile, 'isMobile');
    }, [thankOrderItems]);

    const handleWindowSizeChange = () => {
        setIsMobile(window.innerWidth <= 768);
      }
      
      useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
        }
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
      <div className="d-flex justify-content-center align-items-center">
        {/* <img
          src={circle}
          alt="Circle Image"
          style={{ position: "", zIndex: 1 }}
        /> */}
        <div className="d-flex justify-content-center align-items-center" style={{width:'70px', height:'70px', borderRadius:'50%',backgroundColor:'#318243'}}>
        <img
          src={tickImage}
          alt="Tick Image"
          style={{ position: "", zIndex: 2, marginLeft: '-3.3%' }}
        />
        </div>
        
      </div>
    </div>
                <div className="col-12 my-2">
                    <h1>Thanks for Order</h1>
                </div>
                <div className="col-12 my-20">
                    <p>Your order with tracking No <span style={{fontWeight: '900'}}>#{thankOrderDetails?.Order?.order?.id}</span> has been successfully confirmed. We’ll send you an email notification once your order has shipped.</p>
                </div>
             </div>
        <div >
        </div>
            {/* <div className="product-thumbnail">
              <img src={productImage} alt="Product" />
            </div> */}
        {/* Map through the tableData array and render table rows */}
                    {/* <div class="text-truncate"></div> */}
          {/* <div className="product-title">{data?.product_name}</div> */}

          {isMobile === true ? (
            <>
             <div className="card-container">
  {thankOrderItems?.map((data, index) => (
    <div className="card" key={index}>
      <div className="card-image">
        <img src={data?.product?.image[0] ? data?.product?.image[0] : 'https://m.media-amazon.com/images/I/81zf6aaAK1L.jpg'} alt="Product" />
      </div>
      <div className="card-content">
        <div className="product-name-thanks">
          {data && data?.product_name.length > 40 ? data?.product_name.slice(0, 40) + '...' : data?.product_name}
        </div>
        <div className="product-details-Thanks">
                    <div className="quantity">
                        <span>Quantity:</span> 
                    </div>
                    <div className="col-6 quantity">
                        {data.qty}
                    </div>
                    <div className="col-6 order-no">
                        <span>Order No:</span> 
                    </div>
                    <div className="col-6 order-no">
                    {data?.order_id}
                    </div>
                    <div className="col-6 order-date">
                        <span>Order Date:</span>
                    </div>
                    <div className="col-6 order-date">
                    {formatDate(data.created_at)}
                    </div>
                    <div style={{width: '100%'}}className="col-6 delivery-details">
                        <span>Delivery Details:</span>
                    </div>
                    <div className="col-6 delivery-details">
                        {thankOrderDetails?.Order?.estimate_day}
                    </div>
                    <div className="col-6 payment-type">
                        <span>Payment Type:</span>
                    </div>
                    <div className="col-6 payment-type">
                    Square
                    </div>
                    <div className="col-6 sub-total">
                        <span>Sub Total:</span>
                    </div>
                    <div className="col-6 sub-total">
                        ${data.price}
                    </div>
                </div>
      </div>
    </div>
  ))}
        </div>
            </>
          ) : (
            <>
             <table className="thank-you-table">
      <thead>
        <tr>
          <th className="product-name-thanks">
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
        {thankOrderItems?.map((data, index) => (
          <tr key={index}>
            <td>
              <div style={{ display: "flex" }}>
                {data?.product?.image[0] && (
                  <div className="product-thumbnail">
                    <img src={data?.product?.image[0] ? data?.product?.image[0] : 'https://m.media-amazon.com/images/I/81zf6aaAK1L.jpg'} alt="Product" />
                    {data && data?.product_name.length > 20 ? data?.product_name.slice(0, 20) + '...' : data?.product_name }
                    
                  </div>
                )}
              </div>
            </td>
            <td>{data.qty}</td>
            <td>{data?.order_id}</td>
            <td>{formatDate(data.created_at)}</td>
            <td>{thankOrderDetails?.Order?.estimate_day }</td>
            <td>{"Square"}</td>
            <td>${data.price}</td>
          </tr>
        ))}
      </tbody>
        </table>
            </>
          )}
       
       

      <div className="row total-tax-row mx-0">
        <div className="col-12 d-flex justify-content-end">
          {/* <p >Tax ${120.6}</p> */}
        </div>
        <div className="col-12 d-flex justify-content-end">
        <p style={{marginRight: '1%', marginTop: '2%'}}>Tax ${'N/A'}</p>
        </div>
        <div className="col-6 d-flex justify-content-start">
        <p className="bold-total">Total</p>
        </div>
        <div className="col-6 d-flex justify-content-end">
        <p className="bold-total">${thankOrderDetails?.Order?.total_amount ? thankOrderDetails?.Order?.total_amount :  'N/A'}</p>
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


