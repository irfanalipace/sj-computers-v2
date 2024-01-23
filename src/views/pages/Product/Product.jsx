import { useState, useEffect, lazy } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import LoaderComponent from "@common/LoaderComponent/LoaderComponent";
import { productDetailsbyAsinApi } from "@api/products";
import { ProductImage } from "@components/Product/ProductImage/ProductImage";
import ProductDetails from "@components/Product/ProductDetails/ProductDetails";
import { CheckOutCard } from "@components/Product/CheckOutCard/CheckOutCard";
import Recommendation from "@components/Recommendation/Recommendation";
import NotFound from "../NotFound/NotFound";
const ProductReviews = lazy(() =>
    import("../../components/Product/ProductReviews/ProductReviews")
);
import "./Product.css";
import SimilarItems from "../../components/SimilarItems/SimilarItems";
import ProductDescription from "../../components/Product/ProductDescription/ProductDescription";
import RefurbishedSection from "../../components/RefurbishedSection/RefurbishedSection";
import ProductVideo from "../../components/Product/ProductVideo/ProductVideo";
import ProductPageHeader from "../../components/ProductPageHeader/ProductPageHeader";
import VisibleOnScroll from "../../components/VisibleOnScroll";

export default function Product() {
    const [isLoading, setIsLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const [productImages, setProductImages] = useState([]);
    const products = useSelector((state) => state.products.products);
    const similarProducts = useSelector(
        (state) => state.products.similarProducts
    );
    const { productId } = useParams();
      
    useEffect(() => {
        getProductDetails();
    }, [productId]);

    const getProductDetails = async () => {
        const filteredProduct = products.filter(
            (product) => product?.asin == productId
        )[0];
        if (filteredProduct) {
            setProduct(filteredProduct);
            setProductImages(filteredProduct?.image);
        } else {
            setIsLoading(true);
            try {
                const response = await productDetailsbyAsinApi(productId);
                setProduct(response.data);
                setProductImages(response?.data?.image);
                setIsLoading(false);
            } catch (error) {}
        }
        setIsLoading(false);
    };

    const ProductComponent = () => {
        return (
            <div className="row">
                <div className="col-12 col-md-4">
                    <ProductImage ProductImages={productImages} />
                </div>
                <div className="col-12 col-md-5">
                    <ProductDetails product={product} />
                </div>
                <div className="col-12 col-md-3 p-0 m-0">
                    <CheckOutCard product={{ ...product }} />
                </div>
                <div className="hidden-on-tab">
                    <SimilarItems products={similarProducts} />
                </div>
                <ProductVideo />
                <RefurbishedSection />
                <ProductDescription product={product} />
            </div>
        );
    };

    return (
        <>
            {product?.id || isLoading || !products?.length ? (
                <div className="product-page ">
                    <ProductPageHeader />
                    <div className="product-container container-fluid">
                        {isLoading || !products?.length ? (
                            <LoaderComponent />
                        ) : (
                            <ProductComponent />
                        )}

                        <VisibleOnScroll>
                            <ProductReviews reviews={products} productId={productId}/>
                        </VisibleOnScroll>
                        <Recommendation products={products} />
                    </div>
                </div>
            ) : (
                <NotFound />
            )}
        </>
    );
}
