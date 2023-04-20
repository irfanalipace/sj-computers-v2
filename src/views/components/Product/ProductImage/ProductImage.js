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

    const getImages = () => {
        if (ProductImages?.length > 0) return ProductImages;
        else
            return [
                ProductImages,
                ProductImages,
                ProductImages,
                ProductImages,
                ProductImages,
            ];
    };

    const images = getImages();

    useEffect(() => {
        const savedImg = localStorage.getItem("selectedImg");
        if (savedImg) {
            setSelectedImg(savedImg);
        } else {
            setSelectedImg(images[0]); // set default image as selected image
        }
    }, []);

    useEffect(() => {
        if (selectedImg) {
            localStorage.setItem("selectedImg", selectedImg);
        } else {
            localStorage.removeItem("selectedImg");
        }
    }, [selectedImg]);

    return (
        <div className="image-container">
            <div className="horizontal-box">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Image ${index}`}
                        onClick={() => setSelectedImg(image)}
                    />
                ))}
            </div>
            {selectedImg && <SelectedImage image={selectedImg} />}
        </div>
    );
};
