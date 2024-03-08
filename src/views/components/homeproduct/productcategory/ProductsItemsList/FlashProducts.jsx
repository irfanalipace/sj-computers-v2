import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SellingProducts from '../../../MobileCategory/SellingProducts/SellingProducts';
import { getProductsCategory } from '../../../../../core/api/products';
import { useLocation } from 'react-router-dom';
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

  return (
    <div>
      {bestSeller?.length ? (
        <div className='row mx-0'>
          <div className='col-12 col-sm-12 col-lg-12'>
            <Link
              to={'/category/best-sellers'}
              className='text-decoration-none'>
              <div className='product-type-section-selleing-products'>
                <div className='d-flex'>
                  <h4>Best Selling Laptops</h4>
                  <p
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
                </div>
                <SellingProducts topRatedProduct={bestSeller} />
              </div>
            </Link>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default FlashProducts;
