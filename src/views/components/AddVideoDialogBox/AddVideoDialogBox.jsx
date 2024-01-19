// AddVideoDialogBox.js
import React from 'react';
import './AddVideoDialogBox.css';

const AddVideoDialogBox = ({ onClose }) => {
  const handleDialogClick = (e) => {
    // Prevent the click event from propagating to the parent, so it doesn't close the dialog
    e.stopPropagation();
  };

  return (
    <div className='video-photo-overlay-dialog-box' onClick={onClose}>
      <div className='dialog-content-video-camera-sections' onClick={handleDialogClick}>
        <h4>
         Add Video drop and photo
        </h4>
        {/* Add your dialog box content here */}
      </div>
    </div>
  );
};

export default AddVideoDialogBox;
