import React from "react";
import { FaBriefcase, FaMapMarkerAlt, FaRupeeSign } from "react-icons/fa";
import "../styles/JobCard.css";

export default function JobCard({ job }) 
{
  const expMain = job.experience.replace(" Exp", "");
  return (
    <div className="job-card">
      <div className="job-card-top">
        <div className="logo-box">
          <img src={job.logo} alt={job.company} className="job-logo" />
        </div>
        <span className="posted">{job.posted}</span>
      </div>
      <h3 className="job-title">{job.title}</h3>
      <div className="job-meta-grid">
        <div className="meta-item">
          <FaBriefcase className="meta-icon" />
          <div className="meta-main">{expMain}</div>
          <div className="meta-sub">Exp</div>
        </div>
        <div className="meta-item">
          <FaMapMarkerAlt className="meta-icon" />
          <div className="meta-main">{job.location}</div>
          <div className="meta-sub">&nbsp;</div>
        </div>
        <div className="meta-item">
          <FaRupeeSign className="meta-icon" />
          <div className="meta-main">₹ {job.salary}</div>
          <div className="meta-sub">LPA</div>
        </div>
      </div>
      <ul className="job-desc">
        {
        job.description.map
        (
          (d, i) => ( <li key={i}>{d}</li> )
        )
        }
      </ul>
      <button className="apply-btn">Apply Now</button>
    </div>
  );
}
