import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import "./Header.css";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="logo">Smart Deal Finder</div>

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
  );
}
