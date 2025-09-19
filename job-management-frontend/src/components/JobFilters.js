import React from "react";
import { Search, MapPin, Users } from "lucide-react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "../styles/JobFilter.css";

export default function JobFilters({ filters = {}, setFilters = () => {} }) {
  const safeFilters = {
    search: "",
    location: "",
    jobType: "",
    minSalary: 0,
    maxSalary: 50,
    ...filters,
  };

  return (
    <div className="job-filters">
      {/* Search */}
      <div className="filter-item search">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          type="text"
          placeholder="Search By Job Title, Role"
          value={safeFilters.search}
          onChange={(e) =>
            setFilters({ ...safeFilters, search: e.target.value })
          }
        />
      </div>

      {/* Location */}
      <div className="filter-item">
        <MapPin className="icon" />
        <select
          value={safeFilters.location}
          onChange={(e) =>
            setFilters({ ...safeFilters, location: e.target.value })
          }
        >
          <option value="">Preferred Location</option>
          <option value="hyderabad">Hyderabad</option>
          <option value="bengaluru">Bengaluru</option>
          <option value="chennai">Chennai</option>
          <option value="ahmadabad">Ahmadabad</option>
          <option value="delhi">Delhi</option>
          <option value="gurgaon">Gurgaon</option>
          <option value="remote">Remote</option>
        </select>
      </div>

      {/* Job Type */}
      <div className="filter-item">
        <Users className="icon" />
        <select
          value={safeFilters.jobType}
          onChange={(e) =>
            setFilters({ ...safeFilters, jobType: e.target.value })
          }
        >
          <option value="">Job type</option>
          <option value="full time">Full Time</option>
          <option value="part time">Part Time</option>
          <option value="contract">Contract</option>
          <option value="internship">Internship</option>
        </select>
      </div>

      {/* Salary Slider */}
      <div className="filter-item salary">
        <div className="salary-header">
          <span className="label">Salary (LPA)</span>
          <span className="range-display">
            ₹{safeFilters.minSalary}L - ₹{safeFilters.maxSalary}L
          </span>
        </div>
        <Slider
          range
          min={0}
          max={50} // 0–50 LPA
          step={1}
          value={[safeFilters.minSalary, safeFilters.maxSalary]}
          onChange={(val) =>
            setFilters({
              ...safeFilters,
              minSalary: val[0],
              maxSalary: val[1],
            })
          }
          className="salary-slider"
          trackStyle={[{ backgroundColor: "black", height: 3 }]}
          handleStyle={[
            { borderColor: "black", backgroundColor: "black" },
            { borderColor: "black", backgroundColor: "black" },
          ]}
          railStyle={{ backgroundColor: "#ddd", height: 3 }}
        />
      </div>
    </div>
  );
}
