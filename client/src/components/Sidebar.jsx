import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">🏋️ Gym Admin</h2>

      <button className="sidebar-btn" onClick={() => navigate("/dashboard")}>
        Dashboard
      </button>

      <button className="sidebar-btn" onClick={() => navigate("/members")}>
        Members
      </button>

      <button
        className="sidebar-btn logout"
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/");
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;