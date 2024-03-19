import LaptopImg from '../../../assets/images/categories/LaptopUpdate.png';
import DesktopImg from '../../../assets/images/categories/desktopUpdate.png';
import twoInOneLaptopImg from '../../../assets/images/categories/2in1LaptopUpdate.png';
import AccessoriesImg from '../../../assets/images/categories/AccessoriesUpdate.png';
import BusinessDesktopImg from '../../../assets/images/categories/category-desktop.png';
import SffImg from '../../../assets/images/homepageImage/ShopByFormFactor/SffImg.png';
import UsffImg from '../../../assets/images/homepageImage/ShopByFormFactor/UsffImg.png';
import MiniImg from '../../../assets/images/homepageImage/ShopByFormFactor/MiniImg.png';
import TowerImg from '../../../assets/images/homepageImage/ShopByFormFactor/TowerImg.png';

import TouchScreenImg from '../../../assets/images/categories/TouchScreenLaptop.png';
import gamingDesktopsImg from '../../../assets/images/categories/gamingDesktops.png';

import DellLogo from '../../../assets/images/homepageImage/ShopByCategory/DellLogo.png';
import HpLogo from '../../../assets/images/homepageImage/ShopByCategory/HpLogo.png';
import LenovoLogo from '../../../assets/images/homepageImage/ShopByCategory/LenovoLogo.png';
import BtoLogo from '../../../assets/images/homepageImage/ShopByCategory/BtoLogo.png';

export const categoriesWithSubCategories = [
  {
    id: 1,
    category: 'Gaming',
    sub_categories: [
      { name: 'Gaming Desktops', url: '/category/gaming_desktops' },
      { name: 'Gaming Laptops', url: '/category/gaming_laptops' },
    ],
  },
  {
    id: 2,
    category: 'Intel Core Series',
    sub_categories: [
      { name: 'Core i7', url: '/category/core_i7' },
      { name: 'Core i5', url: '/category/core_i5' },
      { name: 'Core i3 ', url: '/category/core_i3' },
    ],
  },
  {
    id: 3,
    category: 'Screens',
    sub_categories: [
      { name: 'Screen 17 inch', url: '/category/screen_17_inch' },
      { name: 'Screen 15 inch', url: '/category/screen_15_inch' },
      { name: 'Screen 14 inch', url: '/category/screen_14_inch' },
      { name: 'Screen 13 inch', url: '/category/screen_13_inch' },
    ],
  },
  {
    id: 4,
    category: 'Professional Workstations',
    sub_categories: [
      { name: 'precision', url: '/category/precision' },
      { name: 'XPS', url: '/category/xps' },
      { name: 'Miscellaneous', url: '/category/miscellaneous' },
    ],
  },
];

export const computerCategories = [
  {
    id: 1,
    category: 'Laptops',
    url: '/category/laptops',
    image_url:
      // 'https://clipart-library.com/images_k/computer-png-transparent/computer-png-transparent-15.png',
      LaptopImg,
  },
  {
    id: 2,
    category: 'Desktops',
    url: '/category/desktops',
    image_url:
      // 'https://clipart-library.com/images_k/computer-png-transparent/computer-png-transparent-15.png',
      DesktopImg,
  },
  {
    id: 3,
    category: '2 in 1 Laptops',
    url: '/category/2_in_1_laptops',
    image_url:
      // 'https://pngimg.com/uploads/computer_pc/small/computer_pc_PNG102137.png',
      twoInOneLaptopImg,
  },
  {
    id: 4,
    category: 'Acccessories',
    url: '/category/bto',
    image_url:
      // 'https://clipart-library.com/images_k/computer-png-transparent/computer-png-transparent-15.png',
      AccessoriesImg,
  },
  {
    id: 5,
    category: 'SFF',
    url: '/category/sff',
    image_url:
      // 'https://clipart-library.com/images_k/computer-png-transparent/computer-png-transparent-15.png',
      SffImg,
  },
  {
    id: 6,
    category: 'USFF',
    url: '/category/usff',
    image_url:
      // 'https://clipart-library.com/images_k/computer-png-transparent/computer-png-transparent-15.png',
      UsffImg,
  },
  {
    id: 7,
    category: 'Mini',
    url: '/category/mini',
    image_url:
      // 'https://pngimg.com/uploads/computer_pc/small/computer_pc_PNG102137.png',
      MiniImg,
  },
  {
    id: 8,
    category: 'Towers',
    url: '/category/tower',
    image_url:
      // 'https://clipart-library.com/images_k/computer-png-transparent/computer-png-transparent-15.png',
      TowerImg,
  },
  // More categories if added up to id 12
];

export const computerCategoriesSlider2 = [
  {
    id: 1,
    category: 'Business Computers',
    url: '/category/business_computers',
    image_url:
      // 'https://clipart-library.com/images_k/computer-png-transparent/computer-png-transparent-15.png',
      LaptopImg,
  },
  {
    id: 2,
    category: 'Touch Screen',
    url: '/category/touch_screen',
    image_url:
      'https://qistmarket.com/wp-content/uploads/2023/08/Lenovo-80vv-Core-i5-7th-Generation-Touch-Screen-2k-display-Detectable.jpg.png',
    // TouchScreenImg,
  },
  {
    id: 3,
    category: 'Window 10',
    url: '/category/window_10',
    image_url:
      'https://i.pinimg.com/736x/9d/73/dc/9d73dca20efe574d447d72982326c5f8.jpg',
    // twoInOneLaptopImg,
  },
  {
    id: 4,
    category: 'Window 11',
    url: '/category/window_11',
    image_url:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS4FrWgri1JFvehRSQzTztKlju-ICb_HqQaNn2sdSJgk_Q6TeHwAIcRLDpsZHsSmBIFbM&usqp=CAU',
    // AccessoriesImg,
  },
  {
    id: 5,
    category: 'Tiny',
    url: '/category/tiny',
    image_url: 'https://img.myipadbox.com/sec/product_l/EDA004325204C.jpg',
    // SffImg,
  },
  {
    id: 6,
    category: 'XPS',
    url: '/category/xps',
    image_url:
      'https://i.pcmag.com/imagery/articles/05df5eCaW7WRVPDv8eefwx1-2..v1570756936.jpg',
    // UsffImg,
  },
  {
    id: 7,
    category: 'Miscellaneous',
    url: '/category/miscellaneous',
    image_url:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThZ3NwaVrd17r3vlKlBUi6m_4t1y-owcHTooMXhvPKbKCaNup4NwhkxvIHN0wyOpuIVFc&usqp=CAU',
    // MiniImg,
  },
  {
    id: 8,
    category: 'Gaming Desktops',
    url: '/category/gaming_desktops',
    image_url:
      'https://in-files.apjonlinecdn.com/landingpages/category-family/hp-gaming-family/images/desktops/w100_omendesktops_desktop_hover.png',
    // gamingDesktopsImg,
  },
  // More categories if added up to id 12
];

//   export default computerCategories
export const brandCategory = [
  {
    id: 1,
    category: 'DELL',
    image_url:
      // 'https://upload.wikimedia.org/wikipedia/commons/2/25/Dell_logo.png',
      DellLogo,
    categoryLink: '/category/all?brand=Dell',
  },
  {
    id: 2,
    category: 'HP',
    image_url:
      // 'https://www.freepnglogos.com/uploads/original-samsung-logo-10.png',
      HpLogo,
    categoryLink: '/category/all?brand=HP',
  },
  {
    id: 3,
    category: 'Lenovo',
    image_url:
      // 'https://www.freepnglogos.com/uploads/apple-logo-png/apple-logo-png-dallas-shootings-don-add-are-speech-zones-used-4.png',
      LenovoLogo,
    categoryLink: '/category/all?brand=Lenovo',
  },
  {
    id: 4,
    category: 'BTO',
    image_url:
      // 'https://www.freepnglogos.com/uploads/lg-logo-png/lg-logo-logo-png-transparent-svg-vector-bie-supply-0.png',
      BtoLogo,
    categoryLink: '/category/bto',
  },
  // More categories if added up to id 12
];
