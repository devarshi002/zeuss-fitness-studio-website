import { useEffect, useState } from "react";
import axios from "axios";
import "./Members.css";

function Members() {
  const [members, setMembers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    plan: "",
  });
  const [editId, setEditId] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or Update Member
  const addMember = async () => {
    try {
      if (editId) {
        // UPDATE API
        await axios.put(
          `http://localhost:5000/api/members/${editId}`,
          formData,
        );
        alert("Member Updated");
      } else {
        // CREATE API
        await axios.post("http://localhost:5000/api/members", formData);
        alert("Member Added");
      }

      setShowForm(false);
      setEditId(null);
      setFormData({ name: "", age: "", plan: "" });
      fetchMembers();
    } catch (error) {
      console.error(error);
      alert("Operation Failed");
    }
  };

  // Fetch Members
  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/members");
      setMembers(res.data);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  // Delete Member
  const deleteMember = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/members/${id}`);
      alert("Member Deleted");
      fetchMembers();
    } catch (error) {
      console.error("Delete Error:", error);
      alert("Delete Failed");
    }
  };

  return (
    <div className="members-container">
      <div className="members-header">
        <h2 className="members-title">🏋️ Gym Members</h2>

        <div>
          <button
            className="add-btn"
            style={{ marginRight: "10px" }}
            onClick={() => setShowForm(true)}
          >
            + Add Member
          </button>

          <button
            className="add-btn"
            style={{ marginRight: "10px", background: "#6f42c1" }}
            onClick={() => (window.location.href = "/dashboard")}
          >
            Dashboard
          </button>

          <button
            className="delete-btn"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Add / Edit Form */}
      {showForm && (
        <div
          style={{
            marginBottom: "20px",
            background: "#fff",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <h3>{editId ? "Edit Member" : "Add New Member"}</h3>

          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            style={{ marginRight: "10px", padding: "8px" }}
          />
          <input
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            style={{ marginRight: "10px", padding: "8px" }}
          />
          <select
            name="plan"
            value={formData.plan}
            onChange={handleChange}
            style={{ marginRight: "10px", padding: "8px" }}
          >
            <option value="">Select Plan</option>
            <option value="Gold">Gold</option>
            <option value="Platinum">Platinum</option>
          </select>

          <button onClick={addMember} style={{ padding: "8px 15px" }}>
            {editId ? "Update" : "Save"}
          </button>
        </div>
      )}

      {/* Members Table */}
      <table className="members-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Plan</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {members.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No Members Found
              </td>
            </tr>
          ) : (
            members.map((m) => (
              <tr key={m._id}>
                <td>{m.name}</td>
                <td>{m.age}</td>
                <td>{m.plan}</td>
                <td>
                  {/* Edit Button */}
                  <button
                    className="action-btn edit-btn"
                    onClick={() => {
                      setShowForm(true);
                      setFormData({
                        name: m.name,
                        age: m.age,
                        plan: m.plan,
                      });
                      setEditId(m._id);
                    }}
                  >
                    Edit
                  </button>

                  {/* Delete Button */}
                  <button
                    className="action-btn delete-btn"
                    onClick={() => deleteMember(m._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Members;
