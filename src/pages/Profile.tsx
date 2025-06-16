import React, { useState, useEffect } from "react";
import * as SC from "../../style";
import logo from "/logo.png";
import BottomNav from "../components/BottomNav.tsx/bottomNav";
import API from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { CustomInput } from "../components/input";
import { ArrowLeft } from "lucide-react";

export default function Profile() {
  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [isFetching, setIsFetching] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        const token = localStorage.getItem("token");
        const { data } = await API.get("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsername(data.username);
        setNewUsername(data.username);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setIsFetching(false);
      }
    }

    fetchUser();
  }, []);

  const handleUpdate = async () => {
    try {
      setUpdateLoading(true);
      const token = localStorage.getItem("token");
      await API.put(
        "/api/users/update",
        { username: newUsername },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsername(newUsername);
      alert("Username updated!");
    } catch (err) {
      alert("Update failed");
      console.error(err);
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;

    try {
      setDeleteLoading(true);
      const token = localStorage.getItem("token");
      await API.delete("/api/users/delete", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem("token");
      navigate("/");
    } catch (err) {
      alert("Failed to delete account.");
      console.error(err);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLogoutLoading(true);
      const token = localStorage.getItem("token");
      await API.post(
        "/api/users/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      setLogoutLoading(false);
      navigate("/log_In");
    }
  };

  return (
    <SC.Main6 className="min-h-screen flex items-center justify-center bg-[#0f0c29] bg-gradient-to-br from-[#302b63] to-[#24243e]">
      <div className="bg-[#1e1e2f] text-white py-8 px-5 rounded-2xl shadow-lg w-full max-w-md min-h-screen flex flex-col text-center">
        <span className="flex justify-between items-center mb-6">
          <Link to="/home">
            <ArrowLeft size={22} className="text-white" />
          </Link>
          <h2 className="text-lg font-semibold">
            {isFetching ? "Loading..." : `Welcome Back`}
          </h2>
          <img src={logo} alt="Trendz Movies" className="h-10" />
        </span>

        <p className="text-sm text-gray-400 text-left mb-1">Manage your profile</p>
        <p className="text-xl font-semibold text-left mb-4">{username}</p>

        <CustomInput
          name="username"
          placeholder="New username"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          rightIcon={null}
          className="mb-4"
        />

        <button
          onClick={handleUpdate}
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded mb-4 disabled:opacity-50"
          disabled={updateLoading}
        >
          {updateLoading ? "Updating..." : "Update Username"}
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white py-2 rounded mb-4 disabled:opacity-50"
          disabled={deleteLoading}
        >
          {deleteLoading ? "Deleting..." : "Delete Account"}
        </button>

        <button
          onClick={handleLogout}
          className="bg-gray-800 hover:bg-gray-700 text-white py-2 rounded disabled:opacity-50"
          disabled={logoutLoading}
        >
          {logoutLoading ? "Logging Out..." : "Log Out"}
        </button>
      </div>

      <BottomNav />
    </SC.Main6>
  );
}
