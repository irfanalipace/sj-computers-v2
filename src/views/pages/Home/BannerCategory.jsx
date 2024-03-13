import React, { Suspense } from 'react';
// import { ProductType } from "@components/homeproduct/ProductType";
import BannerSlider from '@components/Sliders/BannerSlider';
const ProductType = React.lazy(
  () => import('@components/homeproduct/ProductType'),
);
import Loader from '@common/LoaderComponent/LoaderComponent';
import './BannerCategory.css';
// import BannerSlider from "@components/Sliders/BannerSlider";
import MobileHomeCategory from '@components/MobileCategory/MobileHomeCategory';
// const MobileHomeCategory = React.lazy(() =>
//     import("@components/MobileCategory/MobileHomeCategory")
// );

import gamingProducts1 from '../../../assets/images/gaming-images/gameimage3.png';
import gamingProducts2 from '../../../assets/images/gaming-images/gameimage1.png';
import gamingProducts3 from '../../../assets/images/gaming-images/gameimage2.png';
import scanimages from '../../../assets/images/gaming-images/scan-images.png';
import { useViewportWidth } from '@hooks/useViewportWidth';
import sellingimg1 from '../../../assets/images/homepageImage/sellingproducts/image1.png';
import sellingimg2 from '../../../assets/images/homepageImage/sellingproducts/image2.png';
import sellingimg3 from '../../../assets/images/homepageImage/sellingproducts/image3.png';
import sellingimg4 from '../../../assets/images/homepageImage/sellingproducts/image4.png';
import sellingimg5 from '../../../assets/images/homepageImage/sellingproducts/image5.png';
import sellingimg6 from '../../../assets/images/homepageImage/sellingproducts/image6.png';
import sellingimg7 from '../../../assets/images/homepageImage/sellingproducts/image7.png';
import sellingimg8 from '../../../assets/images/homepageImage/sellingproducts/image8.png';
const FeaturedProducts = React.lazy(
  () =>
    import(
      '@components/homeproduct/productcategory/ProductsItemsList/FeaturedProducts'
    ),
);
import gaminimg1 from '@images/product/item3/image1.png';
import gaminimg3 from '@images/product/item3/image3.png';
import TouchScreenLaptop from '../../../assets/images/categories/TouchScreenLaptop.png';
// import NvidiaImg from "../../../assets/images/categories/Nvidia.png";
import NvidiaImg from '../../../assets/images/categories/Nvidia.png';
import NvidiaImg2 from '../../../assets/images/categories/Nvidia2.png';
import {
  shopByBrandHomePage,
  ShopByFormFactorHomePage,
  BudgetFriendlyDesktopsHomepage,
  featured,
} from './HomePageMaterial';

const SellingPro = React.lazy(
  () =>
    import(
      '@components/homeproduct/productcategory/ProductsItemsList/SellingPro'
    ),
);
const GamingProductsSections = React.lazy(
  () =>
    import(
      '@components/homeproduct/productcategory/ProductsItemsList/GamingProductsSections'
    ),
);
import rectangle1 from '../../../assets/images/flashsaleimaes/rectangle1.png';
import rectangle2 from '../../../assets/images/flashsaleimaes/rectangle2.png';
import rectangle3 from '../../../assets/images/flashsaleimaes/rectangle3.png';
import rectangle4 from '../../../assets/images/flashsaleimaes/rectangle4.png';
import rectangle5 from '../../../assets/images/flashsaleimaes/rectangle5.png';
import MobileHomeCategoryLayout2 from '../../components/MobileCategory/MobileHomeCategoryLayout2';
import MobileRecommand from '../../components/MobileCategory/MobileRecommand/MobileRecommand';

const FlashProducts = React.lazy(
  () =>
    import(
      '@components/homeproduct/productcategory/ProductsItemsList/FlashProducts'
    ),
);
const RecommandSectionsProducts = React.lazy(
  () =>
    import(
      '@components/homeproduct/productcategory/ProductsItemsList/RecommandSectionsProducts'
    ),
);

const BannerCategory = () => {
  const screenWidth = useViewportWidth();

  const Sellingimages = [
    sellingimg1,
    sellingimg2,
    sellingimg8,
    sellingimg4,
    sellingimg5,
    sellingimg6,
    sellingimg7,
    sellingimg8,
    sellingimg1,
    sellingimg2,
    sellingimg8,
    sellingimg4,
    sellingimg5,
    sellingimg6,
    sellingimg7,
    sellingimg8,
  ];
  const gamingArray = [
    {
      name: 'Shop by Processor',
    },
    {
      name: 'Work Stations for Professionals',
    },
    {
      name: 'Professional Laptops',
    },
    {
      name: 'Shop by GPU',
    },
  ];
  const processorItems = [
    {
      image: gaminimg3,
      categoryLink: '/category/all?processor=core_i3',
      categoryName: 'Core i3',
    },
    {
      image: scanimages,
      categoryLink: '/category/all?processor=core_i5',
      categoryName: 'Core i5',
    },
    {
      image: gaminimg1,
      categoryLink: '/category/all?processor=core_i7',
      categoryName: 'Core i7',
    },
  ];
  const fleshimages = [
    rectangle1,
    rectangle2,
    rectangle3,
    rectangle4,
    rectangle5,
    rectangle1,
    rectangle2,
    rectangle3,
    rectangle4,
    rectangle5,
  ];
  const gpuItems = [
    {
      image: gaminimg3,
      categoryLink: '/category/bto',
      categoryName: 'AMD',
    },
    {
      image: NvidiaImg,
      categoryLink: '/category/laptops',
      categoryName: 'Nvidia',
      hidden: true,
    },
    {
      image: NvidiaImg2,
      categoryLink: '/category/desktop',
      categoryName: 'Nvidia',
    },
  ];

  return (
    <div className='banner-category-section'>
      <div className='banner-wrapper'>
        <div className='banner-inner'>
          <BannerSlider />
        </div>
      </div>

      <div className='catergory-grid-wrapper'>
        <div className=''>
          <div className='home-page-data'>
            <Suspense>
              {/* hide in mobie view */}
              <div className='d-none d-sm-block'>
                <ProductType />
              </div>

              {/* only show in mobile view */}
              <div className='d-block d-sm-none'>
                <MobileHomeCategoryLayout2 />
              </div>

              <div>
                <FeaturedProducts
                  featuredItems={shopByBrandHomePage}
                  featured={featured}
                  networkItems={ShopByFormFactorHomePage}
                  upgradecomputers={BudgetFriendlyDesktopsHomepage}
                  TouchScreenLaptop={TouchScreenLaptop}
                />
              </div>
              {/* <SellingProducts images={Sellingimages}/> */}
              <SellingPro images={Sellingimages} />
              <div className='d-none d-sm-block'>
                <GamingProductsSections
                  gamingArray={gamingArray}
                  items={processorItems}
                  gpuItems={gpuItems}
                  gamingProducts1={gamingProducts1}
                  gamingProducts2={gamingProducts2}
                  gamingProducts3={gamingProducts3}
                />
              </div>
              <FlashProducts images={fleshimages} />
              {/* <RecommandSectionsProducts /> */}
              <div
                className='d-block d-sm-none'
                style={{ borderTop: '4px solid #EAEDED' }}>
                <MobileRecommand />
              </div>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerCategory;
