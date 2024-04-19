import React from "react"
import { useState, useEffect } from "react"
import ScaleLoader from "react-spinners/ScaleLoader";


export const Answer = () => {

    const [loading, setLoading] = useState(false);
    const [quicksortTime, setQuicksortTime] = useState(0);
    const [mergeSortTime, setMergeSortTime] = useState(0);
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        setLoading(true);  // Start loading state

        // Asynchronous fetch function
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/answer', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({})
                });
                if (!response.ok) throw new Error('Failed to fetch');
                const jsonData = await response.json();
                setQuicksortTime(jsonData.time[0]);
                setMergeSortTime(jsonData.time[1]);
                setPlaylists(jsonData.time[2]);  // Assuming this is the array of differences and names
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData().then(() => {
            // Set a timeout to ensure the loader is displayed for at least 1000ms
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        });

    }, []);



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
                    <h1>Here is your compatibility score!</h1>
                    <p>nothing</p>
                </div>
                <div className="answer-playlists">
                    <div className="playlist-container">
                        <h3>Top 3 Playlists:</h3>
                        {playlists.map((playlist, index) => (
                            <p key={index}>{index + 1}. {playlist.name} - {playlist.difference} ms</p>
                        ))}
                    </div>
                    <div className="sorting-time">
                        <h3 className="first-line">These are the top 3 playlists based on this score, sorted by:</h3>
                        <h4>Merge Sort: {mergeSortTime} ms</h4>
                        <h4>Quick Sort: {quicksortTime} ms</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};