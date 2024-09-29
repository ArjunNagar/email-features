// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import EmailAuth from './pages/EmailAuth';
import DomainReputationChecker from './pages/DomainReputationChecker'; // Import the new page
import SPFGenerator from './pages/SPFGenerator';
import DmarcGenerator from './pages/DmarcGenerator';
import DkimGenerator from './pages/DkimGenerator';
import EmailDeliverability from './pages/EmailDeliverability';
import './index.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/email-auth" element={<EmailAuth />} />
          <Route path="/domain-reputation" element={<DomainReputationChecker />} />
          <Route path="/spf-generator" element={<SPFGenerator />} />
          <Route path="/dmarc-generator" element={<DmarcGenerator />} />
          <Route path="/dkim-generator" element={<DkimGenerator />} />
          <Route path="/email-deliver" element={<EmailDeliverability />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
