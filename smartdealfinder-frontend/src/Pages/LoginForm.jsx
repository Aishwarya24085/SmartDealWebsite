import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import "./LoginForm.css";

export default function LoginForm() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For demo purpose, you can add real auth later
    
    login(formData.username);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>

        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter your username"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />

        <div className="login-links">
          <a href="#" className="forgot-password">
            Forgot password?
          </a>
        </div>

        <button type="submit">Login</button>

        <p className="signup-text">
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}
