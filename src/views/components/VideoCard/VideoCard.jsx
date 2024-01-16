import React, { useState } from "react";
import "./VideoCard.css"

import {
    Grid,
    Typography,
    Box,
    Dialog,
    DialogContent,
    Button,
    DialogActions,
    IconButton,
} from "@mui/material";

import sjLogo from "../../../assets/images/sj-logo.jpg";
import PlayCircleOutlineSharpIcon from "@mui/icons-material/PlayCircleOutlineSharp";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import Recommendation from "../../components/Recommendation/Recommendation"
import { useSelector } from "react-redux";

function VideoCard({ tumbnail, Tumbnails }) {

    const [open, setOpen] = useState(false);
    const [url, setUrl] = useState(tumbnail.url)
    const products = useSelector((state) => state.products.products);

    const handleDialogOpen = () => {
        setOpen(true);
    };

    const handleSwitchVideo = (tumbUrl) => {
        setUrl(tumbUrl)
        console.log(tumbUrl)
    };

    const handleClose = () => {
        setOpen(false);
        console.log(open);
    };

    const VideoDialog = ({tumbnail, Tumbnails}) => {
        return (
            <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth sx={{maxHeight: "none",}} >
            <DialogContent sx={{ p: 0, position: "relative", borderRadius: "2px" }}>
                <Grid container >
                    <Grid item xs={12} md={8} container>
                        <Grid item xs={12}>
                            <video
                                width={"100%"}
                                autoPlay
                                src={url}
                                controls
                            ></video>
                        </Grid>
                        <Grid item xs={12} p={2} >
                            <Typography variant="p" lineHeight={1.3}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium rerum commodi error.</Typography>
                            <Recommendation products={products} inVideoDialog={true} />
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        md={4}
                        sx={{ backgroundColor: "#333333", color: "white" }}
                        container
                        // px={1}
                        // py={1}
                    >
                        <Grid item xs={12}>
                            <DialogActions>
                                <IconButton onClick={handleClose}>
                                    <CloseOutlinedIcon
                                        sx={{
                                            color: "white",
                                            position: "absolute",
                                            top: 0,
                                            right: 0,
                                        }}
                                    />
                                </IconButton>
                            </DialogActions>
                            <Grid item xs={12} container rowGap={1} px={2} >
                                <Grid item xs={12} mb={1}>
                                    <Typography variant="body1" >Videos for ths product</Typography>
                                </Grid>
                                {/* ////  Side video section //// */}
                                {/* Map Function for the side videos list */}
                                {Tumbnails?.map((tumb, index) => (
                                    <Grid item xs={12} container key={index}>
                                    <Grid
                                    item
                                    xs={3}
                                    onClick={(e) => handleSwitchVideo(tumb.url)}
                                    height={"60px"}
                                    position={"relative"}
                                    sx={{
                                        backgroundImage: `url(${tumb.videoTumbnail})`,
                                        borderRadius: "5px",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        cursor: "pointer",
                                        border: url == tumb.url ? "1px solid orange" : "",
                                    }}
                                >
                                    <Box
                                        position={"absolute"}
                                        top={"0%"}
                                        right={"0%"}
                                        display={"flex"}
                                        alignItems={"center"}
                                        justifyContent={"center"}
                                        width={"100%"}
                                        height={"100%"}
                                    >
                                        <PlayCircleOutlineSharpIcon
                                            sx={{
                                                height: "2rem",
                                                width: "2rem",
                                                color: "white",
                                            }}
                                            />
                                    </Box>
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            bottom: 0,
                                            right: 0,
                                        }}
                                        >
                                        <Typography
                                            variant="body2"
                                            fontSize={"small"}
                                            color={"white"}
                                        >
                                            0:41
                                        </Typography>
                                    </Box>
                                </Grid>
                            <Grid item xs={9} p={1} color={"white"}>
                                <Typography variant="body2" className="side-video-txt" noWrap >Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium aliquam dolores assumenda vero illum consequatur!</Typography>
                                <Typography variant="body2"  className="side-video-txt" >Uploader name</Typography>
                            </Grid>
                            </Grid >
                            ))}
                            </Grid>

                            {/* Video Down Section */}


                            {/* SIDE VIDEO END */}
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
        )
    }

    return (
        <Grid height={"238px"} container>
            {/* ///// --- DIALOG --- ///// */}
           <VideoDialog tumbnail={tumbnail} Tumbnails={Tumbnails} />

            <Grid
                item
                xs={12}
                onClick={handleDialogOpen}
                height={"70%"}
                position={"relative"}
                sx={{
                    backgroundImage: `url(${tumbnail.videoTumbnail})`,
                    borderRadius: "10px",
                    borderBottomRightRadius: 0,
                    borderBottomLeftRadius: 0,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <Box
                    position={"absolute"}
                    top={"0%"}
                    right={"0%"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    width={"100%"}
                    height={"100%"}
                >
                    <PlayCircleOutlineSharpIcon
                        sx={{
                            height: "75px",
                            width: "75px",
                            color: "white",
                        }}
                    />
                </Box>
                <Box sx={{ position: "absolute", bottom: 0, right: 0 }}>
                    <Typography variant="body1" color={"white"} p={1}>
                        0:41
                    </Typography>
                </Box>
            </Grid>

            {/* Video Bottom Section */}
            <Grid
                item
                xs={12}
                height={"30%"}
                sx={{
                    p: 1,
                    borderRadius: "10px",
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                    background: `rgb(0, 0, 0, 0.5) url(${tumbnail.videoTumbnail}) `,
                    backgroundSize: "180%",
                    backgroundPosition: "0% 48%",
                    backgroundBlendMode: "color",
                }}
                container
                position={"relative"}
                // bottom={"30px"}
            >
                <Box
                    width={"100%"}
                    position={"absolute"}
                    top={0}
                    left={0}
                    height={"100%"}
                    sx={{
                        borderRadius: "10px",
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0,
                        backdropFilter: "blur(3px)",
                    }}
                ></Box>
                <Box
                    width={"100%"}
                    position={"absolute"}
                    top={0}
                    left={0}
                    height={"100%"}
                >
                    <div
                        style={{
                            zIndex: 1,
                            backgroundColor: "black",
                            opacity: 0.4,
                            width: "55%",
                            height: "100%",
                            margin: "auto",
                        }}
                    ></div>
                </Box>
                <Grid item lg={1.5} mr={1} sx={{ zIndex: 2 }}>
                    <img
                        src={sjLogo}
                        height={"40px"}
                        width={"40px"}
                        style={{
                            borderRadius: "50px",
                            border: "1px solid white",
                        }}
                        alt=""
                    />
                </Grid>
                <Grid item lg={10} sx={{ zIndex: 2 }}>
                    <Typography
                        ml={1}
                        variant="body2"
                        fontWeight={"bolder"}
                        color={"white"}
                        textAlign={"start"}
                    >
                        SJ Computers LLC
                    </Typography>
                    <Typography variant="body2" color={"white"}>
                        Brittany
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default VideoCard;
