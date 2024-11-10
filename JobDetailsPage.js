import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles.css';

const JobDetailsPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [relatedJobs, setRelatedJobs] = useState([]);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`https://api.jobsoid.com/v2/jobs/${id}`, {
          headers: {
            'Authorization': `Bearer YOUR_API_KEY`  
          }
        });
        setJob(response.data);

        // Fetch related jobs from the same department
        const relatedJobsResponse = await axios.get('https://api.jobsoid.com/v2/jobs', {
          headers: {
            'Authorization': `Bearer YOUR_API_KEY`  // Replace YOUR_API_KEY with your actual Jobsoid API key
          }
        });

        const related = relatedJobsResponse.data.filter(j => j.department === response.data.department && j.id !== response.data.id);
        setRelatedJobs(related);
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
    <div className="main-container">
      <header>
        <h1>{job.title}</h1>
      </header>
      <div className="job-details">
        <p>{job.description}</p>
        <p><strong>Location:</strong> {job.location}</p>
        <p><strong>Department:</strong> {job.department}</p>
        <p><strong>Salary:</strong> {job.salary}</p>
        <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">Apply Now</a>
        <div className="social-share">
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer">Share on Facebook</a>
          <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${job.title}&summary=${job.description}`} target="_blank" rel="noopener noreferrer">Share on LinkedIn</a>
          <a href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${job.title}`} target="_blank" rel="noopener noreferrer">Share on Twitter</a>
        </div>
      </div>
      <div className="related-jobs">
        <h2>Other job openings in {job.department}</h2>
        {relatedJobs.length > 0 ? (
          relatedJobs.map(relatedJob => (
            <div key={relatedJob.id} className="job-item">
              <h3>{relatedJob.title}</h3>
              <p>{relatedJob.location}</p>
              <Link to={`/job/${relatedJob.id}`}>View</Link>
              <a href={relatedJob.applyUrl} target="_blank" rel="noopener noreferrer">Apply</a>
            </div>
          ))
        ) : (
          <p>No other job openings found in this department.</p>
        )}
      </div>
    </div>
  );
};

export default JobDetailsPage;
