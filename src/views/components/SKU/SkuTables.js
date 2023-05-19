import React from "react";
import './SkuTables.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Table from './Table'
const SkuTables = () => {
    return (
        <div>
         <div className="sku-page-dev">
         <div className="row">
                <div className="col-12">
                           {''} <span> Search</span>
                    <div className="seach-input-sku">

                            <input type="text" className="search-sku-input-fields" placeholder="Search by Name, ASIN"/>
                            <FontAwesomeIcon icon={faSearch} className="search-icon" />
                        </div>
 

                </div>
            </div>
            <div className="row">
                 <div className="sku-main-dev-button">
                 <span>Add or Release Product’s quantity</span>
                       <div style={{marginTop:'10px', paddingBottom:'4px'}}>
                    
                        <input type="text" className="search-sku-input-asin" placeholder="Enter or Name ASIN"/>
                        <input type="text" className="search-sku-input-quantity" placeholder="Add Quantity"/>
                    
                    
                        </div>

                        <div className="button-sku-button">
                            <button>Hold</button>
                            <button style={{background:'#269C40', border:'none'}}>Release</button>
                        </div>
                 </div>
            </div>
            <div>
            <div className="col-lg-8 col-md-10 col-sm-12">
          <div style={{marginTop:'28px'}}>
          <h3 className="your-selected-product-sku">Your Selected Products</h3>
            <Table />
            </div>
            <button className="buy-now-button-sku">
              Buy Now
            </button>
          </div>
                </div>
         </div>
        </div>
    );
};

export default SkuTables;
