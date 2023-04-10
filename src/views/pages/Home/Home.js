import Header from "@components/header/Header";
import Footer from "@components/footer/footer";
import BannerSlider from "@components/slider/BannerSlider";
import { ProductType } from "@components/homeproduct/ProductType";

const Home = () => {
    return (
        <div>
            <Header />
            <BannerSlider />
            <ProductType />
            <Footer />
        </div>
    );
};
export default Home;
