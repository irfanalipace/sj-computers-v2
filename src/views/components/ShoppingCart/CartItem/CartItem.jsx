import { useState, useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '@common/Spinner/Spinner';
import {
  deleteItem,
  deleteLocalItem,
  updateQuantity,
  removeProtectionPlan,
  removePlan,
  updateLocalQuantity,
} from '@store/cart/cartThunks';

import { removeProtectionApi } from '../../../../core/api/cart';

import { QuantityInput } from '@common/QuantityInput/QuantityInput';
import WarrantyBadge from '@components/ShoppingCart/CartItem/WarrantyBadge';
import { generatePath } from '../../../../core/utils/helpers';
import './CartItem.css';
import { Link } from 'react-router-dom';
import ShareLinkModal from './ShareLinkModal';

export const CartItem = memo(({ cartData }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const details = useSelector(state => state.cart.details);
  const cart_id = cartData?.id;
  const [updatingItem, setUpdatingItem] = useState(false);
  const [localCartData, setLocalCartData] = useState(cartData);
  const [shareModal, setShareModal] = useState(false);
  const dispatch = useDispatch();
  const [loadingWarranty, setLoadingWarranty] = useState(false);

  const deleteItemFunction = () => {
    let cartQuantity = details?.total_items - 1;
    let cartTotal =
      parseFloat(details?.total) -
      cartData?.price -
      parseFloat(cartData?.plan_price || 0);
    let cartSubTotal =
      parseFloat(details?.sub_total) -
      cartData?.price -
      parseFloat(cartData?.plan_price || 0);

    const cartDetails = {
      total_items: cartQuantity,
      sub_total: cartSubTotal.toFixed(2),
      total: cartTotal.toFixed(2),
    };

    isAuthenticated
      ? dispatch(deleteItem({ cartItem: cartData }))
      : dispatch(deleteLocalItem({ cartItem: cartData, cartDetails }));
  };

  const handleQuantity = quantity => {
    quantity = parseInt(quantity);
    let subTotal = 0.0;
    let difference = quantity - cartData?.quantity;
    const productPriceDifference =
      parseFloat(cartData?.product?.price) * difference;
    let productPriceWithQuantity =
      productPriceDifference + parseFloat(cartData?.price);
    const warrantyPriceDifference =
      parseFloat(cartData?.plan?.price || 0) * difference;
    let warrantyPriceWithQuantity =
      warrantyPriceDifference + parseFloat(cartData?.plan_price || 0);
    subTotal =
      parseFloat(details?.sub_total) +
      parseFloat(productPriceDifference) +
      parseFloat(warrantyPriceDifference);
    const cartTotal =
      parseFloat(details?.total) +
      parseFloat(productPriceDifference) +
      parseFloat(warrantyPriceDifference);
    const cartDetails = {
      total_items: details?.total_items,
      total: cartTotal.toFixed(2),
      sub_total: subTotal.toFixed(2),
    };
    const cartItem = {
      id: cartData.id,
      quantity,
      difference,
      price: parseFloat(productPriceWithQuantity).toFixed(2),
    };

    if (cartData?.plan?.value) {
      cartItem.plan_price = parseFloat(warrantyPriceWithQuantity).toFixed(2);
    }

    if (!isAuthenticated) {
      let productQuantity = cartData?.product?.quantity + difference;
      let in_stock = productQuantity < 1 ? false : true;
      cartItem.in_stock = in_stock;
    }
    isAuthenticated
      ? dispatch(updateQuantity({ cartItem }))
      : dispatch(updateLocalQuantity({ cartItem, cartDetails }));
  };
  const searchParams = {
    redirectedFrom: 'Shopping Cart',
    redirectedFromPath: `/cart`,
  };

  const removeWarranty = async () => {
    try {
      setLoadingWarranty(true);
      if (isAuthenticated) {
        await dispatch(removeProtectionPlan({ cart_id: cartData.id }));
      } else {
        await dispatch(removePlan({ cart_id }));
      }
    } catch (error) {
      console.error('Error removing warranty:', error);
    } finally {
      setLoadingWarranty(false);
    }
  };

  return (
    <div className='container-for-cart-item'>
      <div className='row'>
        <div className='col-4 col-md-2'>
          <div className='cart-image-mobile-size'>
            <img
              src={cartData?.product?.image}
              alt=''
              className='cartItem-image'
            />
          </div>
        </div>
        <div className='col-8 col-md-10'>
          <div className='d-flex flex-column h-100 justify-content-between mx-0'>
            <div className='items-card-data'>
              <div className='col-md-10'>
                <Link
                  className='items-card-name'
                  to={generatePath(cartData?.product?.url, searchParams)}>
                  <strong className='item-details'>
                    {cartData?.product?.name}
                  </strong>
                </Link>
              </div>
              <div className='col-md-2 price-item'>
                <p className='my-sm-0 pragrapgraph-data'>
                  <strong className='price-data-item-list-cost'>
                    ${parseFloat(cartData?.price).toFixed(2)}
                  </strong>
                </p>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  paddingLeft: '12px',
                }}>
                <div>
                  <div className='row list-item-dev-ui-item'>
                    <ul className='item-list'>
                      <li className='hide-on-mobile'>
                        <span
                          className='item-stock'
                          style={{ fontWeight: 500 }}>
                          {cartData?.product?.quantity == cartData?.quantity
                            ? 'Out of Stock'
                            : 'In Stock'}
                        </span>
                      </li>
                      <li>
                        <span
                          className='item-stock'
                          style={{
                            color: '#000',
                            fontWeight: 600,
                          }}>
                          Discount Available
                        </span>
                      </li>
                      <li>
                        <span className='item-stock' style={{ color: '#000' }}>
                          <strong
                            style={{
                              fontWeight: 600,
                            }}>
                            Capacity:
                          </strong>{' '}
                          2TB
                        </span>
                      </li>
                      <li>
                        <span className='item-stock' style={{ color: '#000' }}>
                          <strong
                            style={{
                              fontWeight: 600,
                            }}>
                            Style:
                          </strong>{' '}
                          980 PRO
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                {cartData?.plan?.value && (
                  <div
                    className='row hidden-on-mobile'
                    style={{
                      width: '350px',
                      // border: "1px solid #000",
                      marginLeft: '140px',
                    }}>
                    <div className='col-md-9 mt-2'>
                      {cartData?.plan?.value && (
                        <>
                          <div className=''>
                            <div className='dev-data-page-wantity'>
                              <div className='protection-button-remove-data-remove add-text-remive-item'>
                                <button
                                  onClick={removeWarranty}
                                  disabled={loadingWarranty}>
                                  {loadingWarranty ? (
                                    <Loader />
                                  ) : (
                                    'Remove Warranty'
                                  )}
                                </button>
                              </div>
                              <div>
                                <WarrantyBadge
                                  durationInYears={
                                    cartData?.plan?.durationInYears
                                      ? cartData?.plan?.durationInYears +
                                        ' years'
                                      : 'Tech Unlimited'
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    <div
                      className='col-md-3 mt-4'
                      // style={{ marginRight: "130px" }}
                    >
                      <p>
                        <strong
                          style={{
                            fontWeight: 800,
                          }}>
                          ${parseFloat(cartData?.plan_price).toFixed(2)}
                        </strong>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className='row'>
              <div>
                <div>
                  {cartData.loading ? (
                    <Loader />
                  ) : (
                    <>
                      <div className='buttons-on-cartitem'>
                        <QuantityInput
                          onChange={handleQuantity}
                          minQuantity={1}
                          value={cartData?.quantity}
                          maxQuantity={cartData?.product?.quantity}
                        />
                        &emsp;
                        <button
                          onClick={deleteItemFunction}
                          className='cart-bttn'
                          disabled={updatingItem}>
                          {updatingItem ? <Loader /> : 'Delete'}
                        </button>
                        <button className='cart-bttn' disabled={updatingItem}>
                          {updatingItem ? <Loader /> : `Save for later`}
                        </button>
                        <button className='cart-bttn' disabled={updatingItem}>
                          {updatingItem ? (
                            <Loader />
                          ) : (
                            'Compare with similar items'
                          )}
                        </button>
                        <button
                          className='cart-bttn hide-on-mobile'
                          disabled={updatingItem}
                          onClick={() => setShareModal(true)}>
                          {updatingItem ? <Loader /> : 'Share'}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <>
        <ShareLinkModal
          open={shareModal}
          onClose={() => setShareModal(false)}
          itemLink={cartData}
        />
      </>
      {cartData?.error && (
        <p className='fs-6 mt-3 text-danger'>{cartData?.error}</p>
      )}
    </div>
  );
});
