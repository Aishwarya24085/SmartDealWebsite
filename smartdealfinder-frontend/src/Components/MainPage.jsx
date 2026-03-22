import React from "react";
import { useNavigate } from "react-router-dom";
import "./MainPage.css";

export default function MainSection() {
  const navigate = useNavigate();

  const handleCompareClick = () => {
    navigate("/comparision");
  };

  return (
    <section className="main-section">
      <div className="main-content">
        <h1>SmartDealFinder</h1>
        <p className="tagline">Your Intelligent Shopping Companion</p>

        <p className="description">
          SmartDealFinder helps users compare product prices and ratings across
          multiple e-commerce platforms in a simple and efficient way. Instead of
          manually checking different websites, users can view all available options
          in one place and make better decisions.
        </p>

        <p className="description">
          The system uses a dataset of products collected from platforms like
          Amazon, Flipkart, and Croma. It analyzes key factors such as{" "}
          <strong>price, rating, seller reliability, discount, and user reviews</strong>{" "}
          to recommend the most suitable product.
        </p>

        <p className="description">
          Our project focuses on improving an existing research paper algorithm.
          We enhanced the algorithm by introducing better normalization techniques
          and dynamic weighting to provide more accurate and reliable results for
          product comparison.
        </p>

        <p className="description tech">
          <strong>Built using:</strong> React.js (frontend), Node.js (backend),
          MongoDB (database), and a research-based ranking algorithm for intelligent
          decision making.
        </p>

        <p className="how-it-works">🔍 <span>How it works</span></p>

        <button className="compare-btn" onClick={handleCompareClick}>
          Compare Now
        </button>
      </div>
    </section>
  );
}

