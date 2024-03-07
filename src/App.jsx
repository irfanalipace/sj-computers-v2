import 'bootstrap/dist/css/bootstrap.min.css';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Router from '@src/Routes';
const TawkTo = lazy(() => import('@components/Tawk.To/Messenger'));
import services from '@services/initServices';
import Header from '@components/Header/Header';
const Footer = React.lazy(() => import('@components/Footer/Footer'));
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import ScrollToTop from '@components/ScrollToTop/ScrollToTop';
import AppWrapper from '@components/AppWrapper/AppWrapper';
import FullScreenWrapper from './views/components/FullScreenWrapper/FullScreenWrapper';
import { useViewportWidth } from '@hooks/useViewportWidth';

function App() {
  const [tawkComponent, setTawkComponent] = useState(<></>);
  services.init(); //initialize all services
  const screenWidth = useViewportWidth();
  useEffect(() => {
    setTimeout(() => {
      let jsx = (
        <Suspense>
          <TawkTo />
        </Suspense>
      );
      setTawkComponent(jsx);
    }, 7000); // giving timeout to tawk.to to improve initial page speed
  }, []);

  return (
    <div>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
        className={'notification-toast'}
      />
      <BrowserRouter>
        <AppWrapper>
          <ScrollToTop />
          <Suspense>
            <Header />
          </Suspense>

          {/* <div className='inner-body'>
            <FullScreenWrapper>
              <Router />
            </FullScreenWrapper>
          </div> */}

          {screenWidth > 576 ? (
            <>
              <div className='inner-body'>
                <FullScreenWrapper>
                  <Router />
                </FullScreenWrapper>
              </div>
            </>
          ) : (
            <>
              <FullScreenWrapper>
                <div className='inner-body'>
                  <Router />
                </div>
              </FullScreenWrapper>
            </>
          )}

          <Suspense>
            <Footer />
          </Suspense>
        </AppWrapper>
      </BrowserRouter>
      {tawkComponent}
      {/* <Suspense>
                <TawkTo />
            </Suspense> */}
    </div>
  );
}

export default App;
