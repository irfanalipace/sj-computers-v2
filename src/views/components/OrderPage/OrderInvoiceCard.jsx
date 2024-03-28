import { Card, Text } from '@mantine/core';
import Button from '@common/Button/Button';
import { Link } from 'react-router-dom';

import './OrderInvoiceCard.css';
const buttonStyles = {
  fontWeight: 600,
  fontSize: 12,
  height: 36,
  maxWidth: '95%',
  background: '#38c056',
  color: 'white',
  border: 'none',
  borderRadius: 8,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const OrderInvoiceCard = ({ data, activeTab }) => {
  const { success_orders } = data;
  console.print(data, 'invoic data');
  console.print(success_orders, 'so for invoice');
  console.print(activeTab, 'avtive tab');

  // return;
  return (
    <div className='summary-card'>
      <div className='summary-wrapper'>
        <div className='summary-btn'>
          <Button
            style={buttonStyles}
            disabled={activeTab === 2 ? true : false}
            // clickHandler={(e) => handleClick(e, true, id)}
            className={'form-button'}
            // isLoading={isLoading}
          >
            {activeTab === 0
              ? 'Order Invoice'
              : activeTab === 1
                ? 'Cancelled Order Invoice'
                : null}
          </Button>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s,
          </p>
        </div>
        <div className='summary-details'>
          <ul>
            <li>
              <span>Items:</span>
              <span>
                {activeTab === 0 ? success_orders?.data[0]?.item_qty : 0}
              </span>
            </li>
            <li>
              <span>Price:</span>
              <span>
                <strong>
                  {activeTab === 0
                    ? '$' + success_orders?.data[0]?.sub_total
                    : '$0'}
                  {/* {shippingDetails?.sub_total
                                ? "$" + shippingDetails.sub_total
                                : "$0"} */}
                </strong>
              </span>
            </li>
            <li>
              <span>Shipping & handling:</span>
              <span>
                {activeTab === 0
                  ? '$' + success_orders?.data[0]?.shipment_price
                  : '$0'}
                {/* {shippingDetails?.shipment_info?.amount
                            ? "$" +
                              shippingDetails?.shipment_info?.amount
                            : "$0"} */}
              </span>
            </li>
            {/* <li>
              <span>Total before tax:</span>
              <span>--</span>
            </li> */}
            {/* <li>
              <span>Estimated tax to be calculated:</span>
              <span>--</span>
            </li> */}
          </ul>
        </div>
        <div className='order-total'>
          <ul>
            <li>
              <span>
                <strong>Order Total</strong>
              </span>
              <span>
                <strong>
                  {activeTab === 0
                    ? success_orders?.data[0]?.total_amount
                    : '$0'}
                </strong>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className='summary-footer'>
        <p>
          You can track your shipment and view any applicable import fees
          deposit before placing your order.
        </p>
        {/* <Link to={'#'}>How shipping costs calculates?</Link> */}
      </div>
    </div>
  );
};

export default OrderInvoiceCard;
