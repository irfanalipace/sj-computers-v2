import React from 'react'
import { Link } from 'react-router-dom'
import SellingProducts from '../../../MobileCategory/SellingProducts/SellingProducts'
const FlashProducts = ({images}) => {
  return (
    <div>
        <div className="row mx-0">
                <div className="col-12 col-sm-12 col-lg-12">
                    <Link to={""} className="text-decoration-none">
                        <div className="product-type-section-selleing-products">
                            <div>
                                <h4>Flash Sale on Items</h4>
                            </div>
                            <SellingProducts images={images} />
                        </div>
                    </Link>
                </div>
            </div>
    </div>
  )
}

export default FlashProducts
