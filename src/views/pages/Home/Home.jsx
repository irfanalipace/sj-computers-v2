import React, { Suspense } from "react";
import BannerCategory from "./BannerCategory";
const ProductsHomePage = React.lazy(() => import("./ProductsHomePage"));
import { useViewportWidth } from "@hooks/useViewportWidth";
import "./Home.css";
import Subscribe from "../../components/Subscribe/Subscribe";


const Home = () => {
    const screenWidth = useViewportWidth();
    return (
        <>
            <div className="homePage">
                {/* <MobileHomeCategory />*/}
                
                    
                <BannerCategory />
                <Suspense>
                {/* {
                        screenWidth < 576 && (
                            <div className="products-grid-container">
                            <h2>Products</h2>
                            <ProductsHomePage />
                        </div>
                        )
                    } */}
                   
                    {
                        screenWidth > 576 && (
                            <Subscribe />
                        )
                    }
                   
                </Suspense>
            </div>
        </>
    );
};

export default Home;
