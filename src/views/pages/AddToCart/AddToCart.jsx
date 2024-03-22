import React, { useEffect, useState } from 'react';
import AddToCartCard from './components/AddToCartCard/AddToCartCard';
import { useParams } from 'react-router-dom';
import { productDetailsbyAsinApi } from '@api/products';
import useSimilarData from '../Product/useSimilarProduct';
import SimilarPurchaseCart from './components/SimilarPurchaseCart/SimilarPurchaseCart';
import { Grid } from '@mui/material';
import SimilarInterestSlider from './components/SimilarPurchaseCart/SimilarInterestSlider';
import CartSideBar from './components/CartSidebar/CartSideBar';
import LoaderComponent from '@common/LoaderComponent/LoaderComponent';
import { useSelector } from 'react-redux';
import './AddToCart.css';
import { featureProductsApi } from '@api/products';

const AddToCart = () => {
  const { productId, itemAdded } = useParams();
  const cart = useSelector(state => state?.cart?.cart);
  const product = cart?.find(item => item?.product?.asin == productId);
  const [isLoading, setLoading] = useState(false);
  // const { featuredProducts } = useSimilarData(product?.id);
  const [featureProducts, setFeatureProduct] = useState([]);
  const getFeaturedProduct = async () => {
    try {
      const resp = await featureProductsApi(product?.id);
      const selectedProducts = resp?.data;
      setFeatureProduct(selectedProducts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getFeaturedProduct();
  }, [product?.id]);

  return !product ? (
    <div style={{ padding: '140px', textAlign: 'center' }}>
      <LoaderComponent />
    </div>
  ) : (
    <div style={{ backgroundColor: '#EAEDED' }}>
      <Grid container direction='row-reverse'>
        <Grid item lg={1.55}>
          <CartSideBar />
        </Grid>
        <Grid
          item
          lg={10.45}
          className='hidden-on-mobile hidden-on-tab cart-with-protection'>
          {product && !itemAdded ? <AddToCartCard product={product} /> : <></>}
          {/* <SimilarItemsSlider products={similarProducts} /> */}
          <SimilarPurchaseCart
            products={featureProducts}
            isLoading={isLoading}
          />
          <SimilarInterestSlider products={featureProducts} />
        </Grid>
      </Grid>
      <div className='hidden-on-desktop'>
        <SimilarInterestSlider products={featureProducts} />
      </div>
    </div>
  );
};

export default AddToCart;
