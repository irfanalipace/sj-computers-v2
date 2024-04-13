import { lazy, useEffect, useRef } from 'react';
import LoaderComponent from '@common/LoaderComponent/LoaderComponent';
import { ProductImage } from '@components/Product/ProductImage/ProductImage';
import ProductDetails from '@components/Product/ProductDetails/ProductDetails';
import { CheckOutCard } from '@components/Product/CheckOutCard/CheckOutCard';
import Recommendation from '@components/Recommendation/Recommendation';
import NotFound from '../NotFound/NotFound';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const ProductReviews = lazy(
  () => import('../../components/Product/ProductReviews/ProductReviews'),
);
import './Product.css';
import SimilarItems from '../../components/SimilarItems/SimilarItems';
import TechDetails from '../../components/TechDetails/TechDetails';
import ProductDescription from '../../components/Product/ProductDescription/ProductDescription';
import RefurbishedSection from '../../components/RefurbishedSection/RefurbishedSection';
import ProductVideo from '../../components/Product/ProductVideo/ProductVideo';
import CategoriesHeader from '../../components/Header/CategoriesHeader/CategoriesHeader';
import VisibleOnScroll, {
  VisibilityProvider,
} from '../../components/VisibleOnScroll';
import useProductData from './useProductData';
import useSimilarData from './useSimilarProduct';
import Breadcrumb from '@common/Breadrumb/Breadcrumb';
import { useSearchParams } from 'react-router-dom';
import { CLEAR_REVIEW } from '../../../core/store/review/reviewSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  generatePath,
  makeDataLayerItemObject,
} from '../../../core/utils/helpers';
import { useLocation } from 'react-router-dom';
import ProductDetailsMobile from '../../components/Product/ProductDetails/ProductDetialsMobile';
import PageContainer from '../../components/PageContainer/PageContainer';
import { fetchProtectionPlan } from '../../../core/api/plan';
import { SET_PROTECTION_PLAN } from '../../../core/store/protectionPlan';

export default function Product() {
  const dispatch = useDispatch();
  const location = useLocation();
  const theme = useTheme();

  const isUpSmall = useMediaQuery(theme.breakpoints.up('md'));

  const [searchParams] = useSearchParams();

  const { isLoading, product } = useProductData();
  const protectionPlanStore = useSelector(state => state.protectionPlan);

  const breadcrumbRoutes = [
    {
      label: searchParams.get('redirectedFrom') || 'Home',
      link: searchParams.get('redirectedFromPath') || '/',
    },
    {
      label: 'Product',
      link: generatePath(product?.url),
    },
  ];
  useEffect(() => {
    // execute on location change
    // dispatch(CLEAR_REVIEW());
    // console.log("Location changed!", location.pathname);
  }, [location?.pathname]);

  useEffect(() => {
    console.log(protectionPlanStore);
    if (!protectionPlanStore?.plans?.length) getProtectionPlans();
    return () => {
      dispatch(CLEAR_REVIEW());
    };
  }, []);

  const pro = useRef(null);

  useEffect(() => {
    if (!product || pro?.current?.id === product?.id) return;
    window.dataLayer.push(function () {
      this.reset();
    });
    console.log('select_item', makeDataLayerItemObject([{ ...product }]));
    window.dataLayer.push({
      event: 'select_item',
      items: makeDataLayerItemObject([{ ...product }]),
    });

    console.log('view-item', makeDataLayerItemObject([{ ...product }]));
    console.log('data layer', window.dataLayer);
    window.dataLayer.push(function () {
      this.reset();
    });
    window.dataLayer.push({
      event: 'view_item',
      currency: 'USD',
      value: parseFloat(product?.price),
      items: makeDataLayerItemObject([{ ...product }]),
    });
    pro.current = product;
  }, [product]);

  const getProtectionPlans = async () => {
    const res = await fetchProtectionPlan();
    dispatch(SET_PROTECTION_PLAN({ plans: res?.data }));
  };

  return (
    <PageContainer>
      <VisibilityProvider>
        {product?.id || isLoading ? (
          <div className='product-page'>
            <CategoriesHeader />
            <div className='product-container container-fluid'>
              {isUpSmall && <Breadcrumb routes={breadcrumbRoutes} />}
              {isLoading ? (
                <LoaderComponent />
              ) : (
                <>
                  {isUpSmall ? (
                    <ProductComponent product={product} />
                  ) : (
                    <ProductMobileComponent
                      isUpSmall={isUpSmall}
                      product={product}
                    />
                  )}
                  <VisibleOnScroll id='section1'>
                    <div>
                      {isUpSmall ? (
                        <SimilarItemsOfProduct productId={product?.id} />
                      ) : (
                        <SimilarItemsOfProduct
                          productId={product?.id}
                          isMobile={isUpSmall}
                        />
                      )}
                      <RefurbishedSection />
                      <ProductDescription
                        description={
                          product?.description?.product_description?.[0]?.value
                        }
                      />
                    </div>
                  </VisibleOnScroll>
                  <TechDetails product={product} />

                  {/* VIDEO-SECTION */}
                  {/* <ProductVideo product={product} />  */}

                  <div id='reviews'>
                    <VisibleOnScroll id='section2'>
                      <ProductReviews
                        // reviews={products}
                        // onFilterChange={onFilterChange}
                        productAsin={product?.asin}
                        productId={product?.id}
                      />
                    </VisibleOnScroll>
                  </div>
                </>
              )}
              {isUpSmall && (
                <VisibleOnScroll id='section3'>
                  <Recommendation dataLayer={true} />
                </VisibleOnScroll>
              )}
            </div>
          </div>
        ) : (
          <NotFound />
        )}
      </VisibilityProvider>
    </PageContainer>
  );
}

const ProductComponent = ({ product }) => {
  return (
    <div className='row'>
      <div className='col-12 col-md-4 '>
        <ProductImage ProductImages={product.image} />
      </div>
      <div className='col-12 col-md-5'>
        <ProductDetails product={product} />
      </div>
      <div className='col-12 col-md-3 p-0 m-0'>
        <CheckOutCard product={{ ...product }} />
      </div>
    </div>
  );
};

const ProductMobileComponent = ({ product, isUpSmall }) => {
  return (
    <div className='row'>
      {/* <div className="col-12 col-md-4 ">
                <ProductImage ProductImages={product.image} />
            </div> */}
      <div className='col-12 col-md-5'>
        <ProductDetailsMobile isUpSmall={isUpSmall} product={product} />
      </div>
    </div>
  );
};

const SimilarItemsOfProduct = ({ productId, isMobile }) => {
  const viewItemDataLayer = (products, categorySlug) => {
    console.log(
      'view_item_list data layer',
      'simoilar',

      makeDataLayerItemObject(products),
    );
    window.dataLayer.push(function () {
      this.reset();
    });
    window.dataLayer.push({
      event: 'view_item_list',
      item_list_name: 'similar_items_of_product',
      items: makeDataLayerItemObject(products),
    });
  };
  const { similarProducts, featuredProducts, isLoading } =
    useSimilarData(productId);
  useEffect(() => {
    if (similarProducts.length) {
      viewItemDataLayer(similarProducts, '');
    }
  }, [similarProducts]);
  return (
    <div>
      {isLoading ? (
        <LoaderComponent />
      ) : (
        <>
          {similarProducts?.length > 0 ? (
            <div className='hidden-on-ab'>
              <SimilarItems
                isMobile={isMobile}
                similarProducts={similarProducts}
                featuredProducts={featuredProducts}
              />
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
};
