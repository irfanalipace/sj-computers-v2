import React, { useState } from 'react'
import { Dialog, DialogContent, DialogActions, Button } from '@mui/material'

const ReviewsDialog = ({open, handleDialogOpen, handleClose}) => {
    // const[open, setOpen] = useState(false)
    // const handleDialogOpen = () => {
    //     setOpen(true);
    // };


    // const handleClose = () => {
    //     setOpen(false);
    // };

  return (
    <Dialog open={open} onClose={handleClose}>
        <DialogContent>
            Hello
            <DialogActions>
                <Button onClick={handleClose}>close</Button>
            </DialogActions>
        </DialogContent>
    </Dialog>
  )
}

export default ReviewsDialog