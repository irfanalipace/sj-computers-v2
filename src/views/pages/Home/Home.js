import Header from "@components/header/Header";
import Footer from "@components/footer/footer";
import BannerSlider from "@components/Sliders/BannerSlider";
import { ProductType } from "@components/homeproduct/ProductType";
import Recommendation from "@components/Recommendation/Recommendation";

const Home = () => {
    return (
        <div>
            <Header />
            <BannerSlider />
            <ProductType />
            <Recommendation />
            <Footer />
        </div>
    );
};
export default Home;
