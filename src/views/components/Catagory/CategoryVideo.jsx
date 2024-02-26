import React from 'react';
import { Grid } from '@mui/material';

const CategoryVideo = () => {
  return (
    <div style={{ height: '270px' }}>
      <iframe
        width='100%'
        height={'100%'}
        src='https://www.youtube.com/embed/yAoLSRbwxL8?si=klPrYjuzp98NIs8p'
        title='YouTube video player'
        frameborder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        allowfullscreen
      ></iframe>
    </div>
  );
};

export default CategoryVideo;
