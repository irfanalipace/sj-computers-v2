import { Close } from "@material-ui/icons";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "./AddVideoDialogBox.css";
const CustomPhotoLibrary = ({ onClose, parentData, onDeleteImage }) => {
  

    return (
        <Modal
            show={true}
            onHide={onClose}
            className="custome-model-gellery-view"
        >
            <Modal.Header>
                <div className="model-gellery-preview">
                    <div>
                        <h5> Preview Uploaded Files</h5>
                    </div>
                    <div>
                        <button
                            className="backbutton-preview"
                            onClick={onClose}
                        >
                            <Close />
                        </button>
                    </div>
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="preview-button-container-dialogbox">
                    {parentData.map((img, index) => (
                        <div
                            className="alist-image-container-preview-modal"
                            key={index}
                        >
                            <button
                                className="delete-button-data"
                                onClick={onDeleteImage}
                            >
                                &times;
                            </button>
                            <img src={img.url} alt={img.name} />
                        </div>
                    ))}
                </div>

                <div className="upload-cancel-dev">
                    <button className="cancel-button-preview" onClick={onClose}>
                        Back
                    </button>
                </div>
                <div></div>
            </Modal.Body>
        </Modal>
    );
};

export default CustomPhotoLibrary;
