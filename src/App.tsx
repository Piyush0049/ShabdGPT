import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import Home from "./pages/Home";
import ShabdGPT from "./pages/ShabdGPT";
import "./index.css";

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Helmet>
          <title>ShabdGPT - Learn Hindi Language</title>
          <meta name="description" content="Learn Hindi language with interactive tools and AI assistance" />
        </Helmet>
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shabdgpt" element={<ShabdGPT />} />
          </Routes>
        </main>

      </div>
    </Router>
  );
};

export default App;
