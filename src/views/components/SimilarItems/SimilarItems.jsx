import React from "react";
import LoaderComponent from "@common/LoaderComponent/LoaderComponent";
import { useSelector } from "react-redux";

import "./SimilarItems.css";
import SimilarItemsSlider from "../Sliders/SimilarItems";

const SimilarItems = ({ products }) => {
    const isLoading = useSelector((state) => state?.products.isLoading);

    return (
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
    );
};

export default SimilarItems;
