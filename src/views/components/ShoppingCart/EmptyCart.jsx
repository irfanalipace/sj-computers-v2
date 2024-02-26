import image from '@images/Banner/Unionemptycart.png';
import SeggestedItems from './SugestedItems/SeggestedItems';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import Recommendation from "../Recommendation/Recommendation";

const EmptyCart = () => {
  const user = useSelector(state => state?.auth?.isAuthenticated);
  const navigate = useNavigate();

  return (
    <div className='empty-cart-container'>
      <div className='empty-cart'>
        <img src={image} alt='empty-cart' />
        <div className='empty-cart-content'>
          <p>Your SJ Computer Cart is Empty </p>
          <p style={{ fontSize: '12px', color: '#007185' }}>
            Shop today's details
          </p>
          {!user && (
            <div className='btn-grp-emp-cart'>
              <button onClick={() => navigate('/login')}>
                Sign in to your account
              </button>
              <button onClick={() => navigate('/register')}>Sign up now</button>
            </div>
          )}
        </div>
      </div>

      <div className='recommended-items-emptycart hide-on-mobile'>
        <h3>Suggested Items</h3>
        <SeggestedItems num={4} />
      </div>
      {/* <p>
                The price and availability of items at sjcomputers.us are
                subject to change. The Cart is a temporary place to store a list
                of your items and reflects each item's most recent price.
            </p> */}
    </div>
  );
};

export default EmptyCart;
