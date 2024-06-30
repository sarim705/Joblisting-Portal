import React, { useState } from 'react';
import {
  Box,
  Grid,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FilledInput,
  Typography,
  Button,
  IconButton,
  CircularProgress
} from "@mui/material";
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';

const HighlightTextSecondary = styled('span')(({ theme }) => ({
  margin: theme.spacing(0.5),
  padding: '6px',
  borderRadius: "5px",
  fontWeight: "600",
  color: theme.palette.secondary.main,
  border: `1px solid ${theme.palette.secondary.main}`,
  cursor: "pointer",
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
    color: "#fff",
  }
}));

const HighlightTextSelected = styled('span')(({ theme }) => ({
  margin: theme.spacing(0.5),
  padding: '6px',
  borderRadius: "5px",
  fontWeight: "600",
  color: "#fff",
  backgroundColor: theme.palette.secondary.main,
  border: `1px solid ${theme.palette.secondary.main}`,
  cursor: "pointer",
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
  }
}));

const Dail = (props) => {
  const [loading, setLoading] = useState(false);
  const [jobDetail, setJobDetail] = useState({
    companyName: '',
    companyUrl: '',
    link: '',
    location: 'Remote',
    postedOn: '',
    skills: [],
    title: '',
    type: 'Full time',
    description: ''
  });

  const addRemoveSkill = (skill) => {
    setJobDetail(oldState => {
      const newSkills = oldState.skills.includes(skill)
        ? oldState.skills.filter(s => s !== skill)
        : [...oldState.skills, skill];
      return { ...oldState, skills: newSkills };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetail(oldState => ({
      ...oldState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    // Validate required fields
    const requiredFields = ['title', 'companyName', 'companyUrl'];
    for (const field of requiredFields) {
      if (!jobDetail[field]) {
        alert(`Please fill out the ${field} field`);
        return;
      }
    }
    if (!jobDetail.skills.length) {
      alert('Please add at least one skill');
      return;
    }

    setLoading(true);
    await props.postJob(jobDetail);
    setLoading(false);
    props.onClose(); // Close the dialog after submission
  };

  const skills = ["Javascript", "React.js", "Node.js", "SQL", "MongoDB", "Firebase", "Python"];

  return (
    <Dialog open={props.open} fullWidth onClose={props.onClose}>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          Post Job
          <IconButton onClick={props.onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FilledInput
              onChange={handleChange}
              name="title"
              value={jobDetail.title}
              placeholder="Job title"
              disableUnderline
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              onChange={handleChange}
              name="type"
              value={jobDetail.type}
              fullWidth
              variant="filled"
              disableUnderline
            >
              <MenuItem value="Full time">Full time</MenuItem>
              <MenuItem value="Part time">Part time</MenuItem>
              <MenuItem value="Contract">Contract</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <FilledInput
              onChange={handleChange}
              name="companyName"
              value={jobDetail.companyName}
              placeholder="Company name*"
              disableUnderline
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <FilledInput
              onChange={handleChange}
              name="companyUrl"
              value={jobDetail.companyUrl}
              placeholder="Company URL*"
              disableUnderline
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              onChange={handleChange}
              name="location"
              value={jobDetail.location}
              fullWidth
              disableUnderline
              variant="filled"
            >
              <MenuItem value="Remote">Remote</MenuItem>
              <MenuItem value="In-office">In-office</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <FilledInput
              onChange={handleChange}
              name="link"
              value={jobDetail.link}
              placeholder="Job Link"
              disableUnderline
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FilledInput
              onChange={handleChange}
              name="description"
              value={jobDetail.description}
              placeholder="Job Description"
              disableUnderline
              fullWidth
              multiline
              rows={4}
            />
          </Grid>
        </Grid>
        <Box mt={2}>
          <Typography>Skills</Typography>
          <Box display="flex" flexWrap="wrap" mt={2}>
            {skills.map((skill) => (
              jobDetail.skills.includes(skill) ? (
                <HighlightTextSelected onClick={() => addRemoveSkill(skill)} key={skill}>
                  {skill}
                </HighlightTextSelected>
              ) : (
                <HighlightTextSecondary onClick={() => addRemoveSkill(skill)} key={skill}>
                  {skill}
                </HighlightTextSecondary>
              )
            ))}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box
          color="red"
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="caption">*Required Fields</Typography>
          <Button
            variant="contained"
            disableElevation
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress color="secondary" size={22} />
            ) : (
              "Post Job"
            )}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default Dail;
