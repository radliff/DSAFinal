import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {Home} from './pages/homePage';
import { SubmitLink } from './pages/submitLink';

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/submitLink" element={<SubmitLink/>} />
        </Routes>
    </Router>
      
    </div>
    
  );
}

export default App;