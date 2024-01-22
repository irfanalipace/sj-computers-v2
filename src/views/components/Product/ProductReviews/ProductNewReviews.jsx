import React, { useState } from "react";
import "./ProductReviews.css";
import img from "../../../../assets/images/product/productreview/productreview.png";
import { Box, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCamera } from "@fortawesome/free-solid-svg-icons";
import AddVideoDialogBox from "../../AddVideoDialogBox/AddVideoDialogBox";
import CustomPhotoLibrary from "../../AddVideoDialogBox/CustomPhotoLibrary";
import Rating from '@mui/material/Rating';
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { getUserId } from "@services/authService";

import { productPreviewApi } from "@api/products";

const ProductNewReviews = () => {

    const [dialogBoxOpen, setDialogBoxOpen] = useState(false);
    const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
    const [parentData, setParentData] = useState([]);
    const userEmail = useSelector((state) => state.auth.user.email);
    const [value, setValue] = useState(2);
    const [text, setText] = useState("");
   // const { productId } = useParams();
    console.log(userEmail, 'dataaa')
    const id="23";

    const handlePreviewDialog = () => {
        setPreviewDialogOpen(true);
    };

    const handlePreviewCloseBox = () => {
        setPreviewDialogOpen(false);
    };

    const handleDialogBox = () => {
        setDialogBoxOpen(true);
    };

    const handleCloseDialogBox = () => {
        setDialogBoxOpen(false);
    };

    const callbackParent = (data) => {
        setParentData(data);
    };

    const handleDeleteImage = (index) => {
        const updatedImages = [...parentData];
        updatedImages.splice(index, 1);
        setParentData(updatedImages);
    };

    const handleText = (e) => {
        setText(e.target.value)
    }
    const handleSubmit = async () => {
        // Prepare the form data
        const formData = new FormData();
        formData.append("rating", value);
        formData.append("productID", id);
        formData.append("email", userEmail); // Assuming email is available in the auth user object
        formData.append("body", text); // Replace with the actual value

        // Append each image to the form data
        parentData.forEach((image, index) => {
            formData.append(`image${index + 1}`, image);
        });

        try {
            // Send the form data to your API
            const response = await fetch(productPreviewApi, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                // Handle success
                console.log("Review submitted successfully!");
            } else {
                // Handle error
                console.error("Error submitting review:", response.statusText);
            }
        } catch (error) {
            console.error("Error submitting review:", error.message);
        }
    };

    return (
        <div>
            <div className="container add-new-review">
                <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                        <div>
                            <img src={img} alt="Product" />
                        </div>
                    </div>
                    <div className="col-lg-9 col-md-9 col-sm-6 col-12">
                        <div className="row">
                            <div className="col-md-11">
                                <div className="review-heading">
                                    <h5>
                                        LG 24ML600M-B 24” Full HD IPS con 3
                                        lados virtualmente sin bordes monitor
                                        con doble HDMI - Negro
                                    </h5>
                                </div>
                                <div className="sj-computer-tags">
                                    <p>SJ Computers</p>
                                </div>
                            </div>
                        </div>
                        <div className="rating-review-star">
                            <div>
                                <Rating
                                    name="simple-controlled"
                                    value={value}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}
                                />
                            </div>
                            <div className="check-rating-star-review">
                                <FontAwesomeIcon icon={faCheck} />
                            </div>
                            <div className="posted-policy-review">
                                <p>Posted publicly as</p>
                            </div>
                            <div className="check-rating-star-review-name">
                                <p>John Q. Smith | Clear</p>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="text-area-rating-review-list">
                                <textarea
                                    name="text"
                                    value={text}
                                    onChange={(e)=>handleText(e)}
                                    placeholder="Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available."
                                ></textarea>
                            </div>
                        </div>

                        <div className="preview-button-review">
                            <button
                                className="preview-product-list-button"
                                onClick={handlePreviewDialog}
                            >
                                Preview
                            </button>{" "}
                            <button
                                className="camera-button-review"
                                onClick={handleDialogBox}
                            >
                                <FontAwesomeIcon icon={faCamera} /> Add Photos
                            </button>{" "}
                            <button className="submit-review-button" onClick={handleSubmit}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {dialogBoxOpen && (
                <AddVideoDialogBox
                    onClose={handleCloseDialogBox}
                    onhandleCallback={callbackParent}
                    onDeleteImage={handleDeleteImage}
                />
            )}

            {previewDialogOpen && (
                <CustomPhotoLibrary
                    onClose={handlePreviewCloseBox}
                    parentData={parentData}
                    onDeleteImage={handleDeleteImage}
                />
            )}
        </div>
    );
};

export default ProductNewReviews;
