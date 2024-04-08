import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export const Home = () => {
  return (
    <div>
      <h1>Welcome to My Website</h1>
      <p>This is the home page of my website.</p>
      <Link to="/submitLink">
      <button>Go to Other Page</button>
    </Link>
    </div>
  );
}

