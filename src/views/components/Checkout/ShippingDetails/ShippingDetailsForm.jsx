import { useEffect, useState, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Autocomplete from '../../common/GooglePlaces/AutoComplete';
import { setShippingDetails } from '@store/orders/ordersThunk';
import { SET_SHIPPING_DETAILS } from '@store/orders/ordersSlice';
import Loader from '@common/LoaderComponent/LoaderComponent';
import ShippingButton from './ShippingButton';
import { useFormik } from 'formik';
import {
  getCartDetails,
  getCartItems,
} from '../../../../core/utils/cartHelpers';

import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  address: Yup.string().required('Address is required'),
  city: Yup.string().required('city is required'),
  state: Yup.string().required('State is required'),
  zip_code: Yup.string()
    // .matches(/^\d{5}$/, 'Zip code must be 5 digits')
    .required('Zip Code is required'),
  email: Yup.string()
    .email('Invalid email address')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Invalid email',
    )
    .required('Email is required'),
  full_name: Yup.string()
    .min(3, 'Name must be at least 3 characters')
    .matches(/^[A-Za-z ]+$/, 'Invalid name')
    .required('Name is required'),
  phone_number: Yup.string()
    .matches(
      // /^\+?1?\s?\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/,
      /^\+?(\d{1,3})?[- ]?\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/,
      'Invalid phone number',
    )
    .required('Phone number is required'),
});
function ShippingDetailsForm({
  address,
  handleHeight,
  hideForm,
  toggleAccordion,
}) {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const userDetails = useSelector(state => state.auth.user);
  const states = useSelector(state => state.states.states);
  const apiError = useSelector(state => state.orders.apiError);
  const loading = useSelector(state => state.orders.isLoading);
  const settingAdress = useSelector(state => state.orders.settingAdress);
  const cartItems = getCartItems();
  const cartDetails = getCartDetails();

  // const [fieldErrors, setFieldErrors] = useState({});
  const [permanentAddress, setPermanentAddress] = useState(false);
  const dispatch = useDispatch();

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    touched,
    handleBlur,
    setErrors,
    isValid,
    isSubmitting,
    setFieldValue,
  } = useFormik({
    initialValues: {
      country: address?.country || 'US',
      full_name: address?.full_name || userDetails?.name || '',
      phone_number: address?.phone_number || '',
      email: address?.email || userDetails?.email || '',
      address: address?.address || '',
      // floorAddress: address?.floorAddress || "",
      // suite: address?.suite || "",
      apartment: address?.apartment || '',
      city: address?.city || '',
      state: address?.state || 'Alabama',
      zip_code: address?.zip_code || '',
    },
    validationSchema: validationSchema,

    onSubmit: values => {
      submitShippingDetails({
        ...values,
        full_name: values.full_name.trim(),
      });
    },
  });

  const formatPhoneNumber = value => {
    const phoneNumber = value.replace(/[^\d]/g, '');
    if (phoneNumber.length <= 3) return phoneNumber;
    if (phoneNumber.length <= 6)
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const handlePermanentAddresses = e => {
    setPermanentAddress(e.target.checked);
  };

  const handlePlaceChange = place => {
    setFieldValue('address', place.formatted_address);
    const stateData = place?.address_components.find(item =>
      item.types.includes('administrative_area_level_1'),
    );

    const matchedState = states.find(
      item => item.name.toLowerCase() === stateData.long_name.toLowerCase(),
    );

    let city = place?.address_components.find(item =>
      item.types.includes('administrative_area_level_2'),
    );
    if (!city)
      city = place?.address_components.find(item =>
        item.types.includes('administrative_area_level_1'),
      );

    if (matchedState) {
      setFieldValue('state', matchedState.name);
    }

    if (city) setFieldValue('city', city.long_name);
  };

  useEffect(() => {
    if (values.state) {
      const matchedState = states.find(
        item => item.name.toLowerCase() === values.state.toLowerCase(),
      );
      if (matchedState?.zip_code_start) {
        setFieldValue('zip_code', matchedState?.zip_code_start.toString());
      }
    }
  }, [values.state]);

  useEffect(() => {
    setErrors({ ...apiError });
  }, [apiError]);

  const submitShippingDetails = values => {
    let params = {
      ...values,
      permanent_address: permanentAddress,
      isValid,
    };

    if (permanentAddress) dispatch(setShippingDetails(params, hideForm));
    else {
      dispatch(SET_SHIPPING_DETAILS(params));
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'add_shipping_info',
        currency: 'USD',
        value: cartDetails?.sub_total,
        items: makeDataLayerItemObject(cartItems),
      });
      hideForm();
    }
  };

  // useEffect(() => {
  //     if (typeof cb === "function") handleHeight();
  // }, [errors]);

  function isAnyValueEmptyExceptEmail(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key) && key !== 'apartment' && obj[key] === '') {
        return true;
      }
    }
    return false;
  }

  useEffect(() => {
    handleHeight(); // adjust height of accordion dynamically according to shipping address form
  }, []);

  const buttonClickHandler = e => toggleAccordion(e, true);

  const handleSubmitClick = () => {
    handleSubmit();
  };
  return (
    <div>
      {settingAdress ? (
        <Loader />
      ) : (
        <>
          <h3 className='accordion-content-heading'>Add New Address</h3>
          {/* <div className="autofill-container">
                <div className="d-flex justify-content-between align-items-center">
                    <p>Save time. Autofill your current location.</p>
                    <button className="autofill-btn">Autofill</button>
                </div>
            </div> */}
          <form className='shipping-form' onSubmit={handleSubmit}>
            <div className='field-section'>
              {/* <label htmlFor={"state"}>
                                Country/State{" "}
                                <span className="text-danger">*</span>
                            </label>
                            <input
                                id="country"
                                name="country"
                                className="input-field"
                                type="text"
                                placeholder="Country/State"
                                value={values?.country}
                                onChange={handleChange}
                            ></input>

                            {fieldErrors.country && (
                                <p className="fs-6 mt-1 text-danger">
                                    {fieldErrors.country}
                                </p>
                            )} */}
            </div>
            <div className='field-section'>
              <label htmlFor={'name'}>
                Full Name (First & Last Name)
                <span className='text-danger'>*</span>
                {errors.full_name && touched.full_name && (
                  <span className='fs-6 mt-1 text-danger'>
                    {errors?.full_name}
                  </span>
                )}
              </label>
              <input
                id='full_name'
                name='full_name'
                className={
                  errors.full_name && touched.full_name
                    ? 'input-field border-danger'
                    : 'input-field'
                }
                type='text'
                placeholder='Full Name'
                value={values?.full_name}
                onChange={handleChange}
                onBlur={handleBlur}></input>
              {/* {errors.full_name && (
                                <p className="fs-6 mt-1 text-danger">
                                    {errors.full_name}
                                </p>
                            )} */}
            </div>

            <div className='field-section'>
              <label htmlFor={'phoneNumber'}>
                Phone Number
                <span className='text-danger'>*</span>
                {errors.phone_number && touched.phone_number && (
                  <span className='fs-6 mt-1 text-danger'>
                    {errors?.phone_number}
                  </span>
                )}
              </label>
              <input
                id='phone_number'
                name='phone_number'
                maxLength='14'
                className={
                  errors.email && touched.email
                    ? 'input-field border-danger'
                    : 'input-field'
                }
                type='text'
                placeholder='(987) 654-3210'
                value={`${formatPhoneNumber(values?.phone_number)}`}
                onChange={handleChange}
                onBlur={handleBlur}></input>
              {/* {errors.phone_number && (
                                <p className="fs-6 mt-1 text-danger">
                                    {errors.phone_number}
                                </p>
                            )} */}
            </div>
            <div className='field-section'>
              <label htmlFor={'email'}>
                Email
                <span className='text-danger'>*</span>
                {errors.email && touched.email && (
                  <span className='fs-6 mt-1 text-danger'>{errors.email}</span>
                )}
              </label>
              <input
                id='email'
                name='email'
                className={
                  errors.email && touched.email
                    ? 'input-field border-danger'
                    : 'input-field'
                }
                type='text'
                placeholder='Enter Your Email Address'
                value={values?.email}
                onChange={handleChange}
                onBlur={handleBlur}></input>
              {/* {errors.email && touched.email && (
                                    <p className="fs-6 mt-1 text-danger">
                                        {errors.email}
                                    </p>
                                )} */}
            </div>

            <div className=''>
              <label htmlFor={'streetAddress'}>
                Address
                <span className='text-danger'>*</span>
                {errors.address && touched.address && (
                  <span className='fs-6 mt-1 text-danger'>
                    {errors?.address}
                  </span>
                )}
              </label>

              <Autocomplete
                onChange={handleChange}
                placeholder='Street address ( P.O Box), Unit, building, floor etc.'
                defaultValue={values.address}
                className={
                  errors.address && touched.address
                    ? 'input-field border-danger'
                    : 'input-field'
                }
                onPlaceSelected={handlePlaceChange}
              />
              <div
                style={{ marginTop: '12px' }}
                className='input-lable-address'>
                <Autocomplete
                  placeholder='Unit, Building, floor etc.'
                  defaultValue={values.address}
                  className={
                    errors.address && touched.address
                      ? 'input-field border-danger'
                      : 'input-field'
                  }
                  onPlaceSelected={handlePlaceChange}
                />
              </div>

              <br></br>
              {/* <input
                                id="floorAddress"
                                name="floorAddress"
                                className="input-field mt-1"
                                type="text"
                                placeholder="Unit, building, floor etc."
                                value={values?.floorAddress}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            ></input>
                            {errors.floorAddress && (
                                <p className="fs-6 mt-1 text-danger">
                                    {errors.floorAddress}
                                </p>
                            )} */}
            </div>
            <div className='row'>
              <div className='col-6 col-sm-4'>
                <div className='field-section'>
                  <label htmlFor={'city'}>
                    City
                    <span className='text-danger'>*</span>
                    {errors.city && touched.city && (
                      <span className='fs-6 mt-1 text-danger'>
                        {errors?.city}
                      </span>
                    )}
                  </label>
                  <input
                    id='city'
                    name='city'
                    className={
                      errors.city && touched.city
                        ? 'input-field border-danger'
                        : 'input-field'
                    }
                    type='text'
                    placeholder='City'
                    value={values?.city}
                    onChange={handleChange}
                    onBlur={handleBlur}></input>
                  {/* {errors.city && (
                                        <p className="fs-6 mt-1 text-danger">
                                            {errors.city}
                                        </p>
                                    )} */}
                </div>
              </div>
              <div className='col-6 col-sm-4'>
                <div className='field-section'>
                  <label htmlFor={'state'}>
                    State
                    <span className='text-danger'>*</span>
                    {errors.state && touched.state && (
                      <span className='fs-6 mt-1 text-danger'>
                        {errors?.state}
                      </span>
                    )}
                  </label>
                  <select
                    id='state'
                    name='state'
                    className={
                      errors.state && touched.estatemail
                        ? 'input-field border-danger text-capitalize'
                        : 'input-field text-capitalize'
                    }
                    placeholder='Select Stte'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values?.state}>
                    {states.map(state => (
                      <option
                        value={state.name}
                        key={state?.id}
                        className='text-capitalize'>
                        {state?.name}
                      </option>
                    ))}
                  </select>
                  {errors.state && (
                    <p className='fs-6 mt-1 text-danger'>{errors.state}</p>
                  )}
                </div>
              </div>
              <div className='col-12 col-sm-4'>
                <div className='field-section'>
                  <label htmlFor={'zip_code'}>
                    Zip Code
                    <span className='text-danger'>*</span>
                    {errors.zip_code && touched.zip_code && (
                      <span className='fs-6 mt-1 text-danger'>
                        {errors?.zip_code}
                      </span>
                    )}
                  </label>
                  <input
                    id='zip_code'
                    name='zip_code'
                    maxLength='5'
                    className={
                      errors.zip_code && touched.zip_code
                        ? 'input-field border-danger'
                        : 'input-field'
                    }
                    type='text'
                    placeholder=' ZipCode'
                    value={values?.zip_code}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {/* {errors.zip_code && (
                                        <p className="fs-6 mt-1 text-danger">
                                            {errors.zip_code}
                                        </p>
                                    )} */}
                </div>
              </div>
            </div>
            <div className='field-section'>
              {/* <div className="col-6">
                                <label htmlFor={"suite"}>
                                    Suite
                                    <span className="text-danger">*</span>
                                    {errors.suite && touched.suite && (
                                        <span className="fs-6 mt-1 text-danger">
                                            {errors?.suite}
                                        </span>
                                    )}
                                </label>
                                <input
                                    id="suite"
                                    name="suite"
                                    className={
                                        errors.suite && touched.suite
                                            ? "input-field border-danger"
                                            : "input-field"
                                    }
                                    type="text"
                                    placeholder="Suite"
                                    value={values?.suite}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                ></input>
                            </div> */}
              {/* <div className="col-12"> */}
              <label htmlFor={'apartment'}>
                Suite/Apartment
                <span className='text-danger'>*</span>
                {/* {errors.apartment && touched.apartment && (
                  <span className='fs-6 mt-1 text-danger'>
                    {errors?.apartment}
                  </span>
                )} */}
              </label>
              <input
                id='apartment'
                name='apartment'
                className={
                  errors.apartment && touched.apartment
                    ? 'input-field border-danger'
                    : 'input-field'
                }
                type='text'
                placeholder='Apartment, Unit, Suite, Floor etc...'
                value={values?.apartment}
                onChange={handleChange}
                onBlur={handleBlur}></input>
              {/* </div> */}
            </div>
            {isAuthenticated && (
              <div className='field-section checkbox-wrapper'>
                <input
                  id='permanent_address'
                  name='permanent_address'
                  className='input-field'
                  type='checkbox'
                  checked={permanentAddress}
                  onChange={handlePermanentAddresses}
                />
                <label htmlFor={'permanent_address'} className='pb-0'>
                  Use as my default address.
                </label>
              </div>
            )}

            <ShippingButton
              handleClick={() => {
                handleSubmitClick();
                console.log({ values }, { errors });

                if (
                  Object.keys(errors).length === 0 &&
                  !isAnyValueEmptyExceptEmail(values)
                ) {
                  buttonClickHandler(null);
                }
                return;
              }}
              isLoading={loading}
              disabled={isSubmitting}>
              Use this address
            </ShippingButton>
          </form>
        </>
      )}
    </div>
  );
}

export default memo(ShippingDetailsForm);
