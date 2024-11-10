import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`https://api.jobsoid.com/v2/jobs/${id}`, {
          headers: {
            'Authorization': `Bearer YOUR_API_KEY`
          }
        });
        setJob(response.data);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    fetchJobDetails();
  }, [id]);

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{job.title}</h1>
      <p>{job.description}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Department:</strong> {job.department}</p>
      <p><strong>Salary:</strong> {job.salary}</p>
      <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">Apply Now</a>
    </div>
  );
};

export default JobDetails;
