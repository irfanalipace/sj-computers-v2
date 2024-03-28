import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import StarRatings from 'react-star-ratings';
import { generatePath } from '../../../../core/utils/helpers';
import { faTruck } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const CategorySliderCard = ({ product }) => {
  const supStyle = {
    position: 'relative',
    top: '-1.3ex',
    fontWeight: 500,
    fontSize: '10px',
  };

  const twoLineTypography = {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    WebkitLineClamp: 2, // Limit the number of displayed lines
    lineHeight: '1.5em', // Adjust the line height as needed
  };

  return (
    <Grid
      container
      // className=" ms-3 ms-lg-0"
      // border={".5px solid gray"}
      borderRadius={'10px'}
      height={'285px'}
      // style={{ padding: '24px' }}
    >
      <Grid
        item
        xs={12}
        m={'auto'}
        height={'150px'}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Link
          // to={`${new URL(product?.url).pathname}`}
          to={generatePath(product?.url)}
          style={{ textDecoration: 'none' }}>
          <LazyLoadImage
            // width={"90px"}
            // height={"100%"}
            // width={"100%"}
            style={{ maxHeight: '145px', maxWidth: '100%' }}
            src={product?.image}
            alt={product?.name?.trim()?.split(' ')?.slice(0, 9)?.join(' ')}
          />
        </Link>
      </Grid>

      <Link
        // to={`${new URL(product?.url).pathname}`}
        to={generatePath(product?.url)}
        style={{ textDecoration: 'none' }}>
        <Grid item xs={12} m={'auto'} py={0} px={2} sx={{ color: '#007185' }}>
          <Typography
            variant={'body2'}
            sx={{ ...twoLineTypography, '&:hover': { color: '#E87E24' } }}>
            {product?.name}
          </Typography>
        </Grid>

        <Grid
          item
          px={2}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'left',
             width:'131px'
          }}>
          <StarRatings
            rating={parseFloat(product?.rating || 0)}
            starRatedColor='rgb(232, 126, 36)'
            numberOfStars={5}
            name='rating'
            isSelectable={false}
            starDimension={'16px'}
            starSpacing={'0'}
          />
          <Typography variant='span' fontSize={'10px'} color={'#007185'}>
            {product?.total_review}
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          m={'auto'}
          py={4}
          px={2}
          sx={{ color: 'black' }}
          mt={-3}>
          <Typography variant={'body2'}>
            {/* ${product?.price}{' '} */}
            <sup style={supStyle}>$</sup>
            <span
              style={{ padding: '2px', fontSize: '20px', fontWeight: '500' }}>
              {product?.price?.toString().split('.')[0]}
            </span>
            <sup style={supStyle}>
              {product?.price?.toString().split('.')[1]}
            </sup>
            {/* <span
              style={{
                marginLeft: '10px',
                fontSize: '12px',
                textDecoration: 'line-through',
                color: '#666666',
              }}>
              ${parseFloat(((product?.price * 2) / 1.5).toFixed(2))}
            </span> */}
          </Typography>
          <div style={{ fontSize: '12px', marginTop: '5px', color: '#6f6f6f' }}>
            <FontAwesomeIcon icon={faTruck} style={{ color: '#6f6f6f' }} /> Free
            shipping
          </div>
          {/* <Typography variant="body2">${parseFloat((product?.price*2/1.5).toFixed(2))}</Typography> */}
        </Grid>
      </Link>
    </Grid>
  );
};

export default CategorySliderCard;
