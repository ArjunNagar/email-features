// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white shadow-lg">
      <h2 className="text-2xl font-bold p-4 border-b border-gray-700">Features</h2>
      <ul className="mt-4">
        {['email-auth', 'domain-reputation', 'spf-generator', 'dmarc-generator', 'dkim-generator', 'email-deliver'].map((route) => (
          <li key={route} className="p-4 hover:bg-gray-700 transition-colors duration-200">
            <Link to={`/${route}`} className="block">{route.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
