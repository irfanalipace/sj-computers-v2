import React from 'react'
import { Link } from 'react-router-dom'
import SellingProducts from '../../../MobileCategory/SellingProducts/SellingProducts'
const SellingPro = ({images}) => {
  return (
    <div>
         <div className="row mx-0">
                <div className="col-12 col-sm-12 col-lg-12">
                    <Link to={""} className="text-decoration-none">
                        <div className="product-type-section-selleing-products">
                            <div className='d-flex'>
                                <h4>Top Rating Products</h4>
                                <p style={{marginLeft: "20px", fontSize: '12px', color: "#007185"}}> See all </p>
                            </div>
                            <SellingProducts images={images} />
                        </div>
                    </Link>
                </div>
            </div>
    </div>
  )
}

export default SellingPro
