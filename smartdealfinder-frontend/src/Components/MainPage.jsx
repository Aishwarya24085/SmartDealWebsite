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
          SmartDealFinder helps you save time and money by comparing prices,
          reviews, and coupons across multiple e-commerce platforms. Just enter
          a <strong>product name, URL, or upload an image</strong> — and our AI
          system finds the <strong>best deal</strong> for you!
        </p>

        <p className="description">
          It fetches the prices and reviews from your selected platforms and
          recommends the one with the lowest price and best rating — plus active
          <strong> coupon offers</strong> to give you the best price possible.
        </p>

        <p className="description tech">
          <strong>Built using:</strong> React.js (frontend), Node.js (backend),
          MongoDB (database), and Google Gemini Pro API (for price comparison
          and coupon generation).
        </p>

        <p className="how-it-works">🔍 <span>How it works</span></p>

        <button className="compare-btn" onClick={handleCompareClick}>
          Compare Now
        </button>
      </div>
    </section>
  );
}
