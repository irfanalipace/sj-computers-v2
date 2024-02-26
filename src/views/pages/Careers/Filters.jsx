import { Search } from '@material-ui/icons';
import { Box, IconButton, Paper } from '@mui/material';
import React from 'react';
function Filters() {
  return (
    <>
      <Paper elevation={3}>
        <Box p={5}>
          <input
            type='text'
            class='search-input'
            placeholder='Search...'
            name=''
          />
        </Box>
      </Paper>
    </>
  );
}

export default Filters;
