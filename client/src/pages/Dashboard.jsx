import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/members");
      setMembers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Analytics
  const totalMembers = members.length;
  const goldPlans = members.filter((m) => m.plan === "Gold").length;
  const platinumPlans = members.filter((m) => m.plan === "Platinum").length;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2 className="dashboard-title">🏋️ Gym Admin Dashboard</h2>

        <div>
          <button
            className="dashboard-nav-btn"
            onClick={() => navigate("/members")}
          >
            Members Page
          </button>

          <button
            className="dashboard-logout-btn"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="card-grid">
        <div className="dashboard-card">
          <h3>Total Members</h3>
          <p>{totalMembers}</p>
        </div>

        <div className="dashboard-card gold">
          <h3>Gold Plan Members</h3>
          <p>{goldPlans}</p>
        </div>

        <div className="dashboard-card platinum">
          <h3>Platinum Plan Members</h3>
          <p>{platinumPlans}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;