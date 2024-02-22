import { useState, useEffect, memo } from "react";
import { toArray } from "@utils/cartHelpers";
import "./ProductImage.css";
import { Box, Stack } from "@mui/material";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const SelectedImage = ({ image }) => {
    return (
        <div className="image-screen">
            <img
                alt="selected-image"
                src={image}
                className="selected-image selected-image-data-icon-slider"
            />
        </div>
    );
};

const ProductImageComponent = ({ ProductImages, isMobile = false }) => {
    const [selectedImg, setSelectedImg] = useState(null);
    const [images, setImages] = useState([]);

    useEffect(() => {
        setImages(toArray(ProductImages));
    }, [ProductImages]);

    useEffect(() => {
        setSelectedImg(images[0]); // set default image as selected image
    }, [images]);
    return (
        <div className="image-container">
            <div className="horizontal-box hide-mob">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={isMobile ? "" : "image-wrapper"}
                        onClick={() => setSelectedImg(image)}
                    >
                        {isMobile ? (
                            <Stack gap={2}>
                                {selectedImg === image ? (
                                    <FiberManualRecordIcon
                                        fontSize="small"
                                        sx={{ color: "#318243" }}
                                    />
                                ) : (
                                    <PanoramaFishEyeIcon
                                        fontSize="10"
                                        sx={{ color: "#6F6F6F" }}
                                    />
                                )}
                            </Stack>
                        ) : (
                            <img src={image} alt={`Image ${index}`} />
                        )}
                    </div>
                ))}
            </div>
            <div className="horizontal-box hidden-on-tab hidden-on-desktop">
                {images.map((image, index) => (
                    <div
                        key={index}
                        onClick={() => setSelectedImg(image)}
                        style={{
                            borderRadius: "50%",
                            padding: "5px",
                            margin: "0px 3px",
                            backgroundColor:
                                selectedImg === image ? "#318243" : "#fff",
                            border: "2px solid #6F6F6F",
                        }}
                        className="mb-3"
                    ></div>
                ))}
            </div>

            {selectedImg && <SelectedImage image={selectedImg} />}
        </div>
    );
};

export const ProductImage = memo(ProductImageComponent);
