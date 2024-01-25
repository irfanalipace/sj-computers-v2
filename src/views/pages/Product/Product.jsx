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
import CategoriesHeader from "../../components/Header/CategoriesHeader/CategoriesHeader";
import VisibleOnScroll from "../../components/VisibleOnScroll";
import useProductData from "./useProductData";
import useSimilarData from "./useSimilarProduct";
import Breadcrumb from "@common/Breadrumb/Breadcrumb";
import { useSearchParams } from "react-router-dom";

export default function Product() {

    const [searchParams, setSearchParams] = useSearchParams();
    const { isLoading, product, productImages, products, onFilterChange } =
        useProductData();

   
    
        const redirct = (pathUrl) => {
            const url = new URL(pathUrl || 'https://www.sjcomputers.us');
            url.searchParams.set('breadcrumb', 'Product');
            return window.location.pathname;
        };
        
        const breadcrumbRoutes = [
            {
                label: 'Home',
                link: '/',
            },
            {
                label: 'Product',
                link: redirct(product?.url),
            },
        ];
        

    const ProductComponent = () => {


        const { similarProducts } = useSimilarData();
        return (
            <>
                {products?.length > 0 && (
                    <div className="row">
                        <Breadcrumb routes={breadcrumbRoutes} />
                        <div className="col-12 col-md-4">
                            <ProductImage ProductImages={productImages} />
                        </div>
                        <div className="col-12 col-md-5">
                            <ProductDetails product={product} />
                        </div>
                        <div className="col-12 col-md-3 p-0 m-0">
                            <CheckOutCard product={{ ...product }} />
                        </div>
                        {similarProducts?.length > 0 && (
                            <VisibleOnScroll>
                                <div className="hidden-on-tab">
                                    <SimilarItems products={similarProducts} />
                                </div>
                            </VisibleOnScroll>
                        )}
                        <ProductVideo product={product} />

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
                    <CategoriesHeader />
                    <div className="product-container container-fluid">
                        {isLoading || !products?.length ? (
                            <LoaderComponent />
                        ) : (
                            <>
                                <ProductComponent />
                                <VisibleOnScroll>
                                    <ProductReviews
                                        reviews={products}
                                        onFilterChange={onFilterChange}
                                        productAsin={product?.asin}
                                        productId={product?.id}
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
