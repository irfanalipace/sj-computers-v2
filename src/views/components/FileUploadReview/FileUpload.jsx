import React, { useState, useRef, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import FileService from "../../../core/utils/fileService";
import "./FileUpload.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { FILE_TYPES } from "../../../../src/core/utils/constants";

const allowedFiles = [
    FILE_TYPES.png.contentType,
    FILE_TYPES.webp.contentType,
    FILE_TYPES.jpeg.contentType,
    FILE_TYPES.jpg.contentType,
];

const maxSize = 5;

const FileUpload = ({ onClose, onhandleCallback, onDeleteImage }) => {
    const fileInputRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [images, setImages] = useState([]);
    const [error, setErrors] = useState("");
    const [uploadedImgs, setUploadedImgs] = useState([]);
    const [allImages, setAllImages] = useState([]);

    const handleChildButton = () => {
        const updatedImages = [...allImages, ...images];
        onhandleCallback(updatedImages, uploadedImgs);
        setAllImages(updatedImages);
        setUploadedImgs([]);
        onClose();
    };

    const onFileSelectCallback = (validFiles, errors) => {
        setErrors(errors);
        setUploadedImgs(validFiles);
        setImages((prevImages) => [
            ...prevImages,
            ...validFiles.map((file) => ({
                name: file.name,
                url: URL.createObjectURL(file),
            })),
        ]);
    };

    const fileService = new FileService({
        maxSize,
        allowedFiles,
        onFileInput: onFileSelectCallback,
    });

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
            fileService.handleFileDrag(event);
        }
    };

    useEffect(() => {
        const handleListener = (event) => {
            fileService.handlePaste(event);
        };
        document.addEventListener("paste", handleListener);

        return () => {
            document.removeEventListener("paste", handleListener);
        };
    }, []);

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
                    onClick={() => fileInputRef.current.click()}
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
                            <div>
                                <p
                                    className="text-muted"
                                    style={{ fontSize: "12px" }}
                                >
                                    Or press Ctrl + v to paste
                                </p>
                            </div>
                            <div className="dev-droping-area-sction-files-area">
                                <span
                                    className="select-image-file-drop"
                                    role="button"
                                    onClick={() => fileInputRef.current.click()}
                                >
                                    <FontAwesomeIcon icon={faPaperclip} />{" "}
                                    Choose File
                                </span>
                            </div>
                            <div>
                                <p
                                    className="text-muted"
                                    style={{
                                        fontSize: "12px",
                                        lineHeight: "1.1rem",
                                    }}
                                >
                                    {" "}
                                    Maximum file size: 5MB, Supported formats:
                                    PNG, JPG and WEBP{" "}
                                </p>
                            </div>
                        </>
                    )}
                    <input
                        className="input-fileds-area-sections-data-powerd"
                        name="file"
                        type="file"
                        accept={allowedFiles.join(",")}
                        multiple
                        ref={fileInputRef}
                        onChange={fileService.handleFileInputChange}
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
                    <p className="error-message-file-formatted-issues fs-6">
                        {error?.map((err) => (
                            <p
                                className="my-1"
                                style={{ color: "red", fontSize: "12px" }}
                            >
                                {err}
                            </p>
                        ))}
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

export default FileUpload;
