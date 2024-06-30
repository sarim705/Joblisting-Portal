import React from "react";
import {
  Box,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import { format, isValid } from 'date-fns';

const Styling = styled(Box)(({ theme }) => ({
  margin: '4px',
}));

const HighlightTextSecondary = styled('span')(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  margin: theme.spacing(0.5),
  padding: '6px',
  borderRadius: "5px",
  fontWeight: "600",
  color: theme.palette.secondary.contrastText,
}));

function ViewJob({ job, closeModal }) {
  console.log("ViewJob component rendered with job:", job);

    const postedOnDate = job.postedOn && isValid(new Date(job.postedOn.toDate())) ? job.postedOn.toDate() : null;

  return (
    <Dialog open={!!Object.keys(job).length} fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {job.title} @ {job.companyName}
          <IconButton onClick={closeModal}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box>
          <Styling>
            <Box display="flex">
              <Typography variant="caption">postedOn:</Typography>
              <Typography variant="body2">
                {postedOnDate ? format(postedOnDate, "dd/MM/yyyy HH:mm") : "N/A"}
              </Typography>
            </Box>
          </Styling>
          <Styling>
            <Box display="flex">
              <Typography variant="caption">Job type:</Typography>
              <Typography variant="body2">
                {job.type}
              </Typography>
            </Box>
          </Styling>
          <Styling>
            <Box display="flex">
              <Typography variant="caption">Job location:</Typography>
              <Typography variant="body2">
                {job.location}
              </Typography>
            </Box>
          </Styling>
          <Styling>
            <Box display="flex">
              <Typography variant="caption">Job description:</Typography>
              <Typography variant="body2">
                {job.description}
              </Typography>
            </Box>
          </Styling>
          <Styling>
            <Box display="flex">
              <Typography variant="caption">companyName:</Typography>
              <Typography variant="body2">
                {job.companyName}
              </Typography>
            </Box>
          </Styling>
          <Styling>
            <Box display="flex">
              <Typography variant="caption">company website:</Typography>
              <Typography variant="body2">
                {job.companyUrl}
              </Typography>
            </Box>
          </Styling>
          
            <Box ml="4px" display={"flex"} mt="9px">
              <Typography variant="caption">Skills:</Typography>
              <Grid container alignItems="center">
                {job.skills && job.skills.map((skill) => (
                  <Grid item key={skill}>
                    <HighlightTextSecondary>{skill}</HighlightTextSecondary>
                  </Grid>
                ))}
              </Grid>
            </Box>
          
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" component="a" href={job.link} target="_blank">Apply</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ViewJob;
