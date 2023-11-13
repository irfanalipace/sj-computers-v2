import React from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Filters from "./Filters";
function Careers() {
    return <>
        <Grid container spacing={2} px={10}>
            <Grid item xs={6} md={4}>
                <Filters />
            </Grid>
            <Grid item xs={6} md={8}>
                {/* <Item>xs=6 md=8</Item> */}
                <h1> worlf</h1>
            </Grid>
        </Grid>

    </>;
}

export default Careers;
