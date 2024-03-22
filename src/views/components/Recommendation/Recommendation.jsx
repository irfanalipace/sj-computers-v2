import ProductSlider from '@components/Sliders/ProductSlider';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '@store/products/productsThunks';
import LoaderComponent from '@common/LoaderComponent/LoaderComponent';
import { useEffect } from 'react';
import './Recommdation.css';
import { makeDataLayerItemObject } from '../../../core/utils/helpers';

export default function Recommendation({ prod, dataLayer }) {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state?.products?.isLoading);
  const products = useSelector(state => state?.products?.products);
  useEffect(() => {
    getProduct();
    if (dataLayer && products.length) {
      viewItemDataLayer(products, 'Recommended_Product');
    }
  }, []);

  const viewItemDataLayer = (products, categorySlug) => {
    console.print(
      'view_item_list data layer',
      dataLayer,
      categorySlug,
      makeDataLayerItemObject(products),
    );
    if (!window.dataLayer) {
      window.dataLayer = window.dataLayer || [];
    }
    window.dataLayer.push({
      event: 'view_item_list',
      item_list_name: categorySlug,
      items: makeDataLayerItemObject(products),
    });
  };

  const getProduct = async () => {
    if (!products?.length) {
      try {
        console.log('77777777777777');
        await dispatch(fetchProducts());
      } catch (error) {}
    }
  };

  return (
    <>
      <div
        className='recommendation-container product-section'
        style={{ padding: '0px 40px' }}>
        <div className='recommendation-inner'>
          <h3 className='product-section-heading'>
            People who browsed similar items also showed interest in these
          </h3>
          <div className='slider-wrapper'>
            {isLoading || !products ? (
              <LoaderComponent />
            ) : (
              <ProductSlider
                dataLayer={dataLayer}
                type='recommended'
                products={products ? products : prod}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
