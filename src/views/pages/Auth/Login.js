import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import logo from '@images/fa-icon.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';

import '../../../App.css'
const Login = () => {
    const dispatch = useDispatch();
    const option = {
        email: "haroon@gmail.com",
        password: "12345678",
    };
    useEffect(() => {
        dispatch(login(option));
    }, []);

    return (
        <div>
        <div className='container'>
          <div className='row'>
            <div className='header-logo'>
              <Header />
            </div>
  
            <form className='auth-inner-body'>
              <h3 className='login-h3'>Sign in</h3>
              <div className="mb-3">
                <label className='email-lable font-weight-bold'>Email or mobile phone number</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                />
              </div>
              {/* <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
            />
          </div> 
          {/* <div className="mb-3">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                Remember me
              </label>
            </div>
          </div> */}
              <div className="d-grid">
                <button type="submit" className="btn btn-primary login-button">
                  Continue
                </button>
              </div>
              <p className="text-muted small">
                By continuing, you agree to SJ Computer’s <a href="#" className='text-decoration-none'>Conditions of Use</a> and <a href="#" className='text-decoration-none'>Privacy Notice</a>.
              </p>
              
  
              <div className='need-help'>
              {/* <i className="fa fa-caret-right" aria-hidden="true"> </i> */}
              {/* <img src={logo} alt="" /> */}
              <FontAwesomeIcon icon={faCaretRight} />
              {' '} {' '} {' '}<a href="#" className="text-decoration-none need-help">Need Help?</a>
              </div>
  
            </form>
            <div className='container new-data'>
              <div className='row'>
                <div className='col-12'>
                  <h5 className='h5-heading'>New to SJ Computers?</h5>
                </div>
  
              </div>
  
            </div>
    
              
            
            <div >
  
  
  
  
  
            </div>
  
            <div className='react-heading' >
              <div class="rectangle">
                Create your SJ Computer account
              </div>
            </div>
  
            <div>
  
            </div>
          </div>
  
        </div>
        <div className='col-md-12' style={{ backgroundColor: '#e9ecef', height: '333px' }}>
          <Footer />
        </div>
      
      </div>
        //  <Link to={"/"}>Home</Link>
        //  <Link to={"/login"}>Login</Link>
       
    );
};

export default Login;
