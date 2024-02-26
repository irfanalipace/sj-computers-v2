import React, { useState, useEffect, useRef } from 'react';

import {
  Grid,
  Typography,
  Box,
  Dialog,
  DialogContent,
  Button,
  DialogActions,
  IconButton,
} from '@mui/material';

import sjLogo from '../../../../../assets/images/sj-logo.jpg';
import PlayCircleOutlineSharpIcon from '@mui/icons-material/PlayCircleOutlineSharp';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import { useSelector } from 'react-redux';
import RecommendationLayout2 from '../../../Recommendation/RecommendationLayout2';

function VideoCard({ data, index, videoData }) {
  const videoRef = useRef();

  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState(data?.url);
  const products = useSelector(state => state.products.products);

  const cleanVideo = () => {
    if (videoRef.current) {
      // Pause the video
      videoRef.current.pause();

      // Remove the source(s)
      videoRef.current.removeAttribute('src');
      videoRef.current.removeAttribute('srcObject');

      // Load a blank source or set the src attribute to an empty string
      videoRef.current.load();

      //   If video is also playing in PictureInPicture tab then for closing the tab ..
      if (document.pictureInPictureElement === videoRef.current) {
        document.exitPictureInPicture().catch(error => {
          console.error('Error closing PiP:', error);
        });
      }
    }
  };

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleClose = e => {
    setOpen(false);
    cleanVideo();
    console.log(open);
  };

  const VideoDialog = ({ data }) => {
    const [currentVideoId, setCurrentVideoId] = useState(videoData[index]?.id);
    const handleSwitchVideo = id => {
      // cleanVideo()
      setCurrentVideoId(id);
    };
    const currentVideo = videoData.find(video => video?.id === currentVideoId);

    return (
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth='lg'
        fullWidth
        sx={{ maxHeight: 'none' }}
      >
        <DialogContent
          sx={{
            p: 0,
            position: 'relative',
            borderRadius: '2px',
            height: '100vh',
          }}
        >
          <Grid container height={'100%'}>
            <Grid item xs={12} md={7.5} container>
              <Grid item xs={12}>
                <video
                  width={'100%'}
                  autoPlay
                  ref={videoRef}
                  src={currentVideo?.url}
                  controls
                ></video>
              </Grid>
              <Grid item xs={12} p={2}>
                <Typography variant='p' lineHeight={1.3}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Praesentium rerum commodi error.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <RecommendationLayout2 products={products} />
              </Grid>
            </Grid>
            <Grid
              item
              md={4.5}
              sx={{ backgroundColor: '#333333', color: 'white' }}
              container
              // px={1}
              // py={1}
            >
              <Grid item xs={12}>
                <DialogActions>
                  <IconButton
                    onClick={e => handleClose(e)}
                    sx={{
                      color: 'whitesmoke',
                      position: 'absolute',
                      top: 0,
                      right: 0,
                    }}
                  >
                    <CloseOutlinedIcon />
                  </IconButton>
                </DialogActions>
                <Grid item xs={12} container rowGap={1} px={2} my={2}>
                  <Grid item xs={12} mb={1}>
                    <Typography variant='body1'>
                      Videos for ths product
                    </Typography>
                  </Grid>
                  {/* ////  Side video section //// */}
                  {/* Map Function for the side videos list */}
                  {videoData?.map((data, index) => {
                    return (
                      <Grid item xs={12} container key={index}>
                        <Grid
                          item
                          xs={3}
                          onClick={e => handleSwitchVideo(data?.id)}
                          height={'60px'}
                          position={'relative'}
                          sx={{
                            backgroundImage: `url(${data?.thumbnail_image})`,
                            borderRadius: '2px',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            cursor: 'pointer',
                            border:
                              currentVideo?.id == data?.id
                                ? '2px solid orange'
                                : '',
                          }}
                        >
                          <Box
                            position={'absolute'}
                            top={'0%'}
                            right={'0%'}
                            display={'flex'}
                            alignItems={'center'}
                            justifyContent={'center'}
                            width={'100%'}
                            height={'100%'}
                          >
                            <PlayCircleOutlineSharpIcon
                              sx={{
                                height: '2rem',
                                width: '2rem',
                                color: 'white',
                              }}
                            />
                          </Box>
                          <Box
                            sx={{
                              position: 'absolute',
                              bottom: 0,
                              right: 0,
                            }}
                          >
                            <Typography
                              variant='body2'
                              fontSize={'small'}
                              color={'white'}
                            >
                              {/* 0:41 */}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={9} p={1} color={'white'}>
                          <Typography
                            variant='body2'
                            className='side-video-txt'
                            noWrap
                          >
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Aspernatur, quis?
                          </Typography>
                          <Typography
                            variant='body2'
                            className='side-video-txt'
                          >
                            Uploader name
                          </Typography>
                        </Grid>
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <Grid height={'238px'} container position={'relative'}>
      {/* ///// --- DIALOG --- ///// */}
      <VideoDialog data={data} />

      <Grid
        item
        xs={12}
        onClick={handleDialogOpen}
        height={'70%'}
        position={'relative'}
        sx={{
          backgroundImage: `url(${data?.thumbnail_image})`,
          borderRadius: '10px',
          borderBottomRightRadius: 0,
          borderBottomLeftRadius: 0,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '@media (max-width: 600px)': {
            height: '100%',
            borderRadius: '10px',
          },
        }}
      >
        <Box
          position={'absolute'}
          top={'0%'}
          right={'0%'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          width={'100%'}
          height={'100%'}
        >
          <PlayCircleOutlineSharpIcon
            sx={{
              height: '75px',
              width: '75px',
              color: 'white',
            }}
          />
        </Box>
        <Box sx={{ position: 'absolute', bottom: 0, right: 0 }}>
          <Typography variant='body1' color={'white'} p={1}>
            {/* 0:41 */}
          </Typography>
        </Box>
      </Grid>

      {/* Video Bottom Section */}
      <Grid
        item
        xs={12}
        height={'30%'}
        sx={{
          p: 1,
          borderRadius: '10px',
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          background: `rgb(0, 0, 0, 0.5) url(${data?.thumbnail_image}) `,
          backgroundSize: '180%',
          backgroundPosition: '0% 48%',
          backgroundBlendMode: 'color',
          '@media (max-width: 600px)': { display: 'none' },
        }}
        container
        position={'relative'}
        // bottom={"30px"}
      >
        <Box
          width={'100%'}
          position={'absolute'}
          top={0}
          left={0}
          height={'100%'}
          sx={{
            borderRadius: '10px',
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            backdropFilter: 'blur(3px)',
          }}
        ></Box>
        <Box
          width={'100%'}
          position={'absolute'}
          top={0}
          left={0}
          height={'100%'}
        >
          <div
            style={{
              zIndex: 1,
              backgroundColor: 'black',
              opacity: 0.4,
              width: '55%',
              height: '100%',
              margin: 'auto',
            }}
          ></div>
        </Box>
      </Grid>
      <Grid
        container
        position={'absolute'}
        bottom={0}
        left={0}
        height={'30%'}
        p={1}
      >
        <Grid item sx={{ zIndex: 2 }}>
          <img
            src={sjLogo}
            // height={"40px"}
            width={'50px'}
            style={{
              borderRadius: '75px',
              border: '1px solid white',
              marginRight: '10px',
            }}
            alt='Profile'
          />
        </Grid>
        <Grid item sx={{ zIndex: 2 }}>
          <Typography
            ml={1}
            variant='body2'
            fontWeight={'bolder'}
            color={'white'}
            textAlign={'start'}
            noWrap
          >
            SJ Computers LLC
          </Typography>
          <Typography variant='body2' color={'white'}>
            Brittany
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default VideoCard;
