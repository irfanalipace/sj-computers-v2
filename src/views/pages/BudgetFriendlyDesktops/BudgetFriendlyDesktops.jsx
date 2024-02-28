import TopBanner from '@components/TopBanner';
import CategoriesHeader from '../../components/Header/CategoriesHeader/CategoriesHeader';

const BudgetFriendlyDesktops = () => {
  return (
    <>
      <CategoriesHeader />
      <TopBanner
        color={'linear-gradient(87.71deg, #BB6BED 0%, #74011D 99.77%)'}
        heading={'Budget Friendly Desktops Under $250'}
        desc={'Our most popular products based on sales. Updated frequently.'}
      />
    </>
  );
};

export default BudgetFriendlyDesktops;
