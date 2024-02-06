import React, { Suspense } from "react";
import BannerCategory from "./BannerCategory";
const ProductsHomePage = React.lazy(() => import("./ProductsHomePage"));

import "./Home.css";
import Subscribe from "../../components/Subscribe/Subscribe";
import SellingProducts from "../../components/MobileCategory/SellingProducts/SellingProducts";

const Home = () => {
    return (
        <>
            <div className="homePage">
                {/* <MobileHomeCategory />*/}
                
                    
                <BannerCategory />
                <Suspense>
                    <div className="products-grid-container">
                        <h2>Products</h2>
                        <ProductsHomePage />
                    </div>
                    <Subscribe />
                </Suspense>
            </div>
        </>
    );
};

export default Home;
