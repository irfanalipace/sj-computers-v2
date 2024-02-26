import React from 'react';

import './ProductThreeItem.css';
import ProductItem1 from '@components/homeproduct/productcategory/ProductItem1';
import ProductItem3 from '@components/homeproduct/productcategory/ProductItem3';

const ProductThreeItem = () => {
  return (
    <div>
      <div className='row first-section'>
        <div className='col-md-3'>
          <div className='product-type-section'>
            <ProductItem3 />
          </div>
        </div>
        <div className='col-md-3'>
          <div className='product-type-section'>
            <ProductItem1 />
          </div>
        </div>
        <div className='col-md-3'>
          <div className='product-type-section'>
            <ProductItem1 />
          </div>
        </div>
        <div className='col-md-3'>
          <div className='product-type-section'>
            <ProductItem1 />
          </div>
        </div>
      </div>
    </div>

    // Rows 2 items code here
  );
};
export default ProductThreeItem;
