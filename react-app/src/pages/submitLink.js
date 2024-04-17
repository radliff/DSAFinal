import '../index.css';
import React from "react";
import { useState } from "react";
import {useLocation} from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


export const SubmitLink = () => {
  const [playlistLink, setPlaylistLink] = useState('');
  const [playlistId, setPlaylistId] = useState('');
  const [playlistName, setPlaylistName] = useState('');
  const location = useLocation();

  const handleChange = (event) => {
      setPlaylistLink(event.target.value);
  };

  const handleSubmit = (event) => {
      event.preventDefault();
      // Extract playlist ID from the entered Spotify URL
      const id = playlistLink.split('/').pop().split('?')[0];
      setPlaylistId(id);
      fetch(`http://localhost:5000/playlist?id=${id}`)
          .then(response => response.json())
          .then(data => setPlaylistName(data.name))
          .catch(error => console.error('Error:', error));
  };



  
  return (
    <div className="linkPage">

      <div className="container">
        <div className='row'>


          <div className="PCM-logo">
            <h1 className="PCM"> HARMONY HUB </h1>
          </div>

          <div className="user-box">
            <h1 className="prompt-text">Enter Your Spotify Playlist Link</h1>
            <form 
              className="link-form"
              onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter playlist link"
                value={playlistLink}
                onChange={handleChange} />

              <Link to="/categories">
                <button 
                  className="formButton" 
                  type="submit">
                  Submit
                </button>
              </Link> 
            </form>
            {SubmitLink && (
              <div>
                <h2>Your Playlist Link:</h2>
                <p>{playlistName}</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}



// import React from 'react';
// import axios from 'axios';



//     return (
//         <div>
//             <h1>My Spotify App</h1>
//             <button onClick={handleLogin}>Login with Spotify</button>
//         </div>
//     );
// };