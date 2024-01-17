import React, {useState} from "react";
import { Grid, Typography, Box, Dialog, DialogContent, Button, DialogActions, IconButton } from "@mui/material";
import videoTumbnail from "../../../assets/images/video-tumbnail.svg";
import videoTumbnail2 from "../../../assets/images/video-tumbnail2.svg";
// import videoTumbnail2 from "../../../assets/images/video-tumbnail2.svg"
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ProductVideoSlider from "../Sliders/ProductVideoSlider";
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
// import videoFront from "../../../assets/images/videoL-tumbnail.svg"

const ProductVideo = () => {

    const [open, setOpen] = useState(false)

    const handleDialogOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        console.log(open);
    }

    const url = "https://m.media-amazon.com/images/S/vse-vms-transcoding-artifact-us-east-1-prod/8ac39f04-a321-47cd-bb9e-bbbe4038e7d9/videopreview.jobtemplate.mp4.default.mp4"
    const url2 = "blob:https://www.amazon.com/d176fdc5-b727-4c92-8f90-e25fa7808e36"
    

    // NOTE : ALL THE BOX COMPONENTS ARE (POSITION: ABSOLUTE)

    const Tumbnails = [ {videoTumbnail: videoTumbnail, url: url}, {videoTumbnail: videoTumbnail2, url: url2}, {videoTumbnail, url: url}, {videoTumbnail: videoTumbnail2, url: url2},   ];
    
    return (
        <Grid container p={1} borderTop={"1px solid lightgray"} rowGap={2}>
            <Grid item lg={12}>
                <Typography variant="h5" fontWeight={"bolder"}>
                    Videos for this product
                </Typography>
            </Grid>
            <Grid item lg={12} container px={4} columnGap={2} position={"relative"} >
                <ProductVideoSlider Tumbnails={Tumbnails} />
            </Grid>
        </Grid>
    );
};

export default ProductVideo;

