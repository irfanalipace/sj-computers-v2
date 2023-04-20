import React, { useState, useEffect } from "react";
import "./ProductImage.css";

const SelectedImage = ({ image }) => {
    return (
        <div className="image-screen">
            <img src={image} className="selected-image" />
        </div>
    );
};

export const ProductImage = ({ ProductImages }) => {
    const [selectedImg, setSelectedImg] = useState(null);
    const [images, setImages] = useState([]);

    const getImages = () => {
        if (Array.isArray(ProductImages)) {
            return ProductImages;
        } else {
            return [
                ProductImages,
                ProductImages,
                ProductImages,
                ProductImages,
                ProductImages,
            ];
        }
    };

    useEffect(() => {
        setImages(getImages());
    }, []);

    useEffect(() => {
        setSelectedImg(images[0]); // set default image as selected image
    }, [images]);

    return (
        <div className="image-container">
            <div className="horizontal-box">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="image-wrapper"
                        onClick={() => setSelectedImg(image)}
                    >
                        <img src={image} alt={`Image ${index}`} />
                    </div>
                ))}
            </div>
            {selectedImg && <SelectedImage image={selectedImg} />}
        </div>
    );
};
