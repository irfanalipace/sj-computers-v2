import React, { useState } from "react";
import "./ProductReviews.css";
import img from "../../../../assets/images/product/productreview/productreview.png";
import StarRatings from "react-star-ratings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCamera } from "@fortawesome/free-solid-svg-icons";
import AddVideoDialogBox from "../../AddVideoDialogBox/AddVideoDialogBox";
import CustomPhotoLibrary from "../../AddVideoDialogBox/CustomPhotoLibrary";

const ProductNewReviews = () => {
    const [dialogBoxOpen, setDialogBoxOpen] = useState(false);
    const [previewDialogOpen, setPreveiewDialogOpen] = useState(false);
    const [parentData, setParentData] = useState([]);

    const handlePrveviewDialog = () => {
        setPreveiewDialogOpen(true);
    };
    const handlePrivewCloseBox = () => {
        setPreveiewDialogOpen(false);
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
        // Implement the logic to delete the image at the specified index
        const updatedImages = [...parentData];
        updatedImages.splice(index, 1);
        setParentData(updatedImages);
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
                                <StarRatings
                                    rating={3.5}
                                    starRatedColor="rgb(232, 126, 36)"
                                    numberOfStars={5}
                                    name="rating"
                                    starDimension={"20px"}
                                    starSpacing={"0"}
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
                                    placeholder="Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a  typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final  copy is available."
                                ></textarea>
                            </div>
                        </div>

                        <div className="preview-button-review">
                            <button
                                className="preview-product-list-button"
                                onClick={handlePrveviewDialog}
                            >
                                Preview
                            </button>{" "}
                            <button
                                className="camera-button-review"
                                onClick={handleDialogBox}
                            >
                                {" "}
                                <FontAwesomeIcon icon={faCamera} /> Add Photos
                            </button>{" "}
                            <button className="submit-review-button">
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
                    onClose={handlePrivewCloseBox}
                    parentData={parentData}
                    onDeleteImage={handleDeleteImage}
                />
            )}
        </div>
    );
};

export default ProductNewReviews;
