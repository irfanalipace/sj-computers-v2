import { useEffect, useState, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import { IconButton } from '@mui/material';

import { filterProducts } from '@store/products/productsThunks';
import {
  CLEAR_ALL_PRODUCTS,
  SET_SEARCH_STRING,
  SET_SELECTED_CATEGORY,
} from '@store/products/productsSlice';
import ProductsGrid from '@components/ProductsGrid/ProductsGrid';
import './FilteredProducts.css';
import { makeDataLayerItemObject } from '../../../core/utils/helpers';

const FilteredProducts = memo(({ category, toggleFilter, categorySlug }) => {
  const {
    products,
    filtersProduct,
    filterTotal,
    filterTo,
    isLoading,
    apiError,
    currentPage,
    searchString,
    filtersArray,
  } = useSelector(state => state.products);

  const [mounted, setMounted] = useState(false);

  const productParamsRef = {
    redirectedFrom: category?.name,
    redirectedFromPath: `/category/${category?.slug}`,
  };

  useEffect(() => {
    console.print(
      'view_item_list data layer',
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
  }, []);

  const dispatch = useDispatch();

  let filterObject = {
    page: 1,
    per_page: 12,
    name: '',
    category_id: category?.id,
  };

  const init = () => {
    dispatch(SET_SELECTED_CATEGORY(null));
    dispatch(CLEAR_ALL_PRODUCTS());
    setMounted(true);
  };

  useEffect(() => {
    init();
    return () => {
      dispatch(CLEAR_ALL_PRODUCTS());
    };
  }, []);

  const handleClick = () => {
    filterObject = {
      ...filterObject,
      page: currentPage,
      name: '',
      filter: filtersArray,
    };

    dispatch(filterProducts(filterObject, true));
  };

  useEffect(() => {
    if (mounted) {
      filterObject = {
        ...filterObject,
        page: 1,
        name: '',
        category_id: category?.id,
        filter: filtersArray,
      };
      if (filtersArray.length > 0 || searchString || category?.id) {
        dispatch(filterProducts(filterObject));
      }
    }
  }, [filtersArray]);

  useEffect(() => {
    filterObject = {
      ...filterObject,
      page: 1,
      name: '',
      filter: filtersArray,
    };

    dispatch(filterProducts(filterObject));
  }, []);

  useEffect(() => {
    filterObject = {
      ...filterObject,
      page: 1,
      name: '',
      category_id: category?.id,
      filter: filtersArray,
    };
    if (category?.id) {
      dispatch(filterProducts(filterObject));
    }
  }, [category]);

  const [productView, setProductView] = useState('grid');

  const productViewGrid = () => {
    setProductView('grid');
  };

  const productViewList = () => {
    setProductView('list');
  };

  return (
    <div className='filter-results'>
      {products.length > 0 ? (
        <>
          {/* {category?.name && (
                        <div className="d-flex justify-content-space-between align-items-center heading">
                            <h3>
                                Best{" "}
                                <span className="text-capitalize">
                                    {category?.name}
                                </span>
                            </h3>
                            <button
                                className="d-sm-none d-block bg-transparent border-0"
                                onClick={toggleFilter}
                            >
                                <FontAwesomeIcon icon={faFilter} />
                            </button>
                        </div>
                    )} */}
          <div className='product-grid-heading'>
            Best {category?.name ? category?.name : 'Monitors for Desktops'}
          </div>
          {/* <p className="product-grid-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem.</p> */}
          <div className='product-length-container'>
            {/* 1-{products?.length > filterTotal ? filterTotal : products.length } of over {filterTotal} results for <span style={{color: "#52AC66", margin: "0px 5px"}}> Monitors </span> */}
            {filterTo ? 1 : 0}-{filterTo ? filterTo : 0} of over {filterTotal}{' '}
            results for{' '}
            <span style={{ color: '#52AC66', margin: '0px 5px' }}>
              {' '}
              {category?.name ? category?.name : 'Monitors'}{' '}
            </span>
            <div className='buttons'>
              <span className='view-button' onClick={productViewList}>
                <IconButton
                  disableRipple
                  style={{
                    borderRadius: '3px',
                    padding: '3px 6px',
                    backgroundColor: productView == 'list' ? '#318243' : '',
                    color: productView == 'list' ? 'white' : '#318243',
                  }}>
                  <FormatAlignLeftIcon fontSize='small' />{' '}
                </IconButton>
              </span>
              <span className='view-button' onClick={productViewGrid}>
                <IconButton
                  disableRipple
                  style={{
                    borderRadius: '3px',
                    padding: '3px 6px',
                    backgroundColor: productView == 'grid' ? '#318243' : '',
                    color: productView == 'grid' ? 'white' : '#318243',
                  }}>
                  <ViewModuleIcon fontSize='small' />{' '}
                </IconButton>
              </span>
            </div>
          </div>
          {filtersProduct?.length == 0 ? (
            <div style={{ fontWeight: '500', padding: '15px' }}>
              Products Not Found
            </div>
          ) : (
            <ProductsGrid
              products={filtersProduct}
              handleClick={handleClick}
              isLoading={isLoading}
              apiError={apiError}
              searchParams={productParamsRef}
              productView={productView}
              inFilterProducts={true}
            />
          )}
        </>
      ) : (
        <>
          {isLoading || !category ? (
            <h3 className='heading text-center'>Waiting</h3>
          ) : (
            <div
              style={{ height: '137vh' }}
              className='d-flex justify-content-center align-items-start heading'>
              <h3 className='text-center'>No Products Found</h3>
              <button
                className='d-sm-none d-block bg-transparent border-0'
                onClick={toggleFilter}>
                <FontAwesomeIcon icon={faFilter} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
});

export default FilteredProducts;
