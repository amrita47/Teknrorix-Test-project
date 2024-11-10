import React from 'react';
import { Link } from 'react-router-dom';

const JobLists = ({ jobs, filters }) => {
  // Optionally filter jobs based on the filters
  const filteredJobs = jobs.filter(job => {
    // Implement your filter logic here
    return true; // Return true for now to show all jobs
  });

  return (
    <div>
      {filteredJobs.length > 0 ? (
        filteredJobs.map(job => (
          <div key={job.id} style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
            <h3>{job.title}</h3>
            <p>{job.location}</p>
            <Link to={`/job/${job.id}`}>View</Link>
            <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">Apply</a>
          </div>
        ))
      ) : (
        <p>No jobs found.</p>
      )}
    </div>
  );
};

export default JobLists;
