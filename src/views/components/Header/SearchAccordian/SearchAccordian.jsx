import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './SearchAccordian.css';
import { makeStyles } from '@material-ui/core/styles';
// import styled from "styled-components";
import { useState } from 'react';

const SearchAccordian = () => {
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const useStyles = makeStyles(theme => ({
    root: {
      height: '100%',
      backgroundImage:
        'linear-gradient(180deg, #00305E 0%, #30577C 16.15%, #6C88A2 33.87%, #FFFFFF 100%)',
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    accordian: {
      marginBottom: '10px',
      border: '1px solid #002549',
      width: '98%',
    },
    accordianSummary: {
      height: '10px',
    },
  }));
  const classes = useStyles();
  const handleSearch = e => {
    e.preventDefault();
    dispatch(SET_SEARCH_STRING(search));
  };
  return (
    <div className={classes.root}>
      <form onSubmit={handleSearch}>
        <div className='search-hide-section-body'>
          <SearchBar className='search-acorditions-withorder-pace-data'>
            <Input
              className='search-section'
              type='text'
              placeholder='Search '
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <span
              className='input-group-text red lighten-3 search-icon-on-mobile-screen'
              id='basic-text1'>
              <i
                className='fas fa-search text-grey set'
                aria-hidden='true'
                onClick={handleSearch}></i>
            </span>
          </SearchBar>
        </div>
      </form>
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
        className={classes.accordian}>
        <AccordionSummary
          className={classes.accordianSummary}
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1bh-content'
          id='panel1bh-header'>
          <Typography>Shop by Category</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Computers</Typography>
          <Typography>Laptops</Typography>
          <Typography>Desktops</Typography>
          <Typography>Storages</Typography>
          <Typography>Hard drives</Typography>
          <Typography>Graphic Cards</Typography>
          <Typography>Components</Typography>
          <Typography>Networking</Typography>
          <Typography>Ram's</Typography>
          <Typography>Gaming Systems</Typography>
          <Typography>Monitors</Typography>
          <Typography>Computers</Typography>
          <Typography>Laptops</Typography>
          <Typography>Desktops</Typography>
          <Typography>Storages</Typography>
          <Typography>Hard drives</Typography>
          <Typography>Graphic Cards</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
        className={classes.accordian}>
        <AccordionSummary
          className={classes.accordianSummary}
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel2bh-content'
          id='panel2bh-header'>
          <Typography>Price & Deals</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Up to $25</Typography>
          <Typography>Up to $50</Typography>
          <Typography>$50 to $100</Typography>
          <Typography>$100 or above</Typography>
          <p style={{ color: 'lightgreen', fontSize: '18px' }}>Custom price</p>
          <div>
            <button>$Min</button> &ensp;
            <button>$Max</button> &ensp;
            <button>Go</button>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel3'}
        onChange={handleChange('panel3')}
        className={classes.accordian}>
        <AccordionSummary
          className={classes.accordianSummary}
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel3bh-content'
          id='panel3bh-header'>
          <Typography>Trending</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>New Arrivals</Typography>
          <Typography>Best Sellers</Typography>
          <Typography>Today's Deals</Typography>
          <Typography>Flash sale</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel4'}
        onChange={handleChange('panel4')}
        className={classes.accordian}>
        <AccordionSummary
          className={classes.accordianSummary}
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel4bh-content'
          id='panel4bh-header'>
          <Typography>Brands</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>HP</Typography>
          <Typography>DELL</Typography>
          <Typography>Lenovo</Typography>
          <Typography>Apple</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel5'}
        onChange={handleChange('panel5')}
        className={classes.accordian}>
        <AccordionSummary
          className={classes.accordianSummary}
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel5bh-content'
          id='panel5bh-header'>
          <Typography>Availability</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Include out of stock</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel6'}
        onChange={handleChange('panel6')}
        className={classes.accordian}>
        <AccordionSummary
          className={classes.accordianSummary}
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel6bh-content'
          id='panel6bh-header'>
          <Typography>Settings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>State and Language</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel7'}
        onChange={handleChange('panel7')}
        className={classes.accordian}>
        <AccordionSummary
          className={classes.accordianSummary}
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel7bh-content'
          id='panel7bh-header'>
          <Typography>Customer Service</Typography>
        </AccordionSummary>
      </Accordion>
      <Accordion className={classes.accordian}>
        <AccordionSummary
          className={classes.accordianSummary}
          expandIcon={<ExpandMoreIcon />}
          id='panel3a-header'>
          <Typography>Sign In</Typography>
        </AccordionSummary>
      </Accordion>
    </div>
  );
};
// const SearchBar = styled.div`
//     display: flex;
//     align-items: center;
//     width: 100%;
//     margin-bottom: 20px;
// `;
// const Input = styled.input`
//     width: 330px;
//     padding: 10px;
//     border-radius: 5px;
//     border: 1px solid #ccc;
//     font-size: 16px;
// `;
export default SearchAccordian;
