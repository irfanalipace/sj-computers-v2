import React from 'react';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <div>
      <div className='row'>
        <div className='col-md-12'>
          <p className='footer-mute'>
            <Link to='/term_services' className='text-decoration-none link1'>
              Conditions Of Use
            </Link>
            <Link to='/term_services' className='text-decoration-none link2'>
              Privacy Notice
            </Link>
            <Link to='' className='text-decoration-none link3'>
              Help
            </Link>
          </p>
          <div className='copywrite-text'>
            <small className='copyright-sjcomputer'>
              © 2023 Sjcomputers.us
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
