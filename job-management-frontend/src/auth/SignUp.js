import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = (e) => {
  e.preventDefault();
  console.log("Form submitted:", formData);

  axios.post('http://localhost:5000/auth/signup', formData)
    .then(res => {
      alert("Signup successful!");
      navigate("/signin");
    })
    .catch(err => {
      if (err.response) {
        // Server responded with a status code outside 2xx
        if (err.response.status === 400) {
          alert(err.response.data.message || "User already exists");
        } else {
          alert(err.response.data.message || "An error occurred");
        }
      } else if (err.request) {
        // Request was made but no response received
        alert("No response from server. Please try again later.");
      } else {
        // Something else happened
        alert("Error: " + err.message);
      }
      console.error(err);
    });
};

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="cpassword"
          placeholder="confirm Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="user">User</option>
          <option value="recruiter">Recruiter</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <span onClick={() => navigate("/signin")}>Sign In</span>
      </p>
    </div>
  );
};

export default SignUp;
