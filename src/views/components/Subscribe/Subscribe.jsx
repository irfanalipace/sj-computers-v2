import { Grid } from '@mui/material';
import React from 'react';
import letterImage from '@images/advertisement/Layer_1.png';
import './Subscribe.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Subscribe = () => {
  const user = useSelector(state => state?.auth?.isAuthenticated);
  const navigate = useNavigate();
  return (
    <div style={{ backgroundColor: '#fff' }}>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='center'
        spacing={10}
        mt={1}
        pb={5}>
        <Grid item mt={5}>
          <h3 className='heading-subscribe'>Subscribe to Our Newsletter!</h3>
          <p className='text-subscribe'>
            Stay ahead of the curve with exclusive deals and the latest tech
            insights <br /> delivered straight to your inbox!
          </p>
          <input
            style={{ padding: '5px 10px' }}
            placeholder='Enter your email address here'
            className='input-subscribe'
          />
          <br />
          <button className='button-subscribe'>Subscribe</button>
          <br />
          <Grid container mt={2}>
            <Grid>
              <input
                type='checkbox'
                className='protectionPlanCheckbox '
                id='protectionPlanCheckbox'
              />
            </Grid>
            <Grid>
              <label
                htmlFor='protectionPlanCheckbox'
                style={{ fontSize: '12px', lineHeight: '15px' }}
                // className="mt-3"
              >
                &ensp;By signing up you agree to SJ Computer’s <br />
                &ensp;<Link to={'/privacy_policy'}>Privacy Policy</Link>
                <span style={{ color: '#007185' }}></span>
                &nbsp;and&nbsp;
                <Link to={'/term_services'}>Terms & Condition</Link>
              </label>
            </Grid>
          </Grid>
          <div className='pt-3'>
            <div className='mt-2'></div>
            <div></div>
          </div>
        </Grid>
        <Grid item>
          <img
            src={letterImage}
            style={{ width: '272px' }}
            className='hidden-on-mobile'
          />
        </Grid>
      </Grid>
      <hr />
      <Grid
        container
        direction='column'
        justifyContent='center'
        alignItems='center'
        mt={5}
        mb={2}>
        {!user && (
          <h6 style={{ fontSize: '13px' }}>See personalized recommendations</h6>
        )}
        {!user ? (
          <button className='sign-in-main' onClick={() => navigate('/login')}>
            Sign in
          </button>
        ) : (
          <></>
        )}
        {!user && (
          <p style={{ fontSize: '12px' }} className='mt-2 mb-5'>
            New Customer ? <Link href={!user && '/register'}>Start here.</Link>
          </p>
        )}
      </Grid>
      <hr />
    </div>
  );
};

export default Subscribe;
