import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductsGrid from '@components/ProductsGrid/ProductsGrid';
import { getProductsCategory } from '../../core/api/products';
import { filterProducts } from '@store/products/productsThunks';
import { TroubleshootRounded } from '@mui/icons-material';

const ProductCategoryGrid = ({ pathValue, filters }) => {
  const categories = useSelector(state => state.category.categories);
  const { filtersProduct, filtersArray, currentPage, isLoading } = useSelector(
    state => state.products,
  );
  const [productsList, setProductsList] = useState([]);
  const [totalProducts, setTotalProducts] = useState(12);
  const [max, setMax] = useState(null);
  const [loading, setLoading] = useState(false);
  const [firstReload, setFirstReload] = useState(true);

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
      setMax(response?.data?.total);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // getProducts(totalProducts);

    handleClick(filters || false);
  }, [categories]);

  // const handleClick = () => {
  //   const total = totalProducts + 8;

  //   setTotalProducts(total);
  //   getProducts(total);
  // };

  const checkIfFilterSelected = filtersArray => {
    let filteredData = {};

    for (const key in filtersArray) {
      const item = filtersArray[key];
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
    return filteredData;
  };

  const handleClick = fil => {
    let filteredData = checkIfFilterSelected(filtersArray);

    if (fil === false) {
      filteredData = {};
    }

    let filterObject = {
      per_page: 12,
      // category: categorySlug === 'best-sellers' && categorySlug,
    };
    filterObject = {
      ...filterObject,
      page: firstReload ? 1 : currentPage, // This for setting 1 on first reload
      name: '',
      category: pathValue,
      filter: filteredData,
    };
    // if (category?.id === 1) {
    //   filterObject.name = categorySlug;
    // }
    setLoading(true);
    dispatch(
      filterProducts(filterObject, true, productAfterShowMore => {
        setLoading(false);
        setProductsList([...productsList, ...productAfterShowMore]);
        // setMax(response?.data?.total);
        viewItemDataLayer(productAfterShowMore, pathValue);
      }),
      setFirstReload(false),
    );

    const total = totalProducts + 8;

    setTotalProducts(total);
  };

  const viewItemDataLayer = (products, categorySlug) => {
    console.print(
      'view_item_list data layer',
      pathValue,
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
  function isEmpty(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  useEffect(() => {
    let filterObject = {
      page: 1,
      per_page: 12,
      name: '',
      category: pathValue,
    };

    let filteredData = {};
    // console.log(filters);

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

    if (!isEmpty(filteredData)) {
      dispatch(
        filterProducts(filterObject, false, productAfterShowMore => {
          // setProductsList([...productsList, ...productAfterShowMore]);
          setProductsList(productAfterShowMore);
          viewItemDataLayer(productAfterShowMore, pathValue);
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
      maximum={max}
      inFilterProducts={true}
    />
  );
};

export default ProductCategoryGrid;
