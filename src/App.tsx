import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
import Home from "./pages/Home";
// import About from "./pages/About";
// import Courses from "./pages/Courses";
import ShabdGPT from "./pages/ShabdGPT";
import "./index.css";

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Helmet>
          <title>ShabdBhaasha - Learn Hindi Language</title>
          <meta name="description" content="Learn Hindi language with interactive tools and AI assistance" />
        </Helmet>
        
        {/* <Navbar /> */}
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/about" element={<About />} /> */}
            <Route path="/shabdgpt" element={<ShabdGPT />} />
            {/* Add other routes as needed */}
          </Routes>
        </main>
        
        {/* <Footer /> */}
      </div>
    </Router>
  );
};

export default App;
