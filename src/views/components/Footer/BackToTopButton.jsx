import React, { useState, useEffect } from 'react';
import arrowfun from '@images/common/arrow.png';
import './Footer.css';
function BackToTopButton() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {showButton && (
        <button onClick={handleClick} className='back-to-top-button '>
          Back to top <img src={arrowfun} alt='' style={{ width: '16px' }} />
        </button>
      )}
    </>
  );
}

export default BackToTopButton;
