import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchStates } from '@store/states/statesThunks';
import Loader from '@common/LoaderComponent/LoaderComponent';
import ShippingDetailsForm from './ShippingDetailsForm';
import ShippingButton from './ShippingButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import './ShippingDetails.css';

export default function ShippingDetails({
  toggleAccordion,
  handleHeight,
  shippingAddress,
}) {
  const [newAddress, setNewAddress] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const loading = useSelector(state => state.orders.isLoading);

  const buttonClickHandler = e => toggleAccordion(e, true);
  const dispatch = useDispatch();

  const hideForm = () => {
    setNewAddress(false);
    setEditAddress(false);
  };

  useEffect(() => {
    dispatch(fetchStates());
    handleHeight(); // sets height of accordion dynamically
    return () => {
      hideForm();
    };
  }, []);

  useEffect(() => {
    handleHeight(); // adjust height of accordion dynamically according to shippingAddress
  }, [shippingAddress]);

  const ShippingFormWrapper = () => {
    if (newAddress)
      return (
        <ShippingDetailsForm handleHeight={handleHeight} hideForm={hideForm} />
      );
    else
      return (
        <ShippingDetailsForm
          address={shippingAddress}
          handleHeight={handleHeight}
          hideForm={hideForm}
        />
      );
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          {newAddress || editAddress || !shippingAddress.address ? (
            <ShippingFormWrapper />
          ) : (
            <div>
              <h3 className='accordion-content-heading'>Your Address</h3>
              <div className='address-list'>
                <div className='address'>
                  <input
                    type='radio'
                    className='input-radio-button-mobile-buttob'
                    id='address_id'
                    name='selectedAddress'
                    value='address_id'
                    // style={{color:" #318243"}}
                    style={{ accentColor: '#318243' }}

                    // onChange={handleChange}
                    // defaultChecked={true}
                  />
                  <div>
                    <label htmlFor='address_id'>
                      <strong style={{ fontWeight: '600' }}>
                        {shippingAddress?.full_name}
                      </strong>{' '}
                      {shippingAddress?.address} {shippingAddress?.city}{' '}
                      {shippingAddress?.zip_code}{' '}
                    </label>
                    <div className='address-container'>
                      <button
                        type='button'
                        onClick={() => setEditAddress(true)}
                      >
                        Edit Address
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <button
                  className='new-address'
                  onClick={() => setNewAddress(true)}
                >
                  <FontAwesomeIcon icon={faAdd} /> Add a new address
                </button>
              </div>
              <div>
                <ShippingButton handleClick={buttonClickHandler}>
                  Use this Address
                </ShippingButton>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
