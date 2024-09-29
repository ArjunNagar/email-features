// src/components/DomainReputationChecker.jsx
import React, { useState } from "react";
import axios from "axios";

const DomainReputationChecker = () => {
  const [domain, setDomain] = useState("");
  const [score, setScore] = useState(null);
  const [details, setDetails] = useState([]);
  const [registrar, setRegistrar] = useState(""); // New state for registrar
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `http://localhost:3000/domain-reputation/check?domain=${domain}`
      );
      setScore(response.data.score.finalScore);
      setDetails(response.data.score.details);
      setRegistrar(response.data.score.registrar); // Set registrar
    } catch (err) {
      setError("Error checking domain reputation");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-5 border rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Domain Reputation Checker</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="domain">
            Domain:
          </label>
          <input
            type="text"
            id="domain"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full p-2 text-white rounded ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={loading}
        >
          {loading ? "Checking..." : "Check Reputation"}
        </button>
      </form>
      {score !== null && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Reputation Score:</h3>
          <p
            className={`text-xl ${
              score < 0 ? "text-red-500" : "text-green-500"
            }`}
          >
            {score}
          </p>
          <h4 className="mt-2 font-semibold">Score Breakdown:</h4>
          <ul className="list-disc ml-5">
            {details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
          <h4 className="mt-4 font-semibold">Registrar:</h4>
          <p className="text-blue-600 underline">
            <a href={registrar} target="_blank" rel="noopener noreferrer">
              {registrar}
            </a>
          </p>
        </div>
      )}
      {error && <div className="mt-4 text-red-500">{error}</div>}
    </div>
  );
};

export default DomainReputationChecker;
