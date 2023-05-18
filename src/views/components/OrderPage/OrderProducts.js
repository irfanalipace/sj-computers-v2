import { Card, Select, Text, useMantineTheme } from "@mantine/core";
import './OrderProducts.css'

function OrderTable({ deliveryDate , orderDetails }) {
    function formatDate(dateString) {
        const options = { year: "numeric", month: "long", day: "numeric" };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
      }


    return (
      <table className="order-table">
        <thead>
          <tr>
          <th>Image</th>
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
            <tr key={order.order_id}>
                 <td>
                {order?.product?.image.length > 0 && (
                  <img
                    src={order?.product?.image[0]}
                    alt={order.product_name}
                    className="product-image"
                  />
                )}
              </td>
              <td>{order?.order_id}</td>

              <td>{formatDate(order?.created_at)}</td>
              <td>{deliveryDate}</td>
              <td>{order?.qty}</td>
              <td>${order?.price}</td>
              <td>
                <button className="view-button">View</button>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

function OrderProducts({ data }) {
    // const ;
    console.log(data, "order items");
    const orderDetails = [
        {
          order_id: 1,
          price: 10.99,
          product_name: "Product 1",
          quantity: 2,
          order_items: [
            {
              images: [
                "https://m.media-amazon.com/images/I/51c4fed1l1L.jpg",
                "image2.jpg",
                "image3.jpg"
              ],
              // Other order item details...
            }
          ]
        },
        {
          order_id: 2,
          price: 19.99,
          product_name: "Product 2",
          quantity: 1,
          order_items: [
            {
              images: [
                "https://m.media-amazon.com/images/I/41Ig9Ema+RL.jpg",
                "image5.jpg",
                "image6.jpg"
              ],
              // Other order item details...
            }
          ]
        },
        // Add more order details here...
      ];
    // return;

    
    // return;
  const theme = useMantineTheme();
  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  }


  

  return (
    <>
      {data.map((product, index) => (
        <Card style={{margin: '15px 0px'}} shadow="sm" radius="md" withBorder className="p-0" key={index}>
            <div className="order-header">
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
                {/* <Select
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
                /> */}
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
            </div>

            <div className="order-details">
            <div className="order-status">
                <Text className="order-status-label" fw={700} fz="lg">
                {product?.status} {product?.shipment_days
}
                {product?.lateDeliveryDate}
                </Text>
                <button className="track-package-button">
                Track Package
                </button>
            </div>
            {/* {product?.order_item.map( (orderItem, index) => {
                return ( */}
                    <div className="product-info">
                    {product?.order_item && (
              <OrderTable deliveryDate={product?.shipment_days} orderDetails={product?.order_item} />
            )}   
                        {/* <div style={{display: 'flex', displayDirection: 'row', width: '100%'}}>
                            <div style={{display: 'inherit'}}>
                            <img
                            src={orderItem?.product?.image[0]}
                            className="product-image"
                            style={{
                                width: '15%',
                                height: 'auto',
                                marginLeft: '5%',
                            }}
                        />
                             <Text className="product-description">{orderItem?.product?.name}</Text>
                        
                            </div>
                            <div style={{}}>
                            <Text className="product-description">{product?.productDescription}</Text>
        
                            </div>
                        </div> */}
    
                
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
))}
      
    </>
  );
}

export default OrderProducts;