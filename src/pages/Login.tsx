import React, { useState } from "react";
import { CustomInput } from "../components/input";
import { CustomButton } from "../components/button";
import { EyeOff, Eye } from "lucide-react";
import * as SC from "../../style";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { jwtDecode } from "jwt-decode";
import logo from "/logo.png";

export default function LogIn() {
  const [identifier, setIdentifier] = useState(""); // username or email
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/api/auth/login", {
        email: identifier,
        password,
      });

      const token = res.data.token;
      localStorage.setItem("token", token);

      const decoded = jwtDecode<{ isAdmin?: boolean }>(token);
      console.log("Decoded Token:", decoded);

      navigate(decoded.isAdmin ? "/admin" : "/home");
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Login failed.");
      setLoading(false);
    }
  };

  return (
    <SC.Main className="min-h-screen flex items-center justify-center bg-background text-white">
      <div className="w-full max-w-3xl mx-auto p-y flex flex-col gap-4 bg-[#182d5cb1] rounded-2xl px-4 py-10">
        {/* Header */}
        <div className="flex justify-between items-center bg-slate-800 p-4 rounded-xl shadow-md text-white">
          <h2 className="text-lg font-semibold tracking-wide text-green-400">Vouchersel$ler Movie Zone</h2>
          <Link to="/">
            <img src={logo} alt="Logo" className="h-10" />
          </Link>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-4 text-red-600">Welcome Back</h2>
        <p className="text-center text-white text-sm mb-6">
          Log in to continue exploring amazing movies.
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <CustomInput
            name="email"
            placeholder="Email or Username"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            rightIcon={null}
          />

          <CustomInput
            name="password"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            rightIcon={
              <button type="button" onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
          />

          {errorMsg && <p className="text-red-500 text-sm -mt-3">{errorMsg}</p>}

          <div className="text-right text-sm text-green-400 cursor-pointer hover:underline">
            Forgot Password?
          </div>

          <CustomButton
            type="submit"
            title={loading ? "Logging In..." : "Log In"}
            className="w-full p-3 font-semibold bg-green-600 hover:bg-green-700 transition"
            disabled={loading}
          />

          {/* Extra Options */}
          <div className="flex justify-between gap-2 mt-4">
            <Link to="/sign_Up" className="w-1/2">
              <CustomButton
                type="button"
                title="Sign Up"
                className="w-full bg-slate-700 hover:bg-slate-600 py-2"
                disabled={loading}
              />
            </Link>

            <CustomButton
              type="button"
              title="Continue as Guest"
              className="w-1/2 bg-slate-700 hover:bg-slate-600"
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </SC.Main>
  );
}
