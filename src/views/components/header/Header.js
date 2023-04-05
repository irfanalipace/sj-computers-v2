import React from 'react';

import footerlogo from'@images/header-logo.png';
// import footerlogo from path.resolve(__dirname, "src/assets/images/header-logo.png");
//import footerlogo from path.join(__dirname, 'app', '@images/header-logo.png');
const Header = () => {
    return (


        <div className='container'>
            <div className='row'>
                <div className='col-12'>
                    <img src={footerlogo} alt='' style={{ height: '64px' }} />
                    <p className='img-logo'>S.J. Computers</p>
                    <p className='img-logo-head'>your tech store !</p>
                </div>
            </div>

        </div>

    )
}
export default Header
