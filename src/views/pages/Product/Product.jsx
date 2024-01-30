import { lazy, useEffect } from "react";
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
import VisibleOnScroll, {
    VisibilityProvider,
} from "../../components/VisibleOnScroll";
import useProductData from "./useProductData";
import useSimilarData from "./useSimilarProduct";
import Breadcrumb from "@common/Breadrumb/Breadcrumb";
import { useSearchParams } from "react-router-dom";
import { CLEAR_REVIEW } from "../../../core/store/review/reviewSlice";
import { useDispatch } from "react-redux";
import { generatePath } from "../../../core/utils/helpers";

export default function Product() {
    const dispatch = useDispatch();

    const [searchParams, setSearchParams] = useSearchParams();

    const { isLoading, product } = useProductData();

    // const redirct = (productPath) => {
    //     const productPath = generatePath(productPath);

    //     const url = productPath;
    //     url.searchParams.set("breadcrumb", "Product");
    //     return window.location.productPath;
    // };

    const redirct = (productPath) => {
        const url = generatePath(productPath);
        console.log("Generated URL:", url);

        if (url.searchParams) {
            url.searchParams.set("breadcrumb", "Product");
            console.log("Modified URL:", url.toString());
            window.location.href = url.toString();
        } else {
            console.error("URL does not have searchParams property.");
        }
    };

    const breadcrumbRoutes = [
        {
            label: "Home",
            link: "/",
        },
        {
            label: "Product",
            link: redirct(product?.url),
        },
    ];

    useEffect(() => {
        return () => {
            dispatch(CLEAR_REVIEW());
        };
    }, []);

    return (
        <VisibilityProvider>
            {product?.id || isLoading ? (
                <div className="product-page ">
                    <CategoriesHeader />
                    <div className="product-container container-fluid">
                        <Breadcrumb routes={breadcrumbRoutes} />
                        {isLoading ? (
                            <LoaderComponent />
                        ) : (
                            <>
                                <ProductComponent product={product} />
                                <VisibleOnScroll id="section1">
                                    <div>
                                        <SimilarItemsOfProduct
                                            productId={product?.id}
                                        />
                                        <RefurbishedSection />
                                        <ProductDescription
                                            description={
                                                product?.description
                                                    ?.product_description?.[0]
                                                    ?.value
                                            }
                                        />
                                    </div>
                                </VisibleOnScroll>
                                <TechDetails product={product} />

                                {/* VIDEO-SECTION */}
                                {/* <ProductVideo product={product} />  */}

                                <div id="reviews">
                                    <VisibleOnScroll id="section2">
                                        <ProductReviews
                                            // reviews={products}
                                            // onFilterChange={onFilterChange}
                                            productAsin={product?.asin}
                                            productId={product?.id}
                                        />
                                    </VisibleOnScroll>
                                </div>
                            </>
                        )}
                        <VisibleOnScroll id="section3">
                            <Recommendation />
                        </VisibleOnScroll>
                    </div>
                </div>
            ) : (
                <NotFound />
            )}
        </VisibilityProvider>
    );
}

const ProductComponent = ({ product }) => {
    return (
        <div className="row">
            <div className="col-12 col-md-4">
                <ProductImage ProductImages={product.image} />
            </div>
            <div className="col-12 col-md-5">
                <ProductDetails product={product} />
            </div>
            <div className="col-12 col-md-3 p-0 m-0">
                <CheckOutCard product={{ ...product }} />
            </div>
        </div>
    );
};

const SimilarItemsOfProduct = ({ productId }) => {
    const { similarProducts, featuredProducts, isLoading } =
        useSimilarData(productId);
    return (
        <>
            {isLoading ? (
                <LoaderComponent />
            ) : (
                <>
                    {similarProducts?.length > 0 && (
                        <div className="hidden-on-tab">
                            <SimilarItems
                                similarProducts={similarProducts}
                                featuredProducts={featuredProducts}
                            />
                        </div>
                    )}
                </>
            )}
        </>
    );
};
