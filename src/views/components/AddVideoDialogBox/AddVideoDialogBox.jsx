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

const AddVideoDialogBox = ({ onClose }) => {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);
  
    const [images, setImages] = useState([]);
  
    const selectFiles = () => {
      fileInputRef.current.click();
    };
  
    const onFileSelect = (event) => {
      const files = event.target.files;
      if (files.length === 0) return;
  
      const newImages = Array.from(files).filter(
        (file) => !images.some((img) => img.name === file.name)
      );
  
      setImages((prevImages) => [
        ...prevImages,
        ...newImages.map((file) => ({
          name: file.name,
          url: URL.createObjectURL(file),
        })),
      ]);
    };
  
    const deleteImage = (index) => {
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
  
    const onUpload = () => {
      // Implement your upload logic here
      // This function should handle the upload of images in the 'images' state
    };
  
    return (
      <Modal show={true} onHide={onClose} className="custome-model-item-filter">
        <Modal.Body>
          <div
            className={`drag-area-data ${isDragging ? "drag-over" : ""}`}
            onClick={selectFiles}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          >
            {isDragging ? (
              <span className="select-image-file-drop">Drop images here</span>
            ) : (
              <>
              <div>
               <span className="logout-icon-button-view-list-area">
               <FontAwesomeIcon icon={faUpload} />
               </span>
              </div>
                <div className="drop-import-section-p">
                  <p> Drag & Drop file to import {" "}</p>
                </div>
                <div className="dev-droping-area-sction-files-area">
                  <span className="select-image-file-drop" role="button" onClick={selectFiles}>
                   <FontAwesomeIcon icon={faPaperclip} /> Choose File
                  </span>
                </div>
                <div>
                  <p className="text-muted" style={{fontSize:'12px'}}> Maxmuim file Size:1MB file, format supported: PNG or JPG{" "}</p>
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
                <span className="delete-button-data" onClick={() => deleteImage(index)}>
                  &times;
                </span>
                <img src={img.url} alt={img.name} />
              </div>
            ))}
          </div>
  
  <div className="upload-cancel-dev">
    <button className="cancel-button-preview">Cancel</button>  <button onClick={onUpload} className="upload-button-view-button">Upload</button>
  </div>
  <div>
 
  </div>
         
        </Modal.Body>
      </Modal>
    );
  };
  
  export default AddVideoDialogBox;
  
