import React from 'react';
import { useLocation } from 'react-router-dom';

const FullScreenWrapper = ({ children }) => {
  const location = useLocation();

  // console.log(location.pathname, 'route');

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d9d9d9',
        // backgroundColor: location.pathname === '/' ? '#d9d9d9' : '', // also we can change color by routes
        margin: 'auto',
      }}>
      {children}
    </div>
  );
};

export default FullScreenWrapper;
