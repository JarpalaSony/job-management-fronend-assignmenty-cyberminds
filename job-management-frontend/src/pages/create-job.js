import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import "../styles/createJobForm.css";
import { store } from "../App";
import axios from "axios";

export default function CreateJobForm({ onSuccess }) {
  const { register, handleSubmit, reset } = useForm();
  const [token, setToken, user, setUser] = useContext(store);
  const [preview, setPreview] = useState(null);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      // append text fields
      formData.append("title", data.title);
      formData.append("companyName", data.company);
      formData.append("location", data.location);
      formData.append("jobType", data.jobType);
      formData.append("minSalary", data.salaryMin);
      formData.append("maxSalary", data.salaryMax);
      formData.append("applicationDeadline", data.deadline);
      formData.append("jobDescription", data.description);
      formData.append("recruiterEmail", user?.email);

      // ✅ append file if selected
      if (data.companyLogo && data.companyLogo[0]) {
        formData.append("companyLogo", data.companyLogo[0]);
      }

      const res = await axios.post("https://job-management-backend-assignmentby.onrender.com/jobs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Job created successfully ✅");
      console.log("Job saved:", res.data);

      reset();
      setPreview(null);

      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Error creating job:", err);
      alert("Failed to save job ❌");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="create-job-form">
      <h2 className="form-title">Create Job Opening</h2>

      {/* Job Title + Company */}
      <div className="form-row">
        <div className="form-group">
          <label>Job Title</label>
          <input {...register("title", { required: true })} placeholder="Full Stack Developer" />
        </div>
        <div className="form-group">
          <label>Company Name</label>
          <input {...register("company", { required: true })} placeholder="Amazon, Microsoft, Swiggy" />
        </div>
      </div>

      {/* Logo Upload */}
      <div className="form-group">
        <label>Company Logo</label>
        <input
          type="file"
          accept="image/*"
          {...register("companyLogo")}
          onChange={(e) => {
            if (e.target.files[0]) {
              setPreview(URL.createObjectURL(e.target.files[0]));
            }
          }}
        />
        {preview && <img src={preview} alt="Preview" width="100" style={{ marginTop: "10px" }} />}
      </div>

      {/* Location + Job Type */}
      <div className="form-row">
        <div className="form-group">
          <label>Location</label>
          <select {...register("location", { required: true })}>
            <option value="">Choose Preferred Location</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Delhi">Delhi</option>
            <option value="Chennai">Chennai</option>
            <option value="Ahmadabad">Ahmadabad</option>
            <option value="Gurgaon">Gurgaon</option>
            <option value="Remote">Remote</option>
          </select>
        </div>
        <div className="form-group">
          <label>Job Type</label>
          <select {...register("jobType", { required: true })}>
            <option value="fulltime">FullTime</option>
            <option value="parttime">PartTime</option>
            <option value="internship">Internship</option>
            <option value="contract">Contract</option>
          </select>
        </div>
      </div>

      {/* Salary */}
      <div className="form-row">
        <div className="form-group">
          <label>Min Salary</label>
          <input type="number" {...register("salaryMin")} placeholder="₹0" />
        </div>
        <div className="form-group">
          <label>Max Salary</label>
          <input type="number" {...register("salaryMax")} placeholder="₹12,00,000" />
        </div>
      </div>

      {/* Deadline */}
      <div className="form-row">
        <div className="form-group">
          <label>Application Deadline</label>
          <input type="date" {...register("deadline", { required: true })} />
        </div>
      </div>

      {/* Description */}
      <div className="form-group">
        <label>Job Description</label>
        <textarea
          {...register("description", { required: true })}
          rows="4"
          placeholder="Please share a description to let the candidate know more about the job role"
        />
      </div>

      {/* Buttons */}
      <div className="form-actions">
        <button type="button" className="btn-draft">Save Draft</button>
        <button type="submit" className="btn-publish">Publish »</button>
      </div>
    </form>
  );
}
