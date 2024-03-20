import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SellingProducts from '../../../MobileCategory/SellingProducts/SellingProducts';
import { getProductsCategory } from '../../../../../core/api/products';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
const FlashProducts = ({ images }) => {
  const [bestSeller, setBestSeller] = useState([]);
  const [loading, setLoading] = useState(false);
  const getProducts = async total => {
    try {
      setLoading(true);
      const filterObject = {
        page: 1,
        category: 'best-sellers',
        per_page: 10,
      };

      const response = await getProductsCategory(filterObject);
      setBestSeller(response?.data?.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  // const products = useSelector(state => state?.products?.products);
  return (
    <div>
      {bestSeller?.length ? (
        <div className='row mx-0'>
          <div className='col-12 col-sm-12 col-lg-12'>
            <div className='product-type-section-selleing-products'>
              <div className='d-flex align-items-center'>
                <h4>Best Selling Products</h4>
                <Link
                  to={'/category/best-sellers'}
                  className='text-decoration-none'>
                  <p
                    className='see-more'
                    style={{
                      marginLeft: '20px',
                      fontSize: '12px',
                      color: '#007185',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    See all offer
                  </p>
                </Link>
              </div>
              <SellingProducts topRatedProduct={bestSeller} bestSeller={true} />
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default FlashProducts;
