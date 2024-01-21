import { Close } from '@material-ui/icons';
import React, { useState } from 'react';
import { Button, Modal } from "react-bootstrap";
import './AddVideoDialogBox.css'
const CustomPhotoLibrary = ({onClose, parentData}) => {
    console.log(parentData,'parentData')

  return (
    <Modal show={true}  onHide={onClose} className="custome-model-gellery-view">
        <Modal.Header>
            <div className='model-gellery-preview'>
            <div>
    <h5>  Preview Uploaded Files</h5>
</div>
<div>
    <button className="backbutton-preview" onClick={onClose}><Close /></button>
    
</div>
            </div>

        </Modal.Header>
    <Modal.Body>
    <div className="preview-button-container-dialogbox">
                    {parentData.map((img, index) => (
                        <div className="alist-image-container-preview-modal" key={index}>
                            <span
                                className="delete-button-data"
                                onClick={() => deleteImage(index)}
                            >
                                &times;
                            </span>
                            <img src={img.url} alt={img.name} />
                        </div>
                    ))}
                </div>
  

<div className="upload-cancel-dev">
<button className="cancel-button-preview" onClick={onClose}>Back</button>
</div>
<div>

</div>
     
    </Modal.Body>
  </Modal>
  );
};



export default CustomPhotoLibrary;
