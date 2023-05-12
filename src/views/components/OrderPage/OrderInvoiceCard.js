import { Card, Text } from "@mantine/core";
import './OrderInvoiceCard.css'

const OrderInvoiceCard = ({ data }) => {
  return (
    <div className="order-invoice-card">
      <Card className="order-invoice-card__card">
        <div className="order-invoice-card__header">
          <button className="order-invoice-card__button">Order Invoice</button>
        </div>

        <Text className="order-invoice-card__description">
          {data?.description}
        </Text>
        <hr />
        <div className="order-invoice-card__details">
          <div className="order-invoice-card__detail-row">
            <Text>Item:</Text>
            <Text>{data?.productName}</Text>
          </div>
          <div className="order-invoice-card__detail-row">
            <Text>Price</Text>
            <Text>{data?.price}</Text>
          </div>
          <div className="order-invoice-card__detail-row">
            <Text>Shipping & handling</Text>
            <Text>{data?.shipping}</Text>
          </div>
          <div className="order-invoice-card__detail-row">
            <Text>Total Before Tax</Text>
            <Text>{data?.beforeTax}</Text>
          </div>
          <div className="order-invoice-card__detail-row">
            <Text>Estimated tax to be calculated</Text>
            <Text>{data?.estTax}</Text>
          </div>
        </div>
        <hr />
        <div className="order-invoice-card__total-row">
          <Text className="order-invoice-card__total-label" c="orange" fw={700} fz="lg">
            Order Total
          </Text>
          <Text className="order-invoice-card__total-amount" c="orange" fw={700} fz="lg">
            {data?.orderTotal}
          </Text>
        </div>
        <hr className="order-invoice-card__divider" />
        <div className="order-invoice-card__footer">
          <Text
            fz="md"
            className="order-invoice-card__footer-link"
            onClick={() => {
              console.log("I am clickable");
            }}
          >
            How shipping cost calculates?
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default OrderInvoiceCard;