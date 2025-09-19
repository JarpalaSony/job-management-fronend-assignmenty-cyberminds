import React, { useState, useContext } from "react";
import "../styles/Navbar.css";
import logo from "../assets/logo.webp";
import CreateJobForm from "../pages/create-job";
import Modal from "./Modal";
import { Link, useNavigate } from "react-router-dom";
import { store } from "../App";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [token, setToken, user, setUser] = useContext(store);
  const navigate = useNavigate();

  const handleCreateJob = (formData) => {
    console.log("Job Created:", formData);
    setModalVisible(false);
  };

  const handleSignOut = () => {
    setToken(null);
    setUser(null);
    navigate("/signin");
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <img src={logo} alt="Company Logo" />
          </div>
          <ul className="nav-links">
            <li>Home</li>
            <li>Find Jobs</li>
            <li>Find Talents</li>
            <li>About Us</li>
            <li>Testimonials</li>
            {/* {!token ? (
              <>
                <li>
                  <Link to="/signin" style={{ textDecoration: "none", color: "#111827" }}>
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link to="/signup" style={{ textDecoration: "none", color: "#111827" }}>
                    Sign Up
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <button onClick={handleSignOut} className="signout-btn">
                  Sign Out
                </button>
              </li>
            )} */}
          </ul>
          {
            console.log("user data:",user)
          }
          {/* Show Create Job button only for recruiter */}
          {/* {token && user?.role === "recruiter" && ( */}
            
            <button className="create-btn" onClick={() => setModalVisible(true)}>
              Create Job
            </button>
          

          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </div>
        </div>

        {menuOpen && (
          <ul className="mobile-menu">
            <li>Home</li>
            <li>Find Jobs</li>
            <li>Find Talents</li>
            <li>About Us</li>
            <li>Testimonials</li>
            {!token ? (
              <>
                <li>Sign In</li>
                <li>Sign Up</li>
              </>
            ) : (
              <li>
                <button onClick={handleSignOut} className="signout-btn">
                  Sign Out
                </button>
              </li>
            )}
          </ul>
        )}
      </nav>

      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <CreateJobForm onSuccess={()=>{setModalVisible(false)}} />
      </Modal>
    </>
  );
}
