import { useState } from "react";
import { Card,
    Select,
    Text,
    useMantineTheme,
    Image,
    Button } from "@mantine/core";
import './OrderProducts.css'

function OrderTable({ deliveryDate , orderDetails, onToggleExpanded }) {
    console.log(orderDetails, 'order details 222');
    function formatDate(dateString) {
        const options = { year: "numeric", month: "long", day: "numeric" };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
      }


    return (
      <table className="order-table">
        <thead>
          <tr>
          {/* <th>Image</th> */}
            <th>Order ID</th>
            <th>Order Date</th>
            <th>Order Delivery Date</th>
            <th>Total Items</th>
            <th>Total Price</th>
            <th>Action</th>
           
          </tr>
        </thead>
        <tbody>
          {orderDetails?.map((order, index) => (
            <tr key={order?.id}>
                 {/* <td>
                {order?.product?.image.length > 0 && (
                  <img
                    src={order?.product?.image[0]}
                    alt={order.product_name}
                    className="product-image"
                  />
                )}
              </td> */}
              <td>{order?.id}</td>

              <td>{formatDate(order?.created_at)}</td>
              <td>{order?.shipment_days}</td>
              <td>{order?.item_qty}</td>
              <td>${order?.total_amount}</td>
              <td>
                <button className="view-button" onClick={() => onToggleExpanded(order?.order_item)}>View</button>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

function OrderProducts({ data }) {
    const [expandedOrders, setExpandedOrders] = useState([]);
    const [view, setView] = useState(false);

  const theme = useMantineTheme();
  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  }


  const toggleExpanded = (orderitems) => {
    setView(!view);
      console.log(orderitems, 'dd')
      setExpandedOrders(orderitems);
    //   return;
   
  };
  

  return (
    <>
      {/* {data.map((product, index) => ( */}
        <Card style={{margin: '15px 0px'}} shadow="sm" radius="md" withBorder className="p-0" key={1}>
            {/* <div className="order-header">
                <div className="order-info">
                    <Text className="order-label">Order Placed</Text>
                    <Text>{
                    formatDate(product?.created_at) 
                    }</Text>
                </div>

                <div className="order-info">
                    <Text>Total</Text>
                    <Text>{`$${product?.total_amount}`}</Text>
                </div>

                <div className="order-info">
                    <Text>Ship To</Text>
                    <Select
                    styles={{
                        wrapper: {
                        border: "None",
                        borderWidth: "0px",
                        },
                        input: {
                        color: theme.colors.greenPrimary,
                        backgroundColor: "rgb(229 231 235)",
                        border: "none",
                        },
                    }}
                    variant="default"
                    value="John Nick"
                    onChange={(e) => {}}
                    data={["John Nick", "Wick John"]}
                    />
                    <Text
                    className="order-details-view text-green-500 cursor-pointer"
                    onClick={() => {
                        console.log("I am clickable");
                    }}
                    >
                John Nick
                    </Text>
                </div>

                    <div className="order-info">
                        <Text>Order # {product?.id}</Text>
                        <Text
                        className="order-details-view text-green-500 cursor-pointer"
                        onClick={() => {
                            console.log("I am clickable");
                        }}
                        >
                        View Order Details
                        </Text>
                    </div>
            </div> */}

            <div className="order-details">
            <div className="order-status">
                <Text className="order-status-label" fw={700} fz="lg">
                   {data[0]?.status} ORDERS
                {/* {product?.status} ORDERS {product?.shipment_days111
}
                {product?.lateDeliveryDate} */}
                </Text>
                {/* <button className="track-package-button">
                Track Package
                </button> */}
            </div>
            {/* {product?.order_item.map( (orderItem, index) => {
                return ( */}
                    <div className="product-info">
                                {data && (
                        <OrderTable  orderDetails={data} onToggleExpanded={toggleExpanded} />
                        )} 

                        {
                            view && expandedOrders.length >  0 &&  (
                                <>
                                {expandedOrders.map((product, index)=> {
                                    return (
                                        <div key={product?.product_id}style={{display: 'flex', displayDirection: 'row', width: '100%'}}>
                                                <div style={{display: 'inherit',flexGrow: 1}}>
                                                <img
                                                // src={'https://m.media-amazon.com/images/I/51c4fed1l1L.jpg'}
                                                src={product?.product?.image[0]}
                                                className="product-image"
                                                style={{
                                                    // width: '%',
                                                    height: 'auto',
                                                    marginLeft: '5%',
                                                }}
                                            />
                                                <Text className="product-description">{product?.product_name}</Text>
                                                <Text   style={{
                                                    width: '20%',
                                                   
                                                    margin: '4%',
                                                }} className=""><span><b style={{
                                                   
                                                    fontWeight: 900,
                                                     
                                                 }}>Product ID</b></span><br/>{product?.product_id}</Text>
                                                <Text  style={{
                                                    width: '20%',
                                                   fontWeight: 900,
                                                    margin: '4%',
                                                }} className=""><span><b style={{
                                                   
                                                   fontWeight: 900,
                                                    
                                                }}>Product Price</b></span><br/>${product?.price}</Text>
                                            
                                                </div>
                                     
                                           </div>
                                    )
                                     

                                })}
                                
                                </>
                            )
                        }


                       
                </div>
                {/* )


})} */}
 

           
            {/* <div style={{border: '1px solid #DDDDDD', width: '100%'}}>

            </div> */}
            <hr />
            <Text
                className="cancel-order text-blue-400 cursor-pointer"
                onClick={() => {
                console.log("I am clickable");
                }}
            >
                Cancel my order
            </Text>
            </div>
        </Card>

      
    </>
  );
}

export default OrderProducts;