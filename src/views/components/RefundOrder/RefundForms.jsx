import { useState, useEffect, useRef } from 'react';
import { FormControl, TextField, Select, MenuItem } from '@mui/material';
import {
  submitRefundRequestAPiSJ,
  submitRefundRequestAPiOTO,
} from '@api/refund-order';
import { formatDate, prettifyError } from '@utils/helpers';
import {
  USER_TYPE_ENUM,
  REFUND_TYPES,
  ORDER_DETAILS_KEYS_ENUMS,
} from '@pages/RefundOrder/constants';
import { toast } from 'react-toastify';

import Loader from '@common/Spinner/Spinner';

export default function RefundForms({
  selectedUserType,
  list,
  resetLists,
  userData,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [submitRequestOrderList, setSubmitRequestOrderList] = useState([]);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  let listItemsKey = useRef('');

  useEffect(() => {
    setSubmitRequestOrderList(
      list?.map(item => {
        let orderItem = {
          order_id: item?.id,
          invoice_id: item?.id,
          refund_type: 'partial',
          amount: 0,
          reasons: '',
          totalAmount: item?.total || item?.total_amount,
        };
        return orderItem;
      }),
    );
    setIsSubmitDisabled(isAnyPropertyInvalid(list));
  }, [list]);

  useEffect(() => {
    switch (selectedUserType) {
      case USER_TYPE_ENUM.CUSTOMER:
        listItemsKey.current = ORDER_DETAILS_KEYS_ENUMS.WEBSITE.items;
        break;

      case USER_TYPE_ENUM.SALE_PERSON:
        listItemsKey.current = ORDER_DETAILS_KEYS_ENUMS.SALE_PERSON.items;
        break;

      default:
        break;
    }
  }, [selectedUserType]);

  const resetStates = () => {
    setSubmitRequestOrderList([]);
    resetLists();
  };

  const getModuleText = () => {
    if (selectedUserType === USER_TYPE_ENUM.CUSTOMER) return 'Order';
    return 'Invoice';
  };

  const isAnyPropertyInvalid = arrayOfObjects =>
    arrayOfObjects.some(obj => {
      if (obj.refund_type === 'partial') {
        return (
          !obj.reasons || !obj.refund_type || !obj.amount || obj.amount <= 0
        );
      } else {
        return !obj.reasons || !obj.refund_type;
      }
    });

  const handleRequestOrderListChange = (index, key, value) => {
    const updatedList = [...submitRequestOrderList];
    updatedList[index] = { ...updatedList[index], [key]: value };
    if (key === 'refund_type' && value === 'full') {
      updatedList[index].amount = updatedList[index]?.totalAmount;
      delete updatedList[index].totalAmount;
    }

    setIsSubmitDisabled(isAnyPropertyInvalid(updatedList));
    setSubmitRequestOrderList(updatedList);
  };

  const handleFormSubmit = async e => {
    e.preventDefault();
    switch (selectedUserType) {
      case USER_TYPE_ENUM.CUSTOMER:
        try {
          setIsLoading(true);
          await submitRefundRequestAPiSJ({
            user_id: userData?.id,
            orders: submitRequestOrderList,
          });
          toast.success('Refund Request Submitted Successfully');
          resetStates();
        } catch (error) {
          toast.error(
            <div
              dangerouslySetInnerHTML={{
                __html: prettifyError(
                  error?.data?.errors?.error || error?.data?.errors,
                ),
              }}
            />,
          );
        }
        break;
      case USER_TYPE_ENUM.SALE_PERSON:
        try {
          setIsLoading(true);
          await submitRefundRequestAPiOTO({
            customer_id: userData?.id,
            invoices: submitRequestOrderList,
          });
          toast.success('Refund Request Submitted Successfully');
          resetStates();
        } catch (error) {
          toast.error(
            <div
              dangerouslySetInnerHTML={{
                __html: prettifyError(
                  error?.data?.message?.error || error?.data?.message,
                ),
              }}
            />,
          );
        }
        break;

      default:
        break;
    }
    setIsLoading(false);
  };

  return (
    <div>
      {list?.map((order, index) => (
        <div key={index}>
          <div className='order-details-container'>
            <h3 className='my-3 px-3 fw-bold'>
              {getModuleText()} # {order?.id}
            </h3>
            <table className='order-details-table round-2'>
              <thead>
                <tr>
                  <th>
                    <div>Order Placed</div>
                    <div>
                      {formatDate(order?.created_at) || order?.invoice_date}
                    </div>
                  </th>
                  <th>
                    <div>Total</div>
                    <div>${order?.total_amount || order?.total}</div>
                  </th>
                  {/* <th>
                                                        <div>Ship To</div>
                                                        <div>
                                                            <span className="text-success">
                                                                {order?.ship_to}
                                                            </span>
                                                        </div>
                                                    </th> */}
                  <th>
                    <div>Order #</div>
                    <div>
                      {selectedUserType === USER_TYPE_ENUM.CUSTOMER
                        ? order?.id
                        : order?.order_number}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='order-item px-3' colSpan={4}>
                    <table className='w-100'>
                      <tbody>
                        <tr>
                          <td>
                            <p className='fw-medium my-3'>
                              {getModuleText()}
                              {' Items'}
                            </p>
                            {order[listItemsKey.current]?.map(item => {
                              return (
                                <div className='d-flex' key={item?.id}>
                                  <div className='img-wrapper'>
                                    <img
                                      src={
                                        item?.product?.image?.length > 0
                                          ? item?.product?.image[0]
                                          : 'https://dummyimage.com/150'
                                      }
                                    />
                                  </div>
                                  <div className='item-description'>
                                    <p className='py-0'>
                                      {item?.product?.name || item?.item_name}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </td>
                        </tr>
                        <hr className='horizontal-line'></hr>
                      </tbody>
                    </table>
                  </td>
                  {/* <td className="order-summary d-sm-table-cell d-none px-1">
                                                        <p className="my-3 fw-bold">
                                                            {getModuleText()}{" "}
                                                            Summary
                                                        </p>
                                                        <table className="w-100">
                                                            <tbody>
                                                                <tr>
                                                                    <td className="key">
                                                                        Items
                                                                        Subtotal:
                                                                    </td>
                                                                    <td className="value">
                                                                        $
                                                                        {
                                                                            order?.sub_total
                                                                        }
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="key">
                                                                        Shipping
                                                                        &
                                                                        Handling:
                                                                    </td>
                                                                    <td className="value">
                                                                        $
                                                                        {
                                                                            order?.shipment_price
                                                                        }
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="key">
                                                                        Total
                                                                        before
                                                                        tax:
                                                                    </td>
                                                                    <td className="value">
                                                                        $
                                                                        {
                                                                            order?.total_amount
                                                                        }
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className=" key">
                                                                        Estimated
                                                                        tax to
                                                                        be
                                                                        collected:
                                                                    </td>
                                                                    <td className="value">
                                                                        $0
                                                                    </td>
                                                                </tr>
                                                                <hr className="horizontal-line"></hr>
                                                                <tr className="grand-total-row">
                                                                    <td className="key">
                                                                        Grand
                                                                        Total:
                                                                    </td>
                                                                    <td className="value">
                                                                        $
                                                                        {
                                                                            order?.total_amount
                                                                        }
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td> */}
                </tr>
                {/* <tr className="d-sm-none">
                                                    <td
                                                        className="order-summary w-100 px-2"
                                                        colSpan={4}
                                                    >
                                                        <p className="my-3 fw-bold">
                                                            {getModuleText()}{" "}
                                                            Summary
                                                        </p>
                                                        <table className="w-100">
                                                            <tbody>
                                                                <tr>
                                                                    <td className="key">
                                                                        Items
                                                                        Subtotal:
                                                                    </td>
                                                                    <td className="value">
                                                                        $150
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="key">
                                                                        Shipping
                                                                        &
                                                                        Handling:
                                                                    </td>
                                                                    <td className="value">
                                                                        --
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="key">
                                                                        Total
                                                                        before
                                                                        tax:
                                                                    </td>
                                                                    <td className="value">
                                                                        $150
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className=" key">
                                                                        Estimated
                                                                        tax to
                                                                        be
                                                                        collected:
                                                                    </td>
                                                                    <td className="value">
                                                                        $7
                                                                    </td>
                                                                </tr>
                                                                <hr className="horizontal-line"></hr>{" "}
                                                                <tr className="grand-total-row">
                                                                    <td className="key">
                                                                        Grand
                                                                        Total:
                                                                    </td>
                                                                    <td className="value">
                                                                        $150
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr> */}
              </tbody>
            </table>
          </div>
          <div>
            <p className='my-3 fw-medium'>
              Note About Refund / Return{' '}
              <span className='text-danger'>(Required)</span>
            </p>
            <div className='d-flex'>
              <FormControl fullWidth>
                <textarea
                  id='note'
                  rows={4}
                  placeholder='Type note here...'
                  variant='outlined'
                  color='success'
                  value={submitRequestOrderList[index]?.reasons}
                  onChange={e =>
                    handleRequestOrderListChange(
                      index,
                      'reasons',
                      e.target.value,
                    )
                  }
                  className='form-control'
                />
              </FormControl>
            </div>
          </div>
          <div>
            <p className='my-3 fw-medium'>
              Select an option to refund your ammount{' '}
              <span className='text-danger'>(Required)</span>
            </p>
            <div className='d-flex'>
              <Select
                className='mb-3'
                labelId='select-refund-type-label'
                id='list-refund-type-select'
                value={submitRequestOrderList[index]?.refund_type || 'partial'}
                label='Select Refund Option'
                onChange={e =>
                  handleRequestOrderListChange(
                    index,
                    'refund_type',
                    e.target.value,
                  )
                }
                color='success'>
                {REFUND_TYPES?.map((type, index) => (
                  <MenuItem key={index} value={type?.key}>
                    {type?.label}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
          {submitRequestOrderList[index]?.refund_type === 'partial' && (
            <form onSubmit={handleFormSubmit}>
              <p className='my-3 fw-medium'>
                Please Enter Your Refund Amount{' '}
                <span className='text-danger'>(Required)</span>
              </p>
              <FormControl>
                <TextField
                  className='mb-3'
                  id='refundAmount'
                  label='Refund Amount'
                  variant='outlined'
                  color='success'
                  type='number'
                  value={submitRequestOrderList[index]?.amount}
                  onChange={e => {
                    handleRequestOrderListChange(
                      index,
                      'amount',
                      e.target.value > 0
                        ? e.target.value <= parseFloat(list[index].total) ||
                          parseFloat(list[index].total_amount)
                          ? e.target.value
                          : list[index].total || list[index].total_amount
                        : '',
                    );
                  }}
                />
              </FormControl>
            </form>
          )}
        </div>
      ))}
      <button
        className='refund-btn btn btn-success'
        onClick={handleFormSubmit}
        disabled={isLoading || isSubmitDisabled}>
        {isLoading ? <Loader /> : 'Submit'}
      </button>
      {isSubmitDisabled && (
        <p className='fs-6 text-danger mt-2'>
          *Please fill all the required fields to submit refund request.
        </p>
      )}
    </div>
  );
}
