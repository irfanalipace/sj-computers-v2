import React, { useState } from "react";
import "./ProductReviews.css";
import img from "../../../../assets/images/product/productreview/productreview.png";
import { Box, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCamera } from "@fortawesome/free-solid-svg-icons";
import AddVideoDialogBox from "../../AddVideoDialogBox/AddVideoDialogBox";
import CustomPhotoLibrary from "../../AddVideoDialogBox/CustomPhotoLibrary";
import Rating from "@mui/material/Rating";
import { useSelector } from "react-redux";
import { getUserId } from "@services/authService";
import { useNavigate } from "react-router-dom";
import LoaderComponent from "@common/LoaderComponent/LoaderComponent";
import { productPreviewApi, productDetailsbyAsinApi } from "@api/products";
import { useParams } from "react-router-dom";

import { useEffect, lazy } from "react";

const ProductNewReviews = () => {
    const navigate = useNavigate();
    const [dialogBoxOpen, setDialogBoxOpen] = useState(false);
    const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
    const [parentData, setParentData] = useState([]);
    const [imgFIles, setImgFiels] = useState([]);
    const userEmail = useSelector((state) => state.auth.user.email);
    const userId = useSelector((state) => state.auth.user.id);
    const userName = useSelector((state) => state.auth.user.name);

    const userID = Number(userId);
    const [value, setValue] = useState(0);
    const [text, setText] = useState("");
    const { productId } = useParams();
    const productID = Number(productId);

    const [isLoading, setIsLoading] = useState(false);
    const [product, setProduct] = useState(null);
    const [productImages, setProductImages] = useState([]);
    const products = useSelector((state) => state.products.products);
    useEffect(() => {
        getProductDetails();
    }, [productId]);

    const getProductDetails = async () => {
        setIsLoading(true);
        try {
            const filteredProduct = products.find(
                (product) => product?.asin === productId
            );

            if (filteredProduct) {
                setProduct((prevProduct) => ({
                    ...prevProduct,
                    ...filteredProduct,
                }));
                setProductImages(filteredProduct?.image);
            } else {
                const response = await productDetailsbyAsinApi(productId);
                const updatedProduct = response.data;

                setProduct((prevProduct) => ({
                    ...prevProduct,
                    ...updatedProduct,
                }));
                setProductImages(updatedProduct?.image);
            }
        } catch (error) {
            console.error("Error fetching product details:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // console.log('parentData' , parentData)

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

    const callbackParent = (data, imgsData) => {
        setParentData((prevImages) => [...prevImages, ...data]);
        setImgFiels(imgsData);
    };

  


    const handleDeleteImage = (index) => {
        const updatedImages = [...parentData];
        updatedImages.splice(index, 1);
        setParentData(updatedImages);
    };

    const handleText = (e) => {
        setText(e.target.value);
    };

    const handleClear = () =>{
        setValue(0);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append("rating", value);
            formData.append("product_id", product?.id);
            formData.append("user_id", userID);
            formData.append("body", text);
            imgFIles?.forEach((file, index) => {
                formData.append(`media[${index}]`, file);
            });

            // Send the FormData object directly as the body
            await productPreviewApi(formData);
            navigate(`${new URL(product?.url).pathname}`);
        } catch (error) {
            console.error("Error submitting review:", error.message);
        } finally {
            setIsLoading(false);
        }
    };




    
    return (
        <form onSubmit={handleSubmit}>
            <div className="container add-new-review">
                <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                        <div className="review-heading-image-product">
                            <img src={productImages} alt="Product" />
                        </div>
                    </div>
                    <div className="col-lg-9 col-md-9 col-sm-6 col-12">
                        <div className="row">
                            <div className="col-md-11">
                                <div className="review-heading">
                                    <h5>{product?.name}</h5>
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
                                <div>{userName} |</div>
                                 <div className="data-clear-button-review">
                                 <button type="button" onClick={handleClear}>Clear</button>
                                 </div>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="text-area-rating-review-list">
                                <textarea
                                    required
                                    name="text"
                                    value={text}
                                    onChange={(e) => handleText(e)}
                                    placeholder="Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available."
                                ></textarea>
                            </div>
                        </div>

                        <div className="preview-button-review">
                            <button
                            type="button"
                                className="preview-product-list-button"
                                onClick={handlePreviewDialog}
                            >
                                Preview
                            </button>{" "}
                            <button
                            type="button"
                                className="camera-button-review"
                                onClick={handleDialogBox}
                            >
                                <FontAwesomeIcon icon={faCamera} /> Add Photos
                            </button>{" "}
                            <button
                                type="submit"
                                className="submit-review-button"
                                disabled={isLoading}
                            >
                                {isLoading ? <LoaderComponent /> : "Submit"}
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
