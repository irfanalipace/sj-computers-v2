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
import { getUserId } from "@services/authService";

import { productPreviewApi } from "@api/products";
import { useParams } from "react-router-dom";

const ProductNewReviews = () => {

    const [dialogBoxOpen, setDialogBoxOpen] = useState(false);
    const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
    const [parentData, setParentData] = useState([]);
    const [imgFIles , setImgFiels] = useState([]);
    console.log('imgFIles' , imgFIles)

    const userEmail = useSelector((state) => state.auth.user.email);
    const userId = useSelector((state) => state.auth.user.id);
    const userID = Number(userId)

   
    console.log('parentData' , parentData)

    const [value, setValue] = useState(2);
    const [text, setText] = useState("");
   const {productId}  = useParams();
   const productID = Number(productId)

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

    const callbackParent = (data , imgsData) => {
        console.log('imgdata' ,data ,imgsData  )
        setParentData(data);
        setImgFiels(imgsData)
    };

    const handleDeleteImage = (index) => {
        const updatedImages = [...parentData];
        updatedImages.splice(index, 1);
        setParentData(updatedImages);
    };

    const handleText = (e) => {
        setText(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const formData = new FormData();
            formData.append("rating", value);
            formData.append("product_id", 2);
            formData.append("user_id", userID);
            formData.append("body", text);
            imgFIles?.forEach((file, index) => {
                formData.append(`media[${index}]`, file);
            });
    
            // Send the FormData object directly as the body
            await productPreviewApi(formData);
    
        } catch (error) {
            console.error("Error submitting review:", error.message);
        }
    };
    


    
    return (
        <form onSubmit={handleSubmit}>
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
                                    required
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
                                required
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
                            <button type="submit" className="submit-review-button" >
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
        </form>
    );
};

export default ProductNewReviews;
