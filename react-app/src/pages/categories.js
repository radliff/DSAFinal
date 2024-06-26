import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";

export const Categories = () => {
  const [loading, setLoading] = useState(false);
  // array of categories and id's to be used in the table.
  const categories = [
    { name: 'made for you', id: '0JQ5DAt0tbjZptfcdMSKl3' },
    { name: 'pop', id: '0JQ5DAqbMKFEC4WFtoNRpw' },
    { name: 'hip-hop', id: '0JQ5DAqbMKFQ00XGBls6ym' },
    { name: 'country', id: '0JQ5DAqbMKFKLfwjuJMoNC' },
    { name: 'rock', id: '0JQ5DAqbMKFDXXwE9BDJAr' },
    { name: 'r&b', id: '0JQ5DAqbMKFEZPnFQSFB1T' },
    { name: 'metal', id: '0JQ5DAqbMKFDkd668ypn6O' },
    { name: 'afro', id: '0JQ5DAqbMKFNQ0fGp4byGU' },
    { name: 'indie', id: '0JQ5DAqbMKFCWjUTdzaG0e' },
    { name: 'dance/electronic', id: '0JQ5DAqbMKFHOzuVTgTizF' }
  ];
  const navigate = useNavigate();
  
  const handleClick = async (categoryId, categoryName) => {
    setLoading(true); // Start loading
    // retrieves score from local storage
    let score = localStorage.getItem('selectedPlaylistScore');
    score = parseFloat(score);
    console.log(`Category ${categoryName} with ID ${categoryId} clicked`);

    // fetches data fromm the backEnd  which is then displayed in the answer page
    try {
      const response = await fetch('http://localhost:5000/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categoryId, score }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data); // This is the data you want to pass to the Answer page
      navigate('/answer', { state: data }); // Navigating to the Answer page with data as state
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="categories-container">
      
      {loading ? (
        <div className="answer-loading-page">
          <ScaleLoader
            color={"#36d7b7"}
            loading={loading}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : 
      <div>
        <h1 className="categories-title">Categories to choose from:</h1>
        <div className="categories-list">
          {categories.map((category) => (
            <button
              key={category.id}
              className="category-button"
              onClick={() => handleClick(category.id, category.name)}
              disabled={loading} // Disable button while loading
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      }
    </div>
  );
  
};

