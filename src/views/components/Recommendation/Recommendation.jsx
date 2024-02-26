import ProductSlider from '@components/Sliders/ProductSlider';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '@store/products/productsThunks';
import LoaderComponent from '@common/LoaderComponent/LoaderComponent';
import { useEffect } from 'react';
import './Recommdation.css';

export default function Recommendation({ prod }) {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state?.products?.isLoading);
  const products = useSelector(state => state?.products?.products);
  useEffect(() => {
    getProduct();
  }, [products]);

  const getProduct = async () => {
    if (!products?.length) {
      try {
        await dispatch(fetchProducts());
      } catch (error) {}
    }
  };

  return (
    <>
      <div
        className='recommendation-container product-section'
        style={{ padding: '0px 40px' }}
      >
        <div className='recommendation-inner'>
          <h3
            className='product-section-heading'
            style={{ padding: '0px 12px' }}
          >
            People who browsed similar items also showed interest in these
          </h3>
          <div className='slider-wrapper'>
            {isLoading || !products ? (
              <LoaderComponent />
            ) : (
              <ProductSlider
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
