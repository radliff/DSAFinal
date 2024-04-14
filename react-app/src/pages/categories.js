import React from 'react';
import '../index.css'; 

export const Categories = () => {
  const categories = [
    'made for you', 'pop', 'hip-hop', 'country',
    'rock', 'r&b', 'metal', 'afro', 'indie', 'dance/electronic'
  ];

  const handleClick = (name) => {
    console.log(`Category ${name} clicked`); 
  };

  return (
    <div className="categories-container">
      <h1 className="categories-title">Categories to choose from:</h1>
      <div className="categories-list">
        {categories.map((category, index) => (
          <button
            key={index}
            className="category-button"
            onClick={() => handleClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};
