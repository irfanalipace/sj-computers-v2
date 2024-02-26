import React from 'react';
import {
  Box,
  CircularProgress,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import StarRatings from 'react-star-ratings';
import RatingWithLabel from '../ProductDetails/RatingWithLabel';

export default function RatingDetails({ productDetails, loading }) {
  const theme = useTheme();

  const isUpSmall = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <Box py={2} pr={2} pl={1} maxWidth={'370px'}>
      {loading ? (
        <Box mt={2} display={'flex'} justifyContent={'center'}>
          <CircularProgress sx={{ width: 'auto' }} disableShrink />
        </Box>
      ) : (
        <>
          <Typography fontWeight={700} fontSize={'20px'} lineHeight={'32px'}>
            Customer reviews
          </Typography>
          <Stack direction='row' alignItems='flex-start'>
            <StarRatings
              rating={productDetails?.rate?.overall_rating}
              starRatedColor='rgb(232, 126, 36)'
              numberOfStars={5}
              name='rating'
              isSelectable={false}
              starDimension={'18px'}
              starSpacing={'0'}
            />

            <Typography
              fontWeight={isUpSmall ? 300 : 700}
              fontFamily={'Inter'}
              fontSize={'18px'}
              lineHeight={'24px'}
            >{`${
              productDetails?.rate?.overall_rating || 0
            } out of 5`}</Typography>
          </Stack>
          {isUpSmall && (
            <Typography
              mt={1}
              mb={2}
              fontWeight={400}
              fontSize={'14px'}
              lineHeight={'20px'}
            >{`${
              productDetails?.rate?.total_rating || 0
            } global rating`}</Typography>
          )}

          {isUpSmall && (
            <Stack spacing={2}>
              <RatingWithLabel
                label='5 Star'
                value={productDetails?.rate?.['5']}
              />
              <RatingWithLabel
                label='4 Star'
                value={productDetails?.rate?.['4']}
              />
              <RatingWithLabel
                label='3 Star'
                value={productDetails?.rate?.['3']}
              />
              <RatingWithLabel
                label='2 Star'
                value={productDetails?.rate?.['2']}
              />
              <RatingWithLabel
                label='1 Star'
                value={productDetails?.rate?.['1']}
              />
            </Stack>
          )}
        </>
      )}
    </Box>
  );
}
