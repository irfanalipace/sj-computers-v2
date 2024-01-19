import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import fileService from "../../../core/utils/fileServices";
import "./AddVideoDialogBox.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { Photo } from "@material-ui/icons";
import productphoto from '../../../assets/images/product/image20.png'
const AddVideoDialogBox = ({ onClose }) => {
  const [temporaryFiles, setTemporaryFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [errors, setErrors] = useState([]);

  const deletingFile = (e, file) => {
    e.stopPropagation();
    const filteredFiles = temporaryFiles.filter((f) => f !== file);
    setTemporaryFiles(filteredFiles);
  };

  const downloadFile = (e, file) => {
    e.stopPropagation();
    if (file.id) {
      window.open(file?.file_path);
    } else {
      window.open(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    // Implement your save logic here
    console.log("Save logic:", temporaryFiles);
    onClose();
  };

  const dragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const fileDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    fileService.handleFileDrag(
      e,
      ["image/*", "video/*"],
      callBack,
      1024 * 1024 * 10
    );
  };

  const onFileUpload = (e) => {
    fileService.handleFileInputChange(
      e,
      ["image/*", "video/*"],
      callBack,
      1024 * 1024 * 10
    );
  };

  const callBack = (validFiles, errors) => {
    setTemporaryFiles((prev) => [...prev, ...validFiles]);
    setErrors(errors);
  };

  useEffect(() => {
    const handleListener = (event) => {
      fileService.handlePaste(
        event,
        ["image/*", "video/*"],
        callBack,
        1024 * 1024 * 10
      );
    };
    document.addEventListener("paste", handleListener);

    return () => {
      document.removeEventListener("paste", handleListener);
    };
  }, []);

  const photoLibrary = [
    { src: {productphoto}, alt: "Photo 1" },
    { src: {productphoto}, alt: "Photo 2" },
    { src: {productphoto}, alt: "Photo 3" },
    { src: {productphoto}, alt: "Photo 4" },
    { src: {productphoto}, alt: "Photo 5" },
  ];

  return (
    <div className="custome-model-data-add-video-file">
      <Modal show={true} onHide={onClose} ClassName="custom-modal">
        <Modal.Body>
          <label
            style={{ width: "465px" }}
            htmlFor="file-input"
            onDragOver={dragOver}
            onDrop={fileDrop}
          >
            <input
              className="custome-model-data-add-video-file"
              id="file-input"
              type="file"
              multiple
              style={{ display: "none" }}
              onChange={onFileUpload}
              accept="image/*, video/*"
            />
            <div
              className="text-center border p-5"
              style={{
                borderColor: dragging ? "blue" : "#c3c3c3",
                borderRadius: "12px",
              }}
            >
              <div className="upload-file-icon-data">
                <button>
                  <FontAwesomeIcon icon={faUpload} />
                </button>
              </div>
              <p className="mb-3">Drag & drop file to import</p>
              <form>
              <input type="file" id="myFile" name="filename" />
                 </form>
            
        

              <p className="text-muted" style={{ fontSize: "13px" }}>
                Maximum file size 1MB. and file format: PNG or JPG
              </p>
            </div>
          </label>

          <div className="photo-library">
            {photoLibrary.map((photo, index) => (
               
      
                <div key={index} className="photo-item">
                <img src={photo.src} alt={photo.alt} />
              </div>
        
            ))}
          </div>

          <ul className="list-group mt-3">
            {temporaryFiles.map((file, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {/* Display thumbnail or name of the file */}
                gsgdfg
                <div>
                  <button
                    variant="danger"
                    onClick={(e) => deletingFile(e, file)}
                  >
                    Delete
                  </button>
                  <button
                    variant="primary"
                    className="ms-2"
                    onClick={(e) => downloadFile(e, file)}
                  >
                    Download
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {errors.length > 0 &&
            errors.map((error, index) => (
              <p key={index} className="text-danger mt-2">
                {error}
              </p>
            ))}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddVideoDialogBox;
