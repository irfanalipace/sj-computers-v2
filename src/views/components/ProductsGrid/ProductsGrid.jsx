import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import LoadMore from '@common/Button/LoadMore';
import ProductCard from '@components/ProductCard/ProductCard';
import ProductCardLayout2 from '../ProductCard/ProductCardLayout2/ProductCardLayout2';
import ProductCardLayout3 from '../ProductCard/ProductCardLayout3/ProductCardLayout3';
import OverlayLoader from '@common/LoaderComponent/OverlayLoader';
import './ProductsGrid.css';

import Button from '@common/Button/Button';
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

export default function ProductsGrid({
  products,
  handleClick,
  isLoading,
  apiError,
  smallBtn = false,
  searchParams,
  productView,
  inFilterProducts,
  maximum,
}) {
  const isShowMore = useSelector(state => state.products.isShowMore);

  return (
    <div className='products-grid-wrapper'>
      <div className='products-grid product-gride-card-componets-mobile-screen mb-3 '>
        <Row
          className='justify-content-left'
          // style={{height: "137vh", overflowX: "auto"}}
        >
          {products?.map((product, index) => (
            <Col
              xs={productView == 'list' ? 12 : 6}
              md={inFilterProducts ? (productView == 'list' ? 12 : 4) : 3}
              lg={inFilterProducts ? (productView == 'list' ? 12 : 3) : 2}
              key={'pi-' + index}>
              {/* <Link to={`${new URL(product?.url || location.href).pathname}`}> */}
              {/* <ProductCard
                                product={product}
                                inGrid={true}
                                searchParams={searchParams}
                                productView={productView}
                            /> */}
              <ProductCardLayout2
                product={product}
                inGrid={true}
                searchParams={searchParams}
                productView={productView}
              />
              {/* <ProductCardLayout3
                                product={product}
                                inGrid={true}
                                searchParams={searchParams}
                                productView={productView}
                            /> */}

              {/* </Link> */}
            </Col>
          ))}
          {products.length === 0 && !isLoading && (
            <Typography sx={{ textAlign: 'center' }}>No Product</Typography>
          )}
        </Row>

        {products.length > 11 && (
          <div className='d-flex justify-content-center'>
            {products.length === maximum ? (
              <></>
            ) : (
              <>
                <LoadMore
                  handleClick={handleClick}
                  loading={isShowMore}
                  error={apiError}
                  small={smallBtn}
                />
              </>
            )}
          </div>
        )}
        <div className='loader-functions-screen'>
          <OverlayLoader
            isLoading={isLoading}
           
          />
        </div>
      </div>
    </div>
  );
}
