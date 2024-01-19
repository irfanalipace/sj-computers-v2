import ProductSlider from "@components/Sliders/ProductSlider";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "@store/products/productsThunks";
import LoaderComponent from "@common/LoaderComponent/LoaderComponent";
import { useEffect } from "react";
import "./Recommdation.css";

export default function Recommendation({ products }) {
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state?.products.isLoading);

    useEffect(() => {
        getProduct();
    }, [products]);

    const getProduct = async () => {
        if (!products?.length) {
            try {
                await dispatch(fetchProducts());
            } catch (error) {}
        }
    };

    return (
        <>
            <div className="recommendation-container product-section">
                <div className="recommendation-inner">
                    <h3 className="product-section-heading">
                        Recommended Items
                    </h3>
                    <div className="slider-wrapper">
                        {isLoading || !products ? (
                            <LoaderComponent />
                        ) : (
                            <ProductSlider
                                type="recommended"
                                products={products}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
