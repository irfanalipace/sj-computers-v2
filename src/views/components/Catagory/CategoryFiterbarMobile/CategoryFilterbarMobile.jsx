import React, {useState} from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import { Drawer, IconButton, Button } from '@mui/material';
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
        <div>
          <div style={{textAlign: "end", padding: '10px', borderBottom: '1px solid #DDDDDD'}}>
            <Button sx={{color:"#318243"}} onClick={toggleDrawer(false)} >Close</Button>
          </div>
          <div style={{maxHeight: "60vh"}}>
                <CategorySidebar inDrawer={true} />
          </div>
            
        </div>
      </Drawer>
    </div>
  )
}

export default CategoryFilterbarMobile