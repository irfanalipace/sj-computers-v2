import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '@common/LoaderComponent/LoaderComponent';

import {
  fetchProducts,
  // searchProducts,
  filterProducts,
} from '@store/products/productsThunks';
import { CLEAR_PRODUCTS } from '@store/products/productsSlice';
import ProductsGrid from '@components/ProductsGrid/ProductsGrid';

const ProductsHomePage = () => {
  const {
    searchString,
    selectedCategory,
    products,
    isLoading,
    currentPage,
    apiError,
  } = useSelector(state => state.products);
  const dispatch = useDispatch();

  let filterObject = {
    page: 1,
    per_page: 12,
    category_id: selectedCategory,
    name: searchString,
  };

  const handleClick = () => {
    filterObject = {
      ...filterObject,
      page: currentPage,
    };
    if (searchString || selectedCategory) {
      dispatch(filterProducts(filterObject, true));
    } else dispatch(fetchProducts(currentPage, true));
    // searchString
    //     ? dispatch(searchProducts(searchString, currentPage))
    //     : dispatch(fetchProducts(currentPage, true));
  };

  useEffect(() => {
    if ((!searchString || !selectedCategory) && products.length === 0) {
      console.log('11212121212121212');
      dispatch(fetchProducts());
      return;
    }
    filterObject = {
      ...filterObject,
      page: 1,
    };
    dispatch(filterProducts(filterObject));

    return () => {
      dispatch(CLEAR_PRODUCTS());
    };
  }, [searchString, selectedCategory]);

  return (
    <>
      {isLoading ? (
        <h3 className='pb-4'>
          <Loader />
        </h3>
      ) : (
        <>
          {products.length > 0 ? (
            <ProductsGrid
              products={products || []}
              handleClick={handleClick}
              isLoading={isLoading}
              apiError={apiError}
              smallBtn={true}
            />
          ) : (
            <h2 className='pb-4'>No Products Found</h2>
          )}
        </>
      )}
    </>
  );
};

export default ProductsHomePage;
