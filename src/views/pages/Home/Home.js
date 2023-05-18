import BannerCategory from "./BannerCategory";
// import CarouselSlider from "@components/Sliders/CarouselSlider";
// import ProductThreeItem from "@components/homeproduct/product3category/ProductThreeItem";
// import Recommendation from "@components/Recommendation/Recommendation";
import ProductsHomePage from "./ProductsHomePage";
import SellingProducts from "@components/MobileCategory/SellingProducts/SellingProducts";
import "./Home.css";

const Home = () => {
    // const handleResize = () => {
    //     setScreenWidth(window.innerWidth);
    // };
    // const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    return (
        <div className="homePage">
            {/* <MobileHomeCategory />
                
                        <SellingProducts /> */}
            <BannerCategory />

            <div className="products-grid-container">
                <h3>Products</h3>
                <ProductsHomePage />
            </div>

            {/* <CarouselSlider /> */}
            {/* <ProductThreeItem /> */}
            {/* <Recommendation /> */}
        </div>
    );
};

export default Home;
