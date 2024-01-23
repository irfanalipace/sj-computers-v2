import React, {useState, useEffect} from "react";
import { Grid, Typography, Box, Dialog, DialogContent, Button, DialogActions, IconButton } from "@mui/material";
// import videoTumbnail2 from "../../../assets/images/video-tumbnail2.svg"
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ProductVideoSlider from "../../Sliders/ProductVideoSlider";
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
// import videoFront from "../../../assets/images/videoL-tumbnail.svg"
import { createThumbnail } from "../../../../core/utils/helpers";

const ProductVideo = () => {

    const url = "https://player.vimeo.com/external/501907857.sd.mp4?s=8f346acfa87b85f1136660006b892b95a1ad550b&profile_id=164&oauth2_token_id=57447761"
    const url2 = "https://ak.picdn.net/shutterstock/videos/1093044323/preview/stock-footage-generic-d-car-crash-test-with-crashtest-dummy-car-destruction-realistic-animation-d.mp4"
    const url3 = "https://ak.picdn.net/shutterstock/videos/1099395703/preview/stock-footage-sportsman-training-in-indoor-football-hall-running-with-ball-practicing-dribbling-and-dummy-tricks.mp4"
    const url4 = "https://ak.picdn.net/shutterstock/videos/1093044315/preview/stock-footage-generic-d-car-crash-test-with-crashtest-dummy-car-destruction-realistic-animation-d.mp4"
    

    const [videoData, setVideoData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = [
          { id: 1, url: url },
          { id: 2, url: url2 },
          { id: 3, url: url3 },
          { id: 4, url: url4 },
        ];

        const modifyVideoData = await Promise.all(
          response.map(async (data) => {
            const videoSrc = data?.url;
            try {
              const thumbnailSrc = await createThumbnail(videoSrc);
              console.log(thumbnailSrc, "thumbnailSrc");
              return { ...data, tumbnail: thumbnailSrc };
            } catch (error) {
              console.error('Error creating thumbnail:', error);
              return { ...data, thumbnail: null }; // Handle the error gracefully
            }
          })
        );
        setVideoData(modifyVideoData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
}, [url, url2, url3, url4]); 


        // console.log(videoData, "a");
    
    return (
        <Grid container p={2} borderTop={"1px solid lightgray"} rowGap={2}>
            <Grid item lg={12}>
                <Typography variant="h5" fontWeight={"bolder"}>
                    Videos for this product
                </Typography>
            </Grid>
            <Grid item lg={12} container px={4} columnGap={2} position={"relative"} sx={{"@media (max-width: 600px)": { padding: 0 }}} >
                <ProductVideoSlider  videoData={videoData}  />
            </Grid>
        </Grid>
    );
};

export default ProductVideo;

