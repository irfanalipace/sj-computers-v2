import { useState, useEffect, memo } from "react";
import { toArray } from "@utils/cartHelpers";
import "./ProductImage.css";

const SelectedImage = ({ image }) => {
    return (
        <div className="image-screen">
            <img
                src={image}
                className="selected-image selected-image-data-icon-slider"
            />
        </div>
    );
};

const ProductImageComponent = ({ ProductImages }) => {
    const [selectedImg, setSelectedImg] = useState(null);
    const [images, setImages] = useState([]);

    useEffect(() => {
        setImages(toArray(ProductImages));
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

export const ProductImage = memo(ProductImageComponent);
