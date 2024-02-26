import { Grid, Typography } from '@mui/material';
import React from 'react';

const CategoryParagraph = () => {
  return (
    <Grid container px={[2, 6]} py={[0, 6]} rowGap={1}>
      <Grid item xs={12}>
        <Typography variant='body1' fontWeight={'bolder'} color={'#E87E24'}>
          About SJ Computers
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {/* Welcome to the Office Products & Office Supplies Store at Sjcomputers.com */}
        <Typography variant='body2'>
          {/* Shoping for{" "} */}
          <span style={{ fontWeight: '500' }}>
            Founded in 2012, SJ Computers is driven by a profound passion for
            technology and a steadfast commitment to sustainable practices. Our
            dedicated team of professionals shares a common belief in making
            robust computing solutions accessible to all. We are the official
            retailers of refurbished computers and refurbished laptops from
            multinational brands like Dell, HP and Lenovo.
          </span>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='body2'>
          Our seasoned professionals meticulously ensure optimal performance and
          functionality at every stage of the refurbishment process. Opting for
          SJ Computers provides you with access to the full spectrum of features
          offered by leading brands, all at a significantly reduced cost. For
          the business side of people, we offer a range of business computers
          and business laptops that cater to the workload of offices. Meanwhile,
          gaming laptops and gaming desktops, or gaming computers in general,
          offer stronger processers and advanced GPUs. In addition, SJ Computers
          also stacks several computer accessories that compliment your computer
          sessions.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='body2'>
          Our primary objective is to breathe new life into pre-owned computers,
          sourced from reputable brands such as Dell, HP, and Lenovo. Through a
          meticulous multi-stage refurbishment process, each laptop, desktop,
          and accessory undergo comprehensive inspection, rigorous cleaning, and
          software upgrades.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default CategoryParagraph;
