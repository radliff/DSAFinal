import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
    const HandleLogin = () => {
      // Redirect user to Spotify login page
      window.location.href = 'http://localhost:5000/login';
    };

    // Check if the URL contains the access token
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('access_token');

    if (accessToken) {
        // Store the access token securely (e.g., in a session or cookie)
        // For demonstration purposes, storing in local storage here
        localStorage.setItem('accessToken', accessToken);
        navigate("/submitLink")

        // Retrieve user's playlists after login
        // axios.get('http://localhost:3000/playlists/37i9dQZF1DXcBWIGoYBM5M')
        //     .then(response => {
        //         console.log(response.data);
        //         // Handle response data as needed
        //     })
        //     .catch(error => {
        //         console.error('Error fetching playlists:', error);
        //     });
    }

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
            
            <button className="button-login" onClick={HandleLogin}>Login</button>
            

             <Link to="/categories">
                <button className="button">Get Started</button>
            </Link> 

            <Link to="/answer">
                <button className="button">Answer Page</button>
            </Link> 


            { <Link to="/categories">
                <button className="button">Get Started</button>
            </Link> }

        </div>
    );
};

export default Home;


/* making a few changes */

