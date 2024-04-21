import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";

export const Answer = () => {
    const [loading, setLoading] = useState(false);
    const [quicksortTime, setQuicksortTime] = useState(0);
    const [mergeSortTime, setMergeSortTime] = useState(0);
    const [playlists, setPlaylists] = useState([]);
    let playlistName = localStorage.getItem('selectedPlaylistName')

    // Use useLocation to get the data passed from the Categories component
    const location = useLocation();
    const { state: data } = location;

    useEffect(() => {
        setLoading(true); // Start loading state

        // checks if data exists before fetching 
        if (data) {
            setQuicksortTime(data.time[0]);
            setMergeSortTime(data.time[1]);
            setPlaylists(data.time[2]);
            setLoading(false); // Set loading to false since data is already available
        } else {
            // Asynchronous fetch function
            const fetchData = async () => {
                try {
                    const response = await fetch("http://localhost:5000/answer", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({}),
                    });
                    if (!response.ok) throw new Error("Failed to fetch");
                    const jsonData = await response.json();
                    console.log(jsonData);
                    // gets data from the json data and assigns it to its correct  variable
                    setMergeSortTime(jsonData.time[0]);
                    setQuicksortTime(jsonData.time[1]);
                    setPlaylists(jsonData.time[2]); 
                } catch (error) {
                    console.error("Error fetching data: ", error);
                } finally {
                    setLoading(false); // Set loading to false when fetch operation is done
                }
            };

            fetchData();
        }
    }, [data]);

    if (loading) {
        return (
            <div className="answer-loading-page">
                <ScaleLoader
                    color={"#36d7b7"}
                    loading={loading}
                    size={30}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        );
    }

    return (
        <div className="answer-page">
            <div className="answer-page-container">
                <div className="compatibility">
                    <h1>Here is your playlist name!</h1>
                    <p>{playlistName}</p>
                </div>
                <div className="answer-playlists">
                    <div className="playlist-container">
                        <h3>Top 3 Playlists:</h3>
                        {playlists.map((playlistArray, index) => (
                            <p key={index}>
                                {index + 1}. {playlistArray[1]} - {playlistArray[0]}%
                            </p>
                        ))}
                    </div>
                    <div className="sorting-time">
                        <h3 className="first-line">These are the top 3 playlists based on this score, sorted by:</h3>
                        <h4>Merge Sort: {mergeSortTime} s</h4>
                        <h4>Quick Sort: {quicksortTime} s</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};
