import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import './HistorySidebar.css';

export default function HistorySidebar({ isOpen, onClose, onItemClick }) {
  const [history, setHistory] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/api/history/${user.username}`)
        .then(res => res.json())
        .then(data => setHistory(data || []));
    }
  }, [user]);

  return (
    <>
      {isOpen && <div className="overlay" onClick={onClose}></div>}

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Search History</h3>
          <button className="close-btn" onClick={onClose}>❌</button>
        </div>
        
        <div className="history-list">
          {history.length === 0 ? (
            <p className="empty-msg">No recent searches</p>
          ) : (
            history.map((item, index) => (
              <div 
                key={index} 
                className="history-item" 
                onClick={() => { onItemClick(item.searchText); onClose(); }}
              >
                <span className="clock-icon">🕒</span>
                {item.searchText}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}