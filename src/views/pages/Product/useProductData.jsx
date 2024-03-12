// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { productDetailsbyAsinApi } from '@api/products';

// function useProductData() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [product, setProduct] = useState(null);
//   const products = useSelector(state => state.products.products);
//   const productLoading = useSelector(state => state.products.isLoading);
//   console.log(products, 'productsproductsproductsproductsproducts');
//   const { productId } = useParams();

//   const getProductDetails = async filter => {
//     if (!productLoading) {
//       const filteredProduct = products.filter(
//         product => product?.asin == productId,
//       )[0];

//       if (filteredProduct) {
//         setProduct(filteredProduct);
//       } else {
//         setIsLoading(true);
//         try {
//           const response = await productDetailsbyAsinApi(productId, {
//             filter: filter,
//           });

//           setProduct(response.data);
//         } catch (error) {}
//       }
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     getProductDetails();
//   }, [productId, productLoading]);

//   return {
//     isLoading,
//     product,
//   };
// }

// export default useProductData;

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { productDetailsbyAsinApi } from '@api/products';
import { CLEAR_PRODUCTS } from '../../../core/store/products/productsSlice';
function useProductData() {
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const products = useSelector(state => state.products.products);
  const productLoading = useSelector(state => state.products.isLoading);
  const dispatch = useDispatch();

  const { productId } = useParams();

  const getProductDetails = async filter => {
    setIsLoading(true);

    try {
      const filteredProduct = products.find(
        product => product?.asin === productId,
      );

      if (filteredProduct) {
        setProduct(filteredProduct);
      } else {
        const response = await productDetailsbyAsinApi(productId, {
          filter: filter,
        });

        setProduct(response.data);
      }
    } catch (error) {}

    setIsLoading(false);
    setIsLoadingInitial(false);
  };

  useEffect(() => {
    if (isLoadingInitial) {
      getProductDetails();
    }
  }, [isLoadingInitial]);

  useEffect(() => {
    if (!productLoading) {
      getProductDetails();
    }
  }, [productId, productLoading]);

  useEffect(() => {
    if (!product) return;
  }, [product]);

  useEffect(() => {
    return () => {
      dispatch(CLEAR_PRODUCTS());
    };
  }, []);

  return {
    isLoading: isLoadingInitial || isLoading,
    product,
  };
}

export default useProductData;
