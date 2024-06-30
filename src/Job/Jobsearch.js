import React from "react";
import { Grid, Typography, Box, Button } from "@mui/material";
import { styled } from '@mui/system';
import { differenceInMinutes } from "date-fns";

const StyledBox = styled(Box)({
  border: '1px solid #e8e8e8',
  display: 'flex',
  transition: 'border-color 0.3s ease-in-out',
  cursor: 'pointer',
  boxShadow: '0px 1px 5px rgba(0,0,0,0.1)',
  borderRadius: '1px',
  '&:hover': {
    border: '2px solid #009688',
  },
  '& > *': {
    flex: 1,
    height: '45px',
    margin: '8px',
  },
});

const HighlightTextPrimary = styled('span')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  padding: '6px',
  fontWeight: "600",
  borderRadius: "5px",
  margin: theme.spacing(0.75),
  color: theme.palette.primary.contrastText,
}));

const HighlightTextSecondary = styled('span')(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  margin: theme.spacing(0.5),
  padding: '6px',
  borderRadius: "5px",
  fontWeight: "600",
  color: theme.palette.secondary.contrastText,
}));

function Jobsearch(props) {
  const postedOnDate = props.postedOn.toDate();
  return (
    <StyledBox p={2}>
      <Grid container alignItems={'center'}>
        <Grid item xs>
          <Typography variant="subtitle1">
            {props.title}
          </Typography>
          <Typography variant="subtitle2">
            <HighlightTextPrimary>{props.companyName}</HighlightTextPrimary>
          </Typography>
        </Grid>
        <Grid item container xs>
          {props.skills && props.skills.map((skill) => (
            <Grid key={skill} item>
              <Typography variant="subtitle2">
                <HighlightTextSecondary>{skill}</HighlightTextSecondary>
              </Typography>
            </Grid>
          ))}
        </Grid>
        <Grid item container xs direction={'column'} alignItems="flex-end">
          <Grid item>
            <Typography variant="caption">
              {differenceInMinutes(Date.now(), postedOnDate)} min ago | {props.type} | {props.location}
            </Typography>
          </Grid>
          <Grid item>
            <Box>
              <Button variant="outlined" onClick={props.open} sx={{ borderColor: 'secondary.main', borderRadius: "5px" }}>
                Check
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </StyledBox>
  );
}

export default Jobsearch;
