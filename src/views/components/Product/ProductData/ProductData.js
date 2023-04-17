
import './ProductData.css'
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductData = () => {
    
    
      return (
        <div>
        <div className='col-md-12'>
           
            <p className='item-title'>LG 24ML600M-B 24” Full HD IPS con 3
lados vitualmente sin bordes monitor
con doble HDMI - Negro</p>
<p className='most-demandind'>Most demanding </p>
        </div>
       
       <div className='review'>
        <div className=' star'>
<span className="fa fa-star checked"></span>
<span className="fa fa-star checked"></span>
<span className="fa fa-star checked"></span>
<span className="fa fa-star checked"></span>
<span className="fa fa-star chek"></span>
</div>
<div>
<Link className=' links-rting'>66 ratings</Link>
{/* <hr className='hr-rorate'></hr> */}
<Link  className='links-rting'>11 answered questions</Link>
</div>

</div>
<div className='item-data'>
    <div> 
           <button className='selling-button'>
        Top Selling
    </button></div>
<div>
<span className='size-text'>Size</span>
   
</div>
<div className='moniter-data'>
<Link  className='moniter-links'> “lg 24 inch monitor” </Link>
</div>
    
</div>
<hr></hr>

    

     
        </div>
      );
    }

export default ProductData