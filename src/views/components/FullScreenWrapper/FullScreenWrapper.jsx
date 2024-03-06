import React from 'react';
import { useLocation } from 'react-router-dom';

const FullScreenWrapper = ({ children }) => {
  const location = useLocation();

  // console.log(location.pathname, 'route');

  return (
    <div
      style={{
        width: '100%',
        maxWidth: location.pathname == '/' ? '' : '1450px',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'white',
        backgroundColor: location.pathname == '/' ? '#d9d9d9' : 'white',
        margin: 'auto',
      }}>
      {children}
    </div>
  );
};

export default FullScreenWrapper;
