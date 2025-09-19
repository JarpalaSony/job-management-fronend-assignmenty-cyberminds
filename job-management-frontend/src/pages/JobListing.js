
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import JobCard from "../components/JobCard";
import JobFilters from "../components/JobFilters";
import "../styles/JobListing.css";
import { store } from "../App";

export default function JobListingPage() {
  const [filters, setFilters] = useState({
    search: "",
    jobType: "",
    location: "",
    minSalary: 0,
    maxSalary: 50
  });

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useContext(store);

  // Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("https://job-management-backend-assignmentby.onrender.com/jobs");
        setJobs(res.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Apply filters
  const filteredJobs = jobs.filter((job) => {
    const title = job.title?.toLowerCase() || "";
    const type = job.jobType?.toLowerCase() || "";
    const loc = job.location?.toLowerCase() || "";

    const matchSearch = title.includes(filters.search.toLowerCase());
    const matchJobType = filters.jobType
      ? type === filters.jobType.toLowerCase()
      : true;
    const matchLocation = filters.location
      ? loc === filters.location.toLowerCase()
      : true;

    // Convert backend salary to LPA (assuming stored in rupees)
    const jobMin = job.minSalary / 100000;
    const jobMax = job.maxSalary / 100000;

    // Salary overlap check
    const matchSalary =
      jobMax >= filters.minSalary && jobMin <= filters.maxSalary;

    return matchSearch && matchJobType && matchLocation && matchSalary;
  });

  return (
    <>
      <JobFilters filters={filters} setFilters={setFilters} />

      <div className="job-listing-page">
        {loading ? (
          <p>Loading jobs...</p>
        ) : (
          <div className="job-grid">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <JobCard
                  key={job._id}
                  job={{
                    id: job._id,
                    title: job.title,
                    company: job.companyName,
                    logo: job.companyLogo
                      ? `https://job-management-backend-assignmentby.onrender.com${job.companyLogo}`
                      : "https://cdn-icons-png.flaticon.com/512/2965/2965879.png", // fallback
                    experience: job.experience || "0-2 yr Exp",
                    location: job.location,
                    salary: job.minSalary / 100000, // show in LPA
                    jobType: job.jobType,
                    posted: new Date(job.createdAt).toDateString(),
                    description: [job.jobDescription],
                  }}
                />
              ))
            ) : (
              <p className="no-results">No jobs found matching your filters.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
