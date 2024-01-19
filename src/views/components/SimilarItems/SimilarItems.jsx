import React from "react";
import LoaderComponent from "@common/LoaderComponent/LoaderComponent";
import { useDispatch, useSelector } from "react-redux";

import "./SimilarItems.css";
import SimilarItemsSlider from "../Sliders/SimilarItems";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchSimilarProducts } from "@store/products/productsThunks";
import SingleSimilarItem from "../SimilarItemsSingle/SingleSimilarItem";

const SimilarItems = ({ products }) => {
    const isLoading = useSelector((state) => state?.products.isLoading);
    const { title } = useParams();
    const modifyTitle = title.replace(/-/g, " ");
    const dispatch = useDispatch();

    const getSimilarProduct = async () => {
        if (!products?.length) {
            try {
                await dispatch(fetchSimilarProducts({ name: modifyTitle }));
            } catch (error) {}
        }
    };

    useEffect(() => {
        getSimilarProduct();
    }, [products]);

    return (
        <>
            <SingleSimilarItem />
            <SingleSimilarItem />
            <div className="recommendation-container">
                <div className="recommendation-inner">
                    <h3>Get Similar items fast.</h3>
                    <div className="slider-wrapper">
                        {isLoading || !products ? (
                            <LoaderComponent />
                        ) : (
                            <SimilarItemsSlider
                                type="recommended"
                                products={products}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SimilarItems;
