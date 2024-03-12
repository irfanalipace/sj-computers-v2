import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductsGrid from '@components/ProductsGrid/ProductsGrid';
import { getProductsCategory } from '../../core/api/products';
import { filterProducts } from '@store/products/productsThunks';

const ProductCategoryGrid = ({ pathValue, filters }) => {
  const categories = useSelector(state => state.category.categories);
  const [productsList, setProductsList] = useState([]);
  const [totalProducts, setTotalProducts] = useState(12);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const getProducts = async (total, isFilter) => {
    try {
      setLoading(true);
      const filterObject = {
        page: 1,
        category: pathValue,
        per_page: total,
        ...isFilter,
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

  useEffect(() => {
    let filterObject = {
      page: 1,
      per_page: 12,
      name: '',
      category: pathValue,
    };

    let filteredData = {};

    for (const key in filters) {
      const item = filters[key];
      if (Array.isArray(item.value) && item.value.length === 0) {
        continue;
      }
      if (
        typeof item.value === 'object' &&
        (item.value.min === null ||
          item.value.min === Infinity ||
          (item.value.min === 0 && item.value.max === 0))
      ) {
        continue;
      }
      filteredData[key] = item;
    }

    filterObject = {
      ...filterObject,
      filter: filteredData,
    };

    if (filters) {
      dispatch(
        filterProducts(filterObject, false, productAfterShowMore => {
          setProductsList(productAfterShowMore);
          viewItemDataLayer(productAfterShowMore, categorySlug);
        }),
      );
    }
    // }
  }, [JSON.stringify(filters)]);

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
