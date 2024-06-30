import React, { useState } from 'react';
import { Box, Button, Select, MenuItem, CircularProgress } from "@mui/material";
import { styled } from '@mui/system';

const StyledBox = styled(Box)({
  border: '1px solid #e8e8e8',
  display: 'flex',
  transition: 'border-color 0.3s ease-in-out',
  cursor: 'pointer',
  boxShadow: '0px 1px 5px rgba(0,0,0,0.1)',
  borderRadius: '1px',
  backgroundColor: 'white',
  '&:hover': {
    border: '2px solid #009688',
  },
  '& > *': {
    flex: 1,
    height: '45px',
    margin: '8px',
  },
});

function Search(props) {
  const [loading, setLoading] = useState(false);
  const [jobSearch, setJobSearch] = useState({
    type: 'Full time',
    location: 'Remote'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobSearch(oldState => ({
      ...oldState,
      [name]: value,
    }));
  };

  const search = async () => {
    setLoading(true);
    await props.fetchJobsCustom(jobSearch);
    setLoading(false);
  };

  return (
    <StyledBox p={2} mt={-6} mb={2}>
      <Select
        value={jobSearch.type}
        name="type"
        variant="filled"
        disableUnderline
        onChange={handleChange}
      >
        <MenuItem value="Full time">Full time</MenuItem>
        <MenuItem value="Contract">Contract</MenuItem>
      </Select>
      <Select
        value={jobSearch.location}
        name="location"
        variant="filled"
        disableUnderline
        onChange={handleChange}
      >
        <MenuItem value="In Office">In Office</MenuItem>
        <MenuItem value="Remote">Remote</MenuItem>
        <MenuItem value="Hybrid">Hybrid</MenuItem>
      </Select>
      <Button
        disabled={loading}
        variant="contained"
        color="primary"
        onClick={search}
      >
        {loading ? (
          <CircularProgress color='secondary' size={22} />
        ) : (
          "Search"
        )}
      </Button>
    </StyledBox>
  );
}

export default Search;
