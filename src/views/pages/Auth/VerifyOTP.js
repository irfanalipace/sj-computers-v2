import React from 'react'
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import vectoricon from '../image/vector.png'
// import './style.css'
import '../../../App.css'

const VerifyOTP = () => {

  return (
    <div>
      <div className='container form-container-verify'>
        <div className='row'>
          <div className='header-logo'>
            <Header />
          </div>

          <form className='auth-inner-body'>
            <h3 className='login-h3-verify'>Verification required</h3>
            One Time Password (OTP) sent to<br></br> +92********80. Please enter it below.
            <br></br><br></br>
            <div className="mb-3">
              <label className='name-lable font-weight-bold'>Enter OTP</label>
              <input
                type="text"
                className="form-control"
               
              />
            </div>
          

            <div className="d-grid">
              <button type="submit" className="btn btn-primary login-button">
                Send OTP
              </button>
            </div>
            <p className="text-muted small">
            <a href="#" className='text-decoration-none ' style={{paddingLeft:'172px'}}>Resend OTP</a> 
            </p>



            <p className="forgot-password text-left">
              <a href="/sign-in" className='text-decoration-none'>I need more help</a>
            </p>

          </form>
    
          <div >
          </div>
          <div>

          </div>
        </div>

      </div>
      <br></br>
      <div className='col-md-12 sticky-bottom py-3' style={{ }}>
        <Footer />
      </div>

    </div>
  )

}
export default VerifyOTP