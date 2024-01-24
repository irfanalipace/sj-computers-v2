import { lazy } from "react";
import LoaderComponent from "@common/LoaderComponent/LoaderComponent";
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
import TechDetails from "../../components/TechDetails/TechDetails";
import ProductDescription from "../../components/Product/ProductDescription/ProductDescription";
import RefurbishedSection from "../../components/RefurbishedSection/RefurbishedSection";
import ProductVideo from "../../components/Product/ProductVideo/ProductVideo";
import ProductPageHeader from "../../components/ProductPageHeader/ProductPageHeader";
import VisibleOnScroll from "../../components/VisibleOnScroll";
import useProductData from "./useProductData";
import useSimilarData from "./useSimilarProduct";

export default function Product() {
    const { isLoading, product, productImages, products, onFilterChange } =
        useProductData();

    const ProductComponent = () => {
        const { similarProducts } = useSimilarData();
        return (
            <>
                {similarProducts?.length > 0 && (
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
                        <TechDetails product={product} />
                    </div>
                )}
            </>
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
                            <>
                                <VisibleOnScroll>
                                    <ProductComponent />
                                </VisibleOnScroll>
                                <VisibleOnScroll>
                                    <ProductReviews
                                        reviews={products}
                                        onFilterChange={onFilterChange}
                                        productId={product?.asin}
                                    />
                                </VisibleOnScroll>{" "}
                            </>
                        )}

                        <Recommendation products={products} />
                    </div>
                </div>
            ) : (
                <NotFound />
            )}
        </>
    );
}
