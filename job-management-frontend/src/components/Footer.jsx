import React from "react";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2 className="footer-logo">JobPortal</h2>
          <p className="footer-text">
            Helping professionals and companies connect effortlessly.  
            Discover opportunities and talents worldwide.
          </p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>Home</li>
            <li>Find Jobs</li>
            <li>Find Talents</li>
            <li>About Us</li>
            <li>Testimonials</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Resources</h3>
          <ul>
            <li>Blog</li>
            <li>FAQ</li>
            <li>Support</li>
            <li>Privacy Policy</li>
            <li>Terms</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Stay Updated</h3>
          <form className="newsletter">
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
          <div className="social-icons">
            <a href="#"><i className="fab fa-linkedin"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} JobPortal. Crafted with ❤️</p>
      </div>
    </footer>
  );
}
