// src/pages/EmailAuth.js
import React, { useState } from "react";
import axios from "axios";

const EmailAuth = () => {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/email-auth/verify",
        { email }
      );
      setResult(response.data);
    } catch (error) {
      console.error("Error verifying email:", error);
      setResult({ error: "Failed to verify email." });
    }
  };

  const getResultClass = () => {
    if (!result) return "";
    if (result.serverStatus === "Invalid" || result.emailStatus === "Invalid") {
      return "bg-red-200 border-red-400 text-red-800"; // For negative outcomes
    }
    return "bg-green-200 border-green-400 text-green-800"; // For positive outcomes
  };

  const getMessage = () => {
    if (!result) return "";
    if (result.serverStatus === "Valid" && result.emailStatus === "Valid") {
      return "MX records found. Email is valid!";
    } else {
      return "No MX records found. Email is invalid!";
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Email Authentication
      </h1>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter email"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
        >
          Verify Email
        </button>
      </form>

      {result && (
        <div className={`mt-6 p-4 rounded border ${getResultClass()} w-full`}>
          <h2 className="text-lg font-bold">Results:</h2>
          <ul className="list-disc pl-5">
            <li>Format: {result.formatValid}</li>
            <li>Type: {result.type}</li>
            <li>Server Status: {result.serverStatus}</li>
            <li>Email Status: {result.emailStatus}</li>
            <li>Registrar: {result.registrar}</li> {/* Add this line */}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EmailAuth;
