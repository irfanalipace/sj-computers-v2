import React from 'react';
import { Grid } from '@mui/material';
import categoryVideo from '../../../assets/Videos/CategoryVideo/categoryVideo.webm';

const CategoryVideo = () => {
  return (
    <div style={{ height: '270px' }}>
      {/* <iframe
        width='100%'
        height={'100%'}
        src='https://www.youtube.com/embed/yAoLSRbwxL8?si=klPrYjuzp98NIs8p'
        title='YouTube video player'
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        allowFullScreen></iframe> */}
      <video width={'100%'} autoPlay loop muted controls={false}>
        <source src={categoryVideo} type='video/webm' />
      </video>
    </div>
  );
};

export default CategoryVideo;
