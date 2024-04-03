import requests

from flask import Flask, redirect, request, jsonify, session, url_for
import requests
import spotipy
from spotipy.oauth2 import SpotifyOAuth
from spotipy import Spotify
from spotipy.cache_handler import FlaskSessionCacheHandler
import urllib.parse


app = Flask(__name__)

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


@app.route('/')
def home():
    return "This is supposed to return a specific playlist <a href='/login'>Login with Spotify</a>"

@app.route('/login')
def login():
    # if the user has not logged in, log in. Else get playlists
    if not SP_OAUTH.validate_token(CACHE_HANDLER.get_cached_token()):
        authUrl = SP_OAUTH.get_authorize_url()
        return redirect(authUrl)
    return(redirect(url_for('getPlaylists')))


@app.route('/callback')
def callback():
    # this gets the access token & redirects to playlists
    SP_OAUTH.get_access_token(request.args['code'])
    return redirect(url_for('getPlaylists'))


@app.route('/playlists')
def getPlaylists():
    if not SP_OAUTH.validate_token(CACHE_HANDLER.get_cached_token()):
        authUrl = SP_OAUTH.get_authorize_url()
        return redirect(authUrl)
    userPlaylist= sp.playlist('66ZndsAIRfhOqzdv45vnY9', fields= 'name', additional_types=('track',))
    return f'<p> {userPlaylist} </p>'
    ''' I need a way to read the playlist ID from the URL, 
    that way, the user can just copy & paste'''

if __name__ == '__main__':
    app.run(debug=True)
