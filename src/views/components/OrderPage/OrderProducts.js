import { Card, Select, Text, useMantineTheme } from "@mantine/core";
import './OrderProducts.css'

function OrderProducts({ data }) {
    // const ;
    console.log(data, "order items");

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

            <div className="product-info">
                <div style={{display: 'flex', displayDirection: 'row', width: '100%'}}>
                    <div style={{display: 'inherit'}}>
                    <img
                        src={product?.order_item[0]?.product?.image[0]}
                        className="product-image"
                        style={{
                            width: '15%',
                            height: 'auto',
                            marginLeft: '5%',
                        }}
                    />
        <Text className="product-description">{product?.order_item[0]?.product?.name}</Text>
                    </div>
                    <div style={{}}>
                    {/* <Text className="product-description">{product?.productDescription}</Text> */}

                    </div>
                </div>

            
            </div>
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