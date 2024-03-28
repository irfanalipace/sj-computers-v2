import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './ProductType.css';
import ProductItem1 from '@components/homeproduct/productcategory/ProductItem1';
import ProductItem4 from '@components/homeproduct/productcategory/ProductItem4';
import addDesktop from '@images/categories/wellcome.webp';
import categoryImg1 from '@images/categories/desktopweb.webp';
import categorybusinussweb from '@images/categories/businussweb.webp';
import btoimg from '@images/categories/btoweb.webp';
import twoInOneLaptopImg from '@images/categories/2in1laptop.png';
import AccessoriesImg from '@images/categories/Accessories.png';
import AccessoriesImgUpdate from '@images/categories/AccessoriesUpdate.png';
import LaptopImgUpdate from '@images/categories/LaptopUpdate.png';
import DesktopImgUpdate from '@images/categories/desktopUpdate.png';
import twoInOneImgUpdate from '@images/categories/2in1LaptopUpdate.png';
import GamingDesktopImg from '@images/categories/gamingDesktops.png';
import Laptop2Img from '@images/categories/Laptop2.png';
import laptopimg from '@images/categories/laptopweb.webp';
import { Rating } from '@mui/material';
import FontAwesome from 'react-fontawesome';
// import monitorimg from "@images/categories/monitorweb.webp";
import { Stack, Typography } from '@mui/material';
import monitorimg from '@images/categories/desktopweb.webp';
import desktopimgweb from '@images/categories/desktopweb-page.webp';
import wellsjcomputer from '@images/categories/welcomesjcomputer.webp';
import image1 from '../../../assets/images/homepageImage/featureImages/image1.png';
import image2 from '../../../assets/images/homepageImage/featureImages/image2.png';
import image3 from '../../../assets/images/homepageImage/featureImages/image3.png';
import image4 from '../../../assets/images/homepageImage/featureImages/image4.png';
import linkrouter from '../../../assets/images/homepageImage/networkimags/d-link-router.png';
import modem from '../../../assets/images/homepageImage/networkimags/d-link-modem.png';
import img1 from '../../../assets/images/homepageImage/upgradecomputers/image1.png';
import img2 from '../../../assets/images/homepageImage/upgradecomputers/image2.png';
import img3 from '../../../assets/images/homepageImage/upgradecomputers/image3.png';
import rams from '../../../assets/images/homepageImage/RamMem/rams.png';
import sellingimg1 from '../../../assets/images/homepageImage/sellingproducts/image1.png';
import sellingimg2 from '../../../assets/images/homepageImage/sellingproducts/image2.png';
import sellingimg3 from '../../../assets/images/homepageImage/sellingproducts/image3.png';
import sellingimg4 from '../../../assets/images/homepageImage/sellingproducts/image4.png';
import sellingimg5 from '../../../assets/images/homepageImage/sellingproducts/image5.png';
import sellingimg6 from '../../../assets/images/homepageImage/sellingproducts/image6.png';
import sellingimg7 from '../../../assets/images/homepageImage/sellingproducts/image7.png';
import sellingimg8 from '../../../assets/images/homepageImage/sellingproducts/image8.png';
import SellingProducts from '../MobileCategory/SellingProducts/SellingProducts';
import Recommendation from '../Recommendation/Recommendation';
import { fetchProducts } from '../../../core/store/products/productsThunks';
import moment from 'moment';

import { faStar } from '@fortawesome/free-solid-svg-icons';
import StarRatings from 'react-star-ratings';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import ProductItem3 from './productcategory/ProductItem3';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gaminimg1 from '@images/product/item3/image1.png';
import gaminimg2 from '@images/product/item3/image2.png';
import gaminimg3 from '@images/product/item3/image3.png';
import gamingProducts1 from '../../../assets/images/gaming-images/gameimage3.png';
import gamingProducts2 from '../../../assets/images/gaming-images/gameimage1.png';
import gamingProducts3 from '../../../assets/images/gaming-images/gameimage2.png';
import scanimages from '../../../assets/images/gaming-images/scan-images.png';
import rectangle1 from '../../../assets/images/flashsaleimaes/rectangle1.png';
import rectangle2 from '../../../assets/images/flashsaleimaes/rectangle2.png';
import rectangle3 from '../../../assets/images/flashsaleimaes/rectangle3.png';
import rectangle4 from '../../../assets/images/flashsaleimaes/rectangle4.png';
import rectangle5 from '../../../assets/images/flashsaleimaes/rectangle5.png';
import LoginAndTimeProduct from './LoginAndTimeProduct';

// const gamingArray = [
//     {
//         name: "New Arrivals in Gaming Systems",
//         link: "Shop Now",
//     },
//     {
//         name: "Work Stations for Professionals",
//         link: "Shop Now",
//     },
//     {
//         name: "Latest Activity on Advance Laptops",
//         link: "Shop Now",
//     },
//     {
//         name: "Monitors",
//         link: "Shop Now",
//     },
// ];
// const featured = [
//     {
//         name: "Featured Products",
//         link: "Shop Now",
//     },
//     {
//         name: "Networking",
//         link: "Shop Now",
//     },
//     {
//         name: "Upgrade Storage Space | S.J Computers",
//         link: "Shop Now",
//     },
//     {
//         name: "Rams",
//         link: "Shop Now",
//     },
// ];

const ProductType = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const products = useSelector(state => state?.products.products);

  // const currentDate = moment();
  // const oneDayAgo = moment().subtract(1, "days");
  // const duration = moment.duration(currentDate.diff(oneDayAgo));
  // const hours = duration.hours();
  // const minutes = duration.minutes();

  const dbDate = new Date().getTime();

  const parsedDate = new Date(dbDate);

  //Once you get the dates, you can do the date calculate, like:

  //Get 1 day in milliseconds
  var one_day = 1000 * 60 * 60 * 24;

  const date1 = new Date('9/9/2020').getTime(); //JUST AN EXAMPLE
  const date2 = new Date('10/9/2020').getTime(); //JUST AN EXAMPLE

  const diffTime = Math.abs(date2 - date1);

  const diffDays = Math.ceil(diffTime / one_day);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    if (!products?.length) {
      try {
        await dispatch(fetchProducts());
      } catch (error) {}
    }
  };
  const categoryArray = [
    {
      id: 1,
      name: 'Shop by Category',
      slug: '',
      link: 'See all',
    },
    {
      id: 2,
      name: 'Gaming Desktops',
      slug: 'gaming_desktops',
      link: 'Shop Now',
    },
    {
      id: 3,
      slug: 'business_computers',
      name: 'Business Desktops',
      link: 'Shop Now',
    },
  ];
  const categoryItems = [
    {
      image: LaptopImgUpdate,
      categoryLink: '/category/laptops',
      categoryName: 'Laptops',
    },
    {
      image: DesktopImgUpdate,
      categoryLink: '/category/desktop',
      categoryName: 'Desktops',
    },
    {
      image: twoInOneImgUpdate,
      categoryLink: '/category/2_in_1_laptops',
      categoryName: '2 in 1 Laptops',
    },
    {
      image: AccessoriesImgUpdate,
      categoryLink: '/category/bto',
      categoryName: 'Accessories',
    },
  ];


  return (
    <div className=' '>
      <div className='row mx-0'>
        {categoryArray.map((category, index) => (
          <div key={index} className='col-12 col-sm-6 col-lg-3'>
            <Link
              to={`/category/${category.slug}`}
              className='text-decoration-none'>
              <div className='product-type-section'>
                <h2 className='h4-heading category-name'>{category.name}</h2>
                <div className='categories-container'>
                  {index === 0 ? (
                    <ProductItem4 items={categoryItems} />
                  ) : (
                    <ProductItem1
                      image={
                        index === 1 ? GamingDesktopImg : categorybusinussweb
                      }
                    />
                  )}
                </div>
                <p className='section-link' to={'/category'}>
                  {category.link}
                </p>
              </div>
            </Link>
          </div>
        ))}
        <div className='col-12 col-sm-6 col-lg-3'>
          <LoginAndTimeProduct />
        </div>
      </div>
    </div>
  );
};

export default ProductType;
