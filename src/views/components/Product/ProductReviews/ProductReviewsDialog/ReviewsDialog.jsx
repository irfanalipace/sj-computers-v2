import React, { useState } from 'react'
import { Dialog, DialogContent, DialogActions, Button, Grid, IconButton, Box, Typography } from '@mui/material'
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import AppsIcon from '@mui/icons-material/Apps';

const ReviewsDialog = ({open, handleDialogOpen, handleClose, review}) => {
    // const[open, setOpen] = useState(false)
    // const handleDialogOpen = () => {
    //     setOpen(true);
    // };


    // const handleClose = () => {
    //     setOpen(false);
    // };

  return (
    <Dialog open={true} onClose={handleClose} maxWidth={"lg"} >
        <DialogContent sx={{width: "100%", p: 0,}} >
              <Box sx={{width: "100%", backgroundColor: "whitesmoke", textAlign: "end"}}>
            <DialogActions>
                <IconButton onClick={handleClose}><CloseOutlinedIcon /></IconButton>
            </DialogActions>
              </Box>
          <Grid container p={2} rowGap={1} >
              <Grid item xs={12}>
                <Typography variant='body2'>
                  <AppsIcon />
                  View image gallery </Typography>
              </Grid>
              <Grid item md={6} minHeight={"30rem"} minWidth={"30rem"}  sx={{backgroundColor: "black"}} display={"flex"} alignItems={"center"} ><img src="https://images.unsplash.com/photo-1541363111435-5c1b7d867904?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZHVtbXl8ZW58MHx8MHx8fDA%3D"  width={"100%"} alt="review image" /></Grid>
              <Grid item xs={6} pl={2} container>
                <Grid item xs={12}>Hello</Grid>
                <Grid item xs={12} py={1} >
                  <Typography py={1} variant='body2' fontSize={"small"}>Images</Typography>
                  <div style={{display: "flex"}}>
                  <Box width={"59px"} height={"59px"} sx={{mr: "10px" ,background: "url(https://images.unsplash.com/photo-1541363111435-5c1b7d867904?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZHVtbXl8ZW58MHx8MHx8fDA%3D)", backgroundSize: "cover" }} ></Box>
                  <Box width={"59px"} height={"59px"} sx={{mr: "10px" ,background: "url(https://images.unsplash.com/photo-1541363111435-5c1b7d867904?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZHVtbXl8ZW58MHx8MHx8fDA%3D)", backgroundSize: "cover" }} ></Box>
                  <Box width={"59px"} height={"59px"} sx={{mr: "10px" ,background: "url(https://images.unsplash.com/photo-1541363111435-5c1b7d867904?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZHVtbXl8ZW58MHx8MHx8fDA%3D)", backgroundSize: "cover" }} ></Box>
                  </div>
                    {/* <img style={{maxWidth: "100%", maxHeight: "100%"}} src="https://images.unsplash.com/photo-1541363111435-5c1b7d867904?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZHVtbXl8ZW58MHx8MHx8fDA%3D" alt="side images" /> */}
                </Grid>
              </Grid>
          </Grid>
        </DialogContent>
    </Dialog>
  )
}

export default ReviewsDialog