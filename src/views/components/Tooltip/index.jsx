// import * as React from "react";
// import Popover from "@mui/material/Popover";
// import Typography from "@mui/material/Typography";
// import { Box } from "@mui/material";

// export default function MouseOverPopover({ hoverElement, content }) {
//     const [anchorEl, setAnchorEl] = React.useState(null);

//     const handlePopoverOpen = (event) => {
//         setAnchorEl(event.currentTarget);
//     };

//     const handlePopoverClose = (e) => {
//         // setTimeout(() => {
//         // console.log(e);
//         setAnchorEl(null);
//         // }, 500);
//     };

//     const open = Boolean(anchorEl);

//     return (
//         <div>
//             <Box
//                 aria-owns={open ? "mouse-over-popover" : undefined}
//                 aria-haspopup="true"
//                 onMouseEnter={handlePopoverOpen}
//                 onMouseLeave={handlePopoverClose}
//             >
//                 {hoverElement ? hoverElement : "Hover with a Popover."}
//             </Box>
//             <Popover
//                 // PaperProps={{
//                 //     onMouseEnter: handlePopoverOpen,
//                 //     onMouseLeave: handlePopoverClose,
//                 // }}
//                 id="mouse-over-popover"
//                 // sx={{
//                 //     pointerEvents: "none",
//                 // }}
//                 open={open}
//                 anchorEl={anchorEl}
//                 anchorOrigin={{
//                     vertical: "bottom",
//                     horizontal: "left",
//                 }}
//                 transformOrigin={{
//                     vertical: "top",
//                     horizontal: "left",
//                 }}
//                 onClose={(e) => {
//                     console.log(e);
//                 }}
//                 disableRestoreFocus
//             >
//                 {content ? (
//                     content
//                 ) : (
//                     <Typography sx={{ p: 1 }}>I use Popover.</Typography>
//                 )}
//             </Popover>
//         </div>
//     );
// }

// Tooltip.js

import React from 'react';

import './index.css';
import { Box } from '@mui/material';

const Tooltip = ({ content, sx, children }) => {
  return (
    <div className='tooltip-container'>
      {children}
      <Box className='tooltip' sx={sx}>
        {content}
      </Box>
    </div>
  );
};

export default Tooltip;
