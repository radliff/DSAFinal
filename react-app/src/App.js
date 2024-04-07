import './index.css';
import React from "react";
import { useState } from "react";


function App() {
  const [playlistLink, setPlaylistLink] = useState('');
  const [submittedLink, setSubmittedLink] = useState('');

  const handleChange = (event) => {
    setPlaylistLink(event.target.value);
    
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmittedLink(playlistLink);
  };

  
  return (
    <div className="App">

      <div className="container">
        <div className='row'>


          <div className="PCM-logo">
            <h1 className="PCM"> PCM </h1>
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
                onChange={handleChange}
              />
              <button 
                className="formButton" 
                type="submit">
                Submit
              </button>
            </form>
            {submittedLink && (
              <div>
                <h2>Your Playlist Link:</h2>
                <p>{submittedLink}</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
