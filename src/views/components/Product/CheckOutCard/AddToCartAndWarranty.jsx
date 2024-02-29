import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProtectionPopup from '../ProtectionPlan/ProtectionPopup';
import { useNavigate } from 'react-router-dom';
import { QuantityInput } from '@common/QuantityInput/QuantityInput';
import { useDispatch, useSelector } from 'react-redux';
import { PLAN_ENUM } from '@utils/constants';
import { CircularProgress, Drawer, Stack } from '@mui/material';
import ProtectionPlanDrawer from '../ProtectionPlan/ProtectionPlanDrawer';
import useAddToCart from './useAddToCart';
import { useParams } from 'react-router-dom';

function AddToCartAndWarranty({ product, isMobile }) {
  const navigate = useNavigate();
  const [protPlan, setProtPlan] = useState({});
  const [plan, setOpenPlan] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [drawerProps, setDrawerProps] = useState({});
  let screenSize = window.innerWidth;
  function updateScreenSize() {
    screenSize = window.innerWidth;
  }
  window.addEventListener('resize', updateScreenSize);

  const [loading, setLoading] = useState(false);
  const productAddingToCard = useSelector(state => state.products.isLoading);
  const [type, setType] = useState('');
  const cartClickHandler = useAddToCart(product, quantity);
  const params = useParams();

  useEffect(() => {
    if (type === 'buynow') {
      cartClickHandler(protPlan, `/checkout?id=${product.id}`);
    }
  }, [type]);

  function handleCheckboxClick(_plan) {
    setProtPlan(prev => {
      if (prev?.value === _plan.value) return null;
      else return _plan;
    });
  }

  return (
    <div>
      <div className='text-stock py-2'>
        <div className='instock-dev-card-product-section-with-color-card'>
          <div className='in-stock-area-lable'>
            {product?.quantity > 0 ? (
              <small className='in-stock'>{product?.quantity} In Stock</small>
            ) : (
              <small className='not-in-stock '>Out of Stock</small>
            )}
          </div>
          <div>
            <span className='color-text-cart-with-inStock'>
              {product?.quantity < 11 && product?.quantity > 0 && (
                <span>Only {product?.quantity} pieces left</span>
              )}
            </span>
          </div>
        </div>
        <div className='mt-3'>
          <QuantityInput
            onChange={setQuantity}
            maxQuantity={product?.quantity}
          />
        </div>
      </div>
      <div className='button-cart-sell'>
        <button
          // onClick={cartClickHandler}
          onClick={() => {
            protPlan?.value
              ? cartClickHandler(protPlan)
              : setDrawerProps({
                  open: true,
                  plan: plan,
                  redirectOnClose: true,
                });
          }}
          disabled={productAddingToCard}
          className={'button1 button-text-button'}
          // style={{ marginBottom: "10px" }}
        >
          Add to Cart
        </button>
      </div>
      <div className='button-cart-sell'>
        <button
          type='button'
          onClick={() => {
            setType('buynow');
          }}
          // disabled={productAddingToCard}
          className={'button1 button-text-button'}
          style={{ background: '#00305E' }}>
          {loading ? <CircularProgress /> : 'Buy Now'}
        </button>
      </div>
      <Stack spacing={[1.5, 1.2]}>
        <div
          className='details-container'
          style={{ marginLeft: isMobile ? '' : '10px' }}>
          <div className='col-xl-7 col-5 col-md-5'>
            <span
              className='color-card-text-paragrap-payment'
              style={{ color: '#5F5E5E' }}>
              Payment
            </span>
          </div>
          <div className='col-xl-5 col-auto col-md-6'>
            <div className='hover-box secure-transection-display'>
              <Link
                href=''
                className='text-decoration-none secure-payment-method'
                style={{ color: '#2c8a9a' }}>
                Secure transaction
              </Link>
              <div className='hidden-box'>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 'bold',
                    marginBottom: '12px',
                  }}>
                  Your transaction is Secure
                </span>
                <div style={{ marginTop: '12px' }}>
                  <p style={{ fontSize: '11px' }}>
                    We work hard to protect your security and privacy. Our
                    payment security system encrypts your information during
                    transmission. We don’t share your credit card details with
                    third-party sellers, and we don’t sell your information to
                    others
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className='details-container'
          style={{ marginLeft: isMobile ? '' : '10px' }}>
          <div className='col-xl-7 col-5'>
            <span
              className='color-card-text-paragrap-payment ships-form-span-tag'
              style={{ color: '#5F5E5E' }}>
              Ships Form
            </span>
          </div>
          <div className='col-xl-5 col-auto col-md-6'>
            <span className='color-card-text-paragrap-payment sjcomputer-tag-checkout-card'>
              Sj Computers
            </span>
          </div>
        </div>
        <div
          className='details-container'
          style={{ marginLeft: isMobile ? '' : '10px' }}>
          <div className='col-xl-7 col-5'>
            <span
              className='color-card-text-paragrap-payment return-from-span-tag-checkout'
              style={{ color: '#5F5E5E' }}>
              Return
            </span>
          </div>

          <div className='col-xl-5 col-auto col-md-6'>
            <div className='hover-box'>
              <Link
                className='text-decoration-none secure-payment-method '
                style={{ color: '#2c8a9a' }}>
                {isMobile ? (
                  <div
                    style={{
                      fontSize: '12px',
                      lineHeight: '14px',
                    }}>
                    <p className='mb-2'>Eligible for returns,</p>
                    refund or replacement wi...
                  </div>
                ) : (
                  <div
                    style={{
                      fontSize: '12px',
                      lineHeight: '14px',
                    }}>
                    <p className='mb-2'>Eligible for returns,</p>
                    <p className='mb-2'>refund or</p>
                    replacement wi...
                  </div>
                )}
              </Link>
              <div className='hidden-box'>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 'bold',
                    marginBottom: '12px',
                  }}>
                  Eligible for Return, Refund or Replacement within 30 days of
                  receipt
                </span>
                <div style={{ marginTop: '12px' }}>
                  <p style={{ fontSize: '11px' }}>
                    This item can be returned in its original condition for a
                    full refund or replacement within 30 days of receipt. Read
                    full return policy
                  </p>
                </div>
                <Link
                  to={'/return_refund_policy'}
                  style={{
                    marginTop: '12px',
                    fontSize: '11px',
                    color: '#2c8a9a',
                  }}>
                  Read full return policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Stack>
      {/* <Link
                        to={"/term_services"}
                        style={{
                            color: "#2c8a9a",
                            fontSize: "14px",
                            fontWeight: "400",
                            textDecoration: "none",
                        }}
                    >
                        Details
                    </Link> */}
      {!isMobile && <hr></hr>}
      <div className='protection-plan hidden-on-mobile'>
        Add a Warranty Plan :
        <>
          {Object.values(PLAN_ENUM).map(_plan => (
            <div key={_plan.value} className='check-box-container'>
              <input
                type='checkbox'
                className='protectionPlanCheckbox'
                id={'warranty-' + _plan.value}
                name={'warranty-' + _plan.value}
                checked={protPlan?.value === _plan.value}
                onChange={e => {
                  handleCheckboxClick(_plan);
                  // setProtPlan(_plan.value);
                }}
              />
              <label
                // htmlFor="protectionPlanCheckbox"
                onClick={() => {
                  setOpenPlan(_plan);
                }}>
                {_plan.label} for
                <span style={{ color: 'red' }}> ${_plan.price}/Month</span>
              </label>
            </div>
          ))}
        </>
      </div>
      <ProtectionPopup
        open={Boolean(plan?.value)}
        handleClose={() => setOpenPlan({})}
        plan={plan}
        handleAddProtection={e => {
          setDrawerProps({
            open: true,
            plan: plan,
            redirectOnClose: false,
          });
          setOpenPlan({});
        }}
      />

      <Drawer
        anchor='right'
        open={drawerProps.open}
        onClose={() =>
          setDrawerProps({
            open: false,
          })
        }>
        <ProtectionPlanDrawer
          {...drawerProps}
          closeDrawer={() => {
            drawerProps.redirectOnClose &&
              cartClickHandler(
                null,
                `/cart/${params?.title}/dp/${params?.productId}`,
              );
            setDrawerProps({
              open: false,
            });
          }}
          handleAddingProtec={_plan => {
            console.log('2222  clicked:', _plan);
            if (_plan.value) {
              cartClickHandler(
                _plan,
                screenSize > 780
                  ? `/cart/${params?.title}/dp/${params?.productId}`
                  : '/cart',
              );
            }
          }}
        />
      </Drawer>
    </div>
  );
}

export default AddToCartAndWarranty;
