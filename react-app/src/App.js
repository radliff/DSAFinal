import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {Home} from './pages/homePage';
import { SubmitLink } from './pages/submitLink';
import { Categories } from './pages/categories';
import { Answer } from './pages/answer';

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/submitLink" element={<SubmitLink/>} />
          <Route path="/categories" element={<Categories/>} />
          <Route path="/answer" element={<Answer/>} />
        </Routes>
    </Router>
      
    </div>
    
  );
}

export default App;