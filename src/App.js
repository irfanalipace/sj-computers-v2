import { BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";

import { getToken } from "@services/jwtService";
import { Router } from "@src/Routes";
import { alreadyLoggedIn } from "@store/auth/authThunks";
import { useInitDataFetching } from "@hooks/useInitDataFetching";
import Header from "@components/Header/Header";
import Footer from "@components/Footer/Footer";

import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MobileHeader from "@components/Header/MobileHeader/MobileHeader";
import MobileSearch from "@components/Header/MobileSearch/MobileSearch";
import React, { useState, useEffect } from 'react';
function App() {
    const dispatch = useDispatch();
    const token = getToken();
    if (token) dispatch(alreadyLoggedIn(token));
    useInitDataFetching();

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    return (
        <div>
        
            <ToastContainer className={"notification-toast"} />
            <BrowserRouter>
             
              
          

            {screenWidth <= 750 ? (
        <div>
        <MobileHeader />
        <MobileSearch />
          {/* components to render when screen width is less than or equal to 750px */}
          
        </div>
      ) : (
        <div>
               <Header />
                <Router />
                <Footer />
          {/* components to render when screen width is greater than 750px */}
        </div>
      )}
            </BrowserRouter>

        </div>
    );
}

export default App;
