import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="#">About Us</a>
        <a href="#">Contact</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
      </div>
      <div className="socials">
        <i className="fab fa-twitter"></i>
        <i className="fab fa-facebook"></i>
        <i className="fab fa-instagram"></i>
      </div>
      <p className="copyright">
        © {new Date().getFullYear()} DealWise. All rights reserved.
      </p>
    </footer>
  );
}
