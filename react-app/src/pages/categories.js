import React from 'react';
import '../index.css';

export const Categories = () => {
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

  const handleClick = async (categoryId, categoryName) => {
    console.log(`Category ${categoryName} with ID ${categoryId} clicked`);

    // Replace '/your-flask-endpoint' with your actual Flask backend endpoint
    try {
      const response = await fetch('http://localhost:5000/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categoryId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data); // You can handle the response data as needed
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <div className="categories-container">
      <h1 className="categories-title">Categories to choose from:</h1>
      <div className="categories-list">
        {categories.map((category) => (
          <button
            key={category.id}
            className="category-button"
            onClick={() => handleClick(category.id, category.name)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};