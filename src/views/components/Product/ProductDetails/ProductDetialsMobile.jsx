import { useState, useEffect } from 'react';

import { snakeCaseToPrettyText } from '@utils/helpers';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ProductImage } from '@components/Product/ProductImage/ProductImage';
import './ProductDetail.css';
import { CheckOutCard } from '@components/Product/CheckOutCard/CheckOutCard';
import Tooltip from '../../Tooltip';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { Tab, Tabs } from 'react-bootstrap';
import CustomTab from './CustomTab';
import TabContent from './TabContnet';
import ReturnPolicy from './ReturnPolicy';
import ProductRating from './ProductRating';
import PriceWithLabel from '../../common/PriceWithLabel';
import { Link } from 'react-router-dom';

let acceptedKeys = [
  'brand',
  'cpu_model',
  'hard_disk',
  'operating_system',
  'ram_memory',
];

const ProductDetailsMobile = ({ product, isUpSmall }) => {
  const [description, setDescription] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [key, setKey] = useState('home');

  useEffect(() => {
    const parseProductDetailsArray = () => {
      if (!product?.description) return;

      const productDescriptionArray = Object.entries(product.description)
        .map(([key, value]) => {
          if (key === 'bullet_point') {
            setDescription(value);
            return null;
          }

          let _value = '';
          if (Array.isArray(value)) {
            const firstValue = value[0];
            if (firstValue?.value) {
              let unit = firstValue.unit || '';
              _value = `${firstValue.value} ${unit}`;
            } else if (
              firstValue?.installed_size &&
              Array.isArray(firstValue.installed_size)
            ) {
              let unit = firstValue.installed_size[0]?.unit || '';
              _value = `${firstValue.installed_size[0]?.value} ${unit}`;
            } else if (firstValue?.family && Array.isArray(firstValue.family)) {
              _value = firstValue.family[0]?.value || '';
            } else if (firstValue?.size && Array.isArray(firstValue.size)) {
              let unit = firstValue.size[0]?.unit || '';
              _value = `${firstValue.size[0]?.value} ${unit}`;
            }
          }

          if (acceptedKeys.includes(key)) {
            return {
              key: snakeCaseToPrettyText(key),
              value: _value,
            };
          }

          return null;
        })
        .filter(Boolean);

      setProductDetails(productDescriptionArray);
    };
    parseProductDetailsArray();
  }, [product?.description]);

  return (
    <div className='container'>
      <div>
        <p className='item-title m-0'>{product?.name}</p>
      </div>
      <div className='col-12  justify-content-end d-flex align-items-end'>
        <ProductRating
          isUpSmall={isUpSmall}
          rating={product.rating}
          totalReview={product.total_review}
          productID={product.id}
        />
      </div>
      <Box mb={2.5}>
        <ProductImage ProductImages={product.image} isMobile={true} />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          margin: 0,
          padding: 0,
          border: 'none',
          left: 0,
          borderTop: '2px solid #CDCDCD',
          width: '100vw',
        }}></Box>
      <Box>
        <div className='mt-5 col-md-12 items-details-description'>
          <h3 className='items-text-style'>Description </h3>

          <ul className='ps-0' type='1'>
            {description?.map((item, index) => (
              <li style={{ listStyle: 'none' }} key={index}>
                {item.value}
              </li>
            ))}
          </ul>
        </div>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          margin: 0,
          padding: 0,
          border: 'none',
          left: 0,
          borderTop: '2px solid #CDCDCD',
          width: '100vw',
        }}></Box>

      <Stack
        alignItems={'center'}
        direction={'row'}
        spacing={2}
        my={2}
        mt={3}
        sx={{ marginBottom: '0px' }}>
        <Typography
          color={'#333333'}
          fontWeight={500}
          fontSize={'12px'}
          lineHeight={'14px'}
          fontFamily={'Inter'}>
          Price:
        </Typography>
        <PriceWithLabel sx={{ mb: 0.8 }} price={product?.price} />
      </Stack>
      <div style={{ fontSize: '12px', lineHeight: '13px' }} className=' mb-2'>
        $20 shipping & import fees deposit to Pakistan. <Link>Details</Link>
      </div>
      <CheckOutCard isMobile={true} product={{ ...product }} />

      <Box
        sx={{
          mt: 4,
          border: 'none',
          borderTop: '2px solid #CDCDCD',
        }}></Box>

      {/* <Typography
                color={"#007185"}
                fontWeight={400}
                fontSize={"14px"}
                lineHeight={"16px"}
            >
                Most demanding
            </Typography> */}
      {/* <div className="row px-0 res deatisl-data-set-image-view-data-details"> */}
      {/* <div className="col-12 justify-content-center justify-content-md-start d-flex"> */}
      {/* <button className="selling-button">
                        Top <span className="selling-color">Selling</span>
                    </button> */}
      {/* <Stack className="ms-4">
                        <div className="details-dev ">
                            <span className="size-text-details">
                                Items Available
                            </span>
                        </div>

                        <div className="items-list-data-mobile-stayle">
                            <button
                                className="product-info border-0"
                                style={{ backgroundColor: "white" }}
                            >
                                {product?.quantity > 0
                                    ? product?.quantity + " items"
                                    : "Out of stock"}
                            </button>
                        </div>
                    </Stack> */}
      {/* </div> */}
      {/* </div> */}

      {/* <div className="divsection s-sm-block d-none">
                <hr className="hr-card-details"></hr>
                <div className="cart-details-text">
                    <div className="row">
                        <div className="col-md-12 color-text">
                            <span className="$-color">$</span>
                            {product?.price?.toString().split(".")[0]}
                            <sup>
                                {product?.price?.toString().split(".")[1]}
                            </sup>
                        </div>
                    </div>
                </div>
            </div> */}

      {/* 
            <hr className="hr-card-details"></hr>

            <p className="more-styles">More Styles:</p>

            <div className="text-box-details">
                <div className="row">
                    <div className="button-detail-item">
                        <Link
                            to="#"
                            className="text-decoration-none"
                            style={{ color: "#333333" }}
                        >
                            <h6 className="card-title1">24” Full HD IPS</h6>
                            <p className="card-text1">US$ 159.97</p>
                        </Link>
                    </div>
                    <div className="button-detail-item">
                        <Link
                            to="#"
                            className="text-decoration-none"
                            style={{ color: "#333333" }}
                        >
                            <h6 className="card-title1">27” Full HD IPS</h6>
                            <p className="card-text1">US$ 149.97</p>
                        </Link>
                    </div>
                </div>
            </div> */}

      {/* <hr className="hr-card-details"></hr> */}
      {/* <Tooltip
                sx={{ left: { xs: "100%", md: "50%" } }}
                content={<ReturnPolicy />}
            >
                <Typography
                    fontWeight={400}
                    color={"#007185"}
                    fontSize={"14px"}
                    lineHeight={"14px"}
                >
                    Free Return
                    <ExpandMoreIcon
                        sx={{
                            width: "15px",
                            height: "15px",
                            color: "#B12704",
                            mb: 0.5,
                        }}
                    />
                </Typography>
            </Tooltip> */}
      {/* <Typography
                sx={{ mt: 1.8 }}
                fontWeight={400}
                fontSize={"13px"}
                lineHeight={"15px"}
            >
                Variations:
            </Typography> */}
      {/* <Tabs
                style={{ border: "none" }}
                id="controlled-tab"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3 "
            >
                <Tab
                    eventKey="home"
                    title={<CustomTab currentTab={key} eventKey="home" />}
                >
                    <TabContent
                        productDetails={productDetails}
                        product={product}
                    />
                </Tab>
                <Tab
                    eventKey="profile"
                    title={<CustomTab currentTab={key} eventKey="profile" />}
                >
                    <TabContent
                        productDetails={productDetails}
                        product={product}
                    />
                </Tab>
            </Tabs> */}
      {/* <Box mt={1}>
                <TabContent productDetails={productDetails} product={product} />
            </Box> */}

      {/* <hr className="hr-card-details"></hr> */}
    </div>
  );
};

export default ProductDetailsMobile;
