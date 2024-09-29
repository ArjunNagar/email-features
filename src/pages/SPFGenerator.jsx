// src/components/SPFGenerator.jsx
import React, { useState } from "react";
import axios from "axios";

const SPFGenerator = () => {
  const [domain, setDomain] = useState("");
  const [ip4Addresses, setIp4Addresses] = useState("");
  const [ip6Addresses, setIp6Addresses] = useState("");
  const [includeDomains, setIncludeDomains] = useState("");
  const [mxIncluded, setMxIncluded] = useState(false);
  const [spfRecord, setSpfRecord] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/spf-generator/generate",
        {
          domain,
          ip4Addresses: ip4Addresses.split(",").map((ip) => ip.trim()),
          ip6Addresses: ip6Addresses.split(",").map((ip) => ip.trim()),
          includeDomains: includeDomains
            .split(",")
            .map((domain) => domain.trim()),
          mxIncluded,
        }
      );

      setSpfRecord(response.data.spfRecord);
    } catch (err) {
      console.error("Error generating SPF record:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-5 border rounded shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-4">SPF Record Generator</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="Domain"
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={ip4Addresses}
          onChange={(e) => setIp4Addresses(e.target.value)}
          placeholder="IPv4 Addresses (comma-separated)"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={ip6Addresses}
          onChange={(e) => setIp6Addresses(e.target.value)}
          placeholder="IPv6 Addresses (comma-separated)"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={includeDomains}
          onChange={(e) => setIncludeDomains(e.target.value)}
          placeholder="Included Domains (comma-separated)"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={mxIncluded}
            onChange={(e) => setMxIncluded(e.target.checked)}
            className="mr-2"
          />
          Include MX records
        </label>
        <button
          type="submit"
          className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Generate SPF Record
        </button>
      </form>
      {spfRecord && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Generated SPF Record:</h3>
          <p className="mt-2 p-2 border border-gray-300 rounded">{spfRecord}</p>
        </div>
      )}
    </div>
  );
};

export default SPFGenerator;
