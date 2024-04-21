import '../index.css';
import React from "react";
import { useState } from "react";
import {useLocation} from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


export const SubmitLink = () => {
  const [playlistLink, setPlaylistLink] = useState("");
  const [playlistId, setPlaylistId] = useState("");
  const [playlistName, setPlaylistName] = useState("");
  const [playlistImage, setPlaylistImage] = useState("");  // State for storing the playlist image URL
  const [playlistScore, setPlaylistScore] = useState(0);   // State for storing the playlist score
  const [isValidPlaylist, setIsValidPlaylist] = useState(null);

  const handleChange = (event) => {
    setPlaylistLink(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Extract playlist ID from the entered Spotify URL
    const id = playlistLink.split("/").pop().split("?")[0];
    setPlaylistId(id);
    // extracts the data from the backEnd 
    fetch(`http://localhost:5000/playlist?id=${id}`)
      .then((response) => {
        if (response.ok) {
          setIsValidPlaylist(true);
          return response.json();
        } else {
          setIsValidPlaylist(false);
          return Promise.reject("Playlist is not valid");
        }
      })
      .then((data) => {
        setPlaylistName(data.name); // sets playlistName
        setPlaylistImage(data.image_url); // sets playlistImage
        setPlaylistScore(data.score);     // sets playlistScore
        // stores all of them in local Storage so they can be accessed later
        localStorage.setItem('selectedPlaylistName', data.name);
        localStorage.setItem('selectedPlaylistImage', data.image_url);
        localStorage.setItem('selectedPlaylistScore', data.score);
      })
      // error catching 
      .catch((error) => console.error("Error:", error));
  };

  const handleNavigate = () => {
    // Check if the playlist is valid before navigating
    if (isValidPlaylist) {
      window.location.href = "/categories"; // Navigate to categories page
    }
  };

  return (
    <div className="linkPage">
      <div className="container">
        <div className="row">
          <div className="PCM-logo">
            <h1 className="PCM"> HARMONY HUB </h1>
          </div>
          <div className="user-box">
            <h1 className="prompt-text">Enter Your Spotify Playlist Link</h1>
            <form className="link-form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter playlist link"
                value={playlistLink}
                onChange={handleChange}
              />
            </form>
            {isValidPlaylist !== null && (
              <div>
                {isValidPlaylist ? (
                  <div>
                    
                    <div class="arrow-container">
                            <div class="arrow arrowSliding delay1"></div>
                            <div class="arrow arrowSliding delay2"></div>
                            <div class="arrow arrowSliding delay3"></div>
                            
                          </div>
                    <Link to="/categories"> 
                      <button className="hereButton" type="submit">
                          Click Here To Continue
                      </button>
                  </Link> 
                  </div>
                ) : (
                  <h1 className="error-message">ERROR: Link is not Real</h1>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

