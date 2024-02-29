import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import { Drawer, IconButton, Button } from '@mui/material';
import CategorySidebar from '../CategorySidebar/CategorySidebar';

import './CategoryFilterbarMobile.css';

const CategoryFilterbarMobile = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = openStatus => event => {
    setOpen(!open);
  };

  return (
    <div className='filterbar-section'>
      <div onClick={toggleDrawer(true)} className='filterbar-button'>
        {' '}
        Filters <ExpandMoreIcon />
      </div>
      <Drawer
        className='mobile-filterbar-drawer'
        anchor='bottom'
        open={open}
        onClose={toggleDrawer(false)}>
        <div>
          <div className='button-div'>
            <Button sx={{ color: '#318243' }} onClick={toggleDrawer(false)}>
              Close
            </Button>
          </div>
          <div style={{ maxHeight: '60vh' }}>
            <CategorySidebar inDrawer={true} toggleDrawer={toggleDrawer()} />
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default CategoryFilterbarMobile;
