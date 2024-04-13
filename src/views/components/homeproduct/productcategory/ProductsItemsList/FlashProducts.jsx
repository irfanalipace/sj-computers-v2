import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SellingProducts from '../../../MobileCategory/SellingProducts/SellingProducts';
import { getProductsCategory } from '../../../../../core/api/products';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { makeDataLayerItemObject } from '../../../../../core/utils/helpers';
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
      viewItemDataLayer(response?.data?.data);
      setBestSeller(response?.data?.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const viewItemDataLayer = (products, categorySlug) => {
    console.log(
      'view_item_list data layer best sellers category',
      makeDataLayerItemObject(products),
    );
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'view_item_list',
      item_list_name: 'best-sellers',
      items: makeDataLayerItemObject(products),
    });
  };

  useEffect(() => {
    setTimeout(() => {
      getProducts();
    }, 300);
  }, []);
  // const products = useSelector(state => state?.products?.products);
  return (
    <div>
      {bestSeller?.length ? (
        <div className='row mx-0'>
          <div className='col-12 col-sm-12 col-lg-12'>
            <div className='product-type-section-selleing-products'>
              <div className='d-flex align-items-center'>
                <h4>Best Selling Products </h4>
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
                    See all
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
