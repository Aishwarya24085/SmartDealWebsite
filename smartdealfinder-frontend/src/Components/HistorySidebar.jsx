import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import closeIcon from "../assets/close-icon.svg";
import deleteIcon from "../assets/deleteIcon.png"
import './HistorySidebar.css';

export default function HistorySidebar({ isOpen, onClose, onItemClick, historyTrigger, setIsOpen}) {
const [history, setHistory] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/api/history/${user.username}`)
        .then(res => res.json())
        .then(data => setHistory(data || []));
    }
  }, [user, historyTrigger, isOpen]);

  async function handleDelete(id) {
  const confirmDelete = window.confirm("Delete this search?");

  if (!confirmDelete) return;

  try {
    await fetch(`http://localhost:5000/api/history/delete/${id}`, {
      method: "DELETE"
    });

    // update UI instantly
    setHistory(prev => prev.filter(item => item._id !== id));

  } catch (error) {
    console.error("Error deleting history:", error);
  }
}

  return (
    <>
      {isOpen && <div className="overlay" onClick={onClose}></div>}

      <div className={`sidebar ${isOpen ? "open" : ""}`}>

        {/* MENU BUTTON (ALWAYS VISIBLE) */}
        <div className="menu-strip" onClick={() => setIsOpen(true)}>
          ☰
        </div>

        {/* CONTENT */}
        {isOpen && (
          <>
            <div className="sidebar-header">
              <h3>Search History</h3>
              <button className="close-btn" onClick={onClose}>
                <img src={closeIcon} alt="close" />
              </button>
            </div>

            <div className="history-list">
              {history.length === 0 ? (
                <p className="empty-msg">No recent searches</p>
              ) : (
                history.map((item, index) => (
                  <div key={index} className="history-item">
                    
                    {/* TEXT */}
                    <span
                      className="history-text"
                      onClick={() => {
                        if (onItemClick) {
                          onItemClick(item.searchText);
                        }
                        if (onClose) onClose();
                      }}
                    >
                      {item.searchText}
                    </span>

                    {/* DELETE ICON */}
                    <span
                      className="delete-icon"
                      onClick={() => handleDelete(item._id)}
                    >
                      <img src={deleteIcon} alt="delete" height={20} />
                    </span>

                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}