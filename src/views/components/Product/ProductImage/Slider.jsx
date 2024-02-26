import React, { useRef } from 'react';

function Slider({ children }) {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({
      left: -200,
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: 200,
      behavior: 'smooth',
    });
  };

  return (
    <div className='slider'>
      <div className='slider-container' ref={sliderRef}>
        {children}
      </div>
      <button onClick={scrollLeft}>Prev</button>
      <button onClick={scrollRight}>Next</button>
    </div>
  );
}

export default Slider;
