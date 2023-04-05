import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import Header from "@components/auth/Header";
import Footer from "@components/auth/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';

const Login = () => {

    return (
        <div>
        <div className='container form-container'>
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
              <div className="rectangle">
              <Link to='/Register' className="text-decoration-none" style={{color:'#333333'}}>Create your SJ Computer account</Link>
                
              </div>
            </div>
  
            <div>
  
            </div>
          </div>
  
        </div>

       <div className="container-fluid bg-light">
  <div className="row">
    <div className="col">
      <div className="sticky-bottom py-3" >
      <Footer />
      </div>
    </div>
  </div>
</div>
      </div>
       
    );
};

export default Login;
