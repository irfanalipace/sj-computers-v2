import React, { useState } from 'react'
import { Dialog, DialogContent, DialogActions, Button, Grid, IconButton, Box, Typography } from '@mui/material'
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import AppsIcon from '@mui/icons-material/Apps';
import ReviewCard from '../ReviewCard';

// Slider Imports
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
// import { LazyLoadImage } from "react-lazy-load-image-component";
import "swiper/css/navigation";

const ReviewsDialog = ({open, handleDialogOpen, handleClose, reviewId , imgIndex = 0 , ReviewsData}) => {

  const getReviewById = (reviewId) => {
    const review = ReviewsData.reviews.find((r) => r.reviewId === reviewId);
    return review || null; // Return null if reviewId is not found
  };

    const selectedReview = getReviewById(reviewId)
    console.log(selectedReview?.images.map((image) => {  console.log("image" ,image) }), "images.image");

  return (
    <Dialog open={open} onClose={handleClose} maxWidth={"lg"}  >
        <DialogContent sx={{minWidth: "75vw", width: "100%", p: 0,}} >
              <Box sx={{width: "100%", backgroundColor: "whitesmoke", textAlign: "end", position: "sticky", top: 0, left: 0}}>
            <DialogActions>
                <IconButton onClick={handleClose}><CloseOutlinedIcon /></IconButton>
            </DialogActions>
              </Box>
          <Grid container p={2} rowGap={1} width={"100%"} >
              <Grid item xs={12}>
                <Typography variant='body2'>
                  <AppsIcon />
                  View image gallery </Typography>
              </Grid>
              <Grid item md={6}  height={"30rem"} sx={{backgroundColor: "black"}} display={"flex"} alignItems={"center"} >
              <Swiper 
                style={{width: "100%", height: "100%"}}
                spaceBetween={1}
                slidesPerView={1}
                navigation
                initialSlide={imgIndex}
              >
              {selectedReview?.images?.map((image, index) => (
                <SwiperSlide style={{width: "100%", height: "100%",display: "flex", alignItems: "center" , justifyContent: "center"}} >
                  <img src={image?.imageUrl}  style={{maxHeight: "100%",maxWidth: "100%"}} alt="review image" />
                </SwiperSlide>
              ))}
              </Swiper>
                </Grid>

              <Grid item xs={6} pl={2} container>
                <Grid item xs={12}>
                  <ReviewCard />
                </Grid>
                <Grid item xs={12} py={1} >
                  <Typography py={1} variant='body2' fontSize={"small"}>Images</Typography>
                  <div style={{display: "flex"}}>
                    {selectedReview?.images?.map((image, index) => (
                  <Box key={index} width={"59px"} height={"59px"} border={"2px solid orange"} sx={{mr: "10px" ,backgroundImage: `url(${image?.imageUrl})`, backgroundSize: "cover" }} ></Box>
                    ))}
                  {/* <Box width={"59px"} height={"59px"} sx={{mr: "10px" ,background: "url(https://images.unsplash.com/photo-1541363111435-5c1b7d867904?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZHVtbXl8ZW58MHx8MHx8fDA%3D)", backgroundSize: "cover" }} ></Box> */}
                  {/* <Box width={"59px"} height={"59px"} sx={{mr: "10px" ,background: "url(https://images.unsplash.com/photo-1541363111435-5c1b7d867904?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZHVtbXl8ZW58MHx8MHx8fDA%3D)", backgroundSize: "cover" }} ></Box> */}
                  </div>
                </Grid>
              </Grid>
          </Grid>
        </DialogContent>
    </Dialog>
  )
}

export default ReviewsDialog