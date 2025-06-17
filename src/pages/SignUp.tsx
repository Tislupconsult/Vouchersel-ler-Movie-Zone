import React, { useState } from "react";
import { CustomInput } from "../components/input";
import { CustomButton } from "../components/button";
import { EyeOff, Eye, ArrowLeft } from "lucide-react";
import * as SC from "../../style";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import logo from "/logo.png";

export default function SignUp() {
  const navigate = useNavigate();

  const [username, setUsername] = React.useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      setLoading(false);
      return setErrorMsg("Passwords do not match.");
    }

    try {
      await API.post("/api/auth/register", {
        username,
        email,
        password,
      });

      const loginRes = await API.post("/api/auth/login", {
        username,
        email,
        password,
      });

      localStorage.setItem("token", loginRes.data.token);
      localStorage.setItem("username", loginRes.data.user.username);
      navigate("/home");
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Registration failed.");
      setLoading(false);
    }
  };

  return (
    <SC.Main className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-3xl mx-auto p-y flex flex-col gap-4 bg-[#FFFFFF66] rounded-2xl px-4 py-10">
        
        {/* Header */}
        <span className="flex justify-between items-center bg-slate-800 p-4 rounded-xl shadow-md text-white">
          <Link to="/log_In">
            <ArrowLeft size={20} />
          </Link>
          <h2 className="text-[16px] font-semibold text-green-400">Vouchersel$ler Movie Zone</h2>
          <Link to="/home">
            <img src={logo} alt="Trendz Logo" className="h-10" />
          </Link>
        </span>

        <h2 className="text-2xl font-bold mb-4 text-red-800">Sign Up</h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <CustomInput
            name="username"
            placeholder="User-Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            rightIcon={null}
          />

          <CustomInput
            name="email"
            placeholder="Email (case sensitive)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            rightIcon={null}
          />

          <CustomInput
            name="password"
            placeholder="Create Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
          />

          <CustomInput
            name="confirmPassword"
            placeholder="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
          />

          {errorMsg && (
            <p className="text-red-500 text-sm text-left">{errorMsg}</p>
          )}

          <CustomButton
            type="submit"
            title={loading ? "Loading..." : "Sign Up"}
            disabled={loading}
            className="w-full p-3 disabled:opacity-50"
          />
        </form>
      </div>
    </SC.Main>
  );
}
