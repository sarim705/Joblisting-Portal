import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Box, Button, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import theme from "./theme/theme";
import Header from "./Components/Header/Header";
import Search from "./SearchBar/Search";
import Jobsearch from "./Job/Jobsearch";
import Dail from "./Job/Dail";
import { firestore } from "./config";
import { collection, getDocs, addDoc, serverTimestamp, query, orderBy, where } from "firebase/firestore";
import ViewJob from "./Job/ViewJob";

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [customSearch, setCustomSearch] = useState(false);
  const [viewJob, setViewJob] = useState({});

  const fetchJobs = async () => {
    setCustomSearch(false);
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(firestore, 'jobs'));
      const tempJobs = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setJobs(tempJobs);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
      console.error("Error fetching jobs:", error);
    }
  };

  const fetchJobsCustom = async (jobSearch) => {
    setLoading(true);
    setCustomSearch(true);
    try {
      const jobsQuery = query(
        collection(firestore, 'jobs'),
        orderBy("postedOn", "desc"),
        where("location", "==", jobSearch.location),
        where("type", "==", jobSearch.type)
      );
      const snapshot = await getDocs(jobsQuery);
      const tempJobs = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setJobs(tempJobs);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
      console.error("Error fetching jobs:", error);
    }
  };

  const postJob = async (jobDetails) => {
    try {
      await addDoc(collection(firestore, 'jobs'), {
        ...jobDetails,
        postedOn: serverTimestamp()
      });
      fetchJobs(); 
    } catch (error) {
      console.error("Error posting job:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleOpen = (job) => {
    setViewJob(job);
  };

  const handleClose = () => {
    setViewJob({});
  };

  

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Header dialogOpen={() => setDialogOpen(true)} />
      <Dail
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        postJob={postJob}
      />
      <ViewJob job={viewJob} closeModal={handleClose} />
      <Grid container justifyContent="center">
        <Grid item xs={10}>
          <Search fetchJobsCustom={fetchJobsCustom} />
          {customSearch && (
            <Box display="flex" justifyContent="flex-end" my={2}>
              <Button onClick={fetchJobs}>
                <CloseIcon size={20} />
                Clear Custom Search
              </Button>
            </Box>
          )}
          {jobs.map((job) => (
            <Jobsearch
              key={job.id}
              title={job.title}
              companyName={job.companyName}
              postedOn={job.postedOn}
              location={job.location}
              skills={job.skills}
              type={job.type}
              open={() => handleOpen(job)}
            />
          ))}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
