import Header from "@components/header/Header";
import Footer from "@components/footer/Footer";
import Slider from "@components/slider/Slider";
import { Product } from "@components/homeproduct/Product";

const Home = () => {
    return (
        <div>
            <Header />
            <Slider />
            <Product />
            <Footer />
        </div>
    );
};
export default Home;
