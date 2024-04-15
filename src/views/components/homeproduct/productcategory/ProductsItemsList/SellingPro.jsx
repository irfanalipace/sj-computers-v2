import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SellingProducts from '../../../MobileCategory/SellingProducts/SellingProducts';
import { getProductsCategory } from '../../../../../core/api/products';
import { useNavigate } from 'react-router-dom';
import { makeDataLayerItemObject } from '../../../../../core/utils/helpers';
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
    viewItemDataLayer(res?.data?.data);
    setTopRatedProduct(res?.data?.data);
  };
  const viewItemDataLayer = (products, categorySlug) => {
    console.log(
      'view_item_list data layer top rated',
      makeDataLayerItemObject(products),
    );
    window.dataLayer.push(function () {
      this.reset();
    });
    window.dataLayer.push({
      event: 'view_item_list',
      item_list_name: 'top-rated',
      items: makeDataLayerItemObject(products),
    });
  };
  useEffect(() => {
    setTimeout(() => {
      getTopRated();
    }, 100);
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
                  className='mt-1 text-decoration-none see-more'
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
