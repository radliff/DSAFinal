import React from "react"
import { useState, useEffect } from "react"
import ScaleLoader from "react-spinners/ScaleLoader";


export const Answer = () => {

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 10000)
    }, [])

    return (
        <div>
        {
            loading ?
                <div className="answer-loading-page">
                    <ScaleLoader
                        color={"#36d7b7"}
                        loading={loading}
                        size={30}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            :
            <div className="answer-page">
                <div className="answer-page-container">
                    <div className="compatibility">
                        <h1>Here is your compatability score !</h1>
                        <p>"score"</p>
                    </div>
                    <div className="answer-playlists">
                        <div className="playlist-container">
                            <h3> Top 3 Playlists:</h3>
                            <p>1. "" - "" </p>
                            <p>2. "" - "" </p>
                            <p>3. "" - "" </p>
                        </div>
                        <div className="sorting-time">
                            <h3 className="first-line"> These are the top 3 playlists based on</h3>
                            <h3 className="second-line"> this score, sorted by</h3>
                            <h4>Merge Sort: (time in ms)</h4>
                            <h4>Quick Sort: (time in ms)</h4>
                        </div>
                        
                    </div>


                </div>

            </div>
        }
                
        </div>
    )
}