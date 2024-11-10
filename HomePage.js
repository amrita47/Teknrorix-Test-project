import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobLists from '../components/JobLists';
import SearchFilters from '../components/SearchFilters';
import AppliedFilters from '../components/AppliedFilters';

const HomePage = () => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('https://api.jobsoid.com/v2/jobs', {
          headers: {
            'Authorization': `Bearer YOUR_API_KEY`
          }
        });
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div>
      <SearchFilters setFilters={setFilters} />
      <AppliedFilters filters={filters} setFilters={setFilters} />
      <JobLists jobs={jobs} filters={filters} />
    </div>
  );
};

export default HomePage;
