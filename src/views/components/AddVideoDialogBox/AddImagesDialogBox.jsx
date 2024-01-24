import React, { useState, useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import fileService from "../../../core/utils/fileServices";
import "./AddVideoDialogBox.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { Photo } from "@material-ui/icons";
import productphoto from "../../../assets/images/product/image20.png";
import CustomPhotoLibrary from "./CustomPhotoLibrary";

// ... (existing code)

const AddVideoDialogBox = ({ onClose, onhandleCallback, onDeleteImage }) => {
    // const [isDragging, setIsDragging] = useState(false);
    // const fileInputRef = useRef(null);
    // const [childData, setChildData] = useState();
    // const [images, setImages] = useState([]);
    // const [error, setErrors] = useState("");
    // const [uploadedImgs , setUploadedImgs] =useState([])
   

    // const handleChildButton = () => {
    //     onhandleCallback(images , uploadedImgs);
    //     setChildData(images);
        
    // };

    // const selectFiles = () => {
    //     fileInputRef.current.click();
    // };

    // const onFileSelect = (event) => {
    //     const files = event.target.files;
    //     if (files.length === 0) return;

    //     // const newImages = Array.from(files).filter(

    //     //     (file) => !images.some((img) => img.name === file.name)
    //     // );

    //     // const allowedTypes = ["image/png", "image/jpeg", "image/webp"];

    //     // const newImages = Array.from(files).filter((file) => {
    //     //     // Check if the file type is allowed
    //     //     return allowedTypes.includes(file.type);
    //     // });

    //     const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
    //     const maxFileSizeMB = 1;
    //     const newImages = Array.from(files).filter((file) => {
    //         // Check if the file type is allowed
    //         if (!allowedTypes.includes(file.type)) {
    //             setErrors(
    //                 "Invalid file format. Please select PNG, JPG, or WebP."
    //             );
    //             return false; // Exclude the file from newImages
    //         }
    //         const fileSizeMB = file.size / (1024 * 1024); // Convert from bytes to megabytes
    //         const isFileSizeValid = fileSizeMB <= maxFileSizeMB;
    //         if (!isFileSizeValid) {
    //             setError(
    //                 `File size exceeds the maximum limit of ${maxFileSizeMB}MB.`
    //             );
    //             return false;
    //         }

    //         return true;
    //     });
    //     setUploadedImgs(newImages)

    //     setImages((prevImages) => [
    //         ...prevImages,
    //         ...newImages.map((file) => ({
    //             name: file.name,
    //             url: URL.createObjectURL(file),
    //         })),
    //     ]);
    // };

    // // const deleteImage = (index) => {
    // //     setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    // // };

    // const deleteImage = (index) => {
    //     // Call the onDeleteImage prop with the index of the image to delete
    //     onDeleteImage(index);

    //     // Also update the local state if needed
    //     setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    // };

    // const onDragOver = (event) => {
    //     event.preventDefault();
    //     setIsDragging(true);
    //     event.dataTransfer.dropEffect = "copy";
    // };

    // const onDragLeave = () => {
    //     setIsDragging(false);
    // };

    // const onDrop = (event) => {
    //     event.preventDefault();
    //     setIsDragging(false);

    //     const files = event.dataTransfer.files;
    //     if (files.length > 0) {
    //         onFileSelect({ target: { files } });
    //     }
    // };

    // const onUpload = () => {
    //     // Implement your upload logic here
    //     // This function should handle the upload of images in the 'images' state
    // };


    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);
    const [childData, setChildData] = useState();
    const [images, setImages] = useState([]);
    const [error, setErrors] = useState("");
    const [uploadedImgs, setUploadedImgs] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [allImages, setAllImages] = useState([]); 
   
    // const handleChildButton = () => {
    //     onhandleCallback(images, uploadedImgs);
    //     setChildData(images);
    //     if (images.length > 0) {
    //         onClose();
    //     }
    // };
    
    const handleChildButton = () => {
        // Concatenate the new images with the existing ones
        const updatedImages = [...allImages, ...images];
        onhandleCallback(updatedImages, uploadedImgs);
        setAllImages(updatedImages);
        setUploadedImgs([]);
        onClose();
    };


    const selectFiles = (event) => {
        event.stopPropagation(); 
        fileInputRef.current.click();
    };
    
    const onFileSelect = (event) => {
        const files = event.target.files;
        if (files.length === 0) return;

        const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
        const maxFileSizeMB = 1;
        const newImages = Array.from(files).filter((file) => {
            if (!allowedTypes.includes(file.type)) {
                setErrors("Invalid file format. Please select PNG, JPG, or WebP.");
                return false;
            }
            const fileSizeMB = file.size / (1024 * 1024);
            const isFileSizeValid = fileSizeMB <= maxFileSizeMB;
            if (!isFileSizeValid) {
                setErrors(`File size exceeds the maximum limit of ${maxFileSizeMB}MB.`);
                return false;
            }

            return true;
        });
        setUploadedImgs(newImages);
        setImages((prevImages) => [
            ...prevImages,
            ...newImages.map((file) => ({
                name: file.name,
                url: URL.createObjectURL(file),
            })),
        ]);
    };

    const deleteImage = (index) => {
        onDeleteImage(index);
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const onDragOver = (event) => {
        event.preventDefault();
        setIsDragging(true);
        event.dataTransfer.dropEffect = "copy";
    };

    const onDragLeave = () => {
        setIsDragging(false);
    };

    const onDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);

        const files = event.dataTransfer.files;
        if (files.length > 0) {
            onFileSelect({ target: { files } });
        }
    };


    return (
        <Modal
            show={true}
            onHide={onClose}
            className="custome-model-item-filter"
        >
            <Modal.Body>
                <div
                    className={`drag-area-data ${
                        isDragging ? "drag-over" : ""
                    }`}
                    role="button"
                    onClick={(e) => selectFiles(e)} 
                  //  onClick={selectFiles}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                >
                    {isDragging ? (
                        <span className="select-image-file-drop">
                            Drop images here
                        </span>
                    ) : (
                        <>
                            <div>
                                <span className="logout-icon-button-view-list-area">
                                    <FontAwesomeIcon icon={faUpload} />
                                </span>
                            </div>
                            <div className="drop-import-section-p">
                                <p> Drag & Drop file to import </p>
                            </div>
                            <div className="dev-droping-area-sction-files-area">
                                <span
                                    className="select-image-file-drop"
                                    role="button"
                                    onClick={selectFiles}
                                >
                                    <FontAwesomeIcon icon={faPaperclip} />{" "}
                                    Choose File
                                </span>
                            </div>
                            <div>
                                <p
                                    className="text-muted"
                                    style={{ fontSize: "12px" }}
                                >
                                    {" "}
                                    Maxmuim file Size:1MB file, format
                                    supported: PNG or JPG{" "}
                                </p>
                            </div>
                        </>
                    )}
                    <input
                        className="input-fileds-area-sections-data-powerd"
                        name="file"
                        type="file"
                        multiple
                        ref={fileInputRef}
                        onChange={onFileSelect}
                    />
                </div>

                <div className="container-image-drop">
                    {images.map((img, index) => (
                        <div className="list-image-container" key={index}>
                            <button
                                className="delete-button-data"
                                onClick={() => deleteImage(index)}
                            >
                                &times;
                            </button>
                            <img src={img.url} alt={img.name} />
                        </div>
                    ))}
                </div>
                {error && (
                    <p className="error-message-file-formated-issues">
                        {error}
                    </p>
                )}
                <div className="upload-cancel-dev">
                    <button className="cancel-button-preview" onClick={onClose}>
                        Cancel
                    </button>{" "}
                    <button
                        onClick={handleChildButton}
                        className="upload-button-view-button"
                        disabled={images.length === 0}
                    >
                        Upload
                        </button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default AddVideoDialogBox;
