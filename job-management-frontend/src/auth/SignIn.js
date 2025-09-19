import React, { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
import {store} from "../App";
import axios from "axios";
const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [token,setToken,user,setUser] = useContext(store)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/auth/login',formData)
    .then(res=> {
      setToken(res.data.token);
      setUser(res.data.user);
  });
  };
  if(token){
    navigate("/")
  }
  

  return (
    <div className="auth-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Sign In</button>
      </form>
      <p>
        Don't have an account? <span onClick={() => navigate("/signup")}>Sign Up</span>
      </p>
    </div>
  );
};

export default SignIn;
