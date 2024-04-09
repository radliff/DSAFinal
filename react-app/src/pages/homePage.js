import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="container-home">
    <div className="title">Harmony Hub</div>
    <div className="card">
      <p className="bold">About Harmony Hub:</p>
      <p>Welcome to Harmony Hub, where your musical journey transcends the ordinary. At the heart of our mission is a simple yet profound goal: to connect you with the perfect playlist that resonates with your unique taste and preferences.</p>
      <p className="bold">How It Works:</p>
      <p>Harmony Hub invites you into a world where music is tailored just for you. Begin by entering your Spotify playlist; this is your musical fingerprint, a reflection of your auditory preferences and moods. Our platform then guides you through selecting a category that speaks to your current vibe or exploratory desires.</p>
      <p>What comes next is where the magic happens. Harmony Hub employs two sophisticated algorithms to delve into the depths of your chosen category. These algorithms don't just skim the surface; they analyze compatibility scores, ensuring that the playlist you receive is a mirror to your soul's current calling.</p>
    </div> 
    <Link to="/submitLink">
    <button className="button">Get Started</button>
    </Link>
  </div>
  );
}

/* making a few changes */

