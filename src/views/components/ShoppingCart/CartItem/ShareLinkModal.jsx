import { Box, IconButton } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';

const ShareLinkModal = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={() => onClose()}
      aria-labelledby='parent-modal-title'
      // aria-describedby='parent-modal-description'
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Box sx={{ width: '30%', backgroundColor: '#fff', borderRadius: '8px' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}>
          <IconButton onClick={() => onClose()}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box></Box>
      </Box>
    </Modal>
  );
};

export default ShareLinkModal;
