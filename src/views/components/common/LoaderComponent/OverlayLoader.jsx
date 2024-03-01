import Loader from '../Spinner/Spinner';
import './OverlayLoader.css';

const OverlayLoader = ({ isLoading }) => {
  return (
    <div
      className={`component-overlay-loader ${isLoading && 'active'}`}
      style={{ maxHeight: '100%' }}>
      <Loader />
    </div>
  );
};

export default OverlayLoader;
