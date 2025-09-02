import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../features/auth/authApi";
import toast from "react-hot-toast"; // ✅ import toast

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form).unwrap();
      toast.success("🎉 Signup successful! Please login.");
      navigate("/login"); 
    } catch (err) {
      toast.error(err?.data?.message || "Signup failed!");
    }
  };

  return (
    <div className="relative h-screen w-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://onlineexamplatform.com/blog/img/Revolutionizing-Education-banner.webp')",
        }}
      ></div>

      <div className="relative flex items-center justify-center h-full">
        <form
          className="bg-white opacity-90 p-8 rounded-lg shadow-lg w-96 space-y-4"
          onSubmit={submitHandler}
        >
          <h2 className="text-2xl font-bold text-center">Register</h2>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              type="text"
              placeholder="Enter your name"
              className="w-full p-2 border rounded"
              required
            />
          </div>

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

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Password
            </label>
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              placeholder="Enter your password"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>

          <p className="text-center text-gray-700">
            Already have an account?{" "}
            <Link to={"/login"} className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
