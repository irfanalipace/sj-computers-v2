import React from 'react';
import { Box, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import DOMPurify from 'dompurify';

const ProductDescription = ({ description }) => {
  const theme = useTheme();

  const isUpSmall = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <Grid
      container
      borderTop={'1px solid lightgray'}
      rowSpacing={1}
      pt={isUpSmall && 3}>
      <Grid item xs={12}>
        {description && (
          <Typography
            variant='body1'
            fontWeight={'bold'}
            fontSize={!isUpSmall && '14px'}>
            Product Description
          </Typography>
        )}
      </Grid>
      <Grid item xs={12}>
        {/* <Typography variant="body1" ml={3}> */}
        <Box
          sx={{ fontSize: !isUpSmall ? '12px' : '14px', lineHeight: '20.16px' }}
          pb={2}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(description),
          }}></Box>
        {/* </Typography> */}
      </Grid>
    </Grid>
  );
};

export default ProductDescription;
