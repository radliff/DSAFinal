from flask import Flask, redirect, request, jsonify, session, url_for, render_template
import requests
import spotipy
from flask_cors import CORS
from spotipy.oauth2 import SpotifyOAuth
from spotipy import Spotify
from spotipy.cache_handler import FlaskSessionCacheHandler
import urllib.parse


app = Flask(__name__, static_folder='../react-app/build', static_url_path='/')

app.secret_key = 'secretSpotifyKey'

CLIENT_ID = '247f9735be324d5b963621261d460aa3'
CLIENT_SECRET = '73792a1a0c504291a13acbd19983018a'

# this is what callback redirects to
REDIRECT_URI = 'http://localhost:5000/callback'

# privacy permissions we need from user
SCOPE = 'user-read-private user-read-email playlist-read-private'

# cache handler for spotipy
CACHE_HANDLER = FlaskSessionCacheHandler(session)

# this is where Oauth comes in: access token, refresh token, expiry token
SP_OAUTH = SpotifyOAuth(
    client_id=CLIENT_ID,
    client_secret=CLIENT_SECRET,
    redirect_uri=REDIRECT_URI,
    scope=SCOPE,
    cache_handler=CACHE_HANDLER,
    show_dialog=True
)

sp = Spotify(auth_manager=SP_OAUTH)

CORS(app)

# O(n) time complexity
def getScore(playlists):
    playlist_scores = []
    # iterate over every playlist
    for playlist in playlists['playlists']['items']:
        playlist_ID = playlist['id']
        playlist_scores.append(calcScore(playlist_ID))
    return playlist_scores

# O(n) time complexity: where n is the number of tracks in the playlist
def calcScore(playlist_ID):
    # this is for calculating avg
    count = sp.playlist_tracks(playlist_id=playlist_ID)['total']
    print(count)
    # defining all features
    acousticness = danceability = energy = loudness = speechiness = 0
    limit = 100
    # playlist_tracks only grabs 100 tracks at a time, so we grab 1-100, 101-201, etc.
    offset = 0
    total_audio_features = []
    i = 1
    # here, we minimze the # of api calls we need to make by grabbing 100 tracks at a time
    while offset < count:
        print(offset)
        # this makes it so we do the page iteration described above
        playlist_tracks = sp.playlist_tracks(playlist_id=playlist_ID, offset=offset, limit=limit)['items']
        track_ids = []
        print(offset)
        # grab as many tracks as we can at once (100)
        for track in playlist_tracks:
            if 'is_playable' in track and not track['is_playable']:
                print(track['track']['name'] + " is not playable")
                continue
            if 'track' in track and track['track'] is not None and 'id' in track['track']:
                track_ids.append(track['track']['id'])
                print(f"{i}. " +  track['track']['name'] + " is playable")
                i += 1
        # we now grab ALL audio features for the 100 track IDs & append to the total audio features list
        audio_features = sp.audio_features(track_ids)
        print(offset)
        total_audio_features.extend(audio_features)
        # keep increasing the offset until it is equal to the total tracks
        offset += limit
    # calculate averages for all features
    total_acousticness = sum(feature['acousticness'] for feature in total_audio_features)
    total_danceability = sum(feature['danceability'] for feature in total_audio_features)
    total_energy = sum(feature['energy'] for feature in total_audio_features)
    total_loudness = sum(feature['loudness'] for feature in total_audio_features)
    total_speechiness = sum(feature['speechiness'] for feature in total_audio_features)

    avg_acousticness = total_acousticness / count
    avg_danceability = total_danceability / count
    avg_energy = total_energy / count
    avg_loudness = total_loudness / count
    avg_speechiness = total_speechiness / count

    # scale loudness by -1
    avg_loudness *= -1
    # return the average of all features
    score = (avg_acousticness + avg_energy + avg_danceability + avg_speechiness + avg_loudness) / 5.0
    
    score = (score + 1) * 50
    return score

@app.route('/')
def home():
    return app.send_static_file('index.html')

@app.route('/login')
def login():
    # if the user hasn't logged in, redirect to the authorization URL
    if not SP_OAUTH.validate_token(request.cookies.get('spotify_token')):
        auth_url = SP_OAUTH.get_authorize_url()
        return redirect(auth_url)
    return redirect(url_for('home'))

@app.route('/callback')
def callback():
    # verify access token so we can use spotify data
    SP_OAUTH.get_access_token(request.args['code'])
    return redirect(url_for('submitLink'))

@app.route('/submitLink')
def submitLink():
    # returns page where we want user to submit link
    return app.send_static_file('index.html')


@app.route('/playlist')
def getPlaylistName():
    playlistID = request.args.get('id')
    playlist = sp.playlist(playlistID)
    playlist_name = playlist['name']
    return jsonify({'name': playlist_name})

@app.route('/categories', methods=['POST'])
def handle_category_click():
    data = request.json
    category_id = data['categoryId']
    
    # come up with compatibility score for all playlists in category

    # this is a dictionary containing keys for the playlists
    playlists = sp.category_playlists(category_id=category_id, limit=15)
    scores = getScore(playlists)
    return jsonify((scores))
    # Then you can return a success response or further data as needed
    return jsonify({"message": "Number of tracks in this playlist:", "track Number": score}), 200
''' 
'''

''' 
'''
# @app.route('/playlists')
# def getPlaylists():
#     # redirect to authorization url if token is not validated
#     # if not SP_OAUTH.validate_token(CACHE_HANDLER.get_cached_token()):
#     #     authUrl = SP_OAUTH.get_authorize_url()
#     #     return redirect(authUrl)
#     # playlistID = "4h0eEGBZevv0ZpSbmvP3qa"
#     # playlist_tracks = sp.playlist_items(playlistID, additional_types='track')

#     # trackFeatures = []
#     # # iterates over every track in playlist & returns name
#     # for track in playlist_tracks['items']:
#     #     track_ID = track['track']['id']
#     #     feature = sp.audio_features(track_ID)

#     #     trackFeatures.append(feature)
#     # print(trackFeatures)
#     # return app.send_static_file('playlists.html')


#     ''' I need a way to read the playlist ID from the URL, 
#     that way, the user can just copy & paste'''

if __name__ == '__main__':
    app.run(debug=True, port=5000)
