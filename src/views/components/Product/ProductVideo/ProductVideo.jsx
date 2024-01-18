import React, {useState, useEffect} from "react";
import { Grid, Typography, Box, Dialog, DialogContent, Button, DialogActions, IconButton } from "@mui/material";
// import videoTumbnail2 from "../../../assets/images/video-tumbnail2.svg"
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ProductVideoSlider from "../../Sliders/ProductVideoSlider";
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
// import videoFront from "../../../assets/images/videoL-tumbnail.svg"

const ProductVideo = () => {

    const url = "https://m.media-amazon.com/images/S/vse-vms-transcoding-artifact-us-east-1-prod/8ac39f04-a321-47cd-bb9e-bbbe4038e7d9/videopreview.jobtemplate.mp4.default.mp4"
    const url2 = "https://ak.picdn.net/shutterstock/videos/1093044323/preview/stock-footage-generic-d-car-crash-test-with-crashtest-dummy-car-destruction-realistic-animation-d.mp4"
    const url3 = "https://ak.picdn.net/shutterstock/videos/1099395703/preview/stock-footage-sportsman-training-in-indoor-football-hall-running-with-ball-practicing-dribbling-and-dummy-tricks.mp4"
    const url4 = "https://ak.picdn.net/shutterstock/videos/1093044315/preview/stock-footage-generic-d-car-crash-test-with-crashtest-dummy-car-destruction-realistic-animation-d.mp4"
    

    // NOTE : ALL THE BOX COMPONENTS ARE (POSITION: ABSOLUTE)

    

    const videoData = [ {id: 1, url: url}, {id: 2,  url: url2}, {id: 3, url: url3}, {id: 4, url: url4},   ];
    const newVideoData = videoData.map((video) => {
    const [thumbnailSrc, setThumbnailSrc] = useState(null);
      useEffect(() => {
        const createThumbnail = (videoSrc, callback) => {
        const video = document.createElement('video');
        video.crossOrigin = 'anonymous';
        video.src = videoSrc;

        video.addEventListener('loadeddata', () => {
          video.currentTime = 1;

          video.addEventListener(
            'seeked',
            () => {
              const canvas = document.createElement('canvas');
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;

              const ctx = canvas.getContext('2d');
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

              const imageDataUrl = canvas.toDataURL();
              callback(imageDataUrl);
            },
            { once: true }
          );
        });
      };

      const videoSrc = video.url;

      createThumbnail(videoSrc, (thumbnail) => {
      //   console.log('Thumbnail created:', thumbnail);
          setThumbnailSrc(thumbnail)
        // Use the thumbnail data URL as needed (e.g., set it as the src of an image element)
      });
  }, [videoData]);
  
        return {...video, tumbnail : thumbnailSrc};
    })

    setTimeout(() => {
        console.log(newVideoData, "a");
    }, 2000);
    
    return (
        <Grid container p={2} borderTop={"1px solid lightgray"} rowGap={2}>
            <Grid item lg={12}>
                <Typography variant="h5" fontWeight={"bolder"}>
                    Videos for this product
                </Typography>
            </Grid>
            <Grid item lg={12} container px={4} columnGap={2} position={"relative"} >
                <ProductVideoSlider Tumbnails={videoData} newVideoData={newVideoData}  />
            </Grid>
        </Grid>
    );
};

export default ProductVideo;

