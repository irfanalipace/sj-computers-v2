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
    '@media screen and (max-width: 768px)': {
      height: '150px', // Set height to 150px on mobile screens
      maxHeight: '150px', // Set maxHeight to 150px on mobile screens
      '& h3': {
        fontSize: '24px',
      },
      '& p': {
        lineHeight:'18px',
        fontSize:'15px',
        marginTop:'-12px'
      },
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
            <h3>{heading}</h3>
          </Grid>
          <Grid item sx={{ textAlign: 'center', margin:"3px", }}> 
            <p>{desc}</p>
          </Grid>
        </Grid>
      </StyledTopBanner>
    </>
  );
};

export default TopBanner;
