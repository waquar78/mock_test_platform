import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../fetures/auth/authApi";
import toast from "react-hot-toast";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await loginUser(form).unwrap();
      toast.success("✅ Login successful!");
      navigate("/home"); 
    } catch (err) {
      toast.error(err?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="relative h-screen w-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://onlineexamplatform.com/blog/img/Revolutionizing-Education-banner.webp')",
        }}
      ></div>

      {/* Form */}
      <div className="relative flex items-center justify-center h-full">
        <form
          className="bg-white opacity-90 p-8 rounded-lg shadow-lg w-96 space-y-4"
          onSubmit={submitHandler}
        >
          <h2 className="text-2xl font-bold text-center">Login</h2>

          {/* Email Field */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          {/* Link to Register */}
          <p className="text-center text-gray-700">
            Don't have an account?{" "}
            <Link to={"/register"} className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
