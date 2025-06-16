import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import * as SC from "../../style";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const [usersRes, meRes] = await Promise.all([
          API.get("/api/users", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          API.get("/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setUsers(usersRes.data);
        setCurrentUserId(meRes.data.user._id);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.response?.data?.message || err.message);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/api/admin/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(users.filter((user) => user._id !== userId));
    } catch (err) {
      console.error("Error deleting user:", err);
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <SC.Main8 className="bg-slate-900 min-h-screen text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6 text-green-400">Admin Dashboard</h2>

        {error && <p className="text-red-400 mb-4">{error}</p>}

        <ul className="grid md:grid-cols-2 gap-6">
          {users.map((user) => (
            <li
              key={user._id}
              className="bg-slate-800 rounded-xl shadow-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between"
            >
              <div className="mb-2 sm:mb-0">
                <p className="text-lg font-medium">{user.username}</p>
                <p className="text-sm text-slate-400">{user.email}</p>
              </div>
              {user._id !== currentUserId ? (
                <button
                  className="bg-red-500 hover:bg-red-600 transition-colors text-white px-4 py-1.5 rounded-md text-sm font-medium"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              ) : (
                <span className="text-green-400 italic text-sm">[You]</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </SC.Main8>
  );
}