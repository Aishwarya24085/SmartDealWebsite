import { useState } from "react";
import HistorySidebar from "./HistorySidebar";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import './Header.css';

export default function Header() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Sidebar */}
      {/* <HistorySidebar 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      /> */}

      <header className="header">
        {/* ☰ MENU BUTTON
        <button 
          className="menu-btn" 
          onClick={() => setIsOpen(true)}
        >
          ☰
        </button> */}

        <div className="logo">Smart Deal Finder</div>

        <Link className="Home" to="/">Home</Link>

        <nav className="nav">
          {user ? (
            <>
              <span className="welcome">Welcome, {user.username}</span>
              <button className="logout-btn" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </nav>
      </header>
    </>
  );
}