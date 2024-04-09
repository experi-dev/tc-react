// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Nav from './Nav';
import Webinar from './Webinar';
import Home from './Home'; // Import the Webinar component
import Module from './Module';
import ModuleView from './ModuleView';

function App() {
  return (
    <Router>
      <div>
      <Nav />

        {/* Define routes */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* Assuming you have a Home component */}
          <Route path="/webinar" element={<Webinar />} />
          <Route path="/module" element={<Module />} />
          <Route path="/module/view" element={<ModuleView />} />
          {/* Add other routes here */}
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;

