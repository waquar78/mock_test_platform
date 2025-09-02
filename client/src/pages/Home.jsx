import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate("/quiz");
  };

  const handleGoDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Card */}
      <div className="relative bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-[420px] space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-900">
          📘 Economics Adaptive Quiz
        </h1>
        <p className="text-center text-gray-600">
          Get ready to test your knowledge & improve step by step.
        </p>

        {/* Instructions */}
        <div className="bg-gray-100 rounded-lg p-4 text-gray-800 space-y-2 text-sm">
          <h2 className="font-semibold text-lg mb-2">📋 Instructions:</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>You will face <b>10 multiple-choice questions</b>.</li>
            <li>Each correct answer increases your difficulty level.</li>
            <li>If you answer wrong, the system tracks your weak areas.</li>
            <li>Score is shown automatically at the end of the session.</li>
            <li>Visit dashboard anytime to check progress & weak topics.</li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="flex flex-col space-y-3">
          <button
            onClick={handleStartQuiz}
            className="w-full bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            🚀 Start Quiz
          </button>
          <button
            onClick={handleGoDashboard}
            className="w-full bg-green-600 text-white py-2 rounded-lg shadow hover:bg-green-700 transition"
          >
            📊 Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
