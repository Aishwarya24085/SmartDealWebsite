import { useState } from "react";
import HistorySidebar from "./HistorySidebar";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import './Header.css';
import './HistorySidebar.css';

export default function Header(props) {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
    <div className="main-header">
      {/* Sidebar */}
      <HistorySidebar 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        historyTrigger={props.historyTrigger}
        setIsOpen={setIsOpen}
      />

      <header className="header">
        <div className="logo">Smart Deal Finder</div>

        <Link className="Home" to="/">Home</Link>
        <Link className="Compare" to="/comparision">Compare</Link>

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
    </div>
    </>
  );
}