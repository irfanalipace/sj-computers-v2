import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ProductsGrid from '@components/ProductsGrid/ProductsGrid';
import { getProductsCategory } from '../../core/api/products';

const ProductCategoryGrid = ({ pathValue }) => {
  const categories = useSelector(state => state.category.categories);
  const [productsList, setProductsList] = useState([]);
  const [totalProducts, setTotalProducts] = useState(12);
  const [loading, setLoading] = useState(false);

  const getProducts = async total => {
    try {
      setLoading(true);
      const filterObject = {
        page: 1,
        category: pathValue,
        per_page: total,
      };

      const response = await getProductsCategory(filterObject);
      setProductsList(response?.data?.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts(totalProducts);
  }, [categories]);

  const handleClick = () => {
    const total = totalProducts + 8;
    setTotalProducts(total);
    getProducts(total);
  };

  return (
    <ProductsGrid
      products={productsList}
      handleClick={handleClick}
      isLoading={loading}
      // apiError={apiError}
      // searchParams={productParamsRef}
      // productView={productView}
      inFilterProducts={true}
    />
  );
};

export default ProductCategoryGrid;
