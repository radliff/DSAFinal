from flask import Flask, redirect, request, jsonify, session
import requests
import urllib.parse

# create an instance of Flask class
app = Flask(__name__)
app.secret_key = 'secretSpotifyKey'

CLIENT_ID = '247f9735be324d5b963621261d460aa3'
CLIENT_SECRET = '73792a1a0c504291a13acbd19983018a'
REDIRECT_URI = 'http://localhost:5000/callback'

# authorization URL to get access to user accounts
AUTH_URL = 'https://accounts.spotify.com/authorize'

# token URL to refresh token
TOKEN_URL = 'https://accounts.spotify.com/api/token'

# API URL
API_BASE_URL = 'https://api.spotify.com/v1/'

# use route to tell Flask what URL triggers our function - this is the home URL
@app.route("/")

# this is what we use to help users login to spotify
def loginAccount():
    # this is our welcome message, and a hyperlink
    return "This is PCM <a href='/login'>Login with Spotify</a>"

@app.route('/login')
def login():
    # privacy permissions we need from user
    scope = 'user-read-private user-read-email playlist-read-private'

    # these are all the parameters we need for the log in
    params = {
        'client_id': CLIENT_ID,
        'response_type': 'code',
        'scope': scope,
        'redirect_uri': REDIRECT_URI,
        'show_dialog': True
    }

    # redirect to authorization url with correct params
    auth_url = f"{AUTH_URL}?{urllib.parse.urlencode(params)}"
    return redirect(auth_url)

@app.route('/callback')
def callback():
    # check if there is an error
    if 'error' in request.args:
        return jsonify({"error": request.args['error']})

    if 'code' in request.args:
        reqBody = {
            'code': request.args['code'],
            'grant_type': 'authorization_code',
            'redirect_uri': REDIRECT_URI,
            'client_id': CLIENT_ID,
            'client_secret': CLIENT_SECRET
        }

        response = requests.post(TOKEN_URL, data=reqBody)
        token_info = response.json()

        print(token_info)

        print(token_info['access_token'])

        session['access_token'] = token_info['access_token']
        session['refresh_token'] = token_info['refresh_token']
        session['expires_at'] = token_info['expires_in']

        return redirect('/playlists')

@app.route('/playlists')
def get_playlists():
    if 'access_token' not in session:
        return redirect('/login')

    # checking access token to make sure it is valid
    headers = {
        'Authorization': f"Bearer {session['access_token']}"
    }

    # call the API + playlists of user
    response = requests.get(API_BASE_URL + 'me/playlists', headers=headers)

    # returns the playlist
    return jsonify(response.json())

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
