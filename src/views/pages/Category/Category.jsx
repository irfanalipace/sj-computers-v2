import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import FilterBar from '@components/FilterBar/FilterBar';
import Loader from '@common/LoaderComponent/OverlayLoader';

import ProductsByCategory from './ProductsByCategory';

import './Category.css';
import CategoriesHeader from '../../components/Header/CategoriesHeader/CategoriesHeader';
import CategoryVideo from '../../components/Catagory/CategoryVideo';
import CategorySlider from '../../components/Catagory/CategorySlider/CategorySlider';
import CategorySidebar from '../../components/Catagory/CategorySidebar/CategorySidebar';
import CategoryParagraph from './CategoryParagraph';
import CategoryVideoAndSlider from '../../components/Catagory/CategoryVideoAndSlider';
import MobileRecommand from '../../components/MobileCategory/MobileRecommand/MobileRecommand';
import CategoryFilterbarMobile from '../../components/Catagory/CategoryFiterbarMobile/CategoryFilterbarMobile';

function Category() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFilter = () => {
    setIsOpen(state => !state);
  };
  return (
    <div className='category-page'>
      <CategoriesHeader />

      <div className='d-sm-none'>
        <CategoryFilterbarMobile />
      </div>
      <div className='category-page-inner'>
        <div>
          <Loader isLoading={false} />
        </div>
        {isOpen && (
          <div onClick={toggleFilter} className='sidebarOverlay'></div>
        )}

        <CategoryVideoAndSlider />

        {/* display flex for layout2 */}
        <div style={{ display: 'flex' }}>
          {/* <div className={`sticky-filter-bar ${isOpen && "active"} d-none d-sm-block`}> */}
          {/* for layout2 */}
          <div
            className={`item-1 layout2-filter-bar ${
              isOpen && 'active'
            } d-none d-sm-block`}
          >
            {/* <div className="d-flex justify-content-between align-items-center heading">
                            <h3>Filters</h3>
                            <button
                                className="d-sm-none d-block bg-transparent border-0"
                                onClick={toggleFilter}
                            >
                                <FontAwesomeIcon size="lg" icon={faTimes} />
                            </button>
                        </div> */}
            {/* <FilterBar /> */}
            <CategorySidebar />
          </div>
          <div className='item-2'>
            <ProductsByCategory toggleFilter={toggleFilter} />
          </div>
        </div>
      </div>

      <CategoryParagraph />

      <div className='d-sm-none'>
        <MobileRecommand />
      </div>
    </div>
  );
}

export default Category;
