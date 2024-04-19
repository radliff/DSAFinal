from flask import Flask, redirect, request, jsonify, session, url_for, render_template
import requests
import spotipy
from flask_cors import CORS
from spotipy.oauth2 import SpotifyOAuth
from spotipy import Spotify
from spotipy.cache_handler import FlaskSessionCacheHandler
import urllib.parse
import time



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
        # we now grab ALL audio features for the 100 track IDs & append to the total audio features list
        audio_features = sp.audio_features(track_ids)
        print(offset)
        total_audio_features.extend(audio_features)
        # keep increasing the offset until it is equal to the total tracks
        offset += limit
    # calculate averages for all features
    total_acousticness = total_danceability = total_energy = total_loudness = total_speechiness = 0

    for feature in total_audio_features:
        if feature is not None:
            total_acousticness += feature['acousticness']
            total_danceability += feature['danceability']
            total_energy += feature['energy']
            total_loudness += feature['loudness']
            total_speechiness += feature['speechiness']

    avg_acousticness = total_acousticness / count
    avg_danceability = total_danceability / count
    avg_energy = total_energy / count
    avg_loudness = total_loudness / count
    avg_speechiness = total_speechiness / count


    # scale loudness by -1
    avg_loudness = (avg_loudness + 60) / 60
    # return the average of all features
    score = (avg_acousticness + avg_energy + avg_danceability + avg_speechiness + avg_loudness) / 5.0
    
    score = (score * 100) + 1
    # grabbing the playlist name
    playlist = sp.playlist(playlist_id=playlist_ID)
    playlist_name = playlist['name']
    # playlist_name = 'playlist name'
    return score, playlist_name
# Brian's stuff
# Function to find the partition position
def partition(array, low, high):

	# choose the rightmost element as pivot
	pivot = array[high]

	# pointer for greater element
	i = low - 1

	# traverse through all elements
	# compare each element with pivot
	for j in range(low, high):
		if array[j] <= pivot:

			# If element smaller than pivot is found
			# swap it with the greater element pointed by i
			i = i + 1

			# Swapping element at i with element at j
			(array[i], array[j]) = (array[j], array[i])

	# Swap the pivot element with the greater element specified by i
	(array[i + 1], array[high]) = (array[high], array[i + 1])

	# Return the position from where partition is done
	return i + 1

# function to perform quicksort


def quickSort(array, low, high):
	if low < high:

		# Find pivot element such that
		# element smaller than pivot are on the left
		# element greater than pivot are on the right
		pi = partition(array, low, high)

		# Recursive call on the left of pivot
		quickSort(array, low, pi - 1)

		# Recursive call on the right of pivot
		quickSort(array, pi + 1, high)

def timed_quickSort(array):
    print(array)
    starting_time = time.perf_counter()
    quickSort(array, 0, len(array) - 1)
    ending_time = time.perf_counter()
    duration = ending_time - starting_time
    return round(duration, 7)

# chris did this
def merge(left, right):
    result = [] # create empty list to append too
    while left and right:
        if left[0] < right[0]:
            result.append(left[0])
            left = left[1:]
        else:
            result.append(right[0])
            right = right[1:]
    result.extend(left)
    result.extend(right)
    return result
def merge_sort(arr):
    if len(arr) <= 1:
        return arr      # base case chekc
    mid = len(arr) // 2  # get the middle index
    left = merge_sort(arr[:mid]) # recuresive sorts the left hald
    right = merge_sort(arr[mid:]) # recursively sorts the right half!
    return merge(left, right) # sorts the left and right half
def timed_merge_sort(arr):
    start_time = time.perf_counter()
    sorted_arr = merge_sort(arr)
    end_time = time.perf_counter()
    duration = end_time - start_time
    return round(duration, 7)

def findList(catScores, score):
    differences = []
    for playlist_score, playlist_name in catScores:
        percentDiff = abs((playlist_score - score) / score) * 100
        differences.append((percentDiff, playlist_name))
    # use this to sort the main differences and access playlist name w/ it
    # differences = merge_sort(differences)
    # sort only percent differences & give times
    qTime = timed_quickSort([diff[0] for diff in differences])
    mTime = timed_merge_sort([diff[0] for diff in differences])
    # return the times and the differences, along with playlist name
    return qTime, mTime, differences
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
    # Calculate score of given playlist
    score = calcScore(playlistID)  # Ensure this function returns the score
    print(score)
    return jsonify({'name': playlist_name, 'score': score})

@app.route('/categories', methods=['POST'])
def handle_category_click():
    data = request.get_json()
    if not data or 'categoryId' not in data or 'score' not in data:
        return jsonify({"error": "Missing data"}), 400

    category_id = data['categoryId']
    score = data['score']
    try:
        playlists = sp.category_playlists(category_id=category_id, limit=10)
        scores = getScore(playlists)
        time = findList(scores, score)  # Make sure score is converted to the correct type
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    return return_percentages(time)
    # Process the category_id as needed
    # For example, you might look up the category by ID and do something with it

    # Then you can return a success response or further data as needed
@app.route('/answer', methods=['POST'])
def return_percentages(time):
    # Process the time, playlists, scores, and user_score variables as needed
    # For example, you might calculate some percentages based on these variables
    return jsonify({'time': time})
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
