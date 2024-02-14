import React, {useState} from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import { Drawer, IconButton } from '@mui/material';
import CategorySidebar from '../CategorySidebar/CategorySidebar';

import "./CategoryFilterbarMobile.css"

const CategoryFilterbarMobile = () => {

    const [open, setOpen] = useState(false);

    const toggleDrawer = (openStatus) => (event) => {
      setOpen(openStatus);
    };

  return (
    <div className='filterbar-section' >
        <div onClick={toggleDrawer(true)} className='filterbar-button'> Filters <ExpandMoreIcon /></div>
        <Drawer anchor="bottom" open={open} onClose={toggleDrawer(false)}>
        <div style={{position: "relative", padding: '20px'}}>
          <IconButton onClick={toggleDrawer(false)} sx={{position: "absolute", top: 0, right: 0}}><CloseIcon /></IconButton>
          <div style={{maxHeight: "60vh"}}>
                <CategorySidebar />
          </div>
            
        </div>
      </Drawer>
    </div>
  )
}

export default CategoryFilterbarMobile