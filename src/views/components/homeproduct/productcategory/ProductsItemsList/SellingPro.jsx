import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SellingProducts from '../../../MobileCategory/SellingProducts/SellingProducts';
import { getProductsCategory } from '../../../../../core/api/products';
import { useNavigate } from 'react-router-dom';
const SellingPro = ({ images }) => {
  const navigate = useNavigate();
  const [topRatedProduct, setTopRatedProduct] = useState([]);
  const getTopRated = async () => {
    const filterObject = {
      page: 1,
      category: 'top-rated-product',
      per_page: 10,
    };
    const res = await getProductsCategory(filterObject);
    setTopRatedProduct(res?.data?.data);
  };
  useEffect(() => {
    getTopRated();
  }, []);
  return (
    <div>
      {!!topRatedProduct?.length && (
        <div className='row mx-0'>
          <div className='col-12 col-sm-12 col-lg-12'>
            <div className='product-type-section-selleing-products'>
              <div className='d-flex'>
                <h4>Top Rating Products</h4>
                <Link
                  className='mt-1 text-decoration-none'
                  to='top-rated-products'
                  style={{
                    marginLeft: '20px',
                    fontSize: '12px',
                    color: '#007185',
                  }}>
                  {' '}
                  See all
                </Link>
              </div>
              <SellingProducts
                topRatedProduct={topRatedProduct}
                inTopRated={true}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellingPro;
