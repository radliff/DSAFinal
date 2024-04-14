import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {Home} from './pages/homePage';
import { SubmitLink } from './pages/submitLink';
import { Categories } from './pages/categories';

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/submitLink" element={<SubmitLink/>} />
          <Route path="/categories" element={<Categories/>} />
        </Routes>
    </Router>
      
    </div>
    
  );
}

export default App;