import { Grid, styled } from '@mui/material';

const TopBanner = ({ color, heading, desc }) => {
  const StyledTopBanner = styled('span')({
    color: 'darkslategray',
    background: color,
    height: '176px',
    maxHeight: '176px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& h3': {
      color: '#FFFFFF',
      fontSize: '45px',
      fontWeight: 600,
      lineHeight: '54px',
    },
    '& p': {
      color: '#FFFFFF',
      fontSize: '18px',
      fontWeight: 500,
    },
  });
  return (
    <>
      <StyledTopBanner>
        <Grid
          container
          direction='column'
          justifyContent='center'
          alignItems='center'>
          <Grid item>
            {' '}
            <h3>{heading}</h3>
          </Grid>
          <Grid item>
            <p>{desc}</p>
          </Grid>
        </Grid>
      </StyledTopBanner>
    </>
  );
};

export default TopBanner;
