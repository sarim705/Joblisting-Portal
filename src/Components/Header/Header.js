import React from "react";
import { Grid, Button, Box, Typography } from "@mui/material";

function Header(props) {
  return (
    <Box bgcolor="secondary.main" py={10} color="white">
      <Grid container justifyContent="center" >
        <Grid item xs={10} >
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h5">Open Job Listing</Typography>
            <Button onClick={props.dialogOpen} variant="contained" color="primary">Post a job</Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Header;
