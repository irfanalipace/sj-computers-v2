import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from '@mui/material';
import React, { useRef, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import twitter from '@images/twitter.png';
import facebook from '@images/facebook.png';
import pinterest from '@images/pinterest.png';
import mail from '@images/mail.png';

const ShareLinkModal = ({ open, onClose }) => {
  const [isCopySuccess, setIsCopySuccess] = useState(false);

  const iconsArr = [
    { img: mail },
    { img: pinterest },
    { img: facebook },
    { img: twitter },
  ];

  const inputRef = useRef(null);

  const handleCopyClick = () => {
    inputRef.current.select();
    document.execCommand('copy');

    setIsCopySuccess(true);

    setTimeout(() => {
      setIsCopySuccess(false);
    }, 2000);
  };

  return (
    <Modal
      open={open}
      onClose={() => onClose()}
      aria-labelledby='parent-modal-title'
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <>
        <Box
          sx={{ width: '40%', backgroundColor: '#fff', borderRadius: '8px' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              borderTopRightRadius: '8px',
              borderTopLeftRadius: '8px',
              backgroundColor: '#ddd',
            }}>
            <IconButton onClick={() => onClose()}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box p={2}>
            <Typography fontSize={17} fontWeight={700}>
              Share this product with friends
            </Typography>
            <Grid
              container
              justifyContent='center'
              alignItems='center'
              spacing={4}
              pt={7}
              px={6}>
              {iconsArr?.map(row => (
                <Box
                  item
                  sx={{
                    border: '1px solid #ddd',
                    borderRadius: '35px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  p={2}
                  m={1}>
                  <img src={row?.img} />
                </Box>
              ))}
            </Grid>
          </Box>
          <Box p={2}>
            <OutlinedInput
              fullWidth
              disabled
              inputRef={inputRef}
              endAdornment={
                <InputAdornment position='end'>
                  <button style={copyBtn} onClick={() => handleCopyClick()}>
                    Copy Link
                  </button>
                </InputAdornment>
              }
            />
            {isCopySuccess && (
              <span style={{ fontSize: '12px', padding: '10px' }}>
                Copied successfully!
              </span>
            )}
          </Box>
        </Box>
      </>
    </Modal>
  );
};

export default ShareLinkModal;

const copyBtn = {
  backgroundColor: '#fff',
  padding: '8px 15px',
  outline: 'none',
  borderRadius: '8px',
  border: '1px solid #ddd',
  marginTop: '8px',
  fontSize: '13px',
};
