# HarmonyHub

## Overview

**HarmonyHub** is a playlist compatibility finder designed to enhance your Spotify experience. By analyzing your playlist and comparing it with curated playlists in 10 different categories, HarmonyHub identifies the top 3 playlists most similar to yours in each category. This tool leverages the Spotify Web API to gather data on individual tracks and uses this data to calculate similarity scores. To efficiently sort and rank these playlists, we've implemented both quick sort and merge sort algorithms, comparing their performance to determine the faster option.

## Tech Stack

- **Backend**: Flask, Python
- **Frontend**: React, HTML, CSS
- **API**: Spotipy (for accessing the Spotify API)

## Running the Code Locally

Follow these steps to run HarmonyHub on your local machine:

1. **Start the Backend Server**
   - Navigate to the `backEnd` directory.
   - Run the backend server with the following command:
     ```bash
     python backEnd.py
     ```
   - This server handles Spotify requests via Flask.

2. **Start the Frontend**
   - Navigate to the `react-app` directory.
   - Build the React app with:
     ```bash
     npm run build
     ```
   - Start the app with:
     ```bash
     npm start
     ```
   - Your browser should automatically open the website.

## Using the Website

1. **Login**: Log in with your Spotify credentials.
2. **Input**: Paste the link to your playlist (ensure the link is from the Spotify web app to avoid errors).
3. **Select Category**: Choose the category you want to compare your playlist with.
4. **View Results**: Wait for the results to load, and see the top 3 playlists most similar to yours.

## Authors

- Christopher Williams
- Brian Mbaji
- Radliff Jeantinor
