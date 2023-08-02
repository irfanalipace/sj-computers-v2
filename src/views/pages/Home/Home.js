import React, { Suspense } from "react";
import BannerCategory from "./BannerCategory";
// import CarouselSlider from "@components/Sliders/CarouselSlider";
// import ProductThreeItem from "@components/homeproduct/product3category/ProductThreeItem";
// import Recommendation from "@components/Recommendation/Recommendation";
// import ProductsHomePage from "./ProductsHomePage";
const ProductsHomePage = React.lazy(() => import("./ProductsHomePage"));
import Loader from "@common/LoaderComponent/LoaderComponent";

// import SellingProducts from "@components/MobileCategory/SellingProducts/SellingProducts";
import "./Home.css";
import PageWrapper from "../../../PageWrapper";

const Home = () => {
    // const handleResize = () => {
    //     setScreenWidth(window.innerWidth);
    // };
    // const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    return (
        <PageWrapper title='SJ | Home'>
        <div className="homePage">
            {/* <MobileHomeCategory />
                
                        <SellingProducts /> */}
            <BannerCategory />
            <Suspense>
                <div className="products-grid-container">
                    <h3>Products</h3>
                    <ProductsHomePage />
                </div>
            </Suspense>

            {/* <CarouselSlider /> */}
            {/* <ProductThreeItem /> */}
            {/* <Recommendation /> */}
        </div>
        </PageWrapper>
    );
};

export default Home;
