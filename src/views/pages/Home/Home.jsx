import React, { Suspense } from 'react';
import BannerCategory from './BannerCategory';
const ProductsHomePage = React.lazy(() => import('./ProductsHomePage'));
import { useViewportWidth } from '@hooks/useViewportWidth';
import './Home.css';
import Subscribe from '../../components/Subscribe/Subscribe';
import VisibleOnScroll, {
  VisibilityProvider,
} from '../../components/VisibleOnScroll';
const RecommandSectionsProducts = React.lazy(
  () =>
    import(
      '@components/homeproduct/productcategory/ProductsItemsList/RecommandSectionsProducts'
    ),
);

const Home = () => {
  const screenWidth = useViewportWidth();
  return (
    <VisibilityProvider>
      <div className='homePage'>
        {/* <MobileHomeCategory />*/}

        <BannerCategory />

        {/* Recommandation Slider */}
        <VisibleOnScroll id='homePageRecommededSection'>
          <div
            style={{ backgroundColor: 'white', paddingTop: '44px' }}
            className='d-none d-sm-block'>
            <div
              style={{
                borderTop: '1px solid #D0D0D0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100vw',
              }}>
              <div style={{ maxWidth: '1500px', width: '100%' }}>
                <RecommandSectionsProducts />
              </div>
            </div>
          </div>
        </VisibleOnScroll>
        <Suspense>
          {/* {
                        screenWidth < 576 && (
                            <div className="products-grid-container">
                            <h2>Products</h2>
                            <ProductsHomePage />
                        </div>
                        )
                    } */}

          {screenWidth > 576 && <Subscribe />}
        </Suspense>
      </div>
    </VisibilityProvider>
  );
};

export default Home;
