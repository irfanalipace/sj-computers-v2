
import React from 'react'
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

const ResetPassWord = () => {

  return (
    <div>
      <div className='container form-container-reset'>
        <div className='row'>
          <div className='header-logo'>
            <Header />
          </div>

          <form className='auth-inner-body'>
          <h3 className='login-h3-reset'>Password reset required</h3>
              <div className="mb-3">
                <label className='email-lable font-weight'>Please set a new password for your account that you have not used elsewhere. We'll send a One Time Password (OTP) to </label>
              
              </div>
           
           
            <div className="mb-3">
          <h6 className='text-left'>Send OTP to</h6>
          
        </div> 
        <div className="mb-3">
   <div className="custom-control custom-radio text-left">
    <input
      type="radio"
      id="customRadio1"
      name="customRadio"
      className="custom-control-input "
    />

    <label className="custom-control-label radio-button" htmlFor="customRadio1">
    Mud*********r@gmail.com
    </label>
  </div>
  <div className="custom-control custom-radio text-left">
  <input
  type="radio"
  id="customRadio2"
  name="customRadio"
  className="custom-control-input"
  style={{width:'20px'}}
/>
    <label className="custom-control-label radio-button" htmlFor="customRadio2">
    +92302******9456
    </label>
  </div>
</div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary login-button">
                Send OTP
              </button>
            </div>
           
            

            {/* <div className='need-help'>
            <i className="fa fa-caret-right" aria-hidden="true"> </i>{' '} {' '} {' '}<a href="#" className="text-decoration-none need-help">Need Help?</a>
            </div> */}
          </form>
          <h3 className="text-muted small" style={ {
    fontSize: '16px',
   
   
}}>
            Cannot access your email and mobile number?<br></br> 
                Contact <a href="#" className='text-decoration-none ' >Customer Service</a>
            </h3>
          <div >
          </div>
        </div>
      </div>
    
      <div className='col-md-12 sticky-bottom py-3' >
        <Footer />
      </div>
    </div>
  )

}
export default ResetPassWord