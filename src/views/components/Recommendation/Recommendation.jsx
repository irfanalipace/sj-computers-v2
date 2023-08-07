import ProductSlider from "@components/Sliders/ProductSlider";

import "./Recommdation.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "@store/products/productsThunks";
import LoaderComponent from "@common/LoaderComponent/LoaderComponent";

import { useState } from "react";
import { useEffect } from "react";

export default function Recommendation() {
    const dispatch = useDispatch();
    const [product, setProduct] = useState(null);
    const products = useSelector((state) => state.products.products);
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
            <div className="recommendation-container">
                <div className="recommendation-inner">
                    <h3>Recommended Items</h3>
                    <div className="slider-wrapper">
                        {isLoading || !products ? (
                            <LoaderComponent />
                        ) : (
                            <ProductSlider products={products} />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
