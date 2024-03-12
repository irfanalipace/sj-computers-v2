import Loader from '@common/Spinner/Spinner';

import './Button.css';

export default function LoadMore({ handleClick, loading, error, small }) {
  return (
    <button
      onClick={handleClick}
      className={`loadMore-btn ${small && 'loadMore-btn--small'}`}
      disabled={loading}>
      {loading ? <Loader /> : error ? 'Show More' : 'Show More'}
    </button>
  );
}
