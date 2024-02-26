import DellLogo from '../../../assets/images/homepageImage/ShopByCategory/DellLogo.png';
import HpLogo from '../../../assets/images/homepageImage/ShopByCategory/HpLogo.png';
import LenovoLogo from '../../../assets/images/homepageImage/ShopByCategory/LenovoLogo.png';
import BtoLogo from '../../../assets/images/homepageImage/ShopByCategory/BtoLogo.png';
import SffImg from '../../../assets/images/homepageImage/ShopByFormFactor/SffImg.png';
import MiniImg from '../../../assets/images/homepageImage/ShopByFormFactor/MiniImg.png';
import TowerImg from '../../../assets/images/homepageImage/ShopByFormFactor/TowerImg.png';
import UsffImg from '../../../assets/images/homepageImage/ShopByFormFactor/UsffImg.png';
import TowerDesktopImg from '../../../assets/images/homepageImage/BudgetFrindlyDesktops/TowerDesktopImg.png';
import CompactDesktopImg from '../../../assets/images/homepageImage/BudgetFrindlyDesktops/CompactDesktopImg.png';
import WorkStationDesktopImg from '../../../assets/images/homepageImage/BudgetFrindlyDesktops/WorkStationDesktopImg.png';
import FullSizeDesktopImg from '../../../assets/images/homepageImage/BudgetFrindlyDesktops/FullSizeDesktopImg.png';

export const shopByCategoryHomePage = [
  {
    // image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Dell_logo.png",
    image: DellLogo,
    categoryLink: '/category/bto',
    categoryName: 'Dell',
  },
  {
    image: HpLogo,
    // image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/HP_logo_2012.svg/1024px-HP_logo_2012.svg.png",
    categoryLink: '/category/laptops',
    categoryName: 'HP',
  },
  {
    image: LenovoLogo,
    // image: "https://1000logos.net/wp-content/uploads/2017/03/Lenovo-Logo-2003.png",
    categoryLink: '/category/desktop',
    categoryName: 'Lenovo',
  },
  {
    image: BtoLogo,
    // image: "https://bto.us/cdn/shop/files/BTO-logo.webp?v=1704702209&width=110",
    categoryLink: '/category/gaming_desktops',
    categoryName: 'BTO',
  },
];

export const ShopByFormFactorHomePage = [
  {
    image: SffImg,
    // image: "https://files.refurbed.com/ii/dell-optiplex-7050-sff-1673339333.jpg",
    categoryLink: '/category/sff',
    categoryName: 'SFF',
  },
  {
    image: MiniImg,
    // image: "https://www.mbcommunication.com.pk/4802-large_default/intel-nt12.jpg",
    categoryLink: '/category/mini',
    categoryName: 'Mini',
  },
  {
    image: TowerImg,
    // image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNwOXf3PYGYs7LceVZxSEPVUEI1Pp8gpQaJukhqYONUw&s",
    categoryLink: '/category/tower',
    categoryName: 'Tower',
  },
  {
    image: UsffImg,
    categoryLink: '/category/usff',
    categoryName: 'USFF',
  },
];

export const BudgetFriendlyDesktopsHomepage = [
  {
    image: TowerDesktopImg,
    // image: 'https://5.imimg.com/data5/HI/PC/MY-12891264/computer-500x500.jpg',
    categoryLink: '/category/bto',
    categoryName: 'Tower Desktops',
  },
  {
    image: CompactDesktopImg,
    // image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFLacq8lq418sCgcdCPAg98-8cZC7CEF03Ug&s',
    categoryLink: '/category/laptops',
    categoryName: 'Compact Desktops',
  },
  {
    image: WorkStationDesktopImg,
    // image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu3npkk2sLCcFmZfTFKP8XKz62_DwfLLqGeIPcMzlQ2A&s',
    categoryLink: '/category/desktop',
    categoryName: 'Work Stations',
  },
  {
    image: FullSizeDesktopImg,
    // image: 'https://mms.businesswire.com/media/20151020006538/en/492013/5/Dell-OptiPlex-family.jpg',
    categoryLink: '/category/gaming_desktops',
    categoryName: 'Full Size Desktops',
  },
];
