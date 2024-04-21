A little bit about HarmonyHub:

This is a playlist compatibility finder for different categories in Spotify. We find scores for 10 different categories, and, based on how similar your playlist is to that score, we give you the top 3 playlists from that category. 
We use the Spotify web API to collect data on different songs and use the data from these songs to drive the similarity scores. To sort these playlists, we decided to use both quick sort and merge sort and compared these times to see which one was typically faster.


FRAMEWORKS:
We used the Python library, flask, to serve the frontend which was created in React. We also used Spotipy to access the Spotify API and get the track information for each track from the playlist you pass in, as well as the category data.


RUNNING THE CODE LOCALLY:
1. IMPORTANT: MUST run python backEnd/backEnd.py first in terminal to start server. This is how the website fetches the spotify requests from Flask.
2. Cd to react-app, enter npm run build in your terminal.
3. Enter npm start, this should route you to the website.

USING THE WEBSITE:
1. Login with your spotify credentials.
2. Enter the link from your playlist (This link MUST come from the spotify web app, otherwise you will get an error message saying the link is not real).
3. Click the category that you want to compare your playlist to, and wait for the results to load.


AUTHORS: Christopher Williams, Brian Mbaji, Radliff Jeantinor
